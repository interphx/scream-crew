import { PlayerId } from 'shared/player';
import { GameId, GameSessionState } from 'shared/game-session';

import { PlayerNotifier } from 'server/player-notifier';

export interface GameServer {
    readonly id: GameId;
    readonly name: string;
    readonly listed: boolean;

    getState(): GameSessionState;
    hasPassword(): boolean;

    addPlayer(playerId: PlayerId): void;
    removePlayer(playerId: PlayerId): void;
    tick(timestamp: number): void;
}

export class SocketIOGameServer implements GameServer {
    protected players: Set<PlayerId> = new Set();
    protected state: GameSessionState = GameSessionState.AwaitingPlayers;

    constructor(
        protected notifier: PlayerNotifier,

        public id: GameId, 
        public name: string,
        public listed: boolean = true,
        protected password: string | null = null
    ) {
        // TODO: Handle new player connections
    }

    getState() {
        return this.state;
    }

    hasPassword(): boolean {
        return !this.password;
    }

    protected setState(newState: GameSessionState) {
        var oldState = this.state;
        this.state = newState;
        this.notifier.broadcast({
            type: 'game-state-changed',
            oldState: oldState,
            newState: newState
        })
    }

    addPlayer(playerId: PlayerId): void {
        if (this.players.has(playerId)) {
            console.warn(`Attempt to add already existing player ${playerId} to game ${this.id}`);
        }

        this.players.add(playerId);
        this.notifier.broadcast({
            type: 'player-joined-game',
            playerId: playerId
        });
    }

    removePlayer(playerId: PlayerId): void {
        if (!this.players.has(playerId)) {
            console.warn(`Attempt to remove non-existent player ${playerId} from game ${this.id}`);
        }

        this.players.delete(playerId);
        this.notifier.broadcast({
            type: 'player-left-game',
            playerId: playerId
        });
    }

    tick(timestamp: number): void {

    }
}