import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OfferLoan } from 'src/app/Models/Loan/offer-loan';
import { User } from 'src/app/Models/user/user';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { OfferLoanService } from 'src/app/services/offer-loan.service';
import { RequestLoanService } from 'src/app/services/request-loan.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {

  offers: OfferLoan[] = [];
  status: string[] = ['AVAILABLE', 'NOT AVAILABLE'];
  typeLoans: string[] = ['STUDENT', 'FARMER', 'HOMEMAKER', 'PROJECT'];
  
  loading: boolean = true;
  error: string | null = null;
  tmmValue: number = 7;
  offerForm!: FormGroup;
  submitted = false;
  user= User;
  idOffer!: number  ;

  constructor(private formBuilder: FormBuilder, 
              private offerServ: OfferLoanService,
              private reqLoan: RequestLoanService,
              private actR: ActivatedRoute) {}

  ngOnInit(): void {
   

    this.offerServ.fetchLastTmmValue().subscribe(
      (tmmValue: number) => {
        this.offerForm.patchValue({ tmm: tmmValue });
      },
      (error: any) => {
        console.error('Error fetching tmm:', error);
      }
    );

    this.offerForm = this.formBuilder.group({
      status: ['AVAILABLE', Validators.required],
      typeLoan: ['', Validators.required],
      maxAmnt: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      minAmnt: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      minRepaymentPer: ['', [Validators.required, Validators.min(2)]],
      tmm: [''],
      intRate: ['', Validators.required],
      offrDate: [this.getCurrentDate(), Validators.required],
    });

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
  
    get offerDate(){ return this. offerForm.get('date');}
    get typeLoan(){ return this. offerForm.get('typeLoan');}
    get maxAmnt(){ return this. offerForm.get('maxAmnt');}
    get minAmnt(){ return this. offerForm.get('minAmnt');}
    get minRepaymentPer(){ return this. offerForm.get('minRepaymentPer');}
    get tmm(){ return this. offerForm.get('tmm');}
    get intRate(){ return this. offerForm.get('intRate');}

    addOffers() {
      const offer: OfferLoan = {
        ...this.offerForm.value,
        user: this.user,
        idOffer: this.idOffer
      };
      this.offerServ.addOfferLoan(offer).subscribe(
        () => {
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
        },
        (error: any) => {
          console.error('Error adding offer: ', error);
          this.loading = false;
        }
      );
    }
    
  loadOffers(): void {
    this.offerServ.retrieveAllOfferLoans().subscribe(
      (data: OfferLoan[]) => {
        this.offers = data;
      },
      (error: any) => {
        console.error('Error fetching offers: ' + error.message);
      }
    );
  }

  changeStatus(event: any, offer: OfferLoan): void {
    const updatedOffer: OfferLoan = { ...offer, status: event.target.checked ? 'UNAVAILABLE' : 'AVAILABLE' };
    this.offerServ.modifyOfferLoan(updatedOffer).subscribe(
      () => {
        console.log('Status updated successfully');
      },
      (error: any) => {
        console.error('Error updating status: ', error);
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().substring(0, 10); 
    return formattedDate;
  }

  addRequest(){     
    this.offerServ.addOfferLoan(this.offerForm.value).subscribe();

    }

  modifyOfferLoan(){

  }

  removeOfferLoan(){

  }




}



