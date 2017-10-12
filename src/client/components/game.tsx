import * as React from 'react';

import { GameId } from 'shared/game-session';
import { PlayerInfo } from 'shared/player';

export interface GameProps {
    game: {
        id: GameId;
        name: string;
        players: PlayerInfo[];
    }
}

export interface GameState {
    
}

export class Game extends React.Component<GameProps, GameState> {
    constructor(props: GameProps) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return <div>Game { this.props.game.name } with { this.props.game.players.join(', ') }</div>
    }
}