import { ChangeDetectionStrategy,Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DBService } from '../Model/DB.service';
import { Match, PlayerEventPosition } from '../Model/Match';
import { MatchService } from '../Model/Match.service';
import { Player } from '../Model/Player';
import { Event } from '../Model/Event';
import { NewMatchComponent } from '../new-match/new-match.component';
import { FilterByNumberPipe } from '../Model/Helper';


@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchComponent  {
  events: Event[] = [];
  players: Player[] = [];

  StatEntries: PlayerEventPosition[] = [];
  lastEnteredIsPlayer: boolean = false;
  PlayEventsByValue: Map<string, Event[]> = new Map<string, Event[]>();
  Match: Match;

  constructor(
    private modalService: NgbModal,
    private DB: DBService,
    private matchSvc: MatchService) {
   }
  
  
  @Input() set CurrentMatch(value: Match) {
    this.Match = value;
    this.initMatch();
  }

  initMatch(){
    if(this.Match == null){
      this.events = [];
      this.players = []
      return;
    }
      
    this.events = this.DB.getEvents(this.Match.sportId);

    this.events.sort((a,b) => a.value < b.value? 1: -1).forEach(e => {
        if(! this.PlayEventsByValue.has(e.value))
          this.PlayEventsByValue.set(e.value, new Array<Event>());
        this.PlayEventsByValue.get(e.value).push(e);
    });
    this.players = this.Match.players;

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
    this.Match.addEvents(this.StatEntries);
    this.matchSvc.saveCurrent();
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

  calculateplayerClass(i:number){
    return 'btn w-100 my-1 ' +
           (i < (this.players.length / 2) ? 'btn-info' : 'btn-success') + ' ' +
           (this.players.length < 5 ? 'p-4' : (this.players.length < 11? 'p-3' : 'p-2')) 
           // + ' ' + (this.players.length < 5 ? 'mt-3' : 'mt-2') 
  }

  eventsPerRow: number = 4

  numberOfRowsPerEventType(events: Event[]): number {
    if(events.length <= this.eventsPerRow){
      return 1;
    }

    const rest = events.length % this.eventsPerRow;
    console.log(((events.length - rest) / this.eventsPerRow) + (rest == 0? 0: 1));
    return ((events.length - rest) / this.eventsPerRow) + (rest == 0? 0: 1);
  }

  calculateEventClass(eventType: string):string{
    let result:string  = '';
    if(eventType == "-1"){
      result = 'btn-danger'
    }else if (eventType == "0") {
      result = 'btn-warning';
    } else {
      result = 'btn-primary'; 
    }

    if(this.PlayEventsByValue.get(eventType).length < 4)
      result = result + ' p-4';
    else  
      result = result + ' p-3';

    return result;
  } 

}

