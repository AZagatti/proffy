import express from 'express';

import classesRouter from './classes.routes';
import connectionsController from './connections.routes';

const routes = express.Router();

routes.use('/classes', classesRouter);
routes.use('/connections', connectionsController);

export default routes;
