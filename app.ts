import 'dotenv/config';
import express, { Application } from 'express';
import connectDB from './database/config';
import cors from 'cors';
import {taskRouter, userRouter} from './routes'
import { jwtVerify } from './middlewares/jwtVerify';

const port:number = Number(process.env.PORT);
const app:Application = express();
connectDB();

app.use(cors({
    origin: process.env.CORS_ORIGIN_PROD,
    credentials: true
    
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/tasks', jwtVerify,taskRouter);
app.use('/api/auth', userRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
    }
);