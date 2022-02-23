import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from '../Model';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.css'],
})
export class NewPlayerComponent implements OnInit {
  
  @Output() onBtnCancelClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() onBtnConfirmClick: EventEmitter<Player> =
    new EventEmitter<Player>();

  Nick: string;
  Name: string;
  Player: Player
  constructor() {}

  ngOnInit() {}
  btnSaveNewPlayerClick() {
    this.Player = new Player(this.Nick, this.Name);
    this.onBtnConfirmClick.emit(this.Player)
  }

  btnCancelClick(){
    this.onBtnCancelClick.emit();
  }
}
