import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Usar porta 587 para TLS (ou 465 para SSL)
    secure: false, // Definir como true se usar a porta 465 (SSL)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Desabilitar verificação de certificado autoassinado
    },
});

export async function sendPasswordResetEmail(email: string, token: string) {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Redefinir Senha',
        text: `Você solicitou a redefinição de sua senha. Use este link para redefinir sua senha: http://localhost:3000/resetPassword?token=${token}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Failed to send email.");
    }
}

