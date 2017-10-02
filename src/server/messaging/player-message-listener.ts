import { MessageType, MessageInterfaces } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';

export interface MessageListenerBinding {
    destroy(): void;
}

export interface PlayerMessageListener {
    subscribe<MsgType extends MessageType>(type: MsgType, handler: (playerId: PlayerId, message: MessageInterfaces[MsgType]) => void): MessageListenerBinding;
}
