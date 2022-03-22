import { Component, OnInit } from "@angular/core";

// import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
// import { GoogleSigninService } from 'src/app/Model/google-signin.service';
// import { MatchService } from './Model/Match';
// import { Match } from './Model/model';
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
  User : gapi.auth2.GoogleUser;
 
  // chartOption: EChartsOption = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //     },
  //   ],
  //};

  constructor(){}


  
  ngOnInit() {
    // console.log('Executing AppComponent.ngOnInit')    
    // this.SignIn();
  }

  // SignIn(){
  //   this.signInService.signIn();
  //   this.cdRef.detectChanges();
  // }

  // SignOut(){
  //   this.signInService.signOut();
  //   this.cdRef.detectChanges();
  // }


  // setMenuOption(menuOption: number){
  //   this.menuOption = menuOption;
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
  
}
