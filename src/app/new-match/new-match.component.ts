import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { DBService } from '../Model/DB.service';
import { Player } from '../Model/Player';
import { Sport } from '../Model/Sport';
import { Tournament } from '../Model/Tournament';


@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {

  sports: Sport[]=[];
  tournaments: Tournament[]=[];
  players: Player[]=[];

  matchPlayers: Player[] = []
  

  selectedSport: Sport | null
  selectedTournament: Tournament | null;
  playersPerTeam: number;
  newPlayer:string = '';
 
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal, private DB: DBService) { }

  ngOnInit() {
    this.sports = this.DB.getSports();
    if(this.sports.length > 0)
      this.selectSport(this.sports[0]);
  }


  selectSport(sport:Sport){
    this.selectedSport = sport;
    if(sport != null){
      this.tournaments = this.DB.getTournaments(this.selectedSport.sportId);
      if(this.tournaments.length > 0) {
        this.selectTournament(this.tournaments[0]);
      } else{
        this.selectTournament(null);
      }
    } else {
      this.tournaments = [];
    }
  }

  selectTournament(tournament:Tournament | null){
    this.selectedTournament = tournament;
    if(tournament != null)  {
      this.players = this.DB.getPlayers(tournament.tournamentId);
    } else {
      this.players = [];
    }
  }

  addPlayer(){
    if(this.selectedTournament == null)
      return;

      if(this.newPlayer == '')
      return;
    
    if(this.players.some(x=>x.nick == this.newPlayer)){
        alert('Player ' + this.newPlayer + ' already exists')
        this.newPlayer = ''
        return;
    }
    let player = new Player(this.selectedTournament.tournamentId, this.newPlayer);
    this.DB.addPlayer(player);
    this.players.push(player);   
    this.newPlayer = ''
  }

  deletePlayer(player:Player) {
    if(confirm('You will delete the player and statistics associated. Continue?'))
    {
      this.players = this.DB.removePlayer(player);
    }
  }

  confirmPlayer(p: Player) {
    if(this.matchPlayers.length == this.playersPerTeam * 2)
      return;
    
      if(this.matchPlayers.some(x=>x.playerId == p.playerId)){
      alert(p.nick + ' no puede jugar en dos equipos (no es tan bueno).')
      return;
    }

    this.matchPlayers.push(p);
  }
  
  uncofirmPlayerRemovePlayer(i: number) {
    this.matchPlayers.slice(i, 1);
  }

  btnConfirmNewMatchClick() {
    // this.selectedTournament.History.push(this.selectedTournament.CurrentMatch );
    // this.selectedTournament.CurrentMatch = new Match([...this.selectedPlayers]);
    // this.tournamentService.save();
  }
}
