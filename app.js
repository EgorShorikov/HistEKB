import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './database.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('static')); 

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/map/initialMap.html'); 
});

try {
    await sequelize.sync();
    console.log('База данных SQLite синхронизирована');
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
} catch (err) {
    console.error('Ошибка синхронизации БД:', err);
}