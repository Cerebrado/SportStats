import { Helper } from "./helper";
import { Player } from "./Player";


export class Tournaments{
    private readonly repoTable:string =  '3TStats.Tournaments';
    private _tournaments: Map<string, Tournament> = new Map<string, Tournament>();    

    constructor() { 
    const storageData = localStorage.getItem(this.repoTable);
    if(storageData != null)
        this._tournaments = JSON.parse(storageData) as Map<string, Tournament>;
    }

    add(name:string){
        var t = new Tournament(name);
        this._tournaments.set(t.tournamentId, t);
        this.save();
    }

    addPlayer(guid:string, player: Player){
      this._tournaments.get(guid).players.set(player.playerId, player);
      this.save();
    }


    private save(){
        localStorage.setItem(this.repoTable, JSON.stringify(this._tournaments));
    }
}


export class Tournament {
    readonly tournamentId: string = new Helper().getDateAsString(false);
    readonly name: string;
    readonly players: Map<string, Player> = new Map<string, Player>();
    
    constructor(name: string) {
      this.name = name;
    }
  }
  