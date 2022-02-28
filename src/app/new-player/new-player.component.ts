import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from '../Model';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'new-player',
  templateUrl: './new-player.component.html',
})
export class NewPlayerComponent implements OnInit {
  
  @Output() onBtnCancelClick: EventEmitter<null> = new EventEmitter<null>();
  @Output() onBtnConfirmClick: EventEmitter<Player> =
    new EventEmitter<Player>();

  Nick: string;
  Name: string;
  
  constructor(private modalService: NgbModal) {}
  ngOnInit() {}
  btnSaveNewPlayerClick() {
    var player = new Player(this.Nick, this.Name);
    this.onBtnConfirmClick.emit(player)
  }

  btnCancelClick(){
    this.onBtnCancelClick.emit();
  }
}
