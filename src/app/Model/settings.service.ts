import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject } from "rxjs";
import { Player, PlayEvent, Settings } from './model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _settings: Settings;
  private subject: BehaviorSubject<Settings>; 
  Settings: Observable<Settings>; 


constructor() { 
  const storageData = localStorage.getItem('3TStats.Settings');
  if(storageData != null)
    this._settings = JSON.parse(storageData) as Settings;
  else
    this._settings =new Settings();
  this.subject = new BehaviorSubject<Settings>(this._settings);
  this.Settings =  this.subject.asObservable();
  this.subject.next(this._settings)

}

private save(){
  localStorage.setItem('3TStats.Settings', JSON.stringify(this._settings));
  this.subject.next(this._settings);
}

addPlayer(player: Player){
  this._settings.PlayersList.push(player);
  this.save();
}

addEvent(playEvent: PlayEvent){
  this._settings.PlayEventsList.push(playEvent);
  this.save();
}


}