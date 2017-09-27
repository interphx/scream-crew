import { GameId } from 'shared/game-session';

import { PlayerNotifier } from 'server/player-notifier';
import { GameServer } from 'server/game-server';

interface LobbyServer {
    addGame(game: GameServer): void;
    removeGame(gameId: GameId): void;
}

class SocketIOLobbyServer implements LobbyServer {
    protected games: Map<GameId, GameServer> = new Map();

    constructor(protected notifier: PlayerNotifier) {
        // TODO: Handle new player connections
    }

    addGame(game: GameServer): void {
        if (this.games.has(game.id)) {
            console.warn('Replacing already existing game', game.id);
        }

        this.games.set(game.id, game);
        if (game.listed) {
            this.notifier.broadcast({
                type: 'game-added',
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
        this.notifier.broadcast({
            type: 'game-removed',
            gameId: gameId
        });
    }
}