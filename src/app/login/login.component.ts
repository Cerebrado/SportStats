import { Component } from '@angular/core';
import { ReplaySubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  
  private auth2: gapi.auth2.GoogleAuth;
  subject:Subject<gapi.auth2.GoogleUser|null> = new ReplaySubject<gapi.auth2.GoogleUser|null>(1);
  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '416593747264-jh0j6t1rl2e0if4r63f7vhrvmn49hgqi.apps.googleusercontent.com',
      });
    });
  }

  public signIn() {
    this.auth2
      .signIn()
      .then((user) => {
        console.log("signed in")
        this.subject?.next(user);
      })
      .catch((error) => {
        console.log(error)
        this.subject?.next(null);
      });
  }

  public signOut() {
    this.auth2.signOut().then(() => {
      this.subject?.next(null);
    });
  }

  // public observable(): Observable<gapi.auth2.GoogleUser|null> {
  //     return this.subject.asObservable();
  // }

}
