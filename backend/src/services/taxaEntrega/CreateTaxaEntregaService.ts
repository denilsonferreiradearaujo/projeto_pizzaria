import prismaClient from "../../prisma";

interface TaxaEntregaRequest {
  distanciaMin: number;
  distanciaMax: number;
  valor: number;
}

// Função auxiliar para verificar sobreposição de faixas de distância
function isOverlapping(existingMin: number, existingMax: number, newMin: number, newMax: number): boolean {
  return existingMin < newMax && existingMax > newMin;
}

class CreateTaxaEntregaService {
  async execute({ distanciaMin, distanciaMax, valor }: TaxaEntregaRequest) {
    // Validações básicas
    if (!distanciaMin || distanciaMin <= 0) {
      throw new Error('O valor da distância mínima deve ser um número positivo.');
    }

    if (!distanciaMax || distanciaMax <= distanciaMin) {
      throw new Error('O valor da distância máxima deve ser um número positivo e maior que a distância mínima.');
    }

    if (!valor || valor <= 0) {
      throw new Error('O valor da taxa de entrega deve ser um número positivo.');
    }

    // Normalização das distâncias (arredondar para 2 casas decimais)
    distanciaMin = Math.round(distanciaMin * 100) / 100;
    distanciaMax = Math.round(distanciaMax * 100) / 100;

    // Formata o valor para 2 casas decimais
    const valorFormatado = parseFloat(valor.toFixed(2));

    // Verifica se há sobreposição com outras faixas
    const existingTaxa = await prismaClient.taxaEntrega.findFirst({
      where: {
        AND: [
          { distanciaMin: { lt: distanciaMax } }, // A faixa existente começa antes da nova taxa acabar
          { distanciaMax: { gt: distanciaMin } }, // A faixa existente termina depois da nova taxa começar
        ],
      },
    });

    if (existingTaxa && isOverlapping(existingTaxa.distanciaMin, existingTaxa.distanciaMax, distanciaMin, distanciaMax)) {
      throw new Error(
        `Já existe uma taxa de entrega cadastrada para essa faixa de distância (${existingTaxa.distanciaMin}-${existingTaxa.distanciaMax}).`
      );
    }

    // Cria a nova taxa de entrega
    const createdTaxa = await prismaClient.taxaEntrega.create({
      data: {
        distanciaMin,
        distanciaMax,
        valor: valorFormatado, // Salva o valor formatado com 2 casas decimais
      },
    });

    return {
      ...createdTaxa,
      valor: createdTaxa.valor.toFixed(2), // Retorna o valor formatado com 2 casas decimais
    };
  }
}

export { CreateTaxaEntregaService };
