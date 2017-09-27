import { EventEmitter } from 'events';

import * as SocketIO from 'socket.io';

import { Message, MessageKind, TypeOfMessage } from 'shared/messages';
import { PlayerId } from 'shared/player';
import { getRandomId } from 'shared/utils';

export interface PlayerMessenger {
    broadcast(message: Message): void;
    notify(playerId: PlayerId, message: Message): void;
    subscribe<Kind extends MessageKind>(kind: Kind, handler: (playerId: PlayerId, message: TypeOfMessage[Kind]) => void): MessageListenerBinding;
}

export interface MessageListenerBinding {
    destroy(): void;
}

type SocketId = string;

export class SocketIOPlayerNotifier extends EventEmitter implements PlayerMessenger {
    protected sockets: Map<PlayerId, SocketIO.Socket> = new Map();

    constructor(protected io: SocketIO.Server) {
        super();
        io.on('connection', (socket) => {
            var playerId = getRandomId(8);
            this.sockets.set(playerId, socket);

            this.emit('player-joined', { playerId });

            socket.on('disconnect', () => {
                this.sockets.delete(playerId);
                this.emit('player-left', { playerId });
            });

            socket.on('message', (message: Message) => {
                this.emit(message.kind, playerId, message);
            });
        });
    }

    broadcast(message: Message) {
        this.io.emit('message', message);
    }

    notify(playerId: PlayerId, message: Message) {
        var socket = this.sockets.get(playerId);

        if (!socket) {
            console.warn('Attempt to notify a non-existent player', playerId);
            return;
        }

        socket.emit('message', message);
    }

    subscribe<Kind extends MessageKind>(kind: Kind, handler: (playerId: PlayerId, message: TypeOfMessage[Kind]) => void): MessageListenerBinding {
        super.on(kind, handler);
        return { destroy: () => this.removeListener(kind, handler) };
    }
}