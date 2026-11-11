
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(userRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
