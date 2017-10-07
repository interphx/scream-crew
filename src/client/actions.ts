import { ListedGameInfo, GameId } from 'shared/game-session';

import { PlayerStatus } from 'client/player-status';

export interface AddGame {
    type: 'add-game';
    gameData: ListedGameInfo;
}

export function addGame(gameData: ListedGameInfo): AddGame {
    return {
        type: 'add-game',
        gameData: gameData
    };
}

export interface RemoveGame {
    type: 'remove-game';
    gameId: GameId;
}

export function removeGame(gameId: GameId): RemoveGame {
    return {
        type: 'remove-game',
        gameId: gameId
    }
}

export interface SetPlayerStatus {
    type: 'set-player-status';
    status: PlayerStatus;
}

export function setPlayerStatus(status: PlayerStatus): SetPlayerStatus {
    return {
        type: 'set-player-status',
        status: status
    };
}

export interface SetCurrentGame {
    type: 'set-current-game',
    gameId: GameId;
    name: string;
}

export function setCurrentGame(gameId: GameId, name: string): SetCurrentGame {
    return {
        type: 'set-current-game',
        gameId: gameId,
        name: name
    };
}

export type Action = AddGame | RemoveGame | SetPlayerStatus | SetCurrentGame;