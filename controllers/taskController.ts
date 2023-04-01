import { Request, Response } from "express";
import Task from "../database/models/Task";
import { ITask } from '../interfaces/Tasks';

Task
export const taskController = {
    async getTasks(req:Request, res:Response) {
        try {
            const tasks:ITask[] = await Task.find({createdBy: req.body.user._id}).sort({createdAt: -1});
            res.status(200).json({
                tasks
            });
        } catch (error) {
            console.log(error)
        }
    },
    async createTask(req:Request, res:Response) {
        try {
            const task = new Task({
                ...req.body,
                createdBy: req.body.user._id
            });
            await task.save()
            res.status(200).json({
                message: 'Task created successfully',
                task
            });
        } catch (error) {
            console.log(error)
        }
    },
    async getTask(req:Request, res:Response) {
        try {
            const task = await Task.findById(req.params.id,{
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
        } catch (error) {
            console.log(error)
        }
    },
    async updateTask(req:Request, res:Response) {

        try{
            const task = await Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                });
            }

            await task.updateOne({
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority
            },{new: true});

            res.status(200).json({
                message: 'Task updated successfully',
                task
            });
        } 
        catch (error) {
            console.log(error)
        }

    },
    async deleteTask(req:Request, res:Response) {

        try {
            const task = Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                });
            }

            await task.deleteOne();

            res.status(200).json({
                message: 'Task deleted successfully'
            });
        } catch (error) {
            console.log(error)
        }
    },

    async doneTask(req:Request, res:Response) {

        try {
            const task = Task.findById(req.params.id);

            if (!task) {
                return res.status(404).json({
                    message: 'Task not found'
                });

            }

            await task.updateOne({done: true});

            res.status(200).json({
                message: 'Task done successfully'
            });
        } catch (error) {
            console.log(error)
        }
    }
}