import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Match } from '../Model/modelService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Model, ModelService, Player, PlayEvent, Settings } from '../Model/modelService';
import { NewMatchComponent } from '../new-match/new-match.component';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {
  
  constructor(
    private modalService: NgbModal, 
    private modelService: ModelService,
    private ref: ChangeDetectorRef)  {
      this.modelService.Model.subscribe((model) =>{
        this.Model = model;
      })
   }
  
  Model:Model;
  
  ngOnInit() {
    this.ref.detectChanges();
  }

  StatEntry: string = '';

  btnShowNewMatchForm() {
    const modal = this.modalService.open(NewMatchComponent)
    modal.result
      .then(
          (result:Match) => {if(result) this.modelService.SetNewMatch(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnCancelCurrentMatch(){
    if(confirm('You are going to cancel this match. Confirm?'))
      this.modelService.CancelCurrentMatch();
  }


}
