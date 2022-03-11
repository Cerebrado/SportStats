import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Model, ModelService, Player, PlayEvent } from '../Model/modelService';
import { NewPlayerComponent } from '../new-player/new-player.component';
import { NewPlayeventComponent } from '../new-playevent/new-playevent.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent{

  constructor(
    private modalService: NgbModal, 
    private modelService: ModelService) 
  {
      this.modelService.Model.subscribe((model) =>{
        this.Model = model;
      })  
  }

  Model:Model;
    
  btnShowNewPlayerFormClick() {
    const modal = this.modalService.open(NewPlayerComponent)
    modal.result
      .then(
          (result:Player) => {if(result) this.modelService.AddSettingsPlayer(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnShowNewEventFormClick(){
    const modal = this.modalService.open(NewPlayeventComponent)
    modal.result
      .then(
          (result:PlayEvent) => {if(result) this.modelService.AddSettingsEvent(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );

  }
}
