// authorize.ts
import { NextFunction, Request, Response } from "express";

export function isAuthorized(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const typeUser = req.tipoLogin; // Obtém o tipo de login do usuário, que foi definido no `isAuthenticated`

    if (!typeUser) {
      return res.status(500).json({ error: "Tipo de usuário não definido. Certifique-se de usar o middleware isAuthenticated antes!" });
    }

    // Verifica se o tipo de usuário está dentro dos tipos permitidos
    if (!allowedRoles.includes(typeUser)) {
      return res.status(403).json({ error: "Acesso não permitido a essa página!" });
    }

    return next();
  };
}
