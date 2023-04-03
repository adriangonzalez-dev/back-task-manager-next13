"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//create mongo model for task
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
