import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { nome } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      nome
    });
      return res.json(category);
  }
}

export { CreateCategoryController };