import {Router} from 'express';
import {taskController} from '../controllers/taskController';
import {taskCreate} from '../validations/tasks';
import { getErrors } from '../middlewares';
import { idValidator } from '../validations/idValidator';

const router = Router();

router.get('/', taskController.getTasks);
router.post('/', taskCreate, getErrors,taskController.createTask);
router.get('/:id', idValidator, getErrors, taskController.getTask);
router.put('/:id', idValidator, getErrors, taskController.updateTask);
router.patch('/:id',idValidator, getErrors, taskController.doneTask);
router.delete('/:id', idValidator, getErrors,taskController.deleteTask);

export default router;