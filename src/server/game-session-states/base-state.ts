import { Disposable } from 'shared/disposable';
import { GameSessionStateKind } from 'shared/game-session';

import { GameSessionState } from 'server/game-session-states/game-session-state';
import { PlayerMessenger, MessageListenerBinding } from 'server/player-messenger';

export abstract class BaseState implements GameSessionState, Disposable {
    protected bindings: MessageListenerBinding[] = [];

    constructor(
        protected messenger: PlayerMessenger, 
        protected yieldState: (newState: GameSessionState) => void
    ) {

    }

    protected addSubscription(binding: MessageListenerBinding) {
        this.bindings.push(binding);
    }

    protected addSubscriptions(bindings: MessageListenerBinding[]) {
        for (var binding of bindings) {
            this.addSubscription(binding);
        }
    }

    enter() {

    }

    tick(timestamp: number) {
        
    }

    exit() {
        this.destroy();
    }

    getKind(): GameSessionStateKind {
        var className = this.constructor.name;
        if (className) {
            return GameSessionStateKind[className as keyof typeof GameSessionStateKind];
        }
        throw new Error(`Unable to get game session state kind: ${className}`);
    }

    destroy() {
        for (var binding of this.bindings) {
            binding.destroy();
        }
        this.bindings.length = 0;
    }
}