import { Component} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../Model/match.service';
import { Match, Player, Settings } from '../Model/model';
import { SettingsService } from '../Model/settings.service';

@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {

  selectedPlayers: (Player | null)[] = [null, null, null, null];
 
  Match:Match;
  Settings: Settings;

  constructor(
    public activeModal: NgbActiveModal,
    private matchService: MatchService,
    private settingsService: SettingsService) 
  {
      this.matchService.Match.subscribe((match) =>{
        this.Match = match;
      })  
      this.settingsService.Settings.subscribe((settings) =>{
        this.Settings = settings;
      })  
   }
  
  ngOnInit() {
    if(this.Match != null){
      this.selectedPlayers = [
        this.Match.Teams[0].Players[0],
        this.Match.Teams[0].Players[1],
        this.Match.Teams[1].Players[0],
        this.Match.Teams[1].Players[1],
      ];
    }
  }

  AddPlayer(i: number) {
    for (let j = 0; j < 4; j++) {
      if (
        this.selectedPlayers[j] !== null &&
        this.selectedPlayers[j].Nick == this.Settings.PlayersList[i].Nick &&
        this.selectedPlayers[j].Name == this.Settings.PlayersList[i].Name
      ) {
        alert(this.Settings.PlayersList[i].Nick + ' is already playing');
        return;
      }
      if (this.selectedPlayers[j] === null) {
        this.selectedPlayers[j] = this.Settings.PlayersList[i];
        return;
      }
    }
  }
  
  RemovePlayer(i: number) {
    this.selectedPlayers[i] = null;
  }

  btnConfirmNewMatchClick() {
    for (let i = 0; i < 4; i++) {
      if (this.selectedPlayers[i] === null) {
        alert('There must be 4 people to play. Get some friends');
        return;
      }
    }

    var match = new Match();
    match.Teams[0].Players.push(this.selectedPlayers[0])
    match.Teams[0].Players.push(this.selectedPlayers[1]);
    match.Teams[1].Players.push(this.selectedPlayers[2]);
    match.Teams[1].Players.push(this.selectedPlayers[3]);
    
    this.matchService.new(match);
    this.activeModal.close(match);
  }
}
