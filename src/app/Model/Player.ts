import { Helper } from "./Helper";

export class Player {
    tournamentId: string;
    playerId:string = new Helper().getGuid();
    nick: string;
    
    constructor(tournamentId: string, nick: string) {
      this.nick = nick;
      this.tournamentId = tournamentId;
    }
  }
  