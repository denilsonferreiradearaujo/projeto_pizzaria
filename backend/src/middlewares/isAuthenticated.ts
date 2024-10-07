// isAuthenticated.ts
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import prisma from "../prisma";

interface Payload {
  sub: string;
}

export async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token não fornecido!" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Verificar e decodificar o token JWT
    const decoded = verify(token, process.env.JWT_SECRET) as Payload;

    // Buscar o usuário no banco de dados usando o Prisma
    const user = await prisma.login.findUnique({
      where: { id: parseInt(decoded.sub) },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    // Adicionar informações do usuário ao request para uso em rotas protegidas
    req.userId = user.id;
    req.tipoLogin = user.tipoLogin;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido!" });
  }
}
