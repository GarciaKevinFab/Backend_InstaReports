import User from '../models/User.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// Crear un usuario
export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id); // Usar findByIdAndDelete

    if (user) {
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

