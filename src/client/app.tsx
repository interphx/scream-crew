import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import * as SocketIO from 'socket.io-client';

import { getRandomId } from 'shared/utils';

import { createStateContainer, Store } from 'client/store';
import { SocketIOServerMessageService } from 'client/messaging/socket-io-server-message-service';
import { MessageHandlingService } from 'client/message-handling-service';
import { Lobby } from 'client/components/lobby';
import { CreateGame } from 'client/components/create-game';
import { ServerMessageSender } from 'client/messaging/server-message-sender';
import { PlayerStatus } from 'client/player-status';
import { GameRoom } from 'client/components/game-room';

interface AppProps {
    messageSender: ServerMessageSender;
    store: Store;
}

interface AppState {

}

class BaseApp extends React.Component<AppProps, AppState> {
    render() {
        var {
            playerStatus,
            currentGameData
        } = this.props.store;

        if (
            (playerStatus > PlayerStatus.Idle && playerStatus <= PlayerStatus.ReadyToStart) &&
            currentGameData
        ) {
            return <GameRoom game={currentGameData} />
        }

        if (playerStatus === PlayerStatus.InGame) {
            return <div>Game...</div>
        }

        return (
            <div className="app">
                <Lobby />
                <CreateGame messageSender={this.props.messageSender} />
            </div>
        );
    }
}

function mapStateToProps(state: Store) {
    return {
        store: state
    };
}

function mapDispatchToProps(state: Store) {
    return {};
}

var App = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

function main() {
    var store = createStateContainer();
    (window as any).store = store;

    var io = SocketIO();
    var messageService = new SocketIOServerMessageService(io);

    var messageHandlingService = new MessageHandlingService(messageService, store);
    messageHandlingService.start();

    var root = document.getElementById('react-container');
    ReactDOM.render(
        <Provider store={ store }>
            <App messageSender={messageService} />
        </Provider>, 
        root
    );
}

main();
