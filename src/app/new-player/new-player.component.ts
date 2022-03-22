import { Component} from '@angular/core';
import { Player } from '../Model/Player';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-player',
  templateUrl: './new-player.component.html',
})
export class NewPlayerComponent {

  Nick: string = '';
  Name: string = '' ;
  tournamentId:string;
  
  constructor(public activeModal: NgbActiveModal) {}
  
  btnSaveNewPlayerClick() {
    if(this.Nick == '' || this.Name == '')
    {
      alert("Nick and Name must be entered");
      return;
    }
    const player = new Player(this.tournamentId,this.Nick);
    this.activeModal.close(player);
  }

}
