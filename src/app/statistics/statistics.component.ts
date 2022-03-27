import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../Model/Match.service';
import { DBService } from '../Model/DB.service';
import { Match } from '../Model/Match';
import { Sport } from '../Model/Sport';
import { Tournament } from '../Model/Tournament';
import { ForwardRefHandling } from '@angular/compiler';



@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})

export class StatisticsComponent implements OnInit {
  sports: Sport[];
  selectedSport: Sport;

  tournaments: Tournament[];
  selectedTournament: Tournament;

  matches: Match[]= [];
  

  //each square will have one Event, many matches (x-Axis), many players (series) with count (serie data). 
  //                                  Event       match       players count
  EventByMatchesWithPlayersCount: Map<string, Map<string, Map<string, number>>> = new Map<string, Map<string, Map<string, number>>>();
  
  constructor(private matchSvc: MatchService, private DB:DBService ) {  }

  ngOnInit() {
    this.sports= this.DB.getSports();
    if(this.sports.length > 0)
      this.onSportSelected(this.sports[0]);
  }

  onSportSelected(sport: Sport){
    if(sport == null)
      return;
    this.selectedSport = sport;
    this.matches = this.matchSvc.getHistory(sport.sportId);

    this.tournaments = this.DB.getTournaments(this.selectedSport.sportId);
    if(this.tournaments.length > 0) {
      this.onTournamentSelected(this.tournaments[0]);
    } else{
      this.onTournamentSelected(null);
    }
  }  

  onTournamentSelected(tournament : Tournament | null){
    this.selectedTournament = tournament;
    this.buildStats();
  }

  buildStats(){
    var matches: Match[];
    if(this.selectedTournament == null){
      matches = this.matches;
    } else {
      matches = this.matches.filter(x=>x.tournamentId == this.selectedTournament.tournamentId);
    }

    matches.forEach(match=>{
      match.events.forEach( playerEvent => {
        if(!this.EventByMatchesWithPlayersCount.has(playerEvent.event.short))
          this.EventByMatchesWithPlayersCount.set(playerEvent.event.short, new Map<string, Map<string, number>>());
        if(!this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).has(match.date))
          this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).set(match.date, new Map<string, number>());
        if(!this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).get(match.date).has(playerEvent.player.nick))
          this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).get(match.date).set(playerEvent.player.nick, 0);
        this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).get(match.date).set(playerEvent.player.nick,
          this.EventByMatchesWithPlayersCount.get(playerEvent.event.short).get(match.date).get(playerEvent.player.nick) + 1
        );
      })
    })
  }
}
