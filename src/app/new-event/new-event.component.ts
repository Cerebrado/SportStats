import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  Event } from '../Model/model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-playevent',
  templateUrl: './new-event.component.html',
})
export class NewEventComponent {

  constructor(public activeModal: NgbActiveModal) {}

  Short: string = '';
  Long: string = '';
  Value: number= 0;

  btnSaveNewEventClick() {
    if(this.Short == '' )
    {
      alert("Short and Long must be entered");
      return;
    }
    const playEvent = new Event(this.Short, this.Long, this.Value);
    this.activeModal.close(playEvent);
  }

}
