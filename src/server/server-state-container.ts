import { PlayerInfo, PlayerId } from 'shared/player';
import { GameId, GameStateType, ListedGameInfo } from 'shared/game-session';

import { PlayerMessageSender } from 'server/messaging/player-message-sender';

export interface ServerStateContainer {
    getAllListedGames(): ReadonlyArray<GameId>;
    gameExists(gameId: GameId): boolean;
    fixNewGameName(name: string): string;
    getGameOwner(gameId: GameId): PlayerId;
    getGameName(gameId: GameId): string;
    isPlayerPlaying(playerId: PlayerId): boolean;
    addPlayerToGame(playerId: PlayerId, gameId: GameId): void;
    removePlayerFromCurrentGame(playerId: PlayerId): void;
    getGameOfPlayer(playerId: PlayerId): GameId | null;
    getPlayersOfGame(gameId: GameId): ReadonlyArray<PlayerId>;
    getAllLobbyPlayers(): ReadonlyArray<PlayerId>;
    isGameListed(gameId: GameId): boolean;
    getListedGameInfo(gameId: GameId): ListedGameInfo;
    addPlayer(newPlayerData: {
        id: PlayerId,
        name: string
    }): void;
    deletePlayer(playerId: PlayerId): void;
    addGame(newGameData: {
        id: GameId,
        name: string,
        listed: boolean,
        password?: string,
        ownerId: PlayerId,
        stateType: GameStateType
    }): void;
    deleteGame(gameId: GameId): void;
}

export interface ServerState {
    players: {
        [key: string]: {
            id: PlayerId;
            name: string;
        }
    };
    games: {
        [key: string]: {
            id: GameId;
            owner: PlayerId;
            name: string;
            listed: boolean;
            password?: string;
            players: PlayerId[];
            stateType: GameStateType;
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

    getGameName(gameId: GameId): string {
        return this.state.games[gameId].name;
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

    getListedGameInfo(gameId: GameId): ListedGameInfo {
        var game = this.state.games[gameId];
        return {
            id: gameId,
            name: game.name,
            hasPassword: Boolean(game.password),
            playersCount: game.players.length,
            stateType: game.stateType
        };
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

    addGame(newGameData: {
        id: GameId,
        name: string,
        listed: boolean,
        password?: string,
        ownerId: PlayerId,
        stateType: GameStateType
    }): void {
        this.state.games[newGameData.id] = {
            id: newGameData.id,
            owner: newGameData.ownerId,
            name: newGameData.name,
            listed: newGameData.listed,
            stateType: newGameData.stateType,
            password: newGameData.password,
            players: []
        };
    }
    
    addPlayer(newPlayerData: {
        id: PlayerId,
        name: string
    }): void {
        this.state.players[newPlayerData.id] = {
            id: newPlayerData.id,
            name: newPlayerData.name
        };
    }

    deletePlayer(playerId: PlayerId): void {
        delete this.state.players[playerId];
    }
}