import { Component, } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Sport } from '../Model/Sport';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-playsport',
  templateUrl: './new-sport.component.html',
})
export class NewSportComponent {

  constructor(public activeModal: NgbActiveModal) {}

  Name: string = '';
  PlayersPerTeam: number = 1;

  btnSaveNewSportClick() {
    if(this.Name == '' )
    {
      alert("Name must be entered");
      return;
    }

    if(this.PlayersPerTeam < 1)
    {
      alert('No players per team? Come on! They could be useless but they still can play!')
      return;
    }

    if(this.PlayersPerTeam > 15)
    {
      alert('15 people! This software is not intended to be used to track orgies. Yet.')
      return;
    }

    const playSport = new Sport(this.Name);
    this.activeModal.close(playSport);
  }
}
