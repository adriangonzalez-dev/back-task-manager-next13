"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//create mongo model for task
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    avatar: {
        type: String,
        trim: true,
        minlength: 3
    },
    role: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        enum: ['admin', 'user'],
        default: 'user'
    },
    google: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
