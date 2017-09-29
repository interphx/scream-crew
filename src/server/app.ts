import 'reflect-metadata';

import * as http       from 'http';
import * as path       from 'path';

import * as bodyParser from 'body-parser';
import * as express    from 'express';

import { getRandomId } from 'shared/utils';

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

    console.log('Hi!');
    console.log(getRandomId(8));
}

main();