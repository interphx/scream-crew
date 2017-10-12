import * as React from 'react';

import { ListedGameInfo } from 'shared/game-session';

interface LobbyProps {
    game: ListedGameInfo;
}

export function LobbyGameEntry(props: LobbyProps) {
    var game = props.game;

    return (
        <tr>
            <td>{ game.id }</td>
            <td>{ game.name }</td>
            <td>{ game.hasPassword }</td>
            <td>{ game.playersCount }</td>
            <td>{ game.state }</td>
        </tr>
    );
}