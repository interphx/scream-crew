import { CommonActions, CommonActionMeta } from 'shared/redux-actions/common';
import { GameId, GameStateType } from 'shared/game-session';
import { PlayerId } from 'shared/player';

type PublicGames = {[id: string]: { id: GameId, name: string, state: GameStateType }};

export interface ClientActions extends CommonActions {
    'CLIENT_DUMMY': { type: 'CLIENT_DUMMY' }

    ':INITIALIZE_DATA': {
        type: ':INITIALIZE_DATA';
        playerId: PlayerId;
        games: PublicGames;
    }
}

export type ClientActionType = keyof ClientActions;
export type ClientAction = ClientActions[ClientActionType] & CommonActionMeta;

export const ClientActionType : {[Key in ClientActionType]: Key} = {
    'CLIENT_DUMMY': 'CLIENT_DUMMY',
    ':INITIALIZE_DATA': ':INITIALIZE_DATA',

    'LOBBY:ADD_GAME': 'LOBBY:ADD_GAME',
    'LOBBY:ADD_PLAYER_TO_GAME': 'LOBBY:ADD_PLAYER_TO_GAME',
    'LOBBY:REMOVE_GAME': 'LOBBY:REMOVE_GAME',
    'GAME:SET_STATE': 'GAME:SET_STATE',
    'GAME:MAKE_READY': 'GAME:MAKE_READY'
};
export const ClientActionTypes = Object.keys(ClientActionType);

export function isClientActionType(actionType: string): actionType is ClientActionType {
    return ClientActionTypes.indexOf(actionType as any) >= 0;
}

export function isClientAction(action: any): action is ClientAction {
    return action.type && isClientActionType(action.type);
}