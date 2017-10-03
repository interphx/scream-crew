import { Store } from 'redux';

import { ServerMessageListener } from 'client/messaging/server-message-listener';
import { Store as ClientStore } from 'client/store';
import { addGame, removeGame } from 'client/actions';

export class MessageHandlingService {
    constructor(
        protected listener: ServerMessageListener,
        protected store: Store<ClientStore | undefined>
    ) {
        
    }

    start() {
        this.listener.subscribe('game-added', (message) => {
            this.store.dispatch(addGame(message.gameData));
        });
        this.listener.subscribe('game-removed', (message) => {
            this.store.dispatch(removeGame(message.gameId));
        });
    }

    stop() {

    }
}