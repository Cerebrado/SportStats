import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Settings } from '../Model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  @Input() Settings: Settings;
  @Output() onBtnCancelClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() onBtnConfirmClick: EventEmitter<Settings> =
    new EventEmitter<Settings>();
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
  btnAddPlayerClick() {}
  btnAddEventClick (){}
  btnCancelClick() {
    this.onBtnCancelClick.emit(null);
  }

  btnConfirmClick() {
    this.onBtnConfirmClick.emit(this.Settings);
  }
}
