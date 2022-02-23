import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class GoogleSigninService {
  private auth2: gapi.auth2.GoogleAuth<gapi.auth2.GoogleUser>(1);
  private subject = new ReplaySubject();
  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '416593747264-jh0j6t1rl2e0if4r63f7vhrvmn49hgqi.apps.googleusercontent.com',
      });
    });
  }

  public SignIn() {
    this.auth2
      .signIn()
      .then((user) => {
        this.subject.next(user);
      })
      .catch(() => {
        this.subject.next(null);
      });
  }

  public SignOut() {
    this.auth2.signOut().then(() => {
      this.subject.next(null);
    });
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
