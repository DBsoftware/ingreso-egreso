import * as LoadingAct from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading:  false
};

export function  uiReducer(state: State = initState, action: LoadingAct.acciones): State {
    switch (action.type) {
        case LoadingAct.ACTIVAR_LOADING:
            return { isLoading: true };
        case LoadingAct.DESACTIVAR_LOADING:
            return { isLoading: false };
        default:
            return state;
    }
}
