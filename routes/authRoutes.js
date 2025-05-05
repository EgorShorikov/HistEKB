import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name: name, email: email, passwordHash: passwordHash });

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
    console.log();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) return res.status(401).json({ message: 'Неверный пароль' });

    res.json({ message: 'Авторизация успешна' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

