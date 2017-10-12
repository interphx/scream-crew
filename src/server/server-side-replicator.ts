import { ActionReplicator } from 'shared/action-replicator';
import { ServerAction } from 'shared/redux-actions/server';
import { isClientAction } from 'shared/redux-actions/client';

import { ServerState } from 'server/store';
import { PlayerMessageSender } from 'server/messaging/player-message-sender';

export class ServerSideReplicator implements ActionReplicator<ServerState, ServerAction> {
    constructor(
        protected messageSender: PlayerMessageSender
    ) {

    }

    replicateAction(action: ServerAction, updatedState: ServerState): void {
        console.log(`Replicating ${action.type} to clients`);

        if (!isClientAction(action)) {
            return;
        }

        this.messageSender.broadcast({
            type: 'redux-action',
            action: action
        });
    }

    shouldBeDispatchedLocally(action: ServerAction, oldState: ServerState): boolean {
        return true;
    }
}