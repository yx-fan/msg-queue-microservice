import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

async function createApp() {
    try {
        // Create the app
        const app = express();

        // Middleware
        logger.info ('>>> Enabling CORS <<<');
        app.use(cors());
        logger.info ('>>> Setting up body parser <<<');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Routes
        logger.info ('>>> Setting up routes <<<');
        app.get('/', (req, res) => {
            logger.info('Root endpoint hit');
            res.send('Welcome to the Message Queue System');
        });

        return app;
    } catch (error: any) {
        logger.error(`Failed to create app: ${error.message}`);
        throw error;
    }
}

export default createApp;