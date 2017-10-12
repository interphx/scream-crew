import { CommonMessages } from 'shared/messages/common';
import { PlayerId } from 'shared/player';
import { GameId } from 'shared/game-session';
import { ClientAction } from 'shared/redux-actions/client';

export interface ServerToClientMessages extends CommonMessages {
    'redux-action': {
        type: 'redux-action';
        action: ClientAction;
    }
}

export type ServerToClientMessageType = keyof ServerToClientMessages;
export type ServerToClientMessage = ServerToClientMessages[ServerToClientMessageType];