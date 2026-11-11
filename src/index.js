import express from 'express';
import usersRoutes from './routes/users.js';
import publicacionesRoutes from './routes/publicaciones.js';
import { errorHandler } from './middlewares/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mundo UNICAES');
});

app.use('/users', usersRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});