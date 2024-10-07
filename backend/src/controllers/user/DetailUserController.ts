// DetailUserController.ts
import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController {
  async handle(req: Request, res: Response) {
    // const { pessoa_id } = request.params;
    const user_id = req.userId

    const detailUserService = new DetailUserService();
    const user = await detailUserService.execute(Number(user_id)); // Converte `pessoa_id` para número

    return res.json(user);
  }
}

export { DetailUserController };
