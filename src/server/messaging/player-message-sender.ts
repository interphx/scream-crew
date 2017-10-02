import { Message } from 'shared/messages/server-to-client';
import { PlayerId } from 'shared/player';

export interface PlayerMessageSender {
    broadcast(message: Message): void;
    sendToOne(playerId: PlayerId, message: Message): void;
    sendToAll(playerIds: ReadonlyArray<PlayerId>, message: Message): void;
}