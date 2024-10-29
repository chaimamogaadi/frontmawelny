import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {

  userConnected: any;
  decodedJwtData: any;
  constructor(private authService: AuthServiceService) {
    this.userConnected = localStorage.getItem('jwt');
    if (this.userConnected) {
      let jwt = this.userConnected;
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      this.decodedJwtData = JSON.parse(decodedJwtJsonData);
      console.log('user ::::::::', this.decodedJwtData.sub);
    }
  }
  
}
