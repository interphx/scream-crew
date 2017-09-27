import { PlayerId } from 'shared/player';
import { Task } from 'shared/task';

import { GameSessionState } from 'server/game-session-states/game-session-state';
import { BaseState } from 'server/game-session-states/base-state';
import { PlayerMessenger } from 'server/player-messenger';

export class Gameplay extends BaseState {
    tasks: Map<PlayerId, Task> = new Map();

    constructor(
        messenger: PlayerMessenger, 
        yieldState: (newState: GameSessionState) => void,
        
        protected players: Set<PlayerId>,
        controlsPerPlayer: number
    ) {
        super(messenger, yieldState);
    }

    enter() {

    }
}