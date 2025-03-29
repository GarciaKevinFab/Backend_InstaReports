import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS
const corsOptions = {
    origin: process.env.FRONTEND_URI || '*', // Ajusta según tu entorno
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Conexión a la base de datos
mongoose.set('debug', true); // Logs para depuración

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connected'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Salir si la conexión falla
    });

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// Middleware para manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
