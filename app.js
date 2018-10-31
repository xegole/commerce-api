import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './core/logger/app-logger';
import cars from './routes/cars.route';
import commerces from './routes/commerces.route';

const app = express();

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};
app.logger = logger;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/cars', cars);
app.use('/commerces', commerces);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

export default app;
