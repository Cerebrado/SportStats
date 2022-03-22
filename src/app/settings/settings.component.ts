import { Component, OnInit } from '@angular/core';
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
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

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
  
  constructor(private modalService: NgbModal, private DB: DBService) { }

  ngOnInit() {
    this.sports = this.DB.getSports();
    if(this.sports.length > 0)
      this.selectSport(this.sports[0]);
  }

  selectSport(sport:Sport){
    this.selectedSport = sport;
    this.events = this.DB.getEvents(this.selectedSport.sportId);
    this.tournaments = this.DB.getTournaments(this.selectedSport.sportId);
    if(this.tournaments.length > 0)
      this.selectTournament(this.tournaments[0]);
  }

  selectTournament(tournament:Tournament){
    this.selectedTournament = tournament;
  }


  addSport(){
    const modal = this.modalService.open(NewSportComponent);
    modal.result
      .then((result:Sport) => {
        this.DB.addSport(result);
        this.selectedSport = result;
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }


  deleteSport(){
    if(this.selectedSport == null)
      return;
    
    if(confirm('You will delete the sport, tournaments, events,  players and statistics associated. Continue?'))
    {
        this.DB.removeSport(this.selectedSport.sportId);
        this.selectSport = null;
    }      
  }

  addEvent(){
    if(this.selectedSport == null)
      return;
    const modal = this.modalService.open(NewEventComponent)
    modal.componentInstance.sportId = this.selectedSport.sportId;

    modal.result
      .then((result:Event) => {
        this.DB.addEvent(result);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  deleteEvent(eventId: string){
    if(this.selectedSport == null)
      return;
    if(confirm('You will delete events and statistics associated. Continue?'))
    {
        this.DB.removeEvent(eventId);
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
        this.DB.addTournament(t);
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
      this.DB.removeTournament(this.selectedTournament.tournamentId);
      this.selectedTournament = null;
    }
  }

  addPlayer(){
    if(this.selectedTournament == null)
      return;
    const modal = this.modalService.open(InputBoxComponent)
    modal.componentInstance.tournamentId = this.selectedTournament.tournamentId;
    modal.componentInstance.title = this.selectedTournament.tournamentId;
    modal.componentInstance.label = "Nick";

    modal.result
      .then((result:Player) => {
        this.DB.addPlayer(result);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );
  }

  deletePlayer(playerId:string){
    if(confirm('You will delete the player and statistics associated. Continue?'))
    {
      this.DB.removePlayer(playerId);
    }
  }
}
