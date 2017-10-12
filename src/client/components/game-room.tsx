import * as React from 'react';
import { Dispatch } from 'react-redux';

import { PlayerInfo, PlayerId } from 'shared/player';
import { ListedGameInfo, GameId } from 'shared/game-session';
import { ClientAction } from 'shared/redux-actions/client';

import { ServerMessageSender } from 'client/messaging/server-message-sender';

type Player = {
    id: PlayerId;
    name: string;
    ready: boolean;
}

interface GameRoomProps {
    playerId: PlayerId;
    gameId: GameId;
    gameName: string;
    players: Player[];
    isReady: boolean;

    dispatch: Dispatch<ClientAction>;
}

export interface GameRoomState {
    
}

export class GameRoom extends React.Component<GameRoomProps, GameRoomState> {
    constructor(props: GameRoomProps) {
        super(props);
        this.state = {
            
        }

        this.ready = this.ready.bind(this);
        this.renderPlayer = this.renderPlayer.bind(this);
    }

    ready() {
        this.props.dispatch({
            type: 'GAME:MAKE_READY',
            playerId: this.props.playerId
        });
    }

    renderPlayer(player: Player) {
        return <li>{ player.name } { player.ready ? '(готов)' : '' }</li>;
    }

    render() {
        var {
            gameName,
            players, 
            isReady
        } = this.props;

        return (
            <div>
                <h3>{ gameName }</h3>
                <ul>
                    { players.map(this.renderPlayer) }
                </ul>
                <button onClick={this.ready}
                        disabled={isReady}>My body is ready</button>
            </div>
        );
    }
}