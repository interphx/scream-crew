import { EventEmitter } from 'events';

import * as SocketIO from 'socket.io';

import { Message as ServerToClientMessage, 
         MessageType as ServerToClientMessageType, 
         MessageInterfaces as ServerToClientMessageInterfaces } from 'shared/messages/server-to-client';
import { Message as ClientToServerMessage, 
         MessageType as ClientToServerMessageType, 
         MessageInterfaces as ClientToServerMessageInterfaces } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';
import { getRandomId } from 'shared/utils';

import { PlayerMessageListener, 
         MessageListenerBinding } from 'server/messaging/player-message-listener';
import { PlayerMessageSender } from 'server/messaging/player-message-sender';

type SocketId = string;

export class SocketIOPlayerMessagingService extends EventEmitter implements PlayerMessageSender, PlayerMessageListener {
    protected sockets: Map<PlayerId, SocketIO.Socket> = new Map();

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
            });

            socket.on('message', (message: ClientToServerMessage) => {
                this.emit(message.type, playerId, message);
            });
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
        (type: MsgType, handler: (playerId: PlayerId, message: ClientToServerMessageInterfaces[MsgType]) => void
    ): MessageListenerBinding {
        super.on(type, handler);
        return { destroy: () => this.removeListener(type, handler) };
    }
}