import { ListedGameInfo } from 'shared/game-session';

import { Store, getInitialStoreState } from 'client/store';
import { Action } from 'client/actions';

function lobbyGames(games: Store['lobbyGames'], action: Action): Store['lobbyGames'] {
    switch (action.type) {
        case 'add-game':
            return [...games, action.gameData];
        case 'remove-game':
            var index = games.findIndex(game => game.id === action.gameId);
            return [...games.slice(0, index), ...games.slice(index + 1)];
        default:
            return games;
    }
}

function playerStatus(status: Store['playerStatus'], action: Action): Store['playerStatus'] {
    switch (action.type) {
        case 'set-player-status':
            return action.status;
        default:
            return status;
    }
}

function currentGameData(gameId: Store['currentGameData'], action: Action): Store['currentGameData'] {
    switch (action.type) {
        case 'set-current-game':
            return {
                id: action.gameId,
                name: action.name
            };
        default:
            return gameId;
    }
}

export function app(state: Store = getInitialStoreState(), action: Action): Store {
    return {
        lobbyGames: lobbyGames(state.lobbyGames, action),
        playerStatus: playerStatus(state.playerStatus, action),
        currentGameData: currentGameData(state.currentGameData, action)
    };
}