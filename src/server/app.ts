import 'reflect-metadata';

import * as http       from 'http';
import * as path       from 'path';

import * as bodyParser from 'body-parser';
import * as express    from 'express';
import * as SocketIO   from 'socket.io';

import { getRandomId } from 'shared/utils';

import { Lobby } from 'server/systems/lobby';
import { SocketIOPlayerMessagingService } from 'server/messaging/player-messaging';
import { SimpleServerStateContainer } from 'server/server-state-container';

var port      = 5000,
    staticDir = path.join(__dirname, '/static');

async function main() {
    var app = express();
    
    console.log('Static dir:', staticDir);
    
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use('/', express.static(staticDir));
    
    var server = http.createServer(app).listen(port, function() {
        console.log(`HTTP listening on port ${port}!`);
    });

    var io = SocketIO(server);
    var messagingService = new SocketIOPlayerMessagingService(io);

    var stateContainer = new SimpleServerStateContainer();

    var lobby = new Lobby(stateContainer, messagingService, messagingService);

    lobby.start();

    server.on('close', function() {
        lobby.stop();
    });
}

main();