import { GameState } from "server/systems/game-states/game-state";
import { ServerStateContainer } from "server/server-state-container";
import { PlayerMessageListener, MessageListenerBinding } from "server/messaging/player-message-listener";
import { PlayerMessageSender } from "server/messaging/player-message-sender";
import { BaseGameState } from "server/systems/game-states/base-game-state";

export class Gameplay extends BaseGameState {
    protected bindings: MessageListenerBinding[] = [];

    constructor(
        protected stateContainer: ServerStateContainer,
        protected messageListener: PlayerMessageListener,
        protected messageDispatcher: PlayerMessageSender
    ) {
        super(stateContainer, messageListener, messageDispatcher);
    }

    start(): void {

    }

    tick(timestamp: number): void {
        
    }
}