import { GameId, GameStateType, ListedGameInfo } from 'shared/game-session';
import { PlayerId } from 'shared/player';

export interface MessageInterfaces {
    'game-added': {
        type: 'game-added';
        gameData: ListedGameInfo;
    };

    'game-removed': {
        type: 'game-removed';
        gameId: GameId;
    };

    'player-added-to-current-game': {
        type: 'player-added-to-current-game';
        playerId: PlayerId;
    };

    'player-removed-from-current-game': {
        type: 'player-removed-from-current-game';
        playerId: PlayerId;
    };

    'game-players-count-changed': {
        type: 'game-players-count-changed';
        gameId: GameId;
        newPlayersCount: number;
    };

    'current-game-state-changed': {
        type: 'game-state-changed';
        newState: GameStateType;
    }
}

export type MessageType = keyof MessageInterfaces;
export type Message = MessageInterfaces[MessageType];