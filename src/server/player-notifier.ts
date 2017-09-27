import * as SocketIO from 'socket.io';

import { Message } from 'shared/messages';
import { PlayerId } from 'shared/player';
import { getRandomId } from 'shared/utils';

export interface PlayerNotifier {
    broadcast(message: Message): void;
    notify(playerId: PlayerId, message: Message): void;

    // TODO: Handle new player connections
}

export class SocketIOPlayerNotifier implements PlayerNotifier {
    protected sockets: Map<PlayerId, SocketIO.Socket> = new Map();

    constructor(protected io: SocketIO.Server) {
        io.on('connection', (socket) => {
            var playerId = getRandomId(8);
            this.sockets.set(playerId, socket);

            socket.on('disconnect', () => {
                this.sockets.delete(playerId);
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
}