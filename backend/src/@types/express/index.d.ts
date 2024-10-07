// import { Login } from '@prisma/client'; // Se estiver usando a definição do Prisma, importe como necessário.

// Importação do express para poder estender as interfaces.
declare namespace Express {
  // Extende a interface Request para incluir as novas propriedades
  export interface Request {
    userId?: number; // ID do usuário que é setado no isAuthenticated
    tipoLogin?: string; // Tipo de login (cliente, funcionario)
  }
}
