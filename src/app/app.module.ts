import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { MatchComponent } from './match/match.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewSportComponent } from './new-sport/new-sport.component';
import { EventHistoryChartComponent } from './event-history-chart/event-history-chart.component';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, NgbModule, 
    NgxEchartsModule.forRoot({
    echarts: () => import('echarts')
  })
],
  declarations: [		
    AppComponent,
    NewMatchComponent,
    NewPlayerComponent,
    NewEventComponent,
    NewSportComponent,
    MatchComponent,
    StatisticsComponent,
    SettingsComponent,
    EventHistoryChartComponent
   ],
  bootstrap: [AppComponent],
  entryComponents:[
    AppComponent
  ]
   ,providers: [
     NgbActiveModal,
   ]
})
export class AppModule {}
