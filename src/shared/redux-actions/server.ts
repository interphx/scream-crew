import { CommonActions, CommonActionMeta } from 'shared/redux-actions/common';

export interface ServerActions extends CommonActions {
    'SERVER_DUMMY': { type: 'SERVER_DUMMY' }
}

export type ServerActionType = keyof ServerActions;
export type ServerAction = ServerActions[ServerActionType] & CommonActionMeta;

export const ServerActionType : {[Key in ServerActionType]: Key} = {
    'SERVER_DUMMY': 'SERVER_DUMMY',

    'LOBBY:ADD_GAME': 'LOBBY:ADD_GAME',
    'LOBBY:ADD_PLAYER_TO_GAME': 'LOBBY:ADD_PLAYER_TO_GAME',
    'LOBBY:REMOVE_GAME': 'LOBBY:REMOVE_GAME',
    'GAME:SET_STATE': 'GAME:SET_STATE',
    'GAME:MAKE_READY': 'GAME:MAKE_READY'
};
export const ServerActionTypes = Object.keys(ServerActionType);

export function isServerActionType(actionType: string): actionType is ServerActionType {
    return ServerActionTypes.indexOf(actionType as any) >= 0;
}

export function isServerAction(action: any): action is ServerAction {
    return action.type && isServerActionType(action.type);
}