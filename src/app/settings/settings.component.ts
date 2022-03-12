import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings, Player, PlayEvent } from '../Model/model';
import { SettingsService } from '../Model/settings.service';
import { NewPlayerComponent } from '../new-player/new-player.component';
import { NewPlayeventComponent } from '../new-playevent/new-playevent.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent{

  constructor(
    private modalService: NgbModal, 
    private settingsService: SettingsService) 
  {
      this.settingsService.Settings.subscribe((settings) =>{
        this.Settings = settings;
      })  
  }

  Settings:Settings;
    
  btnShowNewPlayerFormClick() {
    const modal = this.modalService.open(NewPlayerComponent)
    modal.result
      .then(
          (result:Player) => {if(result) this.settingsService.addPlayer(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnShowNewEventFormClick(){
    const modal = this.modalService.open(NewPlayeventComponent)
    modal.result
      .then(
          (result:PlayEvent) => {if(result) this.settingsService.addEvent(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }
}
