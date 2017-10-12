import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import * as SocketIO from 'socket.io-client';

import { getRandomId } from 'shared/utils';
import { GameStateType } from 'shared/game-session';

import { createClientStore, ClientState } from 'client/store';
import { SocketIOServerMessageService } from 'client/messaging/socket-io-server-message-service';
import { ServerMessageSender } from 'client/messaging/server-message-sender';
import { ClientSideReplicator } from 'client/client-side-replicator';
import { LobbyContainer } from 'client/components/lobby-container';
import { GameRoomContainer } from 'client/components/game-room-container';
import { CreateGameContainer } from 'client/components/create-game-container';

interface AppProps {
    state: ClientState;
}

interface AppState {

}

class BaseApp extends React.Component<AppProps, AppState> {
    render() {
        var {
            playerId,
            games
        } = this.props.state;

        if (!playerId) {
            return <div>Not connected!</div>
        }

        var currentGame = Object.values(games).find(game => game.players ? game.players.indexOf(playerId!) >= 0 : false);

        if (!currentGame) {
            return (
                <div>
                    <LobbyContainer />
                    <CreateGameContainer />
                </div>
            );
        }

        if (currentGame) {
            if (currentGame.state === GameStateType.AwaitingPlayers) {
                return <GameRoomContainer />;
            } else {
                return <div>Game {currentGame.name} is ongoing!</div>
            }
        }

        return <div>{playerId ? `Connected as ${playerId}` : `Not connected!`}</div>;
    }
}

function mapStateToProps(state: ClientState) {
    return {
        state: state
    };
}

function mapDispatchToProps(state: ClientState) {
    return {};
}

var App = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

function main() {
    var io = SocketIO();
    var messageService = new SocketIOServerMessageService(io);
    var replicator = new ClientSideReplicator(messageService);

    io.on('connect', () => {
        console.log(`Connected, sending data init request...`);
        messageService.send({
            type: 'initialize-my-data'
        });
    });
    
    var store = createClientStore(replicator, messageService);
    (window as any).store = store;

    var root = document.getElementById('react-container');
    ReactDOM.render(
        <Provider store={ store }>
            <App />
        </Provider>, 
        root
    );
}

main();
