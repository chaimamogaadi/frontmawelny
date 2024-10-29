import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { RequestLoan, TypeAmort } from '../Models/Loan/request-loan';

@Injectable({
  providedIn: 'root'
})
export class RequestLoanService {
  
  private baseUrl ='http://localhost:8084/request_loan';
  private token = 
'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aXNzb2JlamFvdWlAZ21haWwuY29tIiwiaWF0IjoxNzE1MTczMDM3LCJleHAiOjE3MTUyNTk0Mzd9.vqTqpl6l8T-3avWhgcmK4PiL6Y01I2VehTvxiAfeC1o';
constructor(private http:HttpClient) { }


// Retrieve All loan
retrieveAllLoans(): Observable<RequestLoan[]> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` 
  });
  return this.http.get<RequestLoan[]>(`${this.baseUrl}/request_loan/retrieve_all_request`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error fetching loans:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

// Retrieve a loan by ID
retrieveLoan(id: number): Observable<RequestLoan> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.get<RequestLoan>(`${this.baseUrl}/request_loan/retrieve_request/${id}`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error fetching loan N°${id}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

 // Add a loan and assign it to an offer
addLoanAndAssignRequestToOffer(offerId: number, type: TypeAmort, file: File): Observable<RequestLoan> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  const formData = new FormData();
  formData.append('file', file);
  formData.append('offerId', offerId.toString());
  formData.append('type', type.toString());
  return this.http.post<RequestLoan>(`${this.baseUrl}/request_loan/add-loan-and-assign-to-offer/${offerId}/${type}`, formData, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error adding loan:', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
  }

  // Modify a loan
  modifyLoan(request: RequestLoan): Observable<RequestLoan> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });
    return this.http.put<RequestLoan>(`${this.baseUrl}/request_loan/modify-loan`, request, { headers })
      .pipe(
        catchError((error: any) => {
          console.error('Error modifying loan:', error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

 // Remove a loan
  removeLoan(id: number): Observable<void> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });
    return this.http.delete<void>(`${this.baseUrl}/request_loan/remove-loan/${id}`, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(`Error removing loan N°${id}`, error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

  // Retrieve loans by status
  findLoansByStatus(status: string): Observable<RequestLoan[]> {
    const headers= new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` });
    const params = new HttpParams().set('status', status);
    return this.http.get<RequestLoan[]>(`${this.baseUrl}/request_loan/find_by_status`, { headers, params })
      .pipe(
        catchError((error: any) => {
          console.error(`Error fetching loans with status ${status}`, error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }
  

 // Reject a loan
rejectLoan(requestId: number): Observable<string> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${this.token}` });
  return this.http.put<string>(`${this.baseUrl}/request_loan/reject_req/${requestId}`, null, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error rejecting loan N°${requestId}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

  // Approve a loan
approveLoan(requestId: number): Observable<string> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${this.token}` });
  return this.http.put<string>(`${this.baseUrl}/request_loan/approve/${requestId}`, null, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error approving loan N°${requestId}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

// Retrieve all loans with amortization
retrieveAllLoansWithAmortization(): Observable<RequestLoan[]> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.get<RequestLoan[]>(`${this.baseUrl}/request_loan/loans-with-amortization`, { headers })
    .pipe(
      catchError((error: any) => {
        console.error('Error fetching loans with amortization', error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

  // Unassign amortization from a request
unassignAmortizationFromRequest(requestId: number): Observable<void> {
  const headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}` });
  return this.http.put<void>(`${this.baseUrl}/request_loan/unaffecter-request-from-amortization/${requestId}`, null, { headers })
    .pipe(
      catchError((error: any) => {
        console.error(`Error unassigning amortization from request N°${requestId}`, error);
        return throwError('Something went wrong, please try again later.');
      })
    );
}

  


}
