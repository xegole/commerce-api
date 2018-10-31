import app from './app';
import config from './core/config/config.dev';
import connectToDb from './db/connect';

connectToDb();

const port = config.serverPort;

app.listen(port, () => {
  app.logger.info('server started - ', port);
});
