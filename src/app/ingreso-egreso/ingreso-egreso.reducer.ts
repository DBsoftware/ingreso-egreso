import { AppState } from '../app.reducer';
import * as InEgrAct from './ingreso-egreso.action';
import { IngresoEgresoModel } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}
export interface AppState extends AppState {
    inEgr: IngresoEgresoState;
}

export const initState: IngresoEgresoState = {
    items: []
};


export function ingresoEgresoReducer(state: IngresoEgresoState = initState, action: InEgrAct.acciones): IngresoEgresoState {

    switch (action.type) {
        case InEgrAct.SET_ITEMS:
            return { items: [ ...action.items.map(e => ({...e})  ) ] };
        case InEgrAct.UNSET_ITEMS:
            return { items: [] };
        default:
            return state;
    }
}
