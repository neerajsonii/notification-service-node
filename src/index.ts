import express from 'express';
import http from 'http';
import Server from 'socket.io';
import { CONFIG } from './config';
import Routes from './routes';
import { SocketServer } from './socket';
import { AccessMapping } from './socket/access.mapping';
import { EventMapping } from './socket/event.mapping';

const app = express();

/**
 * Start Application Server
 */
const initAppServer = () => {
    return http.createServer(app).listen(CONFIG.PORT, () => {
        console.log(`Notification service running on ${CONFIG.PORT} and pointing to ${CONFIG.ENV}`);
    });
};

/**
 * Start Socket Server
 */
const initSocketServer = async (httpServer: http.Server) => {
    try {
        /**
         * Create Socket Server
         */
        const io = Server(httpServer);

        /**
         * Initialize Access mappings
         */
        await AccessMapping.loadMappings();

        /**
         * Initialize Event mappings
         */
        await EventMapping.loadMappings();

        /**
         * Host Socket Connection
         */
        SocketServer.init(io);
        console.log(`Notification Socket Listening...`);
        
    } catch (err) {
        console.log(err);
    }

};

/**
 * Initialize Routes
 */
Routes.init(app, express.Router());

/**
 * Initialize App Server
 */
const server = initAppServer();

/**
 * Initialize Socket Server
 */
initSocketServer(server);

