import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoanType, OfferLoan } from '../Models/Loan/offer-loan';
import { OfferLoanService } from '../services/offer-loan.service';

@Component({
  selector: 'app-display-offer',
  templateUrl: './display-offer.component.html',
  styleUrls: ['./display-offer.component.css']
})
export class DisplayOfferComponent implements OnInit{
  
  @Input() offerLoan!: OfferLoan;
  
  offers: OfferLoan[]= [];  

  isProjectType: boolean = false;
  loading: boolean = true;
  error: string | null = null;
  isMonthlySelected: boolean = false;
  isYearlySelected: boolean = false;

  

  constructor(private offerServ:OfferLoanService){}
  
  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerServ.retrieveAllOfferLoans().subscribe(
      (data: OfferLoan[]) => {
        this.offers = data;
        this.loading = false;
      },
      (error: any) => {
        this.error = 'Error fetching offers: ' + error.message;
        this.loading = false;
      }
    );
  }

  retrieveOffersByType(isMonthly: boolean, types: string[]): void {
    if (isMonthly) {
      this.offerServ.retrieveOfferByTypeLoan(...types).subscribe(
        (data: OfferLoan[]) => {
          this.offers = data;
          this.loading = false;
        },
        (error: any) => {
          this.error = 'No available offers at the moment.';
          this.loading = false;
        }
      );
    } else {
      this.offerServ.retrieveOfferByTypeLoan('PROJECT').subscribe(
        (data: OfferLoan[]) => {
          this.offers = data;
          this.loading = false;
        },
        (error: any) => {
          this.error = 'No available offers for projects at the moment.';
          this.loading = false;
        }
      );
    }
  }
  
  toggleMonthlyYearly(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isMonthlySelected = isChecked;
    this.isYearlySelected = !isChecked; // Toggle yearly based on monthly
    if (isChecked) {
      this.retrieveOffersByType(true, ['FARMER', 'STUDENT', 'HOMEMAKER']);
    } else {
      this.retrieveOffersByType(false, ['PROJECT']);
    }
  }

  
  
  

  
}
  





