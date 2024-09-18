import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER, // Seu e-mail de envio
        pass: process.env.SMTP_PASS, // Sua senha ou app password
    }
});

export async function sendPasswordResetEmail(email: string, token: string) {
    const mailOptions = {
        from: 'denilson.araujo.programador@gmail.com',
        to: email,
        subject: 'Redefinir Senha',
        text: `Você solicitou a redefinição de sua senha. Use este link para redefinir sua senha: http://localhost:3000/resetPassword?token=${token}`
    };

    await transporter.sendMail(mailOptions);
}
