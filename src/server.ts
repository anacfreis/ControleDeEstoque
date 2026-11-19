import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import supplierRoutes from './routes/supplierRoutes';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido. Confira o seu arquivo .env');
}

const app = express();

app.use(express.json());
app.use('/files', express.static('uploads'));
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(supplierRoutes);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});