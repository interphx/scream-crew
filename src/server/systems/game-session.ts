import { ServerStateContainer } from 'server/server-state-container';
import { PlayerMessageListener } from 'server/messaging/player-message-listener';
import { PlayerMessageSender } from 'server/messaging/player-message-sender';
import { GameState } from 'server/systems/game-states/game-state';
import { AwaitingPlayers } from 'server/systems/game-states/awaiting-players';
import { Gameplay } from 'server/systems/game-states/gameplay';

export class GameSession {
    protected states: GameState[] = [];

    constructor(
        protected stateContainer: ServerStateContainer,
        protected messageListener: PlayerMessageListener,
        protected messageDispatcher: PlayerMessageSender
    ) {
        this.states.push(new AwaitingPlayers(stateContainer, messageListener, messageDispatcher));
        this.states.push(new Gameplay(stateContainer, messageListener, messageDispatcher));
    }

    start() {
        for (var state of this.states) {
            state.start();
        }
    }

    stop() {
        for (var state of this.states) {
            state.stop();
        }
    }
}