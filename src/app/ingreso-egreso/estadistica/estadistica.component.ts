import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos = 0;
  egresos = 0;
  cuantosIngresos: number;
  cuantosEgresos: number;
  public doughnutChartLabels: string[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  sub: Subscription =  new Subscription();

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.sub = this.store.select('inEgr')
                .pipe(filter(e => e.items.length !== 0))
                .subscribe(resp => {
                  this.cuantosIngresos = this.hacerCalculos(resp.items, 'ingreso');
                  this.cuantosEgresos = this.hacerCalculos(resp.items, 'egreso');
                  this.ingresos = this.hacerCalculos(resp.items, 'ingreso', 'total');
                  this.egresos = this.hacerCalculos(resp.items, 'egreso', 'total');
                  this.doughnutChartData = [this.ingresos, this.egresos];
                });
  }

  hacerCalculos(items: any[], tipo: string, operacion: string= 'cantidad' ): number {
    return  this.carrefour( items.filter(e => e.tipo === tipo), operacion );
  }

  carrefour(items: any[], operacion: string= 'cantidad'): number {
    switch (operacion) {
      case 'total':
        return this.montoTotal(items);
      default:
        return items.length;
    }
  }

  montoTotal(items: any[]) {
    let aux = 0;
    items.forEach(e => aux += Number(e.monto) );
    return aux;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    }

}
