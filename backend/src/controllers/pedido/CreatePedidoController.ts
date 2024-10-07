import { Request, Response } from "express";
import { CreatePedidoService } from "../../services/pedido/CreatePedidoService";

class CreatePedidoController {
  async handle(req: Request, res: Response) {
    const { pessoaId, taxaEntregaId, status, numMesa, valTotal, items } = req.body;

    const createPedidoService = new CreatePedidoService();

    try {
      const pedido = await createPedidoService.execute({
        pessoaId,
        taxaEntregaId,
        status,
        numMesa,
        valTotal,
        items,
      });

      return res.status(201).json(pedido);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreatePedidoController };
