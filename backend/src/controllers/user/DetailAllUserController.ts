// controllers/user/DetailAllUserController.ts
import { Request, Response } from 'express';
import { DetailAllUsersService } from '../../services/user/DetailAllUsersService';

class DetailAllUserController {
  async handle(req: Request, res: Response) {
    const detailAllUsersService = new DetailAllUsersService();
    const users = await detailAllUsersService.execute();

    return res.json(users);
  }
}

export { DetailAllUserController };
