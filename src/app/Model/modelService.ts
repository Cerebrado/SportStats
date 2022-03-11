import { Injectable, LOCALE_ID } from "@angular/core";
import {BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
 export class ModelService {
  
  private _model: Model;
  private subject: BehaviorSubject<Model>; 
  Model: Observable<Model>; 

  constructor() {
    const storageData = localStorage.getItem('3TStats');
    if(storageData != null)
      this._model = JSON.parse(storageData) as Model;
    else
      this._model =new Model();
    this.subject = new BehaviorSubject<Model>(this._model);
    this.Model =  this.subject.asObservable();
    this.subject.next(this._model)
  }

  save(){
    localStorage.setItem('3TStats', JSON.stringify(this._model));
    this.subject.next(this._model);
  }

  AddSettingsPlayer(player: Player){
    this._model.Settings.PlayersList.push(player);
    this.save();
  }

  AddSettingsEvent(playEvent: PlayEvent){
    this._model.Settings.PlayEventsList.push(playEvent);
    this.save();
  }

  SetNewMatch(match: Match){
    this._model.History.push(this._model.CurrentMatch);
    this._model.CurrentMatch = match;
    this.save();
  }

  CancelCurrentMatch(){
    this._model.CurrentMatch = null;
    this.save();
  }

  AddToHistory(match: Match){
    this._model.History.push(match);
    this.save();
  }
 }
 
 export class Model {
   History: Match[] = new Array<Match>();
   CurrentMatch: Match  = new Match();
   Settings: Settings  = new Settings();
 }

export class Settings {
  PlayersList: Player[] = new Array<Player>();
  PlayEventsList: PlayEvent[] = new Array<PlayEvent>();
}

export class PlayEvent {
  public Short: string;
  public Long: string;
  public Value: number;

  constructor(short: string, long: string, value: number) {
    this.Short = short;
    this.Long = long;
    this.Value = value;
  }
}

export class Player {
  public Nick: string;
  public Name: string;
  public ServiceOrder: number;
  public Stats: PlayEvent[];

  constructor(nick: string, name: string) {
    this.Nick = nick;
    this.Name = name;
    this.ServiceOrder = -1;
    this.Stats = new Array<PlayEvent>();
  }
}

export class Team {
  public Players: Player[] = [new Player('',''), new Player('','')];
  public SetScore: number[] = new Array<number>();
  public GameCounting: number = 0;
  public GameScoreDisplay: string = '';
}

export class Match {
  public Teams: Team[] = [new Team(), new Team()]; 
  public Finalized: boolean = false;
  public SetIndex: number = 0;
  public ServiceIndex: number = 0;
  public Name: string = '';
  public PlayEventsList: PlayEvent[] = new Array<PlayEvent>();

  constructor() {
    this. Name = this.getDateAsString(new Date()); 
  }

  pad2(n: number) {
    return n < 10 ? '0' + n : n;
  }

  getDateAsString(date: Date) {
    return (
      date.getFullYear().toString() +
      '-' +
      this.pad2(date.getMonth() + 1) +
      '-' +
      this.pad2(date.getDate()) +
      ' ' +
      this.pad2(date.getHours()) +
      ':' +
      this.pad2(date.getMinutes()) +
      ':' +
      this.pad2(date.getSeconds())
    );
  }
}
