import prismaClient from "../../prisma";

interface CategoriaRequest {
  id: string; // ID da categoria a ser atualizada
  nome: string;
}

class UpdateCategoriaService {
  async execute({ id, nome }: CategoriaRequest) {
    // Verifica se o ID da categoria foi enviado
    if (!id) {
      throw new Error("O ID da categoria não foi fornecido.");
    }

    // Converte o ID para número
    const idNumber = parseInt(id, 10);

    // Verifica se um nome foi enviado ou preenchido
    if (!nome) {
      throw new Error("O nome da categoria não foi preenchido.");
    }

    // Verifica se a categoria com o ID fornecido existe
    const categoriaExists = await prismaClient.categoria.findUnique({
      where: { id: idNumber },
    });

    if (!categoriaExists) {
      throw new Error("Categoria não encontrada.");
    }

    // Verifica se a categoria com o novo nome já existe (diferente da atual)
    const categoriaNomeAlreadyExists = await prismaClient.categoria.findFirst({
      where: {
        nome,
        NOT: { id: idNumber }, // Ignora a categoria atual
      },
    });

    if (categoriaNomeAlreadyExists) {
      throw new Error("Essa categoria já existe com o nome fornecido.");
    }

    // Atualiza a categoria no banco de dados
    const categoriaAtualizada = await prismaClient.categoria.update({
      where: { id: idNumber },
      data: {
        nome,
      },
      select: {
        id: true,
        nome: true,
        dataCreate: true,
        dataUpdate: true,
      },
    });

    return categoriaAtualizada;
  }
}

export { UpdateCategoriaService };
