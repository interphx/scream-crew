import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as SocketIO from 'socket.io-client';

import { getRandomId } from 'shared/utils';

import { createStateContainer } from 'client/store';
import { SocketIOServerMessageService } from 'client/messaging/socket-io-server-message-service';
import { MessageHandlingService } from 'client/message-handling-service';
import { Lobby } from 'client/components/lobby';
import { CreateGame } from 'client/components/create-game';
import { ServerMessageSender } from 'client/messaging/server-message-sender';

interface AppProps {
    messageSender: ServerMessageSender;
}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {
    render() {
        return (
            <div className="app">
                <Lobby />
                <CreateGame messageSender={this.props.messageSender} />
            </div>
        );
    }
}

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
