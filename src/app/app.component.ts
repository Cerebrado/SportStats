import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { GoogleSigninService } from 'src/app/Model/google-signin.service';
import { MatchService } from './Model/match.service';
import { Match } from './Model/model';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GoogleSigninService]
})
export class AppComponent  implements OnInit{
  User : gapi.auth2.GoogleUser;
  // get User(): gapi.auth2.GoogleUser{
  //   return this._user;
  // }

  constructor(
    private signInService: GoogleSigninService, 
    private matchService: MatchService,
    private cdRef:ChangeDetectorRef) {
      console.log('Constructing AppComponent')
      this.signInService.User.subscribe((user) => {
        this.User = user;
     });
     this.matchService.Match.subscribe((match) =>{
      this.Match = match;
    });
  }

  Match: Match;

  menuOption: number = 1;

  
  ngOnInit(): void {
    // console.log('Executing AppComponent.ngOnInit')    
    // this.SignIn();
  }

  SignIn(){
    this.signInService.signIn();
    this.cdRef.detectChanges();
  }

  SignOut(){
    this.signInService.signOut();
    this.cdRef.detectChanges();
  }


  setMenuOption(menuOption: number){
    this.menuOption = menuOption;
  }
}
