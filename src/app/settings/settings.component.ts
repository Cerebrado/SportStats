import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Event, Settings, Sport} from '../Model/model';
import { SettingsService } from '../Model/settings.service';
import { NewEventComponent } from '../new-event/new-event.component';
import { NewSportComponent } from '../new-sport/new-sport.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent{
  settings:Settings;
  selectedSport: Sport | null;
  events: Event[];

  constructor(
    private modalService: NgbModal, 
    private settingsService: SettingsService) 
    {
      this.settings = this.settingsService.get();
    } 
  

  onSportChanged(newSport :Sport) {
    this.selectedSport = newSport;
  }
  

  btnShowNewEventFormClick(){
    const modal = this.modalService.open(NewEventComponent)
    modal.result
      .then((result:Event) => {
        if(result) this.selectedSport.Events.push(
          new Event(result.Short, result.Long, result.Value))
      })
      .catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnShowNewSportFormClick(){
    const modal = this.modalService.open(NewSportComponent)
    modal.result
      .then((result:Sport) => {
        if(result) 
          this.settings.Sports.push(result)
      })
      .catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }
  save(){
    this.settingsService.save(this.settings);
  }
}
