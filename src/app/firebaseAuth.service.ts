import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseAuthService {

  // Link Reference: https://github.com/mosh-hamedani/organic-shop/tree/master/src/app/shared/services

  constructor(private db: AngularFireDatabase, private af: AngularFireAuth) { }

  getAuthState() {
    return this.af.authState;
  }


  loginWithEmail(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    this.af.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    return this.af.auth.getRedirectResult();
  }

  logout() {
    return this.af.auth.signOut();
  }

  registerAccount(account: any) {
    return this.af.auth.createUserWithEmailAndPassword(
        account.email, account.password
    );
  }

  pushUserInfo(account: any) {
    return this.db.object('/userInfo/' + account.uid).update(account);
  }
}
