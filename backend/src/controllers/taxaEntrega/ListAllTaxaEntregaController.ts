import { Request, Response } from 'express'; 
import { ListAllTaxaEntregaService } from '../../services/taxaEntrega/ListAllTaxaEntregaService';

class ListAllTaxaEntregaController {
    async handle(req: Request, res: Response) {
        const listAllTaxaEntregaService = new ListAllTaxaEntregaService();

        try {
            const taxaEntrega = await listAllTaxaEntregaService.execute();
            return res.json(taxaEntrega);
        } catch (error) {
            // Retorna um erro 500 em caso de falha
            return res.status(500).json({
                message: error.message || 'Erro inesperado ao listar taxas de entrega.',
            });
        }
    }
}

export { ListAllTaxaEntregaController };
