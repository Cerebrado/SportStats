import { Helper } from "./Helper";
import { Player } from "./Player";

export class Tournament {
    readonly tournamentId: string = new Helper().getDateAsString(false);
    readonly sportId: string;
    readonly name: string;
    
    
    constructor(sportId:string, name: string, ) {
      this.sportId = sportId;
      this.name = name;
    }

  }
  