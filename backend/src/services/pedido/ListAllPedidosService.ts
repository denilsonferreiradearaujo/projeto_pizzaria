import prismaClient from "../../prisma";

class ListAllPedidosService {
  async execute() {
    const pedidos = await prismaClient.pedido.findMany({
      include: {
        Pessoa: {
          select: {
            id: true,
            nome: true,
            email: true,
            genero: true,
            dataNasc: true,
            cpf: true,
            tipo: true
          }
        },
        TaxaEntrega: {
          select: {
            id: true,
            distanciaMin: true,
            distanciaMax: true,
            valor: true
          }
        },
        items: {
          select: {
            id: true,
            produtoId: true,
            quantidade: true,
            idValor: true,
            Produto: {
              select: {
                nome: true
              }
            }
          }
        }
      },
      orderBy: {
        dataCreate: 'desc'  // Ordenar pelos pedidos mais recentes
      }
    });

    return pedidos;
  }
}

export { ListAllPedidosService };
