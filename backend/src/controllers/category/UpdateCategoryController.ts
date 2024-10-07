import { Request, Response } from "express";
import { UpdateCategoriaService } from "../../services/category/UpdateCategoryService";

class UpdateCategoryController {
  async handle(req: Request, res: Response) {
    // Obtém o `id` dos parâmetros da URL e o `nome` do corpo da requisição
    const { id } = req.params;
    const { nome } = req.body;

    const updateCategoryService = new UpdateCategoriaService();

    try {
      // Executa o serviço de atualização
      const updatedCategory = await updateCategoryService.execute({
        id,
        nome,
      });

      return res.json(updatedCategory);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateCategoryController };
