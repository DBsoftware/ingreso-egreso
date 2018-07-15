import * as AuthAct from './auth.actions';
import { User } from './user.model';
import { SET_USER, UNSET_USER } from './auth.actions';


export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function  authReducer(state: AuthState = initState, action: AuthAct.acciones): AuthState {
    switch (action.type) {
        case AuthAct.SET_USER:
            return { user: { ... action.user} };
        case AuthAct.UNSET_USER:
            return { user: null };
        default:
            return state;
    }
}
