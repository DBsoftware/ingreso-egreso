import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  forma: FormGroup;
  tipo = 'ingreso';
  loadingSub: Subscription = new Subscription();
  loading = false;

  constructor(public ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSub = this.store.select('ui')
                    .subscribe(resp => this.loading = resp.isLoading);
    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  submit() {
    this.store.dispatch( new ActivarLoadingAction() );
    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo });
    console.log('ingresoEgreso ', ingresoEgreso);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.store.dispatch( new DesactivarLoadingAction() );
      swal('Operacion exitosa', 'registro almacenado', 'success');
      this.forma.reset({
        monto: 0
      });

    });
  }


}
