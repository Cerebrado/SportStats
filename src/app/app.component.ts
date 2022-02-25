import { ChangeDetectorRef, Component, Input, Output, VERSION } from '@angular/core';
import { GoogleSigninService } from 'src/google-signin.service';
import { Match, Settings,  Model } from './Model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Model: Model | null = new Model();
  public StatEntry: string = '';
  User: gapi.auth2.GoogleUser|null;
  constructor(private signInService: GoogleSigninService,  private ref: ChangeDetectorRef
    ) {}
  
  ngOnInit() {
    this.menuOption = 0;
     this.signInService.User.subscribe((user) => {
       this.User = user;
       this.ref.detectChanges();
    })

    this.LoadModel();
  }

  SignIn(){
    this.signInService.signIn();
  }

  SignOut(){
    this.signInService.signOut();
  }

  SaveModel() {
    localStorage.setItem('3TStats', JSON.stringify(this.Model));
  }

  LoadModel() {
    var storageData = localStorage.getItem('3TStats');
    if (storageData) {
      this.Model = JSON.parse(storageData);
    }
  }

  menuOption: number;
  showNewMatchButton():boolean{
    if(!this.Model)
      return false;
    
    return this.menuOption == 0 
    && this.Model.Settings.PlayersList.length >= 4 && 
    this.Model.Settings.PlayEventsList.length > 0
  }
  public startNewGame() {
    this.setMenuOption(1);
  }
  public statistics() {
    this.setMenuOption(2)
  }
  public settings() {
    this.setMenuOption(3)
    
  }

setMenuOption(menuOption: number){
  this.menuOption = menuOption;
  this.ref.detectChanges();

}


  public btnSettingsConfirmClick(settings:Settings) {
    if(this.Model == null)
      return;
    this.Model.Settings = settings;
    this.SaveModel();
    this.setMenuOption(0);
  }

  public newGameCreated(match:Match) {
    if(this.Model == null)
      return; 
    this.Model.History.push(this.Model.CurrentMatch);
    this.Model.CurrentMatch = match as Match;
    this.SaveModel();
    this.setMenuOption(0);
  }

  public btnCancelClick() {
    this.setMenuOption(0);
  }
}
