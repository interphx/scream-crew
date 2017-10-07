import { createStore } from 'redux';

import { PlayerId, PlayerInfo } from 'shared/player';
import { GameId, ListedGameInfo } from 'shared/game-session';

import { app } from 'client/reducers';
import { PlayerStatus } from 'client/player-status';

export interface Store {
    lobbyGames: ListedGameInfo[];
    playerStatus: PlayerStatus;
    currentGameData: null | {
        id: GameId;
        name: string;
    };
}

export function getInitialStoreState(): Store {
    return {
        lobbyGames: [],
        playerStatus: PlayerStatus.Idle,
        currentGameData: null
    };
}

export function createStateContainer() {
    return createStore(app);
}