import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stat-playertime-table',
  templateUrl: './stat-playertime-table.component.html',
})
export class StatPlayertimeTableComponent implements OnInit {

  constructor() { }

  @Input() MatchesWithPlayersCount: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();

  ngOnInit() {
    this.mapRecords();
  }

  mapRecords() {
      
  }

}
