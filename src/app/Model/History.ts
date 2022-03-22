import { renderFlagCheckIfStmt } from "@angular/compiler/src/render3/view/template";
import { Match } from "./Match";

export class History{
  private readonly repoTable:string =  '3TStats.History';
  
  private matches: Match[] = [];

  constructor() { 
    const storageData = localStorage.getItem(this.repoTable);
    if(storageData != null)
      this.matches = JSON.parse(storageData) as Match[];
    }

    add(match: Match){
      this.matches.push(match)
      this.save();
    }

    getAll():Match[]{
      return this.matches;
    }

    deleteBySport(sportId:string){
      this.matches =  this.matches.filter(x=>x.sportId !== sportId);
      this.save();
    }

    deleteByTournament(sportId:string){
      this.matches =  this.matches.filter(x=>x.sportId !== sportId);
      this.save();
    }


    // getBySportAndTournament(sportId: string, tournamentId:string): Match[] {
    //   return this.matches.filter(match => match.sportId === sportId && match.tournamentId === tournamentId);
    // }

  private save(){
    localStorage.setItem(this.repoTable, JSON.stringify(this.matches));
  }

}

  
  

