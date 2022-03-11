import { ChangeDetectorRef, Component, Input, OnInit, Output, VERSION } from '@angular/core';
import { GoogleSigninService } from 'src/app/Model/google-signin.service';
import { ModelService } from 'src/app/Model/modelService';
import { Model } from './Model/modelService';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  User: gapi.auth2.GoogleUser|null;
  
  constructor(
    private signInService: GoogleSigninService, 
    private ref: ChangeDetectorRef
    ) {
      this.signInService.User.subscribe((user) => {
        this.User = user;
     });
 
  }
  
  menuOption: number = 1;

  ngOnInit() {
    //this.ref.detectChanges();
  }

  SignIn(){
    this.signInService.signIn();
  }

  SignOut(){
    this.signInService.signOut();
  }


  setMenuOption(menuOption: number){
    this.menuOption = menuOption;
    this.ref.detectChanges();
  }
}
