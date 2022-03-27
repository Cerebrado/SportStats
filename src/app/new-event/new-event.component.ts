import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  Event } from '../Model/Event';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-playevent',
  templateUrl: './new-event.component.html',
})
export class NewEventComponent {

  constructor(public activeModal: NgbActiveModal) {}

  Short: string = '';
  Long: string = '';
  Value: string = "0";
  sportId:string;

  btnSaveNewEventClick() {
    if(this.Short == '' )
    {
      alert("Short must be entered");
      return;
    }
    const playEvent = new Event(this.sportId, this.Short, this.Long, this.Value);
    this.activeModal.close(playEvent);
  }

}
