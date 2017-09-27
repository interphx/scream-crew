import { GameId } from 'shared/game-session';

import { PlayerMessenger } from 'server/player-messenger';
import { GameSessionServer } from 'server/game-server';

interface LobbyServer {
    addGame(game: GameSessionServer): void;
    removeGame(gameId: GameId): void;
}

class SocketIOLobbyServer implements LobbyServer {
    protected games: Map<GameId, GameSessionServer> = new Map();

    constructor(protected messenger: PlayerMessenger) {
        // TODO: Handle new player connections
    }

    addGame(game: GameSessionServer): void {
        if (this.games.has(game.id)) {
            console.warn('Replacing already existing game', game.id);
        }

        this.games.set(game.id, game);
        if (game.listed) {
            this.messenger.broadcast({
                kind: 'game-added',
                gameData: {
                    id: game.id,
                    name: game.name,
                    hasPassword: game.hasPassword()
                }
            });
        }
    }

    removeGame(gameId: GameId): void {
        if (!this.games.has(gameId)) {
            console.warn('Attempt to remove a non-existent game', gameId);
        }

        this.games.delete(gameId);
        this.messenger.broadcast({
            kind: 'game-removed',
            gameId: gameId
        });
    }
}