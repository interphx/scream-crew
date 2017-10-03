import { MessageType, MessageInterfaces } from 'shared/messages/server-to-client';
import { PlayerId } from 'shared/player';

export interface MessageListenerBinding {
    destroy(): void;
}

export interface ServerMessageListener {
    subscribe<MsgType extends MessageType>(type: MsgType, handler: (message: MessageInterfaces[MsgType]) => void): MessageListenerBinding;
}