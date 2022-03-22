import { Injectable } from '@angular/core';
import { Sport } from "./Sport";
import { Tournament } from "./Tournament";
import { Event } from "./Event";
import { Player } from "./Player";

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

  addSport(sport: Sport){
      this._sports.push(sport);
      this.save(this.sportsTable);
  }

  removeSport(sportId: string) {
      var idx = this._sports.findIndex(x=>x.sportId === sportId);
      if(idx > -1){
          this._sports.splice(idx,1);
          this.save(this.sportsTable);
      }
  }

  getEvents(sportId:string){
      return this._events.filter(x=>x.sportId === sportId);
  }

  addEvent(event: Event) {
      this._events.push(event);
      this.save(this.eventsTable);
  }

  removeEvent(eventId:string){
      var idx = this._events.findIndex(x=>x.eventId === eventId);
      if(idx > -1){
          this._events.splice(idx,1);
          this.save(this.eventsTable);
      }
  }

  getTournaments(sportId: string): Tournament[]{
      return this._tournaments.filter(x=>x.sportId === sportId);
  }

  addTournament(tournament: Tournament) {
      this._tournaments.push(tournament)
      this.save(this.tournamentesTable);
  }

  removeTournament(tournamentId:string){
      var idx = this._tournaments.findIndex(x=>x.tournamentId === tournamentId);
      if(idx > -1){
          this._tournaments.splice(idx,1);
          this.save(this.tournamentesTable);
      }
  }

  getPlayers(tournamentId:string):Player[]{
      return this._players.filter(x=>x.tournamentId === tournamentId);
  }

  addPlayer(player: Player){
      this._players.push(player);
      this.save(this.playersTable);
  }

  removePlayer(playerId: string){
      var idx = this._players.findIndex(x=>x.playerId === playerId);
      if(idx > -1){
          this._players.splice(idx,1);
          this.save(this.playersTable);
      }
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
