import { createStore, applyMiddleware, Middleware, Store as ReduxStore, MiddlewareAPI } from 'redux';

import { CommonState } from 'shared/state';
import { ActionReplicator } from 'shared/action-replicator';
import { PlayerInfo, PlayerId } from 'shared/player';
import { GameId, GameStateType, ListedGameInfo } from 'shared/game-session';
import { ServerAction } from 'shared/redux-actions/server';

import { PlayerMessageSender } from 'server/messaging/player-message-sender';
import { app } from 'server/reducers';
import { PlayerMessageListener } from 'server/messaging/player-message-listener';

export interface ServerState extends CommonState {
    games: {
        [id: string]: {
            id: GameId;
            name: string;
            owner: PlayerId;
            listed: boolean;
            password?: string;
            players: PlayerId[];
            state: GameStateType;
        }
    };

    players: {
        [id: string]: {
            id: PlayerId;
            name: string;
        }
    };
}


export function createServerStore(
    replicator: ActionReplicator<ServerState, ServerAction>,
    messageListener: PlayerMessageListener,
    defaultState: ServerState = {
        games: {},
        players: {}
    }
) {
    var replicate = (store: any) => (next: any) => (action: any) => {
        if (action.meta && action.meta.remote) {
            // Are you sure this will work?
            console.log(`Got remote action ${action.type}. Dispatching without replicating.`);
            return next(action);
        }

        if (replicator.shouldBeDispatchedLocally(action, store.getState())) {
            console.log(`Dispatching action ${action.type} before replicating.`);
            var result = next(action);
            replicator.replicateAction(action, store.getState());
            return result;
        } else {
            console.log(`Replicating action ${action.type} without dispatching.`);
            replicator.replicateAction(action, store.getState());
        }
    };

    var store = createStore(app, defaultState, applyMiddleware(replicate));

    messageListener.subscribe('redux-action', (playerId, message) => {
        // TODO: Restrict player access to certain actions and resources
        store.dispatch(message.action);
    });

    return store;
}