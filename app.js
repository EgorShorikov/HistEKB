import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './database.js';
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

// app.use('/api', userRoutes);
app.use(bodyParser.json());
app.use(express.static('static')); 
app.use('/api', authRoutes);

try {
  await sequelize.sync();
  console.log('База данных SQLite синхронизирована');
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('Ошибка синхронизации БД:', err);
}
