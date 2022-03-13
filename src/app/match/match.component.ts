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
  
  Match: Match;
  StatEntries: PlayerEvent[] = [];
  lastEnteredIsPlayer: boolean = false;
  JSON = JSON;
  constructor(
    private matchService: MatchService,
    private settingsService: SettingsService) {
       this.matchService.Match.subscribe((match) =>{
         this.Match = match;
       })
      this.settingsService.Settings.subscribe((settings) =>{
        settings.PlayEventsList.sort((a,b) => a.Value < b.Value? 1: 0).forEach(e => {
          if(! this.PlayEventsByValue.has(e.Value))
            this.PlayEventsByValue.set(e.Value, new Array<PlayEvent>());
          this.PlayEventsByValue.get(e.Value).push(e);
        });
      })
   }
  
  ngOnInit() {
        
  }

  clickPlayer(player:Player){
    if(this.StatEntries.length == 0 || this.StatEntries[this.StatEntries.length -1].PlayEvent != null)
      this.StatEntries.push({Player: player, PlayEvent: null});
    else
      this.StatEntries[this.StatEntries.length -1].Player = player;
    
  }

  clickEvent(event:PlayEvent){
    
    if(this.StatEntries.length == 0)
      return;
    this.StatEntries[this.StatEntries.length -1].PlayEvent = event;
  }

  btnUndoClick(){
    if(this.StatEntries.length == 0)
      return;
    if(this.StatEntries[this.StatEntries.length -1].PlayEvent != null)
      this.StatEntries[this.StatEntries.length -1].PlayEvent = null;
    else
      this.StatEntries.splice(this.StatEntries.length -1);
  }
  
  btnConfirmClick(){
    this.StatEntries.forEach(playerEvent => {
      playerEvent.Player.Stats.push(playerEvent.PlayEvent);
    });  
    this.matchService.save();
    this.StatEntries = [];
  }

  asIsOrder(a:any, b:any) {
    return 1;
 }
}


export interface PlayerEvent{
  Player:Player;
  PlayEvent: PlayEvent | null;
  
}
