import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { removeUpload } from '../utils/removeUpload';

export const validate =
  (target: 'body' | 'params', schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      // se veio uma imagem junto, apaga, porque o pedido foi recusado
      removeUpload(req.file?.filename);

      res.status(400).json({
        error: 'Dados inválidos.',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }

    // troca o body pelo já limpo (nome sem espaços, números convertidos)
    if (target === 'body') {
      req.body = result.data;
    }

    next();
  };