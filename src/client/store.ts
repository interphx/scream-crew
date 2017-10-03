import { createStore } from 'redux';

import { PlayerId, PlayerInfo } from 'shared/player';
import { GameId, ListedGameInfo } from 'shared/game-session';

import { app } from 'client/reducers';

export interface Store {
    lobbyGames: ListedGameInfo[];
}

export function getInitialStoreState(): Store {
    return {
        lobbyGames: []
    };
}

export function createStateContainer() {
    return createStore(app);
}