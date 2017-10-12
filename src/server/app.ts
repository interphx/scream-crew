import 'reflect-metadata';

import * as http       from 'http';
import * as path       from 'path';

import * as bodyParser from 'body-parser';
import * as express    from 'express';
import * as SocketIO   from 'socket.io';

import { getRandomId } from 'shared/utils';

import { SocketIOPlayerMessagingService } from 'server/messaging/player-messaging';
import { createServerStore } from 'server/store';
import { ServerSideReplicator } from 'server/server-side-replicator';
import { getListedGames } from 'server/utils/games';

var port      = 5000,
    staticDir = path.join(__dirname, '/static');

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

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

    var replicator = new ServerSideReplicator(messagingService);

    var reduxStore = createServerStore(replicator, messagingService);

    messagingService.subscribe('redux-action', (playerId, message) => {
        var action = message.action;
        action.meta = action.meta || {};
        action.meta.remote = true;

        reduxStore.dispatch(action);
    });

    messagingService.subscribe('initialize-my-data', (playerId, message) => {
        console.log(`Got 'initialize my data' request`);
        messagingService.sendToOne(playerId, {
            type: 'redux-action',
            action: {
                type: ':INITIALIZE_DATA',
                playerId: playerId,
                games: getListedGames(reduxStore.getState())
            }
        })
    });

    server.on('close', function() {
        // Cleanup
    });
}

main();