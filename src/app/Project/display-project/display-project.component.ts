import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Project } from 'src/app/Models/Project/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.css']
})
export class DisplayProjectComponent  implements OnInit{

  projects: Project[]= [];
  offerProject!: FormGroup;
  constructor(private projectservice:ProjectService){}
  
  ngOnInit(): void {
    
    this.projectservice.getAllProject().subscribe(
      data => {
        this.projects = data;
        console.log(this.projects);
      },
      error => {
        console.log('Error', error);
      }
    );
  }
  
}

/*
  loadOffers():void{
    this.offerService.retrieveAllOfferLoans().subscribe(
       (data)=>{ this.offers = data},
       (error)=>{this.offers = [];
        console.log(error);
       }
      );
  }
  */
