import { PlayerInfo, PlayerId } from 'shared/player';
import { GameInfo, GameId } from 'shared/game-session';

import { PlayerMessageSender } from 'server/messaging/player-message-sender';

export interface ServerStateContainer {
    getAllListedGames(): ReadonlyArray<GameId>;
    gameExists(gameId: GameId): boolean;
    fixNewGameName(name: string): string;
    getGameOwner(gameId: GameId): PlayerId;
    isPlayerPlaying(playerId: PlayerId): boolean;
    addPlayerToGame(playerId: PlayerId, gameId: GameId): void;
    removePlayerFromCurrentGame(playerId: PlayerId): void;
    getGameOfPlayer(playerId: PlayerId): GameId | null;
    getPlayersOfGame(gameId: GameId): ReadonlyArray<PlayerId>;
    getAllLobbyPlayers(): ReadonlyArray<PlayerId>;
    isGameListed(gameId: GameId): boolean;
    addPlayer(playerId: PlayerId, name: string): void;
    deletePlayer(playerId: PlayerId): void;
    addGame(ownerId: PlayerId, newGameId: GameId, name: string, listed: boolean, password: string | undefined): void;
    deleteGame(gameId: GameId): void;
}

export interface ServerState {
    players: {
        [key: string]: PlayerInfo
    };
    games: {
        [key: string]: {
            id: GameId,
            owner: PlayerId,
            name: string,
            listed: boolean,
            password?: string,
            players: PlayerId[]
        }
    };
}

export class SimpleServerStateContainer implements ServerStateContainer {
    protected state: ServerState = {
        players: {},
        games: {}
    };

    constructor() {

    }

    getAllPlayers(): PlayerId[] {
        return Object.keys(this.state.players);
    }

    getAllLobbyPlayers(): ReadonlyArray<PlayerId> {
        return this.getAllPlayers().filter(playerId => !this.isPlayerPlaying(playerId));
    }

    getLobbyPlayers(): PlayerId[] {
        var allPlayers = this.getAllPlayers(),
            allGames = this.getAllGames();
        
        var result: PlayerId[] = [];

        for (var playerId of allPlayers) {
            var playing = false;
            for (var gameId of allGames) {
                if (this.state.games[gameId].players.indexOf(playerId) >= 0) {
                    playing = true;
                    break;
                }
            }
            if (!playing) {
                result.push(playerId);
            }
        }

        return result;
    }

    getPlayersOfGame(gameId: GameId): ReadonlyArray<PlayerId> {
        var game = this.state.games[gameId];
        return game.players;
    }

    getAllGames(): ReadonlyArray<GameId> {
        return Object.keys(this.state.games);
    }

    gameExists(gameId: string): boolean {
        return Boolean(this.state.games[gameId]);
    }

    fixNewGameName(name: string): string {
        var namesakes = Object.values(this.state.games).filter(game => game.name.replace(/\([0-9]+\)$/, '').trim() === name.trim());
        if (namesakes.length > 0) {
            return name + ` ${namesakes.length}`;
        }
        return name;
    }

    getAllListedGames(): ReadonlyArray<string> {
        return Object.keys(this.state.games).filter(key => this.state.games[key].listed);
    }

    getGameOwner(gameId: GameId): PlayerId {
        return this.state.games[gameId].owner;
    }

    getGameOfPlayer(playerId: PlayerId): GameId | null {
        var game = Object.values(this.state.games).find(game => game.players.indexOf(playerId) >= 0);
        if (game) {
            return game.id;
        }
        return null;
    }

    isPlayerPlaying(playerId: PlayerId): boolean {
       return Object.values(this.state.games).some(game => game.players.indexOf(playerId) >= 0);
    }

    isGameListed(gameId: string): boolean {
        return this.state.games[gameId].listed;
    }

    removePlayerFromCurrentGame(playerId: PlayerId): void {
        var game = Object.values(this.state.games).find(game => game.players.indexOf(playerId) >= 0);
        if (game) {
            var index = game.players.indexOf(playerId);
            game.players.splice(index, 1);
        }
    }

    deleteGame(gameId: GameId): void {
        delete this.state.games[gameId];
    }

    addPlayerToGame(playerId: PlayerId, gameId: GameId): void {
        var game = this.state.games[gameId];
        game.players.push(playerId);
    }

    addGame(ownerId: PlayerId, newGameId: GameId, name: string, listed: boolean, password: string | undefined): void {
        this.state.games[newGameId] = {
            id: newGameId,
            owner: ownerId,
            name: name,
            listed: listed,
            password: password,
            players: []
        };
    }
    
    addPlayer(playerId: PlayerId, name: string): void {
        this.state.players[playerId] = {
            id: playerId,
            name: name
        };
    }

    deletePlayer(playerId: PlayerId): void {
        delete this.state.players[playerId];
    }
}