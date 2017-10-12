import { GameId, GameStateType } from 'shared/game-session';

import { ServerState } from 'server/store';

type PublicGames = {[id: string]: { id: GameId, name: string, state: GameStateType }};

export function getListedGames(state: ServerState): PublicGames {
    var result: PublicGames = {};
    for (var game of Object.values(state.games)) {
        if (game.listed) {
            result[game.id] = {
                id: game.id,
                name: game.name,
                state: game.state
            };
        }
    }

    return result;
}