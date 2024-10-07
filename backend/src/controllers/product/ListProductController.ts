import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const listProductService = new ListProductService();

    // Executa o serviço para obter todos os produtos
    const produtos = await listProductService.execute();

    // Formata os valores dos produtos para duas casas decimais
    const produtosFormatados = produtos.map(produto => ({
      ...produto,
      valores: produto.valores.map(valor => ({
        ...valor,
        preco: parseFloat(valor.preco).toFixed(2), // Formata o preço para duas casas decimais
      })),
    }));

    return res.json(produtosFormatados);
  }
}

export { ListProductController };
