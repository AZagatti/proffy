import { Router } from 'express';

import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const classesController = new ClassesController();

classesRouter.post('/', classesController.create);
classesRouter.get('/', classesController.index);

export default classesRouter;
