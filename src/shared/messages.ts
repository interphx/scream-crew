import { GameId, GameSessionState } from 'shared/game-session';
import { PlayerId } from 'shared/player';

/*------------------------------*/
/* Lobby                        */
/*------------------------------*/
interface GameAdded {
    type: 'game-added';
    gameData: {
        id: GameId,
        name: string,
        hasPassword: boolean
    }
};

interface GameRemoved {
    type: 'game-removed';
    gameId: GameId;
};

/*------------------------------*/
/* GameServer                   */
/*------------------------------*/
interface PlayerJoinedGame {
    type: 'player-joined-game';
    playerId: PlayerId;
}

interface PlayerLeftGame {
    type: 'player-left-game';
    playerId: PlayerId;
}

interface GameStateChanged {
    type: 'game-state-changed';
    oldState: GameSessionState;
    newState: GameSessionState;
}


export type Message = 
    | GameAdded 
    | GameRemoved 
    | PlayerJoinedGame 
    | PlayerLeftGame 
    | GameStateChanged;