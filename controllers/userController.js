const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = 'rahasia';

exports.register = (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = { name, email, password: hashed };

  User.create(newUser, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User registered' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1d' });
    res.json({ token });
  });
};

exports.getAll = (req, res) => {
  User.findAll((err, users) => {
    if (err) return res.status(500).json(err);
    res.json(users);
  });
};

exports.getOne = (req, res) => {
  User.findById(req.params.id, (err, users) => {
    if (err || users.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(users[0]);
  });
};

exports.update = (req, res) => {
  const { name, email } = req.body;

  User.update(req.params.id, { name, email }, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated' });
  });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Password lama dan password baru wajib diisi' });
  }

  User.findById(req.params.id, (err, users) => {
    if (err) return res.status(500).json(err);
    if (users.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = users[0];
    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: 'Password lama salah' });

    const hashed = bcrypt.hashSync(newPassword, 10);
    User.updatePassword(req.params.id, hashed, (updateErr) => {
      if (updateErr) return res.status(500).json(updateErr);
      res.json({ message: 'Password berhasil diubah' });
    });
  });
};

exports.remove = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User deleted' });
  });
};
