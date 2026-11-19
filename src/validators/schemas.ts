import { z } from 'zod';

// id: tem que virar número inteiro maior que 0 ("abc", "", "0" e "-5" são recusados)
const id = z.coerce.number().int().positive();

// nome: remove espaços das pontas e não pode ficar vazio
const name = z.string().trim().min(1, 'Nome é obrigatório.');

// Regras para parâmetros de URL
export const idParams = z.object({ id });
export const categoryIdParams = z.object({ categoryId: id });

// Regras para o corpo (body) das requisições
export const userBody = z.object({
  name,
  email: z.string().trim().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
});

export const loginBody = z.object({
  email: z.string().trim().email('E-mail inválido.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
});

export const categoryBody = z.object({ name });

export const supplierBody = z.object({
  name,
  email: z.string().trim().email('E-mail inválido.').optional(),
  phone: z.string().trim().optional(),
});

export const productBody = z.object({
  name,
  price: z.coerce.number().nonnegative().max(99999999.99), // cabe no Decimal(10,2) do banco
  categoryId: id,
  supplierId: id,
});