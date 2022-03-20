import { Helper } from "./helper";
import { Event } from "./Event";


export class Sports{
    private readonly repoTable:string =  '3TStats.Sports';
    private _sports: Map<string, Sport> = new Map<string, Sport>();    

    constructor() { 
    const storageData = localStorage.getItem(this.repoTable);
    if(storageData != null)
        this._sports = JSON.parse(storageData) as Map<string, Sport>;
    }

    getAll(){
        return this._sports.values();
    }

    add(name:string){
        var t = new Sport(name);
        this._sports.set(t.sportId, t);
        this.save();
    }

    addEvent(sportId:string, event: Event){
      this._sports.get(sportId).events.set(event.eventId, event);
      this.save();
    }

    removeEvent(sportId:string, eventId:string){
        this._sports.get(sportId).events.delete(eventId);
        this.save();
    }

    private save(){
        localStorage.setItem(this.repoTable, JSON.stringify(this._sports));
    }
}


export class Sport {
    readonly sportId: string = new Helper().getDateAsString(false);
    readonly name: string;
    readonly events: Map<string, Event> = new Map<string, Event>();
    
    constructor(name: string) {
      this.name = name;
    }
  }
  