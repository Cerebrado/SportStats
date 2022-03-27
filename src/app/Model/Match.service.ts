import { ReturnStatement } from '@angular/compiler';
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
      let tmpMatch = JSON.parse(storageData) as Match;
      this._current = new Match(tmpMatch.sportId, tmpMatch.tournamentId, tmpMatch.players, tmpMatch.events);
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
    this.saveCurrent();  
  }

   getCurrent():Match{
     return this._current;
   }

  saveCurrent(){
    //this._subject.next(this._current)
    if(this._current == null)
        return; 
      localStorage.setItem(this.currentMatchTable, JSON.stringify(this._current));
  }

  private setCurrentMatchAsHistory() {
    if(this._current == null)
      return;
    if(this._current.events.length == 0)
      return;
    
    let matches: Match[] = this.getHistory(this._current.sportId);
    matches.push(this._current);
    localStorage.setItem(this.historyTable+'.'+this._current.sportId , JSON.stringify(matches));
  }

  getHistory(sportId: string):Match[]{
    let matches: Match[] = [];
    let table = this.historyTable + '.' + sportId;
    let storageData = localStorage.getItem(table);
    if(storageData != null) {
         matches = JSON.parse(storageData) as Match[];
    }
    return matches;
  }
}

