import { Component, } from '@angular/core';
import {  Sport } from '../Model/model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-playsport',
  templateUrl: './new-sport.component.html',
})
export class NewSportComponent {

  constructor(public activeModal: NgbActiveModal) {}

  Name: string = '';

  btnSaveNewSportClick() {
    if(this.Name == '' )
    {
      alert("Name must be entered");
      return;
    }
    const playSport = new Sport(this.Name);
    this.activeModal.close(playSport);
  }
}
