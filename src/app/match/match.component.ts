import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatchService } from '../Model/match.service';
import { Match, PlayEvent, Settings } from '../Model/model';
import { SettingsService } from '../Model/settings.service';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],

})
export class MatchComponent implements OnInit {
  
  constructor(
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
    //this.ref.detectChanges()
    ;
  }

  clickEvent(ev:PlayEvent){
    alert(ev.Short);
  }
  StatEntry: string [] = [];
}
