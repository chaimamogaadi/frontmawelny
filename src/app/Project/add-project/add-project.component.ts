import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryProject, Project } from 'src/app/Models/Project/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
  projectForm!:FormGroup;
  project: Project = new Project(); // Initialize a new Project object
  categoryProjects:String []= [  'agriculture' , 'Crafts_And_Arts' , 'Technology'];

  idProject: number | undefined ;
  constructor(private projectService: ProjectService,
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit(): void {
    // You can perform additional initialization tasks here if needed
    this.projectForm = this.formBuilder.group({
      nomProject: ['', Validators.required], // Add validators if needed
      description: ['', Validators.required],
      amount_inv: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      categoryProject: ['', Validators.required]
    });
  }

 /* addProject() {
    this.projectService.addProject(this.project).subscribe(
      (project: any) => {
        console.log(project);
        // Stockez l'project du shareholder nouvellement créé
        this.idProject = project.idProject; // This line is causing the error
      },
      (error: any) => {
        console.error(error); 
      }
    );
  }*/
  get nomProject(){ return this. projectForm.get('nomProject');}
  get description(){ return this. projectForm.get('description');}
  get amount_inv(){ return this. projectForm.get('amount_inv');}
  get date_debut(){ return this. projectForm.get('date_debut');}
  get date_fin(){ return this. projectForm.get('date_fin');}
  get categoryProject(){ return this. projectForm.get('categoryProject');}
 
  addProject(){     
    this.projectService.addProject(this.projectForm.value).subscribe();
    this.projectForm.reset();
    }
  
  resetForm(): void {
   
    this.project = new Project();
  }
}
