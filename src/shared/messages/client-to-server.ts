import { GameId } from 'shared/game-session';
import { PlayerId } from 'shared/player';
import { Action } from 'shared/actions';

export interface MessageInterfaces {
    'player-connected': {
        type: 'player-connected';
        playerId: PlayerId;
    };

    'player-disconnected': {
        type: 'player-disconnected';
        playerId: PlayerId;
    };

    'create-game': {
        type: 'create-game';
        name: string;
        password?: string;
        listed?: boolean;
    };

    'delete-game': {
        type: 'delete-game';
        gameId: GameId;
    };

    'join-game': {
        type: 'join-game';
        gameId: GameId;
    };

    'leave-current-game': {
        type: 'leave-current-game';
    };

    'ready-to-start': {
        type: 'ready-to-start';
    };

    'control-action': {
        type: 'control-action';
        action: Action;
    };
}

export interface ResponseInterfaces {
    'create-game': { successful: true; newGameId: GameId; } | { successful: false; error: string; }
}

export type RequestMessageType = keyof ResponseInterfaces;
export type Response = ResponseInterfaces[RequestMessageType];
export type RequestMessage = MessageInterfaces[RequestMessageType];
export type RequestMessageInterfaces = { [Key in RequestMessageType]: MessageInterfaces[Key] };

export type MessageType = keyof MessageInterfaces;
export type Message = MessageInterfaces[MessageType];