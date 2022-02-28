import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NewMatchComponent } from './new-match/new-match.component';
import { MatchComponent } from './match/match.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { NewPlayerComponent } from './new-player/new-player.component';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, NgbModule],
  declarations: [
    AppComponent,
    NewMatchComponent,
    MatchComponent,
    StatisticsComponent,
    SettingsComponent,
    LoginComponent,
    NewPlayerComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
