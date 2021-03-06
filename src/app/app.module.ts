import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FilterByNumberPipe } from './Model/Helper';

import { InputBoxComponent } from './input-box/input-box.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NewEventComponent } from './new-event/new-event.component';
import { NewSportComponent } from './new-sport/new-sport.component';
import { SettingsComponent } from './settings/settings.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { MatchComponent } from './match/match.component';

 import { StatisticsComponent } from './statistics/statistics.component';
 import { StatEventChartComponent } from './stat-event-chart/stat-event-chart';
//import { StatPlayertimeTableComponent } from './stat-match-table/stat-playertime-table.component';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, NgbModule, HttpClientModule,  
    NgxEchartsModule.forRoot({
    echarts: () => import('echarts')
  })
],
  declarations: [							
    AppComponent,
    FilterByNumberPipe,
    InputBoxComponent,
    NewPlayerComponent,
    NewEventComponent,
    NewSportComponent,
    SettingsComponent,
    NewMatchComponent,
    MatchComponent,
    StatisticsComponent,
    StatEventChartComponent,
    //StatPlayertimeTableComponent
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
