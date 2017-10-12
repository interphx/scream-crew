import { GameId, GameStateType } from 'shared/game-session';
import { PlayerId } from 'shared/player';

export interface CommonActions {
    'LOBBY:ADD_GAME': {
        type: 'LOBBY:ADD_GAME';
        game: {
            id: GameId;
            name: string;
            owner: PlayerId;
            listed: boolean;
            password?: string;
        }
    }

    'LOBBY:REMOVE_GAME': {
        type: 'LOBBY:REMOVE_GAME';
        gameId: GameId;
    }

    'LOBBY:ADD_PLAYER_TO_GAME': {
        type: 'LOBBY:ADD_PLAYER_TO_GAME';
        playerId: PlayerId;
        gameId: GameId;
    }

    'GAME:MAKE_READY': {
        type: 'GAME:MAKE_READY';
        playerId: PlayerId;
    }

    'GAME:SET_STATE': {
        type: 'GAME:SET_STATE';
        gameId: GameId;
        state: GameStateType;
    }
}

export type CommonActionType = keyof CommonActions;
export type CommonActionMeta = {
    meta?: {
        remote?: boolean;
    }
};
export type CommonAction = CommonActions[CommonActionType] & CommonActionMeta;

export const CommonActionType : {[Key in CommonActionType]: Key} = {
    'LOBBY:ADD_GAME': 'LOBBY:ADD_GAME',
    'LOBBY:ADD_PLAYER_TO_GAME': 'LOBBY:ADD_PLAYER_TO_GAME',
    'LOBBY:REMOVE_GAME': 'LOBBY:REMOVE_GAME',
    'GAME:SET_STATE': 'GAME:SET_STATE',
    'GAME:MAKE_READY': 'GAME:MAKE_READY'
};
export const CommonActionTypes = Object.keys(CommonActionType);