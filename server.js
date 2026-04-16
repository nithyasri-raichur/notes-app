import express from 'express';
import logger from './middleware/logger.js';
import notes from './routes/notes.js';
import cors from 'cors';

const app = express()
const PORT = 8000;
app.use(cors());
app.use(express.json()); //json middleware
app.use(logger); //logger middleware

app.use('/api/notes', notes);






app.listen(8000,() => console.log('server running'));

