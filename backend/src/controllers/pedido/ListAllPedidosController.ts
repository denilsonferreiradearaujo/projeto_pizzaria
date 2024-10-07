import { Request, Response } from "express";
import { ListAllPedidosService } from "../../services/pedido/ListAllPedidosService";

class ListAllPedidosController {
  async handle(req: Request, res: Response) {
    const listAllPedidosService = new ListAllPedidosService();

    try {
      const pedidos = await listAllPedidosService.execute();
      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { ListAllPedidosController };
