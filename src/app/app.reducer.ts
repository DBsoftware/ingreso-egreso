import * as uiRedux from './shared/ui.reducer';
import * as authRedux from './auth/auth.reducer';
import { ActionReducerMap } from '../../node_modules/@ngrx/store';

export interface AppState {
    ui: uiRedux.State;
    auth: authRedux.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiRedux.uiReducer,
    auth: authRedux.authReducer
};
