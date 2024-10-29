import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OfferLoanService } from '../services/offer-loan.service';
import { ActivatedRoute } from '@angular/router';
import { OfferLoan } from '../Models/Loan/offer-loan';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulator',
  templateUrl: './similator.component.html',
  styleUrls: ['./similator.component.css']
})
export class SimilatorComponent implements OnInit {

  @Input() offerLoan!: OfferLoan;
  @Output() selectedOfferId: EventEmitter<number> = new EventEmitter<number>();

  form!: FormGroup;

  monthlyRepaymentAmount!: number;
  yearlyRepaymentAmount!: number;

  constructor(
    private offerServ: OfferLoanService,
    private actR: ActivatedRoute,
    private fb: FormBuilder
  ) {}


  ngOnInit() {
    const id = Number(this.actR.snapshot.paramMap.get('idOffer'));
    console.log('Param ID:', id);

    this.offerServ.retrieveOfferLoan(id).subscribe(
      (selectedOffer: OfferLoan) => {
        console.log('Selected Offer Loan:', selectedOffer);
        this.offerLoan = selectedOffer;
        this.initializeForm();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      loanAmnt: ['', Validators.required],
      loanPeriod:['', Validators.required],
      selectedTypeAmort: ['', Validators.required]
    });
  }
   
  

  onTypeAmortChange(): void {
    const typeAmort = this.form.get('selectedTypeAmort')!.value;
    console.log('Selected type of amortization:', typeAmort);
  }
  
  calculateRepayment(): void {
    if (!this.form || !this.offerLoan) {
      console.error('Form or offerLoan is missing');
      return;
    }
  
    const idOffer = this.offerLoan.idOffer; // Get idOffer from offerLoan
    const loanAmnt = Number(this.form.get('loanAmnt')!.value);
    const nbrMonth = Number(this.form.get('loanPeriod')!.value);
    const typeAmort = this.form.get('selectedTypeAmort')!.value;
    let nbrYears: number | null = null;
    
    if (this.offerLoan.typeLoan === 'PROJECT') {
      nbrYears = Number(this.form.get('loanPeriod')!.value);
    }
    
    console.log('Calculating repayment...');
    console.log('idOffer:', idOffer);
    console.log('loanAmnt:', loanAmnt);
    console.log('nbrMonth:', nbrMonth);
    console.log('typeAmort:', typeAmort);
    console.log('nbrYears:', nbrYears);
  
    if (this.offerLoan?.typeLoan === 'PROJECT') {
      console.log('Calculating yearly repayment...');
      this.offerServ.simulationCalYearlyRepaymentAmount(idOffer, loanAmnt, nbrYears || 0, typeAmort).subscribe(
        (yearlyRepaymentAmount) => {
          this.yearlyRepaymentAmount = yearlyRepaymentAmount;
          console.log('Yearly repayment amount calculated:', yearlyRepaymentAmount);
        },
        (error) => {
          console.error('Error simulationCalYearlyRepaymentAmount:', error);
        }
      );
    } else {
      console.log('Calculating monthly repayment...');
      this.offerServ.simulationCalMonthlyRepaymentAmount(idOffer, loanAmnt, nbrMonth).subscribe(
        (monthlyRepaymentAmount) => {
          this.monthlyRepaymentAmount = monthlyRepaymentAmount;
          console.log('Monthly repayment amount calculated:', monthlyRepaymentAmount);
        },
        (error) => {
          console.error('Error simulationCalMonthlyRepaymentAmount:', error);
        }
      );
    }
  }
  
  
  
  /*
  calculateRepayment(): void {
    if (this.form) {
      const idOffer = Number(this.actR.snapshot.paramMap.get('idOffer'));
      const loanAmnt = Number(this.form.get('loanAmnt')!.value);
      const nbrMonth = Number(this.form.get('loanPeriod')!.value);
      const typeAmort = String(this.form.get('selectedTypeAmort')!.value);
      const nbrYears = Number(this.form.get('loanPeriod')!.value);

      if (this.offerLoan?.typeLoan === 'PROJECT') {
        this.offerServ.simulationCalYearlyRepaymentAmount(idOffer, loanAmnt, nbrYears, typeAmort).subscribe(
          (yearlyRepaymentAmount) => {
            this.yearlyRepaymentAmount = yearlyRepaymentAmount;
          },
          (error) => {
            console.error('Error simulationCalYearlyRepaymentAmount:', error);
          }
        );
      } else {
        this.offerServ.simulationCalMonthlyRepaymentAmount(idOffer, loanAmnt, nbrMonth).subscribe(
          (monthlyRepaymentAmount) => {
            this.monthlyRepaymentAmount = monthlyRepaymentAmount;
          },
          (error) => {
            console.error('Error simulationCalMonthlyRepaymentAmount:', error);
          }
        );
      }
    }
  }
  */
      
  

/*
  calculateMonthlyRepayment(idOffer: number, loanAmnt: number, nbrMonth: number): void {
    this.offerServ.simulationCalMonthlyRepaymentAmount(idOffer, loanAmnt, nbrMonth).subscribe(
      (monthlyRepaymentAmount) => {
        this.monthlyRepaymentAmount = monthlyRepaymentAmount;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  calculateYearlyRepayment(idOffer: number, loanAmnt: number, nbrYears:number, typeAmort: string): void {
    this.offerServ.simulationCalYearlyRepaymentAmount(idOffer, loanAmnt, nbrYears, typeAmort).subscribe(
      (yearlyRepaymentAmount) => {
        this.yearlyRepaymentAmount = yearlyRepaymentAmount;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
*/

  getCountRequestLoans(idOffer: number): void {
    this.offerServ.countRequestLoansByOfferId(idOffer).subscribe(
      count => {
        console.log('Count of Request Loans:', count);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  countAvailableOffers(): void {
    this.offerServ.countAvailableOffers().subscribe(
      count => {
        console.log('Count of Available Offers:', count);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  searchOffersByMinAmount(searchedAmount: number): void {
    this.offerServ.searchOffersByMinAmount(searchedAmount).subscribe(
      response => {
        console.log('Search Result:', response);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
}