import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import Chart from 'chart.js/auto';
import { Observable } from 'rxjs';
import { Project } from 'src/app/Models/Project/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-category-analysis',
  templateUrl: './category-analysis.component.html',
})
export class CategoryAnalysisComponent implements OnInit {
  projects!: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjectsData();
  }

  loadProjectsData(): void {
    this.projectService.getAllProject().subscribe(
      (projects: Project[]) => {
        this.projects = of(projects);
        this.renderChart();
      },
      (error: any) => {
        console.error('Error loading projects data:', error);
        // Handle error here, for example, displaying a message to the user
      }
    );
  }

  renderChart(): void {
    // Check if project data is available first
    this.projects.subscribe(
      (projects: Project[]) => {
        // Map to store total investment needs for each category
        const investmentNeedMap = new Map<string, number>();
        const totalInvestmentMap = new Map<string, number>();

        // Extract categories and sum up the investment needs and total raising investment
        projects.forEach(project => {
          if (investmentNeedMap.has(project.categoryProject)) {
            investmentNeedMap.set(
              project.categoryProject,
              investmentNeedMap.get(project.categoryProject)! +
                project.investNeed
            );
            totalInvestmentMap.set(
              project.categoryProject,
              totalInvestmentMap.get(project.categoryProject)! +
                project.total_raising_investment
            );
          } else {
            investmentNeedMap.set(project.categoryProject, project.investNeed);
            totalInvestmentMap.set(project.categoryProject, project.total_raising_investment);
          }
        });

        // Get canvas element for chart
        const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
        if (ctx) {
          // Create chart using Chart.js
          new Chart(ctx, {
            type: 'pie', // Change the chart type to 'pie'
            data: {
              labels: Array.from(investmentNeedMap.keys()),
              datasets: [
                {
                  label: 'Total Raising Investment',
                  data: Array.from(totalInvestmentMap.values()),
                  backgroundColor: this.getRandomColors(investmentNeedMap.size), // Generate random colors
                  borderColor: 'white',
                  borderWidth: 1,
                },
                {
                  label: 'Total Investment Need',
                  data: Array.from(investmentNeedMap.values()),
                  backgroundColor: this.getRandomColors(investmentNeedMap.size), // Generate random colors
                  borderColor: 'white',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              aspectRatio: 1, // Aspect ratio for the circle
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 10 // Smaller font size for legend
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    font: {
                      size: 8 // Smaller font size for y-axis ticks
                    }
                  }
                }
              }
            },
          });
        }
      },
      (error: any) => {
        console.error('Error loading projects data:', error);
        // Handle error here, for example, displaying a message to the user
      }
    );
  }

  // Function to generate random colors
  getRandomColors(numColors: number): string[] {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);
    }
    return colors;
  }
}
