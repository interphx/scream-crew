import { ClientAction } from 'shared/redux-actions/client';
import { GameStateType } from 'shared/game-session';

import { ClientState } from 'client/store';

type Games = ClientState['games'];
type Game = Games[keyof Games];
type Players = ClientState['players'];
type Player = Players[keyof Players];

export function app(state: ClientState, action: ClientAction): ClientState {
    return {
        playerId: action.type === ':INITIALIZE_DATA' ? action.playerId : state.playerId,
        games: action.type === ':INITIALIZE_DATA' ? action.games : games(state.games, action),
        players: players(state.players, action)
    };
}

function games(state: Games, action: ClientAction): Games {
    switch(action.type) {
        case 'LOBBY:ADD_GAME':
            return {
                ...state,
                [action.game.id]: {
                    id: action.game.id,
                    name: action.game.name,
                    state: GameStateType.AwaitingPlayers
                }
            };
        case 'LOBBY:REMOVE_GAME':
            var result = { ...state };
            delete result[action.gameId];
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

function game(state: Game, action: ClientAction): Game {
    switch(action.type) {
        case 'LOBBY:ADD_PLAYER_TO_GAME':
            if (action.gameId !== state.id) return state;
            return {
                ...state,
                players: state.players ? state.players.concat([action.playerId]) : [action.playerId]
            }
    }
    return state;
}

function players(state: Players, action: ClientAction): Players {
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

function player(state: Player, action: ClientAction): Player {
    return state;
}