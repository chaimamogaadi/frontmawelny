import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/Models/Project/project';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-highest-lowest-investments',
  templateUrl: './highest-lowest-investments.component.html',
  styleUrls: ['./highest-lowest-investments.component.css']
})
export class HighestLowestInvestmentsComponent implements OnInit {
  highestInvestmentProject: Project | null = null;
  lowestInvestmentProject: Project | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getAllProject().subscribe(
      (projects: Project[]) => {
        this.highestInvestmentProject = this.projectService.findProjectWithHighestInvestment(projects);
        this.lowestInvestmentProject = this.projectService.findProjectWithLowestInvestment(projects);
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
