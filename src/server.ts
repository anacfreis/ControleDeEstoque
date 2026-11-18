
import express from 'express';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(express.json());
app.use('/files', express.static('uploads'));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
