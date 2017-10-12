import { ServerToClientMessages, ServerToClientMessageType } from 'shared/messages/server-to-client';
import { PlayerId } from 'shared/player';

export interface MessageListenerBinding {
    destroy(): void;
}

export interface ServerMessageListener {
    subscribe<MsgType extends ServerToClientMessageType>(type: MsgType, handler: (message: ServerToClientMessages[MsgType]) => void): MessageListenerBinding;
}