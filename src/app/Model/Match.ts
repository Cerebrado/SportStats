import { Helper } from "./Helper";
import { Player } from "./Player";
import { Event } from "./Event";


export class Match {
  readonly date: string = new Helper().getDateAsString(false);
  readonly matchId: string = new Helper().getGuid();
  readonly sportId: string;
  readonly tournamentId:string;
  readonly players: Player[];
  private events: PlayerEventPosition[] = [];

  constructor(sportId: string, tournamentId: string, players: Player[]){
    this.sportId = sportId;
    this.tournamentId = tournamentId;
    this.players = players;
  }

  getEvents():PlayerEventPosition[]{
    return this.events;
  }

  setEvents(events: PlayerEventPosition[]){
    this.events = events;
  }
}

export interface  PlayerEventPosition{
  player: Player
  event: Event | null
}

