import { Component} from '@angular/core';
import { GoogleSigninService } from 'src/app/Model/google-signin.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  _user : gapi.auth2.GoogleUser;
  get User(): gapi.auth2.GoogleUser{
    return this._user;
  }
  
  constructor(
    private signInService: GoogleSigninService, 
    ) {
      this.signInService.User().subscribe((user) => {
        this._user = user;
     });
 
  }
  
  menuOption: number = 1;


  SignIn(){
    this.signInService.signIn();
  }

  SignOut(){
    this.signInService.signOut();
  }


  setMenuOption(menuOption: number){
    this.menuOption = menuOption;
  }
}
