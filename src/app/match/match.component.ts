import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatchService } from '../Model/match.service';
import { Match, Player, PlayEvent, Settings } from '../Model/model';
import { SettingsService } from '../Model/settings.service';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],

})
export class MatchComponent implements OnInit {

  PlayEventsByValue: Map<number, PlayEvent[]> = new Map<number, PlayEvent[]>();
  

  Match:Match;
  StatEntry: PlayerEvent = {Player: null, PlayEvent: null};

  constructor(
    private matchService: MatchService,
    private settingsService: SettingsService) {
      this.matchService.Match.subscribe((match) =>{
        this.Match = match;
      })
      this.settingsService.Settings.subscribe((settings) =>{
        settings.PlayEventsList.forEach(e => {
          if(! this.PlayEventsByValue.has(e.Value))
            this.PlayEventsByValue.set(e.Value, new Array<PlayEvent>());
          this.PlayEventsByValue.get(e.Value).push(e);
        });
        // //this returns objects, not the values --> this.EventValues = [...new Map(settings.PlayEventsList.map(item =>[item['Value'], item])).values()];
        // this.EventValues =  [...new Set(settings.PlayEventsList.map(obj => obj.Value)) ];
        // this.PlayEvents = settings.PlayEventsList.sort((x,y) => (x.Value > y.Value)? 1 : 0).slice(0);
      })
   }
  
  ngOnInit() {
        
  }

  clickPlayer(player:Player){
    alert(player.Nick);
  }

  clickEvent(event:PlayEvent){
    alert(event.Short);
  }

}


export interface PlayerEvent{
  Player:Player | null;
  PlayEvent: PlayEvent | null;
  
}
