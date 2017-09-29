import { createStore } from 'redux';

import { PlayerId, PlayerInfo } from 'shared/player';
import { GameId, GameInfo } from 'shared/game-session';

import { app } from 'client/reducers';

export interface Store {
    players: {
        [key: string]: PlayerInfo
    },

    games: {
        [key: string]: GameInfo
    }
}

export function getInitialStoreState(): Store {
    return {
        players: {},
        games: {}
    };
}

export function createStateContainer() {
    return createStore(app);
}