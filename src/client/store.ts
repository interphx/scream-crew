import { createStore, applyMiddleware } from 'redux';

import { PlayerId, PlayerInfo } from 'shared/player';
import { GameId, ListedGameInfo, GameStateType } from 'shared/game-session';
import { CommonState } from 'shared/state';
import { ActionReplicator } from 'shared/action-replicator';
import { ClientAction } from 'shared/redux-actions/client';

import { app } from 'client/reducers';
import { ServerMessageListener } from 'client/messaging/server-message-listener';

export interface ClientState extends CommonState {
    playerId?: PlayerId;

    games: {
        [id: string]: {
            id: GameId;
            name: string;
            players?: PlayerId[];
            readyPlayers?: PlayerId[];
            state: GameStateType;
        }
    }
}

export function getInitialStoreState(): ClientState {
    return {
        games: {},
        players: {}
    };
}

export function createClientStore(
    replicator: ActionReplicator<ClientState, ClientAction>,
    messageListener: ServerMessageListener,
    defaultState: ClientState = {
        games: {},
        players: {}
    }
) {
    var replicate = (store: any) => (next: any) => (action: any) => {
        if (action.meta && action.meta.remote) {
            console.log(`Got remote action ${action.type}. Dispatching without replicating.`);
            return next(action);
        }

        if (replicator.shouldBeDispatchedLocally(action, store.getState())) {
            console.log(`Dispatching action ${action.type} locally before replicating.`);
            var result = next(action);
            replicator.replicateAction(action, store.getState());
            return result;
        } else {
            console.log(`Replicating action ${action.type} without dispatching.`);
            replicator.replicateAction(action, store.getState());
        }
    };
    
    console.log('Default state', defaultState);
    var store = createStore(app, defaultState, applyMiddleware(replicate));

    messageListener.subscribe('redux-action', (message) => {
        console.log('GOT REDUX ACTION', message);
        var action = message.action;
        action.meta = action.meta || {};
        action.meta.remote = true;

        store.dispatch(action);
    });

    return store;
}