import prismaCliente from "../../prisma";
import { sign } from "jsonwebtoken"; // Importar sign do JWT
import { sendPasswordResetEmail } from "../../utils/email"; // Função fictícia para enviar e-mail

interface UserForgotPassword {
    email: string
}

class ForgotPasswordService {
    async execute({email}: UserForgotPassword) {
        // Verificar se o email está cadastrado
        const user = await prismaCliente.pessoa.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("User not found.");
        }

        console.log(user)
        
         // Gerar token de redefinição de senha usando JWT
        const resetToken = sign(
            { userId: user.id }, // Dados no payload do token
            process.env.JWT_SECRET, // Chave secreta para assinar o token
            { expiresIn: "1h" } // Token válido por 1 hora
        );

        console.log(resetToken)

        // Salvar o token no banco de dados (ou em uma tabela específica para tokens)
        await prismaCliente.passwordResetToken.create({
            data: {
                pessoaId: user.id,
                token: resetToken,
                expiresAt: new Date(Date.now() + 3600000) // Token válido por 1 hora
            }
        });

        // Enviar e-mail com link para redefinir a senha
        await sendPasswordResetEmail(email, resetToken);

        return;
    }
}

export { ForgotPasswordService };
