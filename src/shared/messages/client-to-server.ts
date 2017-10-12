import { CommonMessages } from 'shared/messages/common';
import { PlayerId } from 'shared/player';
import { GameId } from 'shared/game-session';
import { ServerAction } from 'shared/redux-actions/server';

export interface ClientToServerMessages extends CommonMessages {
    'initialize-my-data': {
        type: 'initialize-my-data';
    }

    'redux-action': {
        type: 'redux-action';
        action: ServerAction;
    }
}

export type ClientToServerMessageType = keyof ClientToServerMessages;
export type ClientToServerMessage = ClientToServerMessages[ClientToServerMessageType];