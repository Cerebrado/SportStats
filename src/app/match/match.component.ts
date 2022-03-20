import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../Model/Match';
import { Match, Player, Event, Settings } from '../Model/model';
import { SettingsService } from '../Model/settings.service';
import { TournamentService } from '../Model/tournament.service';
import { NewMatchComponent } from '../new-match/new-match.component';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],

})
export class MatchComponent implements OnInit {

  PlayEventsByValue: Map<number, Event[]> = new Map<number, Event[]>();
  Match: Match;
  StatEntries: PlayerEvent[] = [];
  lastEnteredIsPlayer: boolean = false;
  
  constructor(
    private modalService: NgbModal,
    private tournamentService: TournamentService) {

      this.settingsService.Settings.subscribe((settings) =>{
        settings.PlayEventsList.sort((a,b) => a.Value < b.Value? 1: 0).forEach(e => {
          if(! this.PlayEventsByValue.has(e.Value))
            this.PlayEventsByValue.set(e.Value, new Array<Event>());
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

  clickEvent(event:Event){
    
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
      playerEvent.Player.Events.push(playerEvent.PlayEvent);
    });  
    this.matchService.save();
    this.StatEntries = [];
  }

  asIsOrder(a:any, b:any) {
    return 1;
 }

 btnShowNewMatchForm() {
  const modal = this.modalService.open(NewMatchComponent)
  modal.result
    .then(
        (result:Match) => {if(result) this.matchService.new(result)})
    .catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
    );
  }

}


export interface PlayerEvent{
  Player:Player;
  PlayEvent: Event | null;
  
}
