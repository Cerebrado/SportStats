import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  PlayEvent } from '../Model/modelService';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-playevent',
  templateUrl: './new-playevent.component.html',
})
export class NewPlayeventComponent {

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
    const playEvent = new PlayEvent(this.Short, this.Long, this.Value);
    this.activeModal.close(playEvent);
  }

}
