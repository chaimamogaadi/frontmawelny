import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { OfferLoan } from '../Models/Loan/offer-loan';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OfferLoanService {
  
  private baseUrl ='http://localhost:8084/offer_loan';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aXNzb2JlamFvdWlAZ21haWwuY29tIiwiaWF0IjoxNzE1Nzg2MjQwLCJleHAiOjE3MTU4NzI2NDB9.uTQuxnXOxF8IzQw1xkZAzhBv-Vj6DEVM2MnPy6puDIs'
 
constructor(private http:HttpClient) { }

// get TMM valu from net
  fetchLastTmmValue(): Observable<number> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });      
    return this.http.get<number>(`${this.baseUrl}/tmmValue`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error fetching offers:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
  }
  
// get all offers
  retrieveAllOfferLoans(): Observable<OfferLoan[]> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });
    return this.http.get<OfferLoan[]>(this.baseUrl+'/retrieve_all_offers', { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching offers:', error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }
//get offer by type loan
  retrieveOfferByTypeLoan(...types: string[]): Observable<OfferLoan[]> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });
    const params = new HttpParams().set('types', types.join(','));
    return this.http.get<OfferLoan[]>(`${this.baseUrl}/retrieve_offers_by_type`, { headers, params });
  }
// ADD
  addOfferLoan(offer: Object): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${this.token}` 
      });
    return this.http.post(`${this.baseUrl}/add-offer`, offer, { headers: headers });

  }
  // get offer by  ID
  retrieveOfferLoan(id: number): Observable<OfferLoan> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` 
    });
    return this.http.get<OfferLoan>(`${this.baseUrl}/retrieve_offer/${id}`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(`Error fetching offer N°${id}`, error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

  // EDIT
modifyOfferLoan(offer: OfferLoan): Observable<OfferLoan> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  const url = `${this.baseUrl}/modify-offer/${offer.idOffer}`;

  return this.http.put<OfferLoan>(url, offer, { headers }).pipe(
    catchError((error: any) => {
      console.error('Error modifying offer', error);
      return throwError('Something went wrong, please try again later.');
    })
  );
}

//REMOVE
removeOfferLoan(id:number){ 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });  
   return this.http.delete<OfferLoan>(this.baseUrl+ '/' +id, { headers }) 
   .pipe(
    catchError((error: any) => {
      console.error('Error adding offer', error);
      return throwError('Something went wrong, please try again later.');
    })
  );
}


// SIM YEARLY
simulationCalYearlyRepaymentAmount(idOffer: number, loanAmnt: number, nbrYears: number, typeAmort: string): Observable<number> {
  const params = {
    idOffer: idOffer.toString(),
    loanAmnt: loanAmnt.toString(),
    nbrYears: nbrYears.toString(),
    typeAmort: typeAmort
  };
  const url = `${this.baseUrl}/simulation_calculate_yearly_repaymen_amount`;

  return this.http.get<number>(url, { params })
    .pipe(
      catchError((error: any) => {
        console.error('fetching:', error);
        return throwError('Something went wrong:');
      })
    );
}

// SIM MONTHLY
simulationCalMonthlyRepaymentAmount(idOffer: number, loanAmnt: number, nbrMonth: number): Observable<number> {
  const params = {
    idOffer: idOffer.toString(),
    loanAmnt: loanAmnt.toString(),
    nbrMonth: nbrMonth.toString()
  };
  const url = `${this.baseUrl}/simulation_calculate_monthly_repayment_amount`;

  return this.http.get<number>(url, { params })
    .pipe(
      catchError((error: any) => {
        console.error('fetching:', error);
        return throwError('Something went wrong:');
      })
    );
}


// COUNT REQ BY OFFER
countRequestLoansByOfferId(idOffer: number): Observable<number> {
  const url = `${this.baseUrl}/count_requestLoans/${idOffer}`;
  return this.http.get<number>(url);
}

// COUNT AVILABNE OFFERS
countAvailableOffers(): Observable<number> {
  const url = `${this.baseUrl}/available_offer`;
  return this.http.get<number>(url);
}

// SEARCH OFFER BY MIN AMOUNT
searchOffersByMinAmount(searchedAmount: number): Observable<any> {
  const url = `${this.baseUrl}/search_offer?searchedAmount=${searchedAmount}`;
  return this.http.get<any>(url);
}



}


