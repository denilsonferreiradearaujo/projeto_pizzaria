import prismaClient from "../../prisma";

interface ItemRequest {
  produtoId: number;
  quantidade: number;
  idValor: number;
}

interface PedidoRequest {
  pessoaId: number;
  taxaEntregaId: number;
  status: string;
  numMesa: number;
  valTotal: number;
  items: ItemRequest[];
}

class CreatePedidoService {
  async execute({ pessoaId, taxaEntregaId, status, numMesa, valTotal, items }: PedidoRequest) {
    // Verificar se a Pessoa existe
    const pessoaExists = await prismaClient.pessoa.findUnique({
      where: { id: pessoaId },
    });

    if (!pessoaExists) {
      throw new Error('Pessoa não encontrada.');
    }

    // Verificar se a Taxa de Entrega existe
    const taxaEntregaExists = await prismaClient.taxaEntrega.findUnique({
      where: { id: taxaEntregaId },
    });

    if (!taxaEntregaExists) {
      throw new Error('Taxa de entrega não encontrada.');
    }

    // **Nova Verificação**: Certifique-se de que todos os `produtoId` existem no banco de dados
    const produtoIds = items.map((item) => item.produtoId);
    const existingProducts = await prismaClient.produto.findMany({
      where: {
        id: {
          in: produtoIds,
        },
      },
    });

    if (existingProducts.length !== produtoIds.length) {
      throw new Error('Um ou mais produtos não foram encontrados. Verifique os IDs dos produtos.');
    }

    // Criar o Pedido e associar os Items
    const pedido = await prismaClient.pedido.create({
      data: {
        pessoaId,
        taxaEntregaId,
        status,
        numMesa,
        valTotal,
        items: {
          create: items.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            idValor: item.idValor,
          })),
        },
      },
      include: {
        items: true, // Incluir os Items no retorno
      },
    });

    return pedido;
  }
}

export { CreatePedidoService };
