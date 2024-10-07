import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body; // Certifique-se de que o corpo da requisição contenha "senha"

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({
      email,
      senha
    });

    return res.json(auth);
  }
}

export { AuthUserController };
