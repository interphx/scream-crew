import { ClientToServerMessage } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';

export interface ServerMessageSender {
    send(message: ClientToServerMessage): void;
    //request<MsgType extends RequestMessageType>(message: RequestMessageInterfaces[MsgType]): Promise<ResponseInterfaces[MsgType]>;
}