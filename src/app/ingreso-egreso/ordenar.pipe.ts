import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

  transform(items: IngresoEgresoModel[], args?: any): IngresoEgresoModel[] {
    return items.sort((a,b) => a.tipo === 'ingreso' ? -1 : 1);
  }

}
