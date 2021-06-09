/**
 * This file contains the code required
 * to expose config used by application.
 */
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();


const fetchConfig = () => {
    return {
        PORT: process.env.PORT || 3001,
        SOCKET_PORT: process.env.PORT || 3002,
        ENV: process.env.ENV || 'dev'
    }
};

export const CONFIG = fetchConfig();

/**
 * Config imported from .env file
 */

