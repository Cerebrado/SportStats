import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../Model/history.service';
import { MatchService } from '../Model/match.service';
import { Match, Player, PlayEvent } from '../Model/model';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})

export class StatisticsComponent implements OnInit {
  Matches: Match[]= [];

  //each square will have one Event, many matches (x-Axis), many players (series) with count (serie data). 
  
  //                        Event,      match       players count
  EventByMatchesWithPlayersCount: Map<string, Map<string, Map<string, number>>> = new Map<string, Map<string, Map<string, number>>>();
  
  constructor(private matchService: MatchService,
    private historyService: HistoryService) {
      //TODO: this.Matches = this.historyService.get());
      this.Matches.unshift(this.matchService.get());

      this.Matches.forEach(match=>{
        match.Teams.forEach(team => {
          team.Players.forEach(player => {
            player.Stats.forEach(event => {
              if(!this.EventByMatchesWithPlayersCount.has(event.Short))
                this.EventByMatchesWithPlayersCount.set(event.Short, new Map<string, Map<string, number>>());
              if(!this.EventByMatchesWithPlayersCount.get(event.Short).has(match.Name))
                this.EventByMatchesWithPlayersCount.get(event.Short).set(match.Name, new Map<string, number>());
              if(!this.EventByMatchesWithPlayersCount.get(event.Short).get(match.Name).has(player.Nick))
                this.EventByMatchesWithPlayersCount.get(event.Short).get(match.Name).set(player.Nick, 0);
              this.EventByMatchesWithPlayersCount.get(event.Short).get(match.Name).set(player.Nick, this.EventByMatchesWithPlayersCount.get(event.Short).get(match.Name).get(player.Nick) +1);

            })
          })
        })
      })
  }

  ngOnInit() {

  }
}
