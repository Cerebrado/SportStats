import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Match, PlayerEventPosition } from './Match';
import { Player } from './Player';
import { Sport } from './Sport';
import { Tournament } from './Tournament';

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  private currentMatchTable :string =  '3TStats.CurrentMatch';
  private historyTable :string =  '3TStats.HistoryMatch';

  private _subject: Subject<Match | null> = new Subject<Match | null>();
  current: Observable<Match> = this._subject.asObservable();
  private _current: Match | null;

  constructor() { 
    let storageData = localStorage.getItem(this.currentMatchTable);
    if(storageData != null) {
      this._current = JSON.parse(storageData) as Match;
    }
    // setTimeout(() => 
    // {
    //   this._subject.next(this._current);
    // }, 500);

  }

  setNewMatch(match:Match|null) {
    if(this._current != null)      {
      this.setCurrentMatchAsHistory();
    }
    this._current = match;
    if(match == null){
      this.saveCurrent();  
    }
  }

   getCurrent():Match{
     return this._current;
   }

  addEvents(events: PlayerEventPosition[]){
    this._current.setEvents([...this._current.getEvents(),  ...events]);
    this.saveCurrent();
  }

  saveCurrent(){
    //this._subject.next(this._current)
    if(this._current == null)
      return;
    let table = this.currentMatchTable;
    localStorage.setItem(table, JSON.stringify(this._current));
  }

  private setCurrentMatchAsHistory() {
    let matches: Match[];
    let table = this.historyTable;
    let storageData = localStorage.getItem(table);
    if(storageData != null) {
         matches = JSON.parse(storageData) as Match[];
    }
    matches.push(this._current);
    localStorage.setItem(table, JSON.stringify(matches));
  }

  getHistory(sport: Sport):Match[]{
    let matches: Match[];
    let table = this.historyTable + '.' + sport.sportId;
    let storageData = localStorage.getItem(table);
    if(storageData != null) {
         matches = JSON.parse(storageData) as Match[];
    }
    return matches;
  }
}

