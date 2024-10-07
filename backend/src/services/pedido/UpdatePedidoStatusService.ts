import prismaClient from "../../prisma";

interface UpdatePedidoStatusRequest {
  id: number;
  status: string;
}

class UpdatePedidoStatusService {
  async execute({ id, status }: UpdatePedidoStatusRequest) {
    // Verificar se o pedido existe
    const pedidoExists = await prismaClient.pedido.findUnique({
      where: { id }
    });

    if (!pedidoExists) {
      throw new Error("Pedido não encontrado.");
    }

    // Atualizar o status do pedido
    const updatedPedido = await prismaClient.pedido.update({
      where: { id },
      data: {
        status,
        dataUpdate: new Date()  // Atualizar a data de modificação
      },
      select: {
        id: true,
        status: true,
        dataUpdate: true
      }
    });

    return updatedPedido;
  }
}

export { UpdatePedidoStatusService };

