import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import sequelize from './database.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/frontend', express.static(path.join(__dirname, 'static/frontend')));
app.use('/map', express.static(path.join(__dirname, 'static/map')));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/frontend/index.html'));
});

app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/map/initialMap.html'));
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