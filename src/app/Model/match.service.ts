import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject } from "rxjs";
import { HistoryService } from './history.service';
import { Match } from './model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private _match: Match | null = null;
  private subject: BehaviorSubject<Match>; 
  Match: Observable<Match>; 

constructor(private historyService: HistoryService) { 
  const storageData = localStorage.getItem('3TStats.Match');
  if(storageData != null)
    this._match = JSON.parse(storageData) as Match;
  this.subject = new BehaviorSubject<Match>(this._match);
  this.Match =  this.subject.asObservable();
  this.subject.next(this._match)
}


  new(match: Match){
    this.historyService.add(this._match);
    this._match = match;
    this.save();
  }

  cancel(){
    this._match = null;
    this.save();
  }

  saveAndclose()
  {
    this.historyService.add(this._match);
    this.cancel();
  }

  save(){
    localStorage.setItem('3TStats.Match', JSON.stringify(this._match));
    this.subject.next(this._match)
  }

}