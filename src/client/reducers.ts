import { Store, getInitialStoreState } from 'client/store';
import { Action } from 'client/actions';

export function app(state: Store = getInitialStoreState(), action: Action) {
    switch (action.type) {
        case 'apply-state-delta':
            return {...state, deltaApplied: true};
        default:
            return state;
    }
}