import * as React from 'react';
import { connect } from 'react-redux';

import { ClientState } from 'client/store';
import { LobbyGamesList } from 'client/components/lobby-games-list';

function mapStateToProps(state: ClientState) {
    return {
        games: Object.values(state.games)
    };
}

function mapDispatchToProps(state: ClientState) {
    return {};
}

export const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(LobbyGamesList);