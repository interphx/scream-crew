import { PlayerId } from 'shared/player';
import { GameId, GameSessionStateKind } from 'shared/game-session';

import { PlayerMessenger, MessageListenerBinding } from 'server/player-messenger';
import { GameSessionState } from 'server/game-session-states/game-session-state';
import { AwaitingPlayers } from 'server/game-session-states/awaiting-players';

export interface GameSessionServer {
    readonly id: GameId;
    readonly name: string;
    readonly listed: boolean;

    getStateKind(): GameSessionStateKind | null;
    hasPassword(): boolean;

    tick(timestamp: number): void;
}

export class SocketIOGameSessionServer implements GameSessionServer {
    protected state: GameSessionState | null;

    constructor(
        protected messenger: PlayerMessenger,

        public id: GameId, 
        public name: string,
        public ownerId: PlayerId,
        public listed: boolean = true,
        protected password: string | null = null
    ) {
        this.state = new AwaitingPlayers(messenger, (newState: GameSessionState) => {
            this.setState(newState);
        });
    }

    getStateKind(): GameSessionStateKind | null {
        if (!this.state) {
            return null;
        }
        return this.state.getKind();
    }

    hasPassword(): boolean {
        return !this.password;
    }

    protected setState(newState: GameSessionState) {
        var oldStateKind = this.getStateKind(),
            newStateKind = newState.getKind();

        if (this.state) {
            this.state.exit();
        }

        this.state = newState;
        this.state.enter();
    }

    tick(timestamp: number): void {
        if (this.state) {
            this.state.tick(timestamp);
        }        
    }
}