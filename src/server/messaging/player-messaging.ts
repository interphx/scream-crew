import { EventEmitter } from 'events';

import * as SocketIO from 'socket.io';

import { ServerToClientMessage, 
         ServerToClientMessageType, 
         ServerToClientMessages } from 'shared/messages/server-to-client';
import { ClientToServerMessage, 
         ClientToServerMessageType, 
         ClientToServerMessages } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';
import { getRandomId } from 'shared/utils';

import { PlayerMessageListener, 
         MessageListenerBinding } from 'server/messaging/player-message-listener';
import { PlayerMessageSender } from 'server/messaging/player-message-sender';
import { getListedGames } from 'server/utils/games';

type SocketId = string;

export class SocketIOPlayerMessagingService extends EventEmitter implements PlayerMessageSender, PlayerMessageListener {
    protected sockets: Map<PlayerId, SocketIO.Socket> = new Map();
    /*protected requestHandlers: {
        [Key in ClientToServerRequestMessageType]?: 
            (playerId: PlayerId, request: ClientToServerMessageInterfaces[Key]) => ClientToServerResponseInterfaces[Key] | Promise<ClientToServerResponseInterfaces[Key]>
    } = {};*/

    constructor(protected io: SocketIO.Server) {
        super();
        io.on('connection', (socket) => {
            var playerId = getRandomId(8);
            this.sockets.set(playerId, socket);

            this.emit('player-connected', playerId, { playerId });

            console.log(`Player connected: ${playerId}`);

            socket.on('disconnect', () => {
                this.sockets.delete(playerId);
                this.emit('player-disconnected', playerId, { playerId });
                console.log(`Player disconnected: ${playerId}. Bye!`);
            });

            socket.on('message', (message: ClientToServerMessage) => {
                console.log(`Got message (${message.type}).`);
                this.emit(message.type, playerId, message);
            });

            /*socket.on('request', (request: { requestId: string, message: ClientToServerRequestMessage }) => {
                var type = request.message.type,
                    handler = this.requestHandlers[type];

                console.log(`Got ${type} request: `, request);

                if (handler) {
                    console.log(`Found handler for ${type}. Resolving...`);
                    var responseData = handler(playerId, request.message);
                    Promise.resolve(responseData).then(response => {
                        socket.emit('response', {
                            requestId: request.requestId,
                            message: responseData
                        });
                        console.log(`Resolved! Sent response to ${type}.`);
                    });
                }
            });*/
        });
    }

    broadcast(message: ServerToClientMessage) {
        this.io.emit('message', message);
    }

    sendToOne(playerId: PlayerId, message: ServerToClientMessage) {
        var socket = this.sockets.get(playerId);

        if (!socket) {
            console.warn('Attempt to notify a non-existent player', playerId);
            return;
        }

        socket.emit('message', message);
    }

    sendToAll(playerIds: PlayerId[], message: ServerToClientMessage) {
        for (var playerId of playerIds) {
            this.sendToOne(playerId, message);
        }
    }

    subscribe<MsgType extends ClientToServerMessageType>
        (type: MsgType, handler: (playerId: PlayerId, message: ClientToServerMessages[MsgType]) => void
    ): MessageListenerBinding {
        console.log(`Subscribed to ${type}`);
        super.on(type, handler);
        return { destroy: () => this.removeListener(type, handler) };
    }

    /*addRequestHandler<MsgType extends ClientToServerRequestMessageType>(
        type: MsgType, 
        handler: (playerId: string, message: ClientToServerMessageInterfaces[MsgType]
    ) => ClientToServerResponseInterfaces[MsgType]): MessageListenerBinding {
        if (this.requestHandlers[type]) {
            throw new Error(`Attempt to replace an existing request handler: ${type}`);
        }
        this.requestHandlers[type] = handler;

        return { 
            destroy: () => { 
                if (this.requestHandlers[type] === handler) {
                    delete this.requestHandlers[type];
                }
            }
        };

    }*/

}