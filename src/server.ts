
import express from 'express';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(categoryRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
