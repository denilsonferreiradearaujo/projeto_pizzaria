import prismaClient from "../../prisma";

interface categoryRequest {
  nome: string;
}

class CreateCategoryService {
  async execute({ nome }: categoryRequest) {
    // VERIFICA SE UM NOME FOI ENVIADO OU PREENCHIDO
    if (!nome) {
      throw new Error("O nome da categoria não foi preenchido");
    }

    // VERIFICA SE A CATEGORIA JÁ EXISTE
    const categoriaAlreadyExists = await prismaClient.categoria.findFirst({
      where:{nome}
    });


    if (categoriaAlreadyExists) {
      throw new Error("Essa categoria já existe");
    }

    // CRIA UMA NOVA CATEGORIA
    const categoria = await prismaClient.categoria.create({
      data: {
        nome: nome,
      },
      select: {
        id: true,
        nome: true,
        dataCreate: true,
        dataUpdate: true,
      },
    });

    return categoria;
  }
}

export { CreateCategoryService };
