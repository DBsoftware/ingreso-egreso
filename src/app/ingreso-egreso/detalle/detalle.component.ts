import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgresoModel[] = [];
  sub: Subscription =  new Subscription();

  constructor(private store: Store<AppState>,
              private _ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.sub = this.store.select('inEgr')
    .pipe(filter(e => e != null))
    .subscribe(res => this.items = res.items);
  }

  borrar(item: any) {
    this._ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then(() => swal('Operacion exitosa', item.descripcion + ' eliminado con exito', 'success'));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
