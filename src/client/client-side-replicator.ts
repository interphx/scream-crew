import { ActionReplicator } from 'shared/action-replicator';
import { ClientAction } from 'shared/redux-actions/client';
import { isServerAction } from 'shared/redux-actions/server';

import { ClientState } from 'client/store';
import { ServerMessageSender } from 'client/messaging/server-message-sender';

export class ClientSideReplicator implements ActionReplicator<ClientState, ClientAction> {
    constructor(
        protected messageSender: ServerMessageSender
    ) {

    }

    replicateAction(action: ClientAction, updatedState: ClientState): void {
        console.log(`Replicating ${action.type} to the server`);

        if (!isServerAction(action)) {
            return;
        }

        this.messageSender.send({
            type: 'redux-action',
            action: action
        });
    }

    shouldBeDispatchedLocally(action: ClientAction, oldState: ClientState): boolean {
        return false;
    }
}