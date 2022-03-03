import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player, PlayEvent, Settings } from '../Model';
import { NewPlayerComponent } from '../new-player/new-player.component';

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
    constructor(private modalService: NgbModal) {}

    ngOnInit() {
      this.PlayersList = new Array<Player>();
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

  
  btnShowNewPlayerFormClick() {
    const modal = this.modalService.open(NewPlayerComponent)
    modal.result
      .then(
          (result:Player) => {if(result) this.PlayersList.push(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnShowNewEventFormClick(){}

    
  btnCancelClick() {
    this.onBtnCancelClick.emit(null);
  }

  btnConfirmClick() {
    let settings = new Settings();    
    this.onBtnConfirmClick.emit(settings);
  }
}
