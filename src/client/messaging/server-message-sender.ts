import { Message, RequestMessageType, MessageInterfaces, RequestMessageInterfaces, ResponseInterfaces } from 'shared/messages/client-to-server';
import { PlayerId } from 'shared/player';

export interface ServerMessageSender {
    send(message: Message): void;
    request<MsgType extends RequestMessageType>(message: RequestMessageInterfaces[MsgType]): Promise<ResponseInterfaces[MsgType]>;
}