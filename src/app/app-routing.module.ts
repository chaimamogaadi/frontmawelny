import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


//-------------------wissal---------------------------------------
import { SidemenuComponent } from './dashboard/sidemenu/sidemenu.component';

import { SimilatorComponent } from './similator/similator.component';
import { ListOfferComponent } from './dashboard/list-offer/list-offer.component';
import { ListRequestsComponent } from './dashboard/list-requests/list-requests.component';
import { ListAmortizationComponent } from './dashboard/list-amortization/list-amortization.component';
import { ContentComponent } from './dashboard/content/content.component';

import { RequestLoanComponent } from './shared/request-loan/request-loan.component';
import { AddtionalinfoComponent } from './shared/addtionalinfo/addtionalinfo.component';
import { NotFoundComponent } from './not-found/not-found.component';


//-------------------wassim---------------------------------------

import { RegisterComponent } from './register/register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { NavbarconnectedComponent } from './shared/navbarconnected/navbarconnected.component';
import { HomeComponent } from './shared/home/home.component';

//-------------------chaima---------------------------------------
import { DisplayProjectComponent } from './Project/display-project/display-project.component';
import { ValidateProjectComponent } from './Project/validate-project/validate-project.component';
import { AddProjectComponent } from './Project/add-project/add-project.component';
import { AbonnementhomeComponent } from './abonnementhome/abonnementhome.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'navcon', component: NavbarconnectedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgotPwdComponent },

  // ------------------------------------------paths hedi-------------------------------------

  // { path :'', component: },
  { path: 'offer/:idOffer', component: SimilatorComponent},
  { path: 'content', component: ContentComponent },
  { path: 'request/:id', component: RequestLoanComponent },
  { path: 'info', component: AddtionalinfoComponent },


  // -----------------------------------------back ------------------------------------
  { path: 'content', component: ContentComponent },
  { path: 'side', component: SidemenuComponent},
  { path: 'listoffer',component:ListOfferComponent},
  { path: 'listAmort',component:ListAmortizationComponent},
  { path: 'listrequests',component:ListRequestsComponent},


  { path: 'listProject', component: DisplayProjectComponent },
  { path: 'validateProject', component: ValidateProjectComponent },
  { path: 'AddProject', component: AddProjectComponent },
  { path: 'projectList', component: AbonnementhomeComponent },

  
 
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
