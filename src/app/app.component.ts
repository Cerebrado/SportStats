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
  User: gapi.auth2.GoogleUser|null;
  constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {
  
  
}
  ngOnInit() {
    this.signInService.observable().subscribe((user) => {
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

  menuOption: number = 0;
  showNewMatchButton():boolean{
    if(!this.Model)
      return false;
    
    return this.menuOption == 0 
    && this.Model.Settings.PlayersList.length >= 4 && 
    this.Model.Settings.PlayEventsList.length > 0
  }
  public startNewGame() {
    this.menuOption = 1;
  }
  public statistics() {
    this.menuOption = 2;
  }
  public settings() {
    this.menuOption = 3;
  }

  public StatEntry: string = '';


  public btnSettingsConfirmClick(settings:Settings) {
    if(this.Model == null)
      return;
    this.Model.Settings = settings;
    this.SaveModel();
    this.menuOption = 0;
  }

  public newGameCreated(match:Match) {
    if(this.Model == null)
      return; 
    this.Model.History.push(this.Model.CurrentMatch);
    this.Model.CurrentMatch = match as Match;
    this.SaveModel();
    this.menuOption = 0;
  }

  public btnCancelClick() {
    this.menuOption = 0;
  }
}
