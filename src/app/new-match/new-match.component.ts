import { Component} from '@angular/core';
import { Match, Model, ModelService, Player, Settings } from '../Model/modelService';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {

  _selectedPlayers: Player[];
 
  Model:Model;

  constructor(
    public activeModal: NgbActiveModal,
    private modelService: ModelService) 
  {
      this.modelService.Model.subscribe((model) =>{
        this.Model = model;
      })  
  }
  
  ngOnInit() {

    this._selectedPlayers = [
      this.Model.CurrentMatch.Teams[0].Players[0],
      this.Model.CurrentMatch.Teams[0].Players[1],
      this.Model.CurrentMatch.Teams[1].Players[0],
      this.Model.CurrentMatch.Teams[1].Players[1],
    ];
  }

  AddPlayer(i: number) {
    for (let j = 0; j < 4; j++) {
      if (
        this._selectedPlayers[j] !== null &&
        this._selectedPlayers[j].Nick == this.Model.Settings.PlayersList[i].Nick &&
        this._selectedPlayers[j].Name == this.Model.Settings.PlayersList[i].Name
      ) {
        alert(this.Model.Settings.PlayersList[i].Nick + ' is already playing');
        return;
      }
      if (this._selectedPlayers[j] === null) {
        this._selectedPlayers[j] = this.Model.Settings.PlayersList[i];
        return;
      }
    }
  }
  
  RemovePlayer(i: number) {
    this._selectedPlayers[i].Nick = '';
    this._selectedPlayers[i].Name = '';
  }

  btnConfirmNewMatchClick() {
    for (let i = 0; i < 4; i++) {
      if (this._selectedPlayers[i].Nick === '') {
        alert('There must be 4 people to play. Get some friends');
        return;
      }
    }

    var match = new Match();
    match.Teams[0].Players.push(
      new Player(this._selectedPlayers[0].Nick, this._selectedPlayers[0].Name)
    );
    match.Teams[0].Players.push(
      new Player(this._selectedPlayers[1].Nick, this._selectedPlayers[1].Name)
    );
    match.Teams[1].Players.push(
      new Player(this._selectedPlayers[2].Nick, this._selectedPlayers[2].Name)
    );
    match.Teams[1].Players.push(
      new Player(this._selectedPlayers[3].Nick, this._selectedPlayers[3].Name)
    );
    
    this.modelService.SetNewMatch(match);
    this.activeModal.close(match);
  }
}
