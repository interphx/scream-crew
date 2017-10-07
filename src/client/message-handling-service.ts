import { Store } from 'redux';

import { ServerMessageListener } from 'client/messaging/server-message-listener';
import { Store as ClientStore } from 'client/store';
import { addGame, removeGame, setPlayerStatus, setCurrentGame } from 'client/actions';
import { PlayerStatus } from 'client/player-status';

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
        this.listener.subscribe('you-added-to-game', (message) => {
            this.store.dispatch(setPlayerStatus(PlayerStatus.Preparing));
            this.store.dispatch(setCurrentGame(message.gameId, message.gameName));
        });
    }

    stop() {

    }
}