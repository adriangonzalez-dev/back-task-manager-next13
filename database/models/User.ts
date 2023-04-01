import { IUser } from '../../interfaces/User';
//create mongo model for task
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
        minlength: 3,
        unique: true
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
    }
    }
)


const User = mongoose.model<IUser>('User', userSchema);

export default User;