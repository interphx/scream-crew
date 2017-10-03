import * as React from 'react';

import { ListedGameInfo } from 'shared/game-session';

import { LobbyGameEntry } from 'client/components/lobby-game-entry';

interface LobbyProps {
    games: ListedGameInfo[];
}

export function LobbyGamesList(props: LobbyProps) {
    var games = props.games;

    return (
        <div>
            <p>Lobby games list</p>
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>protected?</th>
                    <th>players count</th>
                    <th>state</th>
                </tr>
                { games.map(game => <LobbyGameEntry game={game} key={game.id} />) }
            </table>
        </div>
    );
}