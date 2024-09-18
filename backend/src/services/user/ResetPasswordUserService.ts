import prismaCliente from "../../prisma";
import { hash } from 'bcryptjs';
import { verify } from "jsonwebtoken"; // Para verificar o token

interface ResetPasswordRequest {
  token: string; // Token JWT enviado por email
  password: string;
}

class ResetPasswordUserService {
  async execute({ token, password }: ResetPasswordRequest) {
    console.log(token)
    console.log(password)

    // Verificar se houve envio do token
    if (!token) {
      throw new Error("Token is required.");
    }
    
    // Verificar se a senha tem o comprimento mínimo (ou outras regras)
    if (password.length < 6) {
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
    const { userId } = decoded as { userId: string };

    // Buscar o usuário no banco de dados pelo ID
    const user = await prismaCliente.user.findFirst({
      where: { id: userId }
    });

    console.log(user)

    if (!user) {
      throw new Error("User not found.");
    }

    // Gerar o hash da nova senha
    const passwordHash = await hash(password, 8);

    // Atualizar a senha no banco de dados
    await prismaCliente.user.update({
      where: { id: userId },
      data: {
        password: passwordHash,
      },
    });

    // Log após sucesso
    console.log(`Password updated for user: ${userId}`);

    // (Opcional) Remover ou invalidar o token após uso, se estiver salvo no banco
    // await prismaCliente.passwordResetToken.deleteMany({
    //   where: {
    //     userId: userId,
    //   }
    // });

    return { message: "Password updated successfully." };
  }
}

export { ResetPasswordUserService };
