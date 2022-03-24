import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DBService } from '../Model/DB.service';
import { Match, PlayerEventPosition } from '../Model/Match';
import { MatchService } from '../Model/Match.service';
import { Player } from '../Model/Player';
import { Event } from '../Model/Event';
import { NewMatchComponent } from '../new-match/new-match.component';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],

})
export class MatchComponent implements OnInit {

  events: Event[] = [];
  players: Player[] = [];

  Match: Match;
  StatEntries: PlayerEventPosition[] = [];
  lastEnteredIsPlayer: boolean = false;
  
  constructor(
    private modalService: NgbModal,
    private DB: DBService,
    private matchSvc: MatchService) {
   }
  
  PlayEventsByValue: Map<number, Event[]> = new Map<number, Event[]>();
  ngOnInit() {
    this.matchSvc.current.subscribe(match => {
      this.Match = match;
      this.DB.getEvents(this.Match.sportId)
      .sort((a,b) => a.value < b.value? 1: 0).forEach(e => {
        if(! this.PlayEventsByValue.has(e.value))
          this.PlayEventsByValue.set(e.value, new Array<Event>());
        this.PlayEventsByValue.get(e.value).push(e);
      });
      this.players = this.Match.players;
    });

  }

  clickPlayer(player:Player){
    if(this.StatEntries.length == 0 || this.StatEntries[this.StatEntries.length -1].event != null)
      this.StatEntries.push({player: player, event: null});
    else
      this.StatEntries[this.StatEntries.length -1].player = player;
  }

  clickEvent(event:Event){
    if(this.StatEntries.length == 0)
      return;
    this.StatEntries[this.StatEntries.length -1].event = event;
  }

  btnUndoClick(){
    if(this.StatEntries.length == 0)
      return;
    if(this.StatEntries[this.StatEntries.length -1].event != null)
      this.StatEntries[this.StatEntries.length -1].event = null;
    else
      this.StatEntries.splice(this.StatEntries.length -1);
  }
  
  btnConfirmClick(){
    this.matchSvc.addEvents(this.StatEntries);
    this.StatEntries = [];
  }

  asIsOrder(a:any, b:any) {
    return 1;
 }

 btnNewMatch() {
  const modal = this.modalService.open(NewMatchComponent, {size:'xl'})
  modal.result
    .then(
        (result:Match) => {if(result) this.matchSvc.setNewMatch(result)})
    .catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
    );
  }

}