import { Component, Input, OnInit } from '@angular/core';

import { EChartsOption, SeriesOption } from 'echarts/types/dist/echarts';
@Component({
  selector: 'event-history-chart',
  templateUrl: './event-history-chart.component.html',
})
export class EventHistoryChartComponent implements OnInit {

  @Input() EventName:string = '';
  @Input() MatchesWithPlayersCount: Map<string, Map<string, number>> = new Map<string, Map<string, number>>();
  option: EChartsOption;
  visible: boolean = true;
  xAxis: string[] = [];
  

  getSeries(): SeriesOption[] {

    let seriesOption: SeriesOption[] = [];  
    let series: Map<string, number[]> = new Map<string, number[]>();

    for(let [year , playerCount] of this.MatchesWithPlayersCount){
      for(let [player, count] of playerCount ){
        if(!series.has(player)){
          series.set(player, []);
        }
        series.get(player).push(count);
      }
    }


    for(let [player, counts] of series){
      seriesOption.push({
            name: player,
            type: 'line',
            data: counts
      })
    }

    return seriesOption;

  }

  constructor() { }

  ngOnInit() {

    let series = this.getSeries();

    this.option = {
      title: {
        text: this.EventName,
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        left: 'left'
      },
      xAxis: {
        //type: 'category',
        name: 'Match',
        splitLine: { show: false },
        data: [...this.MatchesWithPlayersCount.keys()]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'log',
        //name: 'y',
        minorSplitLine: {
          show: true
        }
      },
      series: series
    };
  }
}
