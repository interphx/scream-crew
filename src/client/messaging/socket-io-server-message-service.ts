import * as SocketIO from 'socket.io-client';

import { getRandomId } from 'shared/utils';
import { Message as ServerToClientMessage, 
         MessageType as ServerToClientMessageType, 
         MessageInterfaces as ServerToClientMessageInterfaces } from 'shared/messages/server-to-client';
import { Message as ClientToServerMessage, 
         MessageType as ClientToServerMessageType, 
         MessageInterfaces as ClientToServerMessageInterfaces,
         RequestMessageType as ClientToServerRequestMessageType,
         ResponseInterfaces as ClientReceivedResponseInterfaces,
         Response as ClientReceivedResponse,
         RequestMessageInterfaces as ClientToServerRequestMessageInterfaces } from 'shared/messages/client-to-server';

import { ServerMessageListener, MessageListenerBinding } from 'client/messaging/server-message-listener';
import { ServerMessageSender } from 'client/messaging/server-message-sender';

export class SocketIOServerMessageService implements ServerMessageListener, ServerMessageSender {
    protected pendingRequests: { [requestId: string]: (response: ClientReceivedResponse) => void } = {};

    constructor(protected io: SocketIOClient.Socket) {
        this.io.on('response', (response: { requestId: string, message: ClientReceivedResponse}) => {
            var requestId = response.requestId;
            if (this.pendingRequests[requestId]) {
                this.pendingRequests[requestId](response.message);
                delete this.pendingRequests[requestId];
            }
        });
    }

    subscribe<MsgType extends ServerToClientMessageType>(type: MsgType, handler: (message: ServerToClientMessageInterfaces[MsgType]) => void): MessageListenerBinding {
        this.io.on('message', function(message: ServerToClientMessage) {
            console.log(`Got ${message.type} message from server: `, message);
            if (message.type === type) {
                handler(message);
            }
        });
        return { destroy: () => { throw new Error('Not implemented'); } };
    }

    send(message: ClientToServerMessage): void {
        this.io.emit('message', message);
        console.log(`Sent ${message.type} message to server`, message);
    }

    request<MsgType extends "create-game">(message: ClientToServerRequestMessageInterfaces[MsgType]): Promise<ClientReceivedResponseInterfaces[MsgType]> {
        return new Promise((resolve, reject) => {
            var requestId = getRandomId(10);

            this.pendingRequests[requestId] = resolve;

            this.io.emit('request', {
                requestId: requestId,
                message: message
            });

            console.log(`Sent ${message.type} request to server (requestId: ${requestId})`, message);

            setTimeout(() => {
                console.log(`Request ${message.type}/${requestId} timed out! Removing handler.`);
                delete this.pendingRequests[requestId];
                reject('timeout');
            }, 4000);
        });
    }
}