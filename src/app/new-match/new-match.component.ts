import { Component, EventEmitter, Input, Output, VERSION } from '@angular/core';
import { Match, Player, Settings } from '../Model';

@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {
  Match: Match;
  @Input() Settings: Settings;
  @Output() onNewMatchCreated: EventEmitter<Match> = new EventEmitter<Match>();
  @Output() onbtnCancelClick: EventEmitter<any> = new EventEmitter<any>();

  _selectedPlayers: Player[];

  ngOnInit() {
    this.Match = new Match();

    this._selectedPlayers = [
      this.Match.Teams[0].Players[0],
      this.Match.Teams[0].Players[1],
      this.Match.Teams[1].Players[0],
      this.Match.Teams[1].Players[1],
    ];
  }

  AddPlayer(i: number) {
    for (let j = 0; j < 4; j++) {
      if (
        this._selectedPlayers[j] !== null &&
        this._selectedPlayers[j].Nick == this.Settings.PlayersList[i].Nick &&
        this._selectedPlayers[j].Name == this.Settings.PlayersList[i].Name
      ) {
        alert(this.Settings.PlayersList[i].Nick + ' is already playing');
        return;
      }
      if (this._selectedPlayers[j] === null) {
        this._selectedPlayers[j] = this.Settings.PlayersList[i];
        return;
      }
    }
  }
  RemovePlayer(i: number) {
    this._selectedPlayers[i] = null;
  }

  btnConfirmNewMatchClick() {
    for (let i = 0; i < 4; i++) {
      if (this._selectedPlayers[i] === null) {
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

    this.onNewMatchCreated.emit(match);
  }

  btnCancelClick() {
    this.onbtnCancelClick.emit();
  }
}
