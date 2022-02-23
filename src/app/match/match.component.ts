import { Component, OnInit } from '@angular/core';
import { Match } from '../Model';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
})
export class MatchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  Match: Match;
  StatEntry: string;
}
