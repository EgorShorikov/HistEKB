// router.get('/users/:id', async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });