import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    // Verificar se o email existe
    const user = await prismaClient.pessoa.findFirst({
      where: {
        email: email
      },
      include: {
        logins: true // Inclui a relação com logins
      }
    });

    // Verificar se o usuário existe e se há um login associado
    if (!user || user.logins.length === 0) {
      throw new Error('User/password incorrect');
    }

    // Obtém o login do usuário (assumindo o primeiro login, mas pode ajustar caso tenha múltiplos)
    const login = user.logins[0];

    // Comparar a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await compare(senha, login.senha);

    // Verifica a senha e retorna erro se não coincidir
    if (!passwordMatch) {
      throw new Error('User/password incorrect');
    }

    // Gerar o token JWT
    const token = sign(
      {
        nome: user.nome,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: String(user.id), // Garantir que subject seja uma string
        expiresIn: '30d'
      }
    );

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      token: token
    };
  }
}

export { AuthUserService };
