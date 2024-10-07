import prismaClient from "../../prisma";

class ListAllTaxaEntregaService {
    async execute() {
        const taxaEntrega = await prismaClient.taxaEntrega.findMany({
            select: {
                id: true,
                distanciaMin: true,
                distanciaMax: true,
                valor: true,
            },
        });

        return taxaEntrega;
    }
}

export { ListAllTaxaEntregaService };
