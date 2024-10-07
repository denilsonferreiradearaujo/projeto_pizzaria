import prismaClient from "../../prisma";

class ListProductService {
  async execute() {
    // Busca todos os produtos, incluindo tamanhos e valores relacionados
    const produtos = await prismaClient.produto.findMany({
      include: {
        tamanhos: true, // Inclui os tamanhos relacionados ao produto
        valores: true, // Inclui os valores relacionados ao produto
        Categoria: {
          select: {
            nome: true, // Inclui o nome da categoria
          },
        },
      },
    });

    // Formata os valores para duas casas decimais
    const produtosFormatados = produtos.map(produto => ({
      ...produto,
      valores: produto.valores.map(valor => ({
        ...valor,
        preco: valor.preco.toFixed(2), // Formata o preço para duas casas decimais
      })),
    }));

    return produtosFormatados;
  }
}

export { ListProductService };
