import { PlayerId } from 'shared/player';

import { PlayerMessenger } from 'server/player-messenger';
import { GameSessionState } from 'server/game-session-states/game-session-state';
import { BaseState } from 'server/game-session-states/base-state';
import { Gameplay } from 'server/game-session-states/gameplay';


export class AwaitingPlayers extends BaseState {
    protected players: Set<PlayerId> = new Set();
    protected readyPlayers: Set<PlayerId> = new Set();

    constructor(messenger: PlayerMessenger, yieldState: (newState: GameSessionState) => void) {
        super(messenger, yieldState);
    }

    enter() {
        this.addSubscriptions([
            this.messenger.subscribe('player-joined', (playerId, message) => {
                if (this.players.has(playerId)) {
                    console.warn(`Attempt to add already existing player ${playerId}`);
                }

                this.players.add(message.playerId);
            }),

            this.messenger.subscribe('player-left', (playerId, message) => {
                if (!this.players.has(playerId)) {
                    console.warn(`Attempt to remove non-existent player ${playerId}`);
                }

                this.players.delete(playerId);
                this.readyPlayers.delete(playerId);
            }),

            this.messenger.subscribe('player-ready', (playerId, message) => {
                this.readyPlayers.add(message.playerId);

                if (this.readyPlayers.size > this.players.size) {
                    console.warn('More readyPlayers than players: ', Array.from(this.readyPlayers), Array.from(this.players));
                }

                if (this.readyPlayers.size >= this.players.size) {
                    this.yieldState(new Gameplay(this.messenger, this.yieldState, this.players));
                }
            }),
        ]);
    }
}