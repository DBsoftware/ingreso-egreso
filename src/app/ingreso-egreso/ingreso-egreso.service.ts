import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService   {
  initIngresoEgresoListenerSubs: Subscription = new Subscription();
  obtenerItemsSubs: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private store: Store<AppState>,
              private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel)  {
    return this.afDB.doc(`${this.authService.getUser().uid}/ingreso-egresos`)
            .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid: string) {
    return this.afDB.doc(`${this.authService.getUser().uid}/ingreso-egresos/items/${uid}`)
    .delete();
  }

  initIngresoEgresoListener() {
    this.initIngresoEgresoListenerSubs = this.store.select('auth')
    .pipe(filter(auth => auth.user !== null))
    .subscribe(resp => this.obtenerItems( resp.user.uid ));
  }

  obtenerItems(uid: string) {
    this.obtenerItemsSubs = this.afDB.collection(`${uid}/ingreso-egresos/items`)
    .snapshotChanges()
    .pipe(
      map(docData =>
        docData.map(doc =>
          ( {uid: doc.payload.doc.id, ...doc.payload.doc.data()}   )
        )))
    .subscribe((r: any) => this.store.dispatch( new SetItemsAction(r) ) );
  }

  cancelarSubs(): void {
    this.initIngresoEgresoListenerSubs.unsubscribe();
    this.obtenerItemsSubs.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );

  }
}
