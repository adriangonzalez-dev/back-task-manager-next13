"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const Task_1 = __importDefault(require("../database/models/Task"));
Task_1.default;
exports.taskController = {
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield Task_1.default.find({ createdBy: req.body.user._id }).sort({ createdAt: -1 });
                res.status(200).json({
                    tasks
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = new Task_1.default(Object.assign(Object.assign({}, req.body), { createdBy: req.body.user._id }));
                yield task.save();
                res.status(200).json({
                    message: 'Task created successfully',
                    task
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.default.findById(req.params.id, {
                    createdBy: req.body.user._id
                });
                if (!task) {
                    return res.status(404).json({
                        message: 'Task not found'
                    });
                }
                res.status(200).json({
                    task
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.default.findById(req.params.id);
                if (!task) {
                    return res.status(404).json({
                        message: 'Task not found'
                    });
                }
                yield task.updateOne({
                    title: req.body.title,
                    description: req.body.description,
                    priority: req.body.priority
                }, { new: true });
                res.status(200).json({
                    message: 'Task updated successfully',
                    task
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = Task_1.default.findById(req.params.id);
                if (!task) {
                    return res.status(404).json({
                        message: 'Task not found'
                    });
                }
                yield task.deleteOne();
                res.status(200).json({
                    message: 'Task deleted successfully'
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    doneTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = Task_1.default.findById(req.params.id);
                if (!task) {
                    return res.status(404).json({
                        message: 'Task not found'
                    });
                }
                yield task.updateOne({ done: true });
                res.status(200).json({
                    message: 'Task done successfully'
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
