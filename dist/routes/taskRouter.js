"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const tasks_1 = require("../validations/tasks");
const middlewares_1 = require("../middlewares");
const idValidator_1 = require("../validations/idValidator");
const router = (0, express_1.Router)();
router.get('/', taskController_1.taskController.getTasks);
router.post('/', tasks_1.taskCreate, middlewares_1.getErrors, taskController_1.taskController.createTask);
router.get('/:id', idValidator_1.idValidator, middlewares_1.getErrors, taskController_1.taskController.getTask);
router.put('/:id', idValidator_1.idValidator, middlewares_1.getErrors, taskController_1.taskController.updateTask);
router.patch('/:id', idValidator_1.idValidator, middlewares_1.getErrors, taskController_1.taskController.doneTask);
router.delete('/:id', idValidator_1.idValidator, middlewares_1.getErrors, taskController_1.taskController.deleteTask);
exports.default = router;
