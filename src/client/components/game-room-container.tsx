import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ClientAction } from 'shared/redux-actions/client';

import { ClientState } from 'client/store';
import { GameRoom } from 'client/components/game-room';

function mapStateToProps(state: ClientState) {
    var game = Object.values(state.games).find(game => game.players ? game.players.indexOf(state.playerId!) >= 0 : false);
    if (!game) {
        throw new Error('Attempt to render room container, but game is not found!');
    }

    return {
        playerId: state.playerId!,
        gameName: game.name,
        gameId: game.id,
        players: game.players!.map(playerId => 
            ({ ...state.players[playerId], ready: game!.readyPlayers!.indexOf(playerId) >= 0 })
        ),
        isReady: game.readyPlayers!.indexOf(state.playerId!) >= 0
    };
}

function mapDispatchToProps(dispatch: Dispatch<ClientAction>, ownProps: any) {
    return {
        dispatch: dispatch
    };
}

export const GameRoomContainer = connect(mapStateToProps, mapDispatchToProps)(GameRoom);