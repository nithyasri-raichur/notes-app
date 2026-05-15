import express from 'express';
import logger from './middleware/logger.js';
import notes from './routes/notes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const app = express()
const PORT = 8000;
app.use(cors());
app.use(express.json()); //json middleware

app.use(logger); //logger middleware

app.use('/api/notes', notes);

app.listen(8000,() => console.log('server running'));

