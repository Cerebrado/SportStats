import { Helper } from "./helper";

export class Match {
  readonly date: string = new Helper().getDateAsString(false);
  readonly matchId: string = new Helper().getDateAsString(true);
  readonly sportId: string;
  readonly tournamentId:string;
  readonly playersPerTeam: number;
  readonly playersEvents: PlayerEventPosition[] = [];

  constructor(sportId: string, tournamentId: string, playersPerTeam: number){
    this.sportId = sportId;
    this.tournamentId = tournamentId;
    this.playersPerTeam = playersPerTeam;
  }
}

export class PlayerEventPosition{
  readonly playerId: string
  readonly eventId: string

  constructor(playerId:string, eventId:string){
    this.playerId = playerId;
    this.eventId = eventId;
  }
}

