import { Request, Response } from "express";
import { ForgotPasswordService } from "../../services/user/ForgotPasswordService";

class ForgotPasswordController {
    async handle(req: Request, res: Response) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const forgotPasswordService = new ForgotPasswordService();

        try {
            await forgotPasswordService.execute({email});
            return res.status(200).json({ message: "Password reset instructions sent to your email." });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { ForgotPasswordController };
