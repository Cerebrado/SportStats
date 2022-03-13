import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { GoogleSigninService } from 'src/app/Model/google-signin.service';
import { MatchService } from './Model/match.service';
import { Match } from './Model/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMatchComponent } from './new-match/new-match.component';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GoogleSigninService]
})
export class AppComponent  implements OnInit{
  User : gapi.auth2.GoogleUser;
 
  constructor(
    private signInService: GoogleSigninService, 
    private matchService: MatchService,
    private modalService: NgbModal, 
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

  btnSaveMatch() {
    this.matchService.saveAndclose();

    const modal = this.modalService.open(NewMatchComponent)
    modal.result
      .then(
          (result:Match) => {if(result) this.matchService.new(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnCancelCurrentMatch(){
    if(confirm('You are going to cancel this match. Confirm?'))
      this.matchService.cancel();
  }
  
}
