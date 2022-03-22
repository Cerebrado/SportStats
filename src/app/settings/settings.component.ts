import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Sport } from '../Model/Sport';
import { Event } from '../Model/Event';
import { Tournament } from '../Model/Tournament';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NewSportComponent } from '../new-sport/new-sport.component';
import { NewEventComponent } from '../new-event/new-event.component';
import { InputBoxComponent } from '../input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import { DBService } from '../Model/DB.service';
import { Player } from '../Model/Player';
import { LEADING_TRIVIA_CHARS, renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

  sports: Sport[]=[];
  events: Event[] =[];
  tournaments: Tournament[]=[];
  players: Player[]=[];

  selectedSport: Sport | null
  selectedTournament: Tournament | null;

  newPlayer:string = '';
  
  constructor(private modalService: NgbModal, private DB: DBService) { }

  ngOnInit() {
    this.sports = this.DB.getSports();
    if(this.sports.length > 0)
      this.selectSport(this.sports[0]);
  }


  selectSport(sport:Sport){
    this.selectedSport = sport;
    if(sport != null){
      this.events = this.DB.getEvents(this.selectedSport.sportId);
      this.tournaments = this.DB.getTournaments(this.selectedSport.sportId);
      if(this.tournaments.length > 0) {
        this.selectTournament(this.tournaments[0]);
      } else{
        this.selectTournament(null);
      }
    } else {
      this.events = [];
      this.tournaments = [];
    }
  }

  selectTournament(tournament:Tournament | null){
    this.selectedTournament = tournament;
    if(tournament != null)  {
      this.players = this.DB.getPlayers(tournament.tournamentId);
    } else {
      this.players = [];
    }
  }


  addSport(){
    const modal = this.modalService.open(NewSportComponent);
    modal.result
      .then((result:Sport) => {
        this.sports = this.DB.addSport(result);
        this.selectSport(result);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }


  deleteSport(){
    if(this.selectedSport == null)
      return;
    
    if(confirm('You will delete the sport, tournaments, events,  players and statistics associated. Continue?'))
    {
      let idx = this.sports.findIndex(x=>x.sportId === this.selectedSport.sportId);
      this.sports = this.DB.removeSport(this.selectedSport);
      
      if(this.sports.length == 0 ) //removed the only one
        this.selectSport(null);
      else if (idx == this.sports.length ) //removed the last one
        this.selectSport(this.sports[idx-1]);
      else
        this.selectSport(this.sports[idx]); //removed any other
    }      
  }

  addEvent(){
    if(this.selectedSport == null)
      return;

    const modal = this.modalService.open(NewEventComponent)
    modal.componentInstance.sportId = this.selectedSport.sportId;

    modal.result
      .then((result:Event) => {
        this.events = this.DB.addEvent(result);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  deleteEvent(event: Event){
    if(this.selectedSport == null)
      return;
    if(confirm('You will delete events and statistics associated. Continue?'))
    {
        this.events = this.DB.removeEvent(event);
    }
  }


  addTournament(){
    if(this.selectedSport == null)
      return;
    const modal = this.modalService.open(InputBoxComponent)
    modal.componentInstance.sportId = this.selectedSport.sportId;
    modal.componentInstance.label = "Name";

    modal.result
      .then((result:string) => {
        let t = new Tournament(this.selectedSport.sportId, result);
        this.tournaments = this.DB.addTournament(t);
        this.selectTournament(t);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
    }

  deleteTournament(){
    if(this.selectTournament == null)
      return;
    if(confirm('You will delete the tournament, players and statistics associated. Continue?'))
    {
      let idx = this.tournaments.findIndex(x=>x.sportId === this.selectedSport.sportId);
      this.tournaments = this.DB.removeTournament(this.selectedTournament);
      
      if(this.tournaments.length == 0 ) //removed the only one
        this.selectTournament(null);
      else if (idx == this.tournaments.length ) //removed the last one
        this.selectTournament(this.tournaments[idx-1]);
      else
        this.selectTournament(this.tournaments[idx]); //removed any other
    }
  }

  addPlayer(){
    if(this.selectedTournament == null)
      return;

      if(this.newPlayer == '')
      return;
    
    if(this.players.some(x=>x.nick == this.newPlayer)){
        alert('Player ' + this.newPlayer + ' already exists')
        this.newPlayer = ''
        return;
    }
    let player = new Player(this.selectedTournament.tournamentId, this.newPlayer);
    this.DB.addPlayer(player);
    this.players.push(player);   
    this.newPlayer = ''
  }

  deletePlayer(player:Player){
    if(confirm('You will delete the player and statistics associated. Continue?'))
    {
      this.players = this.DB.removePlayer(player);
    }
  }
}
