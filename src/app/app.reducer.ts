import * as fromUiRedux from './shared/ui.reducer';
import * as fromAuthRedux from './auth/auth.reducer';
// import * as fromInEgrRedux from './ingreso-egreso/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUiRedux.State;
    auth: fromAuthRedux.AuthState;
    // inEgr: fromInEgrRedux.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUiRedux.uiReducer,
    auth: fromAuthRedux.authReducer,
    // inEgr: fromInEgrRedux.ingresoEgresoReducer
};
