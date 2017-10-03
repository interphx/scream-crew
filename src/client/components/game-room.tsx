import * as React from 'react';

import { PlayerInfo, PlayerId } from 'shared/player';
import { ListedGameInfo } from 'shared/game-session';

interface GameRoomProps {
    game: ListedGameInfo;
    players: PlayerInfo[];
    readyPlayers: PlayerId[];
}

function isPlayerReady(playerId: PlayerId, readyPlayers: PlayerId[]): boolean {
    return readyPlayers.indexOf(playerId) >= 0;
}

function ready(playerId: PlayerId) {

}

export function GameRoom(props: GameRoomProps) {
    var game = props.game,
        players = props.players,
        readyPlayers = props.readyPlayers;

    return (
        <div>
            <h3>{ game.name }</h3>
            <ul>
                { players.map(player => <li>{ player.name } { isPlayerReady(player.id, readyPlayers) ? '(готов)' : '' }</li>) }
            </ul>
            <button onClick={() => ready}>My body is ready</button>
        </div>
    );
}