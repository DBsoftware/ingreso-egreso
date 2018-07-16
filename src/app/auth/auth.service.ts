import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as fire from 'firebase';

import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction} from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { UnsetItemsAction } from '../ingreso-egreso/ingreso-egreso.action';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubs: Subscription = new Subscription();
  private user: User;
  constructor(public afAuth: AngularFireAuth,
              public afDB: AngularFirestore,
              public store: Store<AppState>,
              private router: Router
              ) { }

  initAuth_Listener() {
    this.afAuth.authState.subscribe((fbUser: fire.User) => {
      if (fbUser) {
        if (this.userSubs) {
          this.afDB.doc(`${fbUser.uid}/usuario/`).valueChanges()
            .subscribe( userObj => {
              const usuarioDB = new User(userObj);
              this.store.dispatch( new SetUserAction( usuarioDB ));
              this.user = usuarioDB;
            }  );
        } else {
          this.user = null;
          this.userSubs.unsubscribe();
        }
      }
    });
  }

  crear_usuario( nombre, email, pass) {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
    .then(r => {
      const user: User = {
        uid: r.user.uid,
        nombre: nombre,
        email: r.user.email
      };
      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch( new DesactivarLoadingAction() );
      } );
    },
    err =>  {
      this.store.dispatch( new DesactivarLoadingAction() );
      swal('Error en el registro', err.message, 'error');
    });
  }

  login(email: string, pass: string) {
    this.store.dispatch( new ActivarLoadingAction() );
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(r => {
      this.store.dispatch( new DesactivarLoadingAction() );
      this.router.navigate(['/']);
    },
    err => {
      this.store.dispatch( new DesactivarLoadingAction() );
      swal('Error en el login', err.message, 'error');
    });
  }

  logOut() {
    this.store.dispatch( new UnsetUserAction() );
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  getUser() {
    return {...this.user};
  }
}
