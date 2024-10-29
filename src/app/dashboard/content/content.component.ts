import { Component, OnInit } from '@angular/core';
import { OfferLoanService } from 'src/app/services/offer-loan.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  tmmValue: number = 7;

  constructor( private offerServ:OfferLoanService){}
  
  ngOnInit(): void {
    this.offerServ.fetchLastTmmValue().subscribe(
      (tmmValue: number) => {
       console.log('TMM:', tmmValue);
      },
      (error: any) => {
        console.error('Error fetching tmm:', error);
      }
    );
  }
  
}
