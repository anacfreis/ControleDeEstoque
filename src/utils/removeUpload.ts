import { unlink } from 'fs/promises';
import path from 'path';

export async function removeUpload(filename?: string | null): Promise<void> {
  if (!filename) return;

  try {
    // basename garante que só o nome do arquivo é usado, sem caminhos perigosos
    await unlink(path.resolve('uploads', path.basename(filename)));
  } catch (error: any) {
    // se o arquivo já não existe, tudo bem. Qualquer outro erro a gente loga.
    if (error.code !== 'ENOENT') {
      console.error('Falha ao remover upload:', error);
    }
  }
}