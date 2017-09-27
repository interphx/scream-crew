import { GameId, GameSessionStateKind } from 'shared/game-session';
import { PlayerId } from 'shared/player';

export interface TypeOfMessage {
    /**
     * Common
     */
    'player-joined': {
        kind: 'player-joined';
        playerId: PlayerId;
    };
    'player-left': {
        kind: 'player-left';
        playerId: PlayerId;
    };

    /**
     * Lobby
     */
    'game-added': {
        kind: 'game-added';
        gameData: {
            id: GameId;
            name: string;
            hasPassword: boolean;
        }
    };
    'game-removed': {
        kind: 'game-removed';
        gameId: GameId;
    };

    /**
     * GameSession
     */
     'awaiting-players-entered': {
         kind: 'awaiting-players-entered';
     };
     'gameplay-entered': {
         kind: 'gameplay-entered';
     };     

    /**
     * GameSession | AwaitingPlayers
     */
    'player-ready': {
        kind: 'player-ready';
        playerId: PlayerId;
    };
};

export type MessageKind = keyof TypeOfMessage;
export type Message = TypeOfMessage[MessageKind];