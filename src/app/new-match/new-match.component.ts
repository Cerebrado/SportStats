import { Component} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatchService } from '../Model/Match';
import { Match, Player, Settings, Tournament } from '../Model/model';
import { SettingsService } from '../Model/settings.service';
import { TournamentService } from '../Model/tournament.service';

@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {

  Tournaments: Tournament[];
  Settings: Settings;

  selectedPlayers: (Player | null)[] = [null, null, null, null];
  selectedTournament: Tournament | null;

  constructor(
    public activeModal: NgbActiveModal,
    private matchService: MatchService,
    private settingsService: SettingsService,
    private tournamentService: TournamentService) 
  {
    this.Tournaments = tournamentService.Tournaments;
    this.Settings = settingsService.get();
  }

  ngOnInit() {
    if(this.selectedTournament != null){
      this.selectedPlayers = [...this.selectedTournament?.Players]
    }
  }

  AddPlayer(i: number) {
    var player = this.selectedTournament.Players[i];
    this.selectedPlayers.forEach(p =>{
      if(p.Nick === player.Nick){
        alert(p.Nick + ' is already playing');
        return;
      }
    })
    this.selectedPlayers.push(new Player(player.Nick))
  }
  
  RemovePlayer(i: number) {
    this.selectedPlayers[i] = null;
  }

  btnConfirmNewMatchClick() {
    if(this.selectedPlayers.length % 2 !== 0)
    {
      if(!confirm("There are even players set. Confirm?"))
        return;
    }

    this.selectedTournament.History.push(this.selectedTournament.CurrentMatch );
    this.selectedTournament.CurrentMatch = new Match([...this.selectedPlayers]);
    this.tournamentService.save();
  }
}
