import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { CategoryProject } from 'src/app/Models/Project/project'; // Adjust the path as needed
import { InvestmentService } from 'src/app/services/investment.service'; // Import InvestmentService
import { User } from 'src/app/Models/user/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  mostInvestedCategories: { name: string; count: number }[] = [];
  categoryProjects:String []= [  'agriculture' , 'Crafts_And_Arts' , 'Technology'];
  //investorWithMostInvestment: string = '';
  investorWithMostInvestment: User | undefined;
  constructor(
    private projectService: ProjectService,
    private investmentService: InvestmentService // Inject InvestmentService
  ) { }

  ngOnInit(): void {
    this.loadMostInvestedCategories();
    this.findInvestorWithMostInvestment();
  }

  loadMostInvestedCategories(): void {
    this.projectService.getMostInvestedCategories().subscribe(
      data => {
        // Convert Map to array and map enum values to their display names
        this.mostInvestedCategories = Array.from(data).map(([name, count]) => ({
          name: CategoryProject[name as keyof typeof CategoryProject],
          count: count
        }));
      },
      error => {
        console.error('Error fetching most invested categories:', error);
      }
    );
  }

  findInvestorWithMostInvestment(): void {
    this.investmentService.findInvestorWithMostInvestment().subscribe(
      user => {
        this.investorWithMostInvestment = user;
      },
      error => {
        console.error('Error fetching investor with most investment:', error);
      }
    );
  }
}
