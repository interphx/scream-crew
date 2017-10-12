import { ClientToServerMessageType, ClientToServerMessages } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';

export interface MessageListenerBinding {
    destroy(): void;
}

export interface PlayerMessageListener {
    subscribe<MsgType extends ClientToServerMessageType>
        (type: MsgType, handler: (playerId: PlayerId, message: ClientToServerMessages[MsgType]) => void): MessageListenerBinding;
//    addRequestHandler<MsgType extends RequestMessageType>(type: MsgType, handler: (playerId: PlayerId, message: MessageInterfaces[MsgType]) => ResponseInterfaces[MsgType]): MessageListenerBinding;
}
