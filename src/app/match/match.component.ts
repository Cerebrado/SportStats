import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../Model/match.service';
import { Match, Settings } from '../Model/model';
import { SettingsService } from '../Model/settings.service';
import { NewMatchComponent } from '../new-match/new-match.component';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {
  
  constructor(
    private modalService: NgbModal, 
    private matchService: MatchService,
    private settingsService: SettingsService,
    )  {
      this.matchService.Match.subscribe((match) =>{
        this.Match = match;
      })
      this.settingsService.Settings.subscribe((settings) =>{
        this.Settings = settings;
      })
   }
  
  Match:Match;
  Settings: Settings;
  
  ngOnInit() {
    //this.ref.detectChanges();
  }

  StatEntry: string [] = [];

  btnShowNewMatchForm() {
    const modal = this.modalService.open(NewMatchComponent)
    modal.result
      .then(
          (result:Match) => {if(result) this.matchService.new(result)})
      .catch(
          (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  btnCancelCurrentMatch(){
    if(confirm('You are going to cancel this match. Confirm?'))
      this.matchService.cancel();
  }


}
