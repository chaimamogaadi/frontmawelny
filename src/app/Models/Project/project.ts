import { Investment } from "../Investment/investment";

export class Project {
    idProject!: number;
    nomProject!: string;
    description!: string;
    amount_inv!: number;
    invest_value!: number;
    investNeed!: number;
    total_raising_investment!: number;
    total_interest!: number;
    date_debut!: Date;
    date_fin!: Date;
    status_project!: statusProject;
    status_Invest!: Status_inv;
    categoryProject!: CategoryProject;
    Businessplan!: Blob;
    rating!: number;
    feedback!: string ;
    investment?:Investment[];
  }
  
  export enum statusProject {
    Approved = 'Approved',
    StillNotApproved = 'Still_Not_Approved'
  }
  
  export enum Status_inv {
    Closed ='CLOSED',
    InProgress = 'INPROGRESS',
    Completed = 'COMPLETED'
  }
  
  export enum CategoryProject {
    agriculture = 'agriculture',
    Crafts_And_Arts = 'Crafts_And_Arts',
    Technology = 'Technology'}