import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
  private auth2: gapi.auth2.GoogleAuth;
  private subject:Subject<gapi.auth2.GoogleUser> = new Subject<gapi.auth2.GoogleUser>();
  constructor() {
      gapi.load('auth2', () => {
        console.log('gapi loaded')
        setTimeout(() => 
        {
          this.auth2 = gapi.auth2.init({
            client_id:
              '416593747264-jh0j6t1rl2e0if4r63f7vhrvmn49hgqi.apps.googleusercontent.com',
          });    
        }, 1000);

        console.log('auth2 inited')
  
      });
  }


  public signIn() {
    this.auth2
      .signIn()
      .then((user) => {
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

  User: Observable<gapi.auth2.GoogleUser > = this.subject.asObservable();
}
