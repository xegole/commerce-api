import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './core/logger/app-logger';
import commerces from './routes/commerces.route';
import cities from './routes/cities.route';
import banners from './routes/banner.route';

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

app.use('/commerces', commerces);
app.use('/cities', cities);
app.use('/banners', banners);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

export default app;
