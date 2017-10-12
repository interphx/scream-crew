import { GameId } from 'shared/game-session';
import { PlayerId } from 'shared/player';

export interface CommonState {
    games: {
        [id: string]: {
            id: GameId;
            name: string;
        }
    };

    players: {
        [id: string]: {
            id: PlayerId;
            name: string;
        }
    };
}