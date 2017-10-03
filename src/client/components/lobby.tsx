import * as React from 'react';
import { connect } from 'react-redux';

import { Store } from 'client/store';
import { LobbyGamesList } from 'client/components/lobby-games-list';

function mapStateToProps(state: Store) {
    return {
        games: state.lobbyGames
    };
}

function mapDispatchToProps(state: Store) {
    return {};
}

export const Lobby = connect(mapStateToProps, mapDispatchToProps)(LobbyGamesList);