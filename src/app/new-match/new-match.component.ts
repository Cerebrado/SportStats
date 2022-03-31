import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { DBService } from '../Model/DB.service';
import { Match } from '../Model/Match';
import { Player } from '../Model/Player';
import { Sport } from '../Model/Sport';
import { Tournament } from '../Model/Tournament';
@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
})
export class NewMatchComponent {
  availablePlayersPerTeam: number[] =[1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22];

  sports: Sport[]=[];
  tournaments: Tournament[]=[];
  players: Player[]=[];
  
  selectedSport: Sport | null
  selectedTournament: Tournament | null;
  playersPerTeam: number = 1;
  matchPlayers: Player[] = []
  newPlayer:string = '';
 
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal, private DB: DBService) { }

  ngOnInit() {
    this.sports = this.DB.LSgetSports();
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


  selectPlayersPerTeam(n:number){
    this.playersPerTeam = n;
    if(this.matchPlayers.length > n * 2)
      this.matchPlayers.length = n * 2;
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
      alert(p.nick + ' ya fue agregado y no puede jugar por dos. No es tan bueno.')
      return;
    }

    this.matchPlayers.push(p);
  }
  
  unconfirmPlayer(p: Player) {
    let idx = this.matchPlayers.findIndex(x=>x.playerId === p.playerId);
    if(idx > -1 )
      this.matchPlayers.splice(idx, 1);
  }

  btnConfirmNewMatchClick() {
    if(this.selectedSport == null || this.selectedTournament == null || this.matchPlayers.length < this.playersPerTeam * 2){
      alert('Debe elegir un deporte, un torneo y completar la cantidad de jugadores');
      return;
    }
     
    this.activeModal.close(new Match(this.selectedSport.sportId, this.selectedTournament.tournamentId, this.matchPlayers));

  }
}
