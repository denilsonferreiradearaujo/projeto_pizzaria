import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    console.log("Body da requisição:", req.body); // Verifique se o body chega corretamente

    const { nome, email, senha, genero, dataNasc, cpf, tipo, cep, logradouro, numero, complemento, bairro, cidade, uf, telefoneResidencial, telefoneCelular } = req.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({
        nome,
        email,
        senha,
        genero,
        dataNasc,
        cpf,
        tipo,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        uf,
        telefoneResidencial,
        telefoneCelular,
      });

      console.log("cadastro", user);

      return res.json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
}

export { CreateUserController };
