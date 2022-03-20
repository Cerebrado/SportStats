import { Match } from "./Match";
import { History } from "./History";
export class CurrentMatch {
  private readonly repoTable:string =  '3TStats.CurrentMatch';
  
  readonly matches: Match[] = [];

  constructor() { 
    const storageData = localStorage.getItem(this.repoTable);
    if(storageData != null)
      this.matches = JSON.parse(storageData) as Match[];
    }

    add(match: Match){
      this.matches.push(match)
      this.save();
    }

    getBySportAndTournament(sportId: string, tournamentId:string): Match | null{
        let match =  this.matches.find(match => match.sportId === sportId && match.tournamentId === tournamentId);
        if(match === undefined)
            return null;
        return match;
    }

    cancel(matchId:string ){
        for(let i = 0; i< this.matches.length; i++)
        {
            if(this.matches[i].matchId == matchId){
                this.matches.splice(i, 1);
                return;

            }
        }
    }

    startNew(sportId: string, tournamentId:string, numberOfPlayerPerTeam:number,   saveCurrent: boolean){
        let match = this.getBySportAndTournament(sportId, tournamentId);
        if(match != null){
            if(saveCurrent)
                new History().add(match);
            this.cancel(match.matchId);
        }
        this.matches.push(new Match(sportId, tournamentId, numberOfPlayerPerTeam))
        this.save();
    }

  private save(){
    localStorage.setItem(this.repoTable, JSON.stringify(this.matches));
  }

}


