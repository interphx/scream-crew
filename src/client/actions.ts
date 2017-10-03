import { ListedGameInfo, GameId } from 'shared/game-session';

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

export type Action = AddGame | RemoveGame;