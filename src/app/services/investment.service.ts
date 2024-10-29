import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Models/user/user';
import { Investment } from '../Models/Investment/investment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private baseurl = 'http://localhost:8084/Investment/investments';
  private apiUrl = 'http://localhost:8084/Investment';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFpbWEubW9nYWFkaUBlc3ByaXQudG4iLCJpYXQiOjE3MzAxNTQ0ODgsImV4cCI6MTczMDI0MDg4OH0.cRDBcIQAaAD8ZufzDJYBsORw_jNMGlVvQnXRK7_6WSs';

  constructor(private http: HttpClient) { }

  addInvestment(investment: Investment, nbr_action: number, idProject: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const body = {
      nbr_action: nbr_action,
      date_inevt: investment.date_inevt,
      project: investment.project
    };

    console.log('Request Headers:', headers);
    console.log('Request Body:', body);
    console.log('Request URL:', `${this.baseurl}/${idProject}`);

    return this.http.post(`${this.baseurl}/${idProject}`, body, { headers: headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('Authorization error:', error);
          console.error('Request details:', {
            url: `${this.baseurl}/${idProject},{ headers: headers }`,
            headers: headers.keys(),
            body: body
          });
          return throwError(() => 'You are not authorized to perform this action. Check your permissions.');
        } else if (error.status === 401) {
          console.error('Authentication error:', error);
          return throwError(() => 'Authentication failed. Please check your credentials.');
        }
        
        console.error('Investment service error:', error);
        console.error('Full error response:', {
          status: error.status,
          message: error.message,
          error: error.error
        });
        return throwError(() => 'Failed to add investment. Please try again later.');
      })
    );
  }

  findInvestorWithMostInvestment(): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<User>(`${this.apiUrl}/most-investment`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error finding investor with most investment:', error);
        return throwError(() => 'Failed to fetch investor data.');
      })
    );
  }
}