import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as fire from 'firebase';

import swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public afDB: AngularFirestore,
    private router: Router
  ) { }

  initAuth_Listener() {
    this.afAuth.authState.subscribe((fbUser: fire.User) => {
      console.log(fbUser);
    });
  }

  crear_usuario( nombre, email, pass) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
    .then(r => {
      const user: User = {
        uid: r.user.uid,
        nombre: nombre,
        email: r.user.email
      };
      this.afDB.doc(`${user.uid}/usuario`)
      .set(user)
      .then(() => this.router.navigate(['/']));
    },
    err =>  swal('Error en el registro', err.message, 'error'));
  }

  login(email: string, pass: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pass)
    .then(r => this.router.navigate(['/']), err => swal('Error en el login', err.message, 'error'));
  }

  logOut() {
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
}
