import { ListedGameInfo } from 'shared/game-session';

import { Store, getInitialStoreState } from 'client/store';
import { Action } from 'client/actions';

function lobbyGames(games: Store['lobbyGames'], action: Action): ListedGameInfo[] {
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

export function app(state: Store = getInitialStoreState(), action: Action): Store {
    return {
        lobbyGames: lobbyGames(state.lobbyGames, action)
    };
}