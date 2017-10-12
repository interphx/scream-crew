import { ServerToClientMessage } from 'shared/messages/server-to-client';
import { PlayerId } from 'shared/player';

export interface PlayerMessageSender {
    broadcast(message: ServerToClientMessage): void;
    sendToOne(playerId: PlayerId, message: ServerToClientMessage): void;
    sendToAll(playerIds: ReadonlyArray<PlayerId>, message: ServerToClientMessage): void;
}