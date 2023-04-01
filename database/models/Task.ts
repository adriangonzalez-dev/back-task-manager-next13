import { ITask } from '../../interfaces/Tasks';
//create mongo model for task
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    priority: {
        type: String,
        required: true,
        enum: ['baja', 'media', 'alta']
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;

