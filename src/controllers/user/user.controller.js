import { validationResult } from 'express-validator';
import User from '../../models/user.model.js';

export default class UserController {
  static async get(req, res) {
    const users = await User.findMany();
    return res.json(users);
  }

  static async find(req, res) {
    const user = await User.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.json(user);
  }

  static async post(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.create({
      data: req.body,
    });

    return res.json(user);
  }

  static async put(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const updatedUser = await User.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });
    return res.json(updatedUser);
  }

  static async delete(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await User.delete({
      where: {
        id: +req.params.id,
      },
    });
    return res.status(204).json({ message: 'Usuário deletado com sucesso' });
  }
}
