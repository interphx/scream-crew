import * as React from 'react';

import { PlayerInfo, PlayerId } from 'shared/player';
import { ListedGameInfo } from 'shared/game-session';

import { ServerMessageSender } from 'client/messaging/server-message-sender';
import { PlayerStatus } from 'client/player-status';

interface GameRoomProps {
    game: ListedGameInfo;
    players: PlayerInfo[];
    readyPlayers: PlayerId[];
    playerStatus: PlayerStatus;

    messageSender: ServerMessageSender;
}

function isPlayerReady(playerId: PlayerId, readyPlayers: PlayerId[]): boolean {
    return readyPlayers.indexOf(playerId) >= 0;
}

function ready(messageSender: ServerMessageSender) {
    messageSender.send({type: 'ready-to-start'});
}

export function GameRoom(props: GameRoomProps) {
    var {
        game,
        players, 
        readyPlayers,
        playerStatus
    } = props;

    return (
        <div>
            <h3>{ game.name }</h3>
            <ul>
                { players.map(player => <li>{ player.name } { isPlayerReady(player.id, readyPlayers) ? '(готов)' : '' }</li>) }
            </ul>
            <button onClick={() => ready}
                    disabled={playerStatus >= PlayerStatus.ReadyToStart}>My body is ready</button>
        </div>
    );
}