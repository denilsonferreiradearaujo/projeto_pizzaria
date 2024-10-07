import { Request, Response } from "express";
import { UpdatePedidoStatusService } from "../../services/pedido/UpdatePedidoStatusService";

class UpdatePedidoStatusController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const updatePedidoStatusService = new UpdatePedidoStatusService();

    try {
      const pedido = await updatePedidoStatusService.execute({
        id: Number(id),
        status
      });

      return res.json(pedido);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdatePedidoStatusController };
