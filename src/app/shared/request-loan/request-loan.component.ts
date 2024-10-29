import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferLoan } from 'src/app/Models/Loan/offer-loan';
import { RequestLoan } from 'src/app/Models/Loan/request-loan';
import { User } from 'src/app/Models/user/user';
import { OfferLoanService } from 'src/app/services/offer-loan.service';
import { RequestLoanService } from 'src/app/services/request-loan.service';

@Component({
  selector: 'app-request-loan',
  templateUrl: './request-loan.component.html',
  styleUrls: ['./request-loan.component.css']
})
export class RequestLoanComponent implements OnInit{
  
  reqForm!:FormGroup;
  requestLoan!:RequestLoan;
  @Input() offerLoan!: OfferLoan;
  @Output() selectedOfferId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private offerServ: OfferLoanService,
              private requestServ: RequestLoanService,
              private fb: FormBuilder,
              private actR:ActivatedRoute){}
  
  ngOnInit(): void {
    
    const id = Number(this.actR.snapshot.paramMap.get('id'));
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
    this.reqForm = this.fb.group({
      reqDate: [this.getCurrentDate()],
      offerTypeLoan: [''],
      selectedTypeAmort: [''],
      loanAmnt: [''],
      loanPeriod: [''],
      garantorFile: [null] // Initialize with null
    });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10); 
    return formattedDate;
  }

  addRequest(): void {
    if (!this.reqForm || !this.offerLoan) {
      console.error('Form is invalid or offerLoan is missing');
      return;
    }
  
    const offerId = this.offerLoan.idOffer;
    const type = this.reqForm.value.selectedTypeAmort;
    const file = this.reqForm.value.garantorFile;
    const loanAmnt = this.reqForm.value.loanAmnt;
    const nbrMonth = this.reqForm.value.loanPeriod;
    
    let nbrYears: number | null = null;
    if (this.offerLoan.typeLoan === 'PROJECT') {
      nbrYears = this.reqForm.value.loanPeriod;
    }
    
    console.log('Calculating repayment...');
    console.log('idOffer:', offerId);
    console.log('loanAmnt:', loanAmnt);
    console.log('nbrMonth:', nbrMonth);
    console.log('nbrYears:', nbrYears);
    console.log('typeAmort:', type);
  
    this.requestServ.addLoanAndAssignRequestToOffer(offerId, type, file).subscribe(
      (requestLoan) => {
        console.log('Request loan added:', requestLoan);
      },
      (error) => {
        console.error('Error adding request loan:', error);
      }
    );
  }
  
  
  
  
  get reqDate(){ return this. reqForm.get('reqDate');}
  get typeLoan(){ return this. reqForm.get('typeLoan');}
  get typeAmrt(){ return this. reqForm.get('typeAmrt');}
  get loanAmnt(){ return this. reqForm.get('loanAmnt');}
  get nbrMonth(){ return this. reqForm.get('periode');}
  get nbrYears(){ return this. reqForm.get('periode');}
  //get garantorFile(){ return this. reqForm.get('garantorFile');}

  /* 
  addRequest(): void {
    if (!this.reqForm.valid || !this.offerLoan) {
      console.error('Form is invalid or offerLoan is missing');
      return;
    }

    const offerId = this.offerLoan.idOffer;
    const type = this.reqForm.get('selectedTypeAmort')!.value;
    const file = this.garantorFile; 

    this.requestServ.addLoanAndAssignRequestToOffer(offerId, type, file).subscribe(
      (requestLoan) => {
        console.log('Request loan added:', requestLoan);
        // Optionally, emit an event or perform any other action upon successful addition
      },
      (error) => {
        console.error('Error adding request loan:', error);
        // Optionally, handle the error as per your application's requirement
      }
    );
  }
  
  this is my entity
import { OfferLoan } from './offer-loan';
import { Amortization } from './amortization';

export class RequestLoan{
  requestId!: number;
  reqDate!: Date;
  loanAmnt!: number;
  nbrMonth!: number;
  nbrYears!: number;
  garantorFile!: any;
  fileName!: string;
  status!: StatLoan;
  typeAmrt!: TypeAmort;
  offerLoan?: OfferLoan;
  amortization?: Amortization;
}

export enum TypeAmort {
  CONST_ANNUITY = 'CONST_ANNUITY',
  CONST_AMORTIZATION = 'CONST_AMORTIZATION',
  LOAN_PER_BLOC = 'LOAN_PER_BLOC',
  CONST_MONTHLY = 'CONST_MONTHLY',
}

export enum StatLoan {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
  */
 


  
  

  

}
