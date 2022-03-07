import { Component} from '@angular/core';
import { Player } from '../Model';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-player',
  templateUrl: './new-player.component.html',
})
export class NewPlayerComponent {

  Nick: string = '';
  Name: string = '' ;
  
  constructor(public activeModal: NgbActiveModal) {}
  
  btnSaveNewPlayerClick() {
    if(this.Nick == '' || this.Name == '')
    {
      alert("Nick and Name must be entered");
      return;
    }
    const player = new Player(this.Nick, this.Name);
    this.activeModal.close(player);
  }

}
