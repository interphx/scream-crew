import { ServerAction } from 'shared/redux-actions/server';
import { GameStateType } from 'shared/game-session';

import { ServerState } from 'server/store';

type Games = ServerState['games'];
type Game = Games[keyof Games];
type Players = ServerState['players'];
type Player = Players[keyof Players];

export function app(state: ServerState, action: ServerAction): ServerState {
    return {
        games: games(state.games, action),
        players: players(state.players, action)
    };
}

function games(state: Games, action: ServerAction): Games {
    switch(action.type) {
        case 'LOBBY:ADD_GAME':
            return {
                ...state,
                [action.game.id]: {
                    id: action.game.id,
                    name: action.game.name,
                    owner: action.game.owner,
                    listed: action.game.listed,
                    password: action.game.password ? action.game.password.trim() : undefined,
                    state: GameStateType.AwaitingPlayers,
                    players: []
                }
            };
        case 'LOBBY:REMOVE_GAME':
            var result = { ...state };
            delete result[action.gameId];
            return result;
        case 'GAME:SET_STATE':
            var result = { ...state };
            result[action.gameId] = { ...result[action.gameId], state: action.state };
            return result;
    }
    
    var result = { ...state };
    for (var gameId in result) {
        if (result.hasOwnProperty(gameId)) {
            result[gameId] = game(result[gameId], action);
        }
    }
    return result;
}

function game(state: Game, action: ServerAction): Game {
    switch(action.type) {
        case 'LOBBY:ADD_PLAYER_TO_GAME':
            if (action.gameId !== state.id) return state;
            return {
                ...state,
                players: state.players.concat([action.playerId])
            }
    }
    return state;
}

function players(state: Players, action: ServerAction): Players {
    switch(action.type) {
    }

    var result = { ...state };
    for (var playerId in result) {
        if (result.hasOwnProperty(playerId)) {
            result[playerId] = player(result[playerId], action);
        }
    }
    return result;
}

function player(state: Player, action: ServerAction): Player {
    return state;
}