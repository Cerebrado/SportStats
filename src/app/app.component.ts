import { Component, OnInit } from "@angular/core";
import { MatchService } from "./Model/Match.service";

import { Match } from './Model/Match';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NewMatchComponent } from "./new-match/new-match.component";
import { renderFlagCheckIfStmt } from "@angular/compiler/src/render3/view/template";
import { timestamp } from "rxjs";
// import { ChangeDetectorRef, Component, OnInit} from '@angular/core';

// import { GoogleSigninService } from 'src/app/Model/google-signin.service';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { NewMatchComponent } from './new-match/new-match.component';
// import { EChartsOption } from 'echarts/types/dist/echarts';



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers:[GoogleSigninService]
})
export class AppComponent  implements OnInit {
  //User : gapi.auth2.GoogleUser;
  menuOption: number = 1
  match: Match | null;
  
  constructor(private modalService: NgbModal, private matchSvc: MatchService){}
  
  ngOnInit() {
    // this.SignIn();
    this.match = this.matchSvc.getCurrent();
  }

  setMenuOption(menuOption: number){
    this.menuOption = menuOption;
  }

  btnNewMatch(){
    const modal = this.modalService.open(NewMatchComponent, {size:'xl'});
    modal.result
      .then((result:Match) => {
        this.matchSvc.setNewMatch(result);
        this.match = result;
        this.setMenuOption(1);
      }).catch(
        (reason: any) => { if(reason != 0) console.log(reason)}
      );

  }

  btnCancelMatch(){
    if(confirm('Va a cancelar el match actual con ' + this.match?.events.length + ' eventos. Continua?')){
      this.matchSvc.setNewMatch(null);
      this.setMenuOption(1);
    }
  }

  // SignIn(){
  //   this.signInService.signIn();
  //   this.cdRef.detectChanges();
  // }

  // SignOut(){
  //   this.signInService.signOut();
  //   this.cdRef.detectChanges();
  // }


  // btnSaveMatch() {
  //   this.matchService.saveAndclose();

  //   const modal = this.modalService.open(NewMatchComponent)
  //   modal.result
  //     .then(
  //         (result:Match) => {if(result) this.matchService.new(result)})
  //     .catch(
  //         (reason: any) => { if(reason != 0) console.log(reason)}
  //     );
  // }

  // btnCancelCurrentMatch(){
  //   if(confirm('You are going to cancel this match. Confirm?'))
  //     this.matchService.cancel();
  // }

  isfullscreenActive: boolean = false;
  toggleFullScreen() {
    this.isfullscreenActive = ! this.isfullscreenActive;
    let elem: HTMLElement =  document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

}
