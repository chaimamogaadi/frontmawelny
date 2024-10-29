import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Amortization } from '../Models/Loan/amortization';

@Injectable({
  providedIn: 'root'
})
export class AmortizationService {

  private baseUrl = 'http://localhost:8084/amortization';
  private token = 
'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aXNzb2JlamFvdWlAZ21haWwuY29tIiwiaWF0IjoxNzE1MTczMDM3LCJleHAiOjE3MTUyNTk0Mzd9.vqTqpl6l8T-3avWhgcmK4PiL6Y01I2VehTvxiAfeC1o';
constructor(private http: HttpClient) { }

  // Retrieve all amortizations
retrieveAllAmortization(): Observable<Amortization[]> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.get<Amortization[]>(`${this.baseUrl}/amortization/retrieve_all_amortization`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error fetching amortizations:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

//Retrieve an amortization by ID
retrieveAmortization(id: number): Observable<Amortization> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.get<Amortization>(`${this.baseUrl}/amortization/retrieve_amortization/${id}`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error fetching amortization N°${id}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

  // Add amortization fees to a request loan
addAmortizationFees(requestId: number, fees: number): Observable<Amortization> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${this.token}` });
  const params = new HttpParams().set('fees', fees.toString());
  return this.http.post<Amortization>(`${this.baseUrl}/amortization/add-amortization-fees/${requestId}`, null, { headers, params })
    .pipe(
      catchError((error: any) => {
        console.error(`Error adding amortization fees to request N°${requestId}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

// Modify an amortization
modifyAmortization(amortization: Amortization): Observable<Amortization> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.put<Amortization>(`${this.baseUrl}/amortization/modify-amortization`, amortization, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error modifying amortization:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}


  // Remove an amortization
removeAmortization(id: number): Observable<void> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
  'Authorization': `Bearer ${this.token}` });
  return this.http.delete<void>(`${this.baseUrl}/amortization/remove-amortization/${id}`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error removing amortization N°${id}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}





}