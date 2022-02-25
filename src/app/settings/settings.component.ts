import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player, PlayEvent, Settings } from '../Model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  @Output() onBtnCancelClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() onBtnConfirmClick: EventEmitter<Settings> =
    new EventEmitter<Settings>();
  
    PlayEventsList: PlayEvent[];
    PlayersList: Player[];
    constructor() {}

  ngOnInit() {
    // this.paddleStats = JSON.parse(localStorage.getItem('3TStats'));
    // // this.paddleStats.playersList = [
    // //   new Player('Edu', 'Eduardo'),
    // //   new Player('Diego', 'Diego P'),
    // //   new Player('Javi', 'Javi N'),
    // //   new Player('Juan', 'Juan N'),
    // //   new Player('KKK', 'Eduardo'),
    // //   new Player('CCC', 'Diego P'),
    // //   new Player('LLL', 'Javi N'),
    // //   new Player('XXX', 'Juan N'),
    // // ];
  }

  showNewPlayerForm: boolean = false;
  showNewEventForm: boolean = false;
  
  btnShowNewPlayerFormClick() {
    this.showNewPlayerForm = true;
  }
  btnAddNewPlayerClick(){

  }
  btnCancelNewPlayerClick(){
    this.showNewPlayerForm = false;
  }

  btnShowNewEventFormClick() {
    this.showNewEventForm = true;
  }
    
  btnAddNewEventClick (){}
  btnCancelNewEventClick (){
    this.showNewEventForm = true;
  }

  btnCancelClick() {
    this.onBtnCancelClick.emit(null);
  }

  btnConfirmClick() {
    let settings = new Settings();    
    this.onBtnConfirmClick.emit(settings);
  }
}
