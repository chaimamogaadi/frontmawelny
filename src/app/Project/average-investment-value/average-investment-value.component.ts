import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-average-investment-value',
  templateUrl: './average-investment-value.component.html',
  styleUrls: ['./average-investment-value.component.css']
})
export class AverageInvestmentValueComponent implements OnInit {
  averageInvestmentValue: number | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.calculateAverageInvestmentValue();
  }

  calculateAverageInvestmentValue(): void {
    this.projectService.calculateAverageInvestmentValue().subscribe(
      (average: number) => {
        this.averageInvestmentValue = average;
      },
      (error: any) => {
        console.error('Error calculating average investment value:', error);
      }
    );
  }
}
