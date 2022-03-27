import { Helper } from "./Helper";
import { Player } from "./Player";
import { Event } from "./Event";


export class Match {
  readonly date: string = new Helper().getDateAsString(false);
  readonly matchId: string = new Helper().getGuid();
  readonly sportId: string;
  readonly tournamentId:string;
  readonly players: Player[];
  
  events: PlayerEventPosition[] = []; // TODO: SEE, methods not serializabel in the service.

  constructor(sportId: string, tournamentId: string, players: Player[], events?:PlayerEventPosition[]){
    this.sportId = sportId;
    this.tournamentId = tournamentId;
    this.players = players;
    this.events = events??[];
  }

  addEvents(events: PlayerEventPosition[]){
    this.events = [...this.events,...events];
  }
}


export interface  PlayerEventPosition{
  player: Player
  event: Event | null
}

