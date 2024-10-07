import prismaCliente from "../../prisma";
import { hash } from 'bcryptjs';
import { verify } from "jsonwebtoken"; // Para verificar o token

interface ResetPasswordRequest {
  token: string; // Token JWT enviado por email
  senha: string;
}

class ResetPasswordUserService {
  async execute({ token, senha }: ResetPasswordRequest) {
    console.log(token);
    console.log(senha);

    // Verificar se houve envio do token
    if (!token) {
      throw new Error("Token is required.");
    }

    // Verificar se a senha tem o comprimento mínimo (ou outras regras)
    if (senha.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    // Verificar se o token é válido
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET); // Verifica o token com a chave secreta
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired.");
      }
      throw new Error("Invalid token.");
    }

    // Extrair o ID do usuário do token decodificado
    const { userId } = decoded as { userId: string }; // Modifique para userId

    // Converter o ID para número
    const pessoaIdNumber = parseInt(userId, 10); // Use userId

    // Buscar o login no banco de dados pelo ID da pessoa
    const userLogin = await prismaCliente.login.findFirst({
      where: { pessoaId: pessoaIdNumber }, // Utilizar `pessoaIdNumber` para garantir que o tipo seja correto
    });

    if (!userLogin) {
      throw new Error("User login not found.");
    }

    // Gerar o hash da nova senha
    const passwordHash = await hash(senha, 8);

    // Atualizar a senha no banco de dados no modelo Login
    await prismaCliente.login.update({
      where: { id: userLogin.id }, // Use o ID do Login para a atualização
      data: {
        senha: passwordHash,
      },
    });

    // Log após sucesso
    console.log(`Password updated for user: ${userId}`); // Use userId aqui

    return { message: "Password updated successfully." };
  }
}

export { ResetPasswordUserService };
