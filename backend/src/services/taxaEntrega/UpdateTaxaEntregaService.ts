import prismaClient from "../../prisma";

interface TaxaEntregaRequest {
  id: string; // ID da TAXA DE ENTREGA a ser atualizada
  distanciaMin: number;
  distanciaMax: number;
  valor: number;
}

class UpdateTaxaEntregaService {
  async execute({ id, distanciaMin, distanciaMax, valor }: TaxaEntregaRequest) {
    // Verificar se o ID da TAXA DE ENTREGA foi enviado
    if (!id) {
      throw new Error("O ID da Taxa de Entrega não foi fornecido.");
    }

    // Converte o ID para número (number)
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber)) {
      throw new Error("ID inválido. Deve ser um número.");
    }

    // Validações de distância mínima e máxima
    if (!distanciaMin || distanciaMin <= 0) {
      throw new Error("O valor da distância mínima deve ser um número positivo.");
    }

    if (!distanciaMax || distanciaMax <= distanciaMin) {
      throw new Error("O valor da distância máxima deve ser maior que a distância mínima.");
    }

    // Validação do valor
    if (!valor || valor <= 0) {
      throw new Error("O valor da taxa de entrega deve ser positivo.");
    }

    // Verifica se a Taxa de Entrega com o ID fornecido existe
    const taxaEntregaExists = await prismaClient.taxaEntrega.findUnique({
      where: { id: idNumber }
    });

    if (!taxaEntregaExists) {
      throw new Error("Taxa de entrega não encontrada.");
    }

    // Verifica se há sobreposição de faixas de distância (com exceção da taxa atual)
    const taxaEntregaValoresAlreadyExists = await prismaClient.taxaEntrega.findFirst({
      where: {
        distanciaMin: { lt: distanciaMax }, // Sobrepõe com outra taxa já existente
        distanciaMax: { gt: distanciaMin }, // Sobrepõe com outra taxa já existente
        NOT: { id: idNumber }, // Ignora a taxa de entrega atual
      },
    });

    if (taxaEntregaValoresAlreadyExists) {
      throw new Error(
        `Já existe uma taxa de entrega cadastrada para essa faixa de distância (${taxaEntregaValoresAlreadyExists.distanciaMin} - ${taxaEntregaValoresAlreadyExists.distanciaMax}).`
      );
    }

    // Atualiza a taxa de entrega no banco de dados
    const taxaEntregaAtualizada = await prismaClient.taxaEntrega.update({
      where: { id: idNumber },
      data: {
        distanciaMin,
        distanciaMax,
        valor,
        dataUpdate: new Date(),
      },
      select: {
        id: true,
        distanciaMin: true,
        distanciaMax: true,
        valor: true,
        dataCreate: true,
        dataUpdate: true,
      },
    });

    // Retorna a taxa de entrega atualizada
    return taxaEntregaAtualizada;
  }
}

export { UpdateTaxaEntregaService };
