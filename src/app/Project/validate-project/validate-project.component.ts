import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSlider } from '@angular/material/slider';
import { Project } from 'src/app/Models/Project/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-validate-project',
  templateUrl: './validate-project.component.html',
  styleUrls: ['./validate-project.component.css']
})
export class ValidateProjectComponent implements OnInit {
  projects: Project[] = [];
  rating: number = 0;
  feedback: string = '';
  termsAccepted: boolean = false;
  searchTerm: string = '';

  @ViewChild('ratingSlider') ratingSlider!: MatSlider;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProject().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  deleteProject(idProject: number): void {
    this.projectService.deleteProject(idProject).subscribe({
      next: data => {
        console.log(data);
        this.loadProjects(); // Reload projects after deletion
      },
      error: error => console.log(error)
    });
  }

  validateProject(projectId: number): void {
    this.projectService.validateProject(projectId).subscribe(
      () => {
        console.log('Project validated successfully.');
        this.loadProjects(); // Reload projects after validation
      },
      error => {
        console.error('Error validating project:', error);
      }
    );
  }

  filterProjects(): void {

    if (this.searchTerm.trim() !== '') {
      this.projects = this.projects.filter(project => {
        const searchTerm = this.searchTerm.toLowerCase();
        return (
          project.nomProject?.toLowerCase().includes(searchTerm) ||
          project.description?.toLowerCase().includes(searchTerm) ||
          (project.amount_inv && project.amount_inv.toString().toLowerCase().includes(searchTerm)) ||
          (project.invest_value && project.invest_value.toString().toLowerCase().includes(searchTerm)) ||
          (project.investNeed && project.investNeed.toString().toLowerCase().includes(searchTerm)) ||
          (project.total_interest && project.total_interest.toString().toLowerCase().includes(searchTerm)) ||
          (project.total_raising_investment && project.total_raising_investment.toString().toLowerCase().includes(searchTerm)) ||
          project.categoryProject?.toLowerCase().includes(searchTerm) ||
          project.status_Invest?.toLowerCase().includes(searchTerm) ||
          project.status_project?.toLowerCase().includes(searchTerm)
        );
      });
    }
  }


  openRatingModal(project: Project): void {
    this.rating = project.rating || 0;
    this.feedback = project.feedback || '';
    // Open rating modal or perform other necessary actions
  }

  submitRating(projectId: number, rating: number, feedback: string): void {
    // Call the rateProject method of the project service
    this.projectService.rateProject(projectId, rating, feedback).subscribe(
      () => {
        console.log('Rating submitted successfully.');
        // Optionally, you can reload the projects or perform other actions here
      },
      error => {
        console.error('Error submitting rating:', error);
        // Handle error
      }
    );
  }
}
