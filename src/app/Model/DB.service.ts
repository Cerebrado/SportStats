import { Injectable } from '@angular/core';
import { Sport } from "./Sport";
import { Tournament } from "./Tournament";
import { Event } from "./Event";
import { Player } from "./Player";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  private sportsTable :string =  '3TStats.Sports';
  private eventsTable :string =  '3TStats.Events';
  private tournamentesTable :string =  '3TStats.Tournaments';
  private playersTable :string =  '3TStats.Players';
  private currentMatchTable :string =  '3TStats.CurrentMatch';
  private historyTable :string =  '3TStats.HistoryMatch';
  
  
  private _sports: Sport[] = [];
  private _events: Event[] = [];
  private _tournaments: Tournament[] = [];
  private _players: Player[] = [];

  constructor() {
      let storageData: string
      storageData = localStorage.getItem(this.sportsTable);
      if(storageData != null) {
          this._sports =  JSON.parse(storageData) as Sport[];
      }

      storageData = localStorage.getItem(this.eventsTable);
      if(storageData != null) {
          this._events =  JSON.parse(storageData) as Event[];
      }

      storageData = localStorage.getItem(this.tournamentesTable);
      if(storageData != null) {
          this._tournaments =  JSON.parse(storageData) as Tournament[];
      }

      storageData = localStorage.getItem(this.playersTable);
      if(storageData != null) {
          this._players =  JSON.parse(storageData) as Player[];
      }
  }

  getSports(): Sport[]{
      return this._sports;
  }

  addSport(sport: Sport): Sport[]{
      this._sports.push(sport);
      this.save(this.sportsTable);
      return this._sports;
  }

  removeSport(sport: Sport) : Sport[]{
      let idx = this._sports.findIndex(x=>x.sportId === sport.sportId);
      if(idx > -1){
          this._sports.splice(idx,1);
          this.removeTournaments(sport.sportId);
          this.removeEvents(sport.sportId);
          this.save(this.tournamentesTable);
      }
      return this._sports; 
    }

  getEvents(sportId:string):Event[]{
      return this._events.filter(x=>x.sportId === sportId);
  }

  addEvent(event: Event):Event[] {
    let sportId= event.sportId;  
    this._events.push(event);

      this.save(this.eventsTable);
      return this.getEvents(sportId);
  }

  private removeEvents(sportId:string){
      this._events = this._events.filter(x=> x.sportId !== sportId);
      this.save(this.eventsTable)
  }

  removeEvent(event:Event):Event[]{
      let sportId = event.sportId
      let idx = this._events.findIndex(x=>x.eventId === event.eventId);
      if(idx > -1){
          this._events.splice(idx,1);
          this.save(this.eventsTable);
      }
      return this.getEvents(sportId);
  }

  getTournaments(sportId: string): Tournament[]{
      return this._tournaments.filter(x=>x.sportId === sportId);
  }

  addTournament(tournament: Tournament): Tournament[] {
      let sportId = tournament.sportId;
      this._tournaments.push(tournament);
      this.save(this.tournamentesTable);
      return this.getTournaments(sportId);
  }

  private removeTournaments(sportId:string){
    this.removePlayers(this._tournaments.filter(x=>x.sportId == sportId).map(x=>x.tournamentId));
    this._tournaments = this._tournaments.filter(x=>x.sportId !== sportId);
    this.save(this.tournamentesTable)
}


  removeTournament(tournament:Tournament):Tournament[] {
      let sportId = tournament.sportId;
      let idx = this._tournaments.findIndex(x=>x.tournamentId === tournament.tournamentId);
      if(idx > -1){
          this._tournaments.splice(idx,1);
          this.save(this.tournamentesTable);
      }
      return this.getTournaments(sportId);
  }

  getPlayers(tournamentId:string):Player[]{
      return this._players.filter(x=>x.tournamentId === tournamentId);
  }

  addPlayer(player: Player): Player[] {
      let tournamentId = player.tournamentId;
      this._players.push(player);
      this.save(this.playersTable);
      return this.getPlayers(tournamentId);
  }
  
  private removePlayers(tournamentIds:string[]){
    //[{id:1},{id:2},{id:3},{id:4}].filter(v=>!([{id:2},{id:4}].some(e=>e.id === v.id)))

    this._players = this._players.filter(player => !(tournamentIds.some(tId =>  player.tournamentId === tId)));
    this.save(this.playersTable);
  }

  removePlayer(player: Player): Player []{
    let tournamentId = player.tournamentId;
    let idx = this._players.findIndex(x=>x.playerId === player.playerId);
      if(idx > -1){
          this._players.splice(idx,1);
          this.save(this.playersTable);
      }
      return this.getPlayers(tournamentId);
  }

  private save(what:string){
      switch(what){
          case this.sportsTable:
              localStorage.setItem(what, JSON.stringify(this._sports));
              break;
          case this.eventsTable:
              localStorage.setItem(what, JSON.stringify(this._events));
              break;
          case this.tournamentesTable:
              localStorage.setItem(what, JSON.stringify(this._tournaments));
              break;
          case this.playersTable:
              localStorage.setItem(what, JSON.stringify(this._players));
              break;
      }
  }
}
