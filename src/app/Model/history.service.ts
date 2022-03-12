import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject } from "rxjs";
import { History, Match } from './model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private _history: History;
  private subject: BehaviorSubject<History>; 
  History: Observable<History>; 


constructor() { 
  const storageData = localStorage.getItem('3TStats.History');
  if(storageData != null)
    this._history = JSON.parse(storageData) as History;
  else
    this._history =new History();
  this.subject = new BehaviorSubject<History>(this._history);
  this.History =  this.subject.asObservable();
  this.subject.next(this._history)

}

private save(){
  localStorage.setItem('3TStats.History', JSON.stringify(this._history));
  this.subject.next(this._history);
}

add(match: Match){
  this._history.Matches.push(match);
  this.save();
}

}