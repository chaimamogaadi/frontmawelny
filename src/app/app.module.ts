import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DivHomeComponent } from './div-home/div-home.component';
import { SporthomeComponent } from './sporthome/sporthome.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarconnectedComponent } from './shared/navbarconnected/navbarconnected.component';
import { HomeComponent } from './shared/home/home.component';


import { SidemenuComponent } from './dashboard/sidemenu/sidemenu.component';



import { DisplayOfferComponent } from './display-offer/display-offer.component';
import { ListOfferComponent } from './dashboard/list-offer/list-offer.component';
import { ListRequestsComponent } from './dashboard/list-requests/list-requests.component';
import { ListAmortizationComponent } from './dashboard/list-amortization/list-amortization.component';
import { AuthServiceService } from './services/auth-service.service';
import { TokenStorageServiceService } from './services/token-storage-service.service';

import { ContentComponent } from './dashboard/content/content.component';
import { FooterDashComponent } from './dashboard/footer-dash/footer-dash.component';
import { OfferLoanService } from './services/offer-loan.service';
import { RequestLoanService } from './services/request-loan.service';
import { AmortizationService } from './services/amortization.service';
import { SimilatorComponent } from './similator/similator.component';
import { RequestLoanComponent } from './shared/request-loan/request-loan.component';
import { AddtionalinfoComponent } from './shared/addtionalinfo/addtionalinfo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AbonnementhomeComponent } from './abonnementhome/abonnementhome.component';
import { ValidateProjectComponent } from './Project/validate-project/validate-project.component';
import { DisplayProjectComponent } from './Project/display-project/display-project.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ProjectService } from './services/project.service';
import { CategoryAnalysisComponent } from './Project/category-analysis/category-analysis.component';
import { AverageInvestmentValueComponent } from './Project/average-investment-value/average-investment-value.component';
import { DTCurrencyPipe } from './pipes/dt-currency.pipe';
import { HighestLowestInvestmentsComponent } from './Project/highest-lowest-investments/highest-lowest-investments.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { InvestmentService } from './services/investment.service';



@NgModule({
  declarations: [
    AppComponent,
    DivHomeComponent,
    SporthomeComponent,
    NavbarComponent,
    FooterComponent,
    NavbarconnectedComponent,
    HomeComponent,
    DisplayOfferComponent,
    LoginComponent,
    RegisterComponent, 
    ForgotPwdComponent,
    SidemenuComponent,
    ListOfferComponent,
    ListRequestsComponent,
    ListAmortizationComponent,
    SimilatorComponent,
    ContentComponent,
    FooterDashComponent,
    RequestLoanComponent,
    AddtionalinfoComponent,
    NotFoundComponent,
    AbonnementhomeComponent,
    ValidateProjectComponent,
    AddProjectComponent,
    DisplayProjectComponent,
    StatisticsComponent,
    CategoryAnalysisComponent,
    AverageInvestmentValueComponent,
    DTCurrencyPipe,
    HighestLowestInvestmentsComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],


  providers: [
              AuthServiceService,
              TokenStorageServiceService,
              OfferLoanService,
              RequestLoanService,
              AmortizationService,
              ProjectService,
            InvestmentService],


  bootstrap: [AppComponent]
})
export class AppModule { }
