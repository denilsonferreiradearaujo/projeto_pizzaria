import { Request, Response } from "express";
import { ResetPasswordUserService } from "../../services/user/ResetPasswordUserService";

class ResetPasswordUserController {
  async handle(req: Request, res: Response) {
    const { token } = req.params; // Pegar o token dos parâmetros da URL
    const { password } = req.body; // A nova senha será enviada no corpo da requisição

    console.log(token, password)

    const resetPasswordUserService = new ResetPasswordUserService();

    console.log(resetPasswordUserService)

    try {
      const result = await resetPasswordUserService.execute({ token, password });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

}

export { ResetPasswordUserController };
