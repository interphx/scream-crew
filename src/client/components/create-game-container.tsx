import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ClientAction } from 'shared/redux-actions/client';

import { ClientState } from 'client/store';
import { CreateGame } from 'client/components/create-game';

function mapStateToProps(state: ClientState) {

    return {
        playerId: state.playerId!
    };
}

function mapDispatchToProps(dispatch: Dispatch<ClientAction>, ownProps: any) {
    return {
        dispatch: dispatch
    };
}

export const CreateGameContainer = connect(mapStateToProps, mapDispatchToProps)(CreateGame);