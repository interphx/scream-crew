import { GameState } from "server/systems/game-states/game-state";
import { ServerStateContainer } from "server/server-state-container";
import { PlayerMessageListener, MessageListenerBinding } from "server/messaging/player-message-listener";
import { PlayerMessageSender } from "server/messaging/player-message-sender";

export abstract class BaseGameState implements GameState {
    protected bindings: MessageListenerBinding[] = [];

    constructor(
        protected stateContainer: ServerStateContainer,
        protected messageListener: PlayerMessageListener,
        protected messageDispatcher: PlayerMessageSender
    ) {

    }

    abstract start(): void;
    
    stop(): void {
        this.destroy();
    }

    abstract tick(timestamp: number): void;

    destroy(): void {
        for (var binding of this.bindings) {
            binding.destroy();
        }
        this.bindings.length = 0;
    }
}