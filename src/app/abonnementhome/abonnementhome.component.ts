import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentService } from '../services/investment.service';
import { Project } from '../Models/Project/project';
import { Investment } from '../Models/Investment/investment';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-abonnementhome',
  templateUrl: './abonnementhome.component.html'
})
export class AbonnementhomeComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedIdProject?: number;
  investmentForm: FormGroup;
  isSubmitting = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private investmentService: InvestmentService,
    private projectService: ProjectService
  ) {
    this.investmentForm = this.formBuilder.group({
      nbr_action: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(80),
        Validators.pattern('^[0-9]*$')
      ]]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProject().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects loaded:', this.projects);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        alert('Failed to load projects. Please refresh the page.');
      }
    });
  }

  openInvestmentModal(project: Project): void {
    this.selectedProject = project;
    this.selectedIdProject = project?.idProject;
    
    // Reset form when opening modal for a new project
    this.investmentForm.reset();
    
    // Pre-fill any necessary values
    if (project) {
      this.investmentForm.patchValue({
        nbr_action: '' // Start with empty value
      });
    }
  }

  validateInvestmentData(): boolean {
    if (!this.investmentForm.valid) {
      Object.keys(this.investmentForm.controls).forEach(key => {
        const control = this.investmentForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return false;
    }

    if (!this.selectedIdProject || !this.selectedProject) {
      alert('Please select a project first.');
      return false;
    }

    const nbrAction = this.investmentForm.get('nbr_action')?.value;
    if (!nbrAction || nbrAction < 1 || nbrAction > 80) {
      alert('Please enter a valid number of actions (1-80).');
      return false;
    }

    return true;
  }

  submitInvestmentForm(): void {
    if (!this.validateInvestmentData()) {
      return;
    }

    this.isSubmitting = true;
    const nbrActionControl = this.investmentForm.get('nbr_action');

    const investment: Investment = {
      idInvestment: this.selectedProject!.idProject,
      nbr_action: nbrActionControl!.value,
      date_inevt: new Date(),
      project: this.selectedProject!
    };

    console.log('Submitting investment:', investment);

    this.investmentService.addInvestment(
      investment,
      nbrActionControl!.value,
      this.selectedIdProject!
    ).subscribe({
      next: (response) => {
        console.log('Investment added successfully:', response);
        this.handleSuccessfulInvestment();
      },
      error: (error) => {
        console.error('Error adding investment:', error);
        this.handleInvestmentError(error);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private handleSuccessfulInvestment(): void {
    // Reset form and selection
    this.investmentForm.reset();
    this.selectedProject = null;
    this.selectedIdProject = undefined;
    
    // Refresh projects list
    this.loadProjects();
    
    // Show success message
    alert('Investment added successfully!');
    
    // Close modal if you're using one
    // this.closeModal();
  }

  private handleInvestmentError(error: any): void {
    let errorMessage = 'Failed to add investment. ';
    
    if (error.includes('session has expired')) {
      errorMessage += 'Your session has expired. Please log in again.';
      // Redirect to login or handle session expiration
      // this.authService.logout();
      // this.router.navigate(['/login']);
    } else if (error.includes('not authorized')) {
      errorMessage += 'You are not authorized to perform this action.';
    } else {
      errorMessage += 'Please try again later.';
    }
    
    alert(errorMessage);
  }
}