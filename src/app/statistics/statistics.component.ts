import { Component, OnInit } from '@angular/core';
import { MatchService } from '../Model/match.service';
import { Match, PlayEvent } from '../Model/model';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})

export class StatisticsComponent implements OnInit {
  Match: Match;
  PlayEventsByValue: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  
  constructor(private matchService: MatchService) {
    this.matchService.Match.subscribe((match) => {
      this.Match = match;
      
        
      });
      this.Match.Teams.forEach(team => {
        team.Players.forEach(player => {
          if(! this.PlayEventsByValue.has(player.Nick))
            this.PlayEventsByValue.set(player.Nick,new Map<string, number>());
          player.Stats.forEach(event => {
            if(!this.PlayEventsByValue.get(player.Nick).has(event.Short))  
              this.PlayEventsByValue.get(player.Nick).set(event.Short, 0)
            else
            
              this.PlayEventsByValue.get(player.Nick).set(event.Short, this.PlayEventsByValue.get(player.Nick).get(event.Short) +1);
          });
        })
      })
  }

  ngOnInit() {}
}
