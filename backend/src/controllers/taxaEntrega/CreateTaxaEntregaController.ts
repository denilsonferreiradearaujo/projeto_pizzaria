import { Request, Response } from 'express';
import { CreateTaxaEntregaService } from '../../services/taxaEntrega/CreateTaxaEntregaService';

class CreateTaxaEntregaController {
  async handle(req: Request, res: Response) {
    const { distanciaMin, distanciaMax, valor } = req.body;

    const createTaxaEntregaService = new CreateTaxaEntregaService();

    try {
      // Converte o valor para número antes de chamar o serviço
      const valorNumerico = parseFloat(valor);

      // Chama o serviço para criar uma nova taxa de entrega
      const novaTaxaEntrega = await createTaxaEntregaService.execute({
        distanciaMin,
        distanciaMax,
        valor: valorNumerico,
      });

      // Garantimos que `valor` será tratado como número, caso o Prisma retorne como string
      const valorFormatado = Number(novaTaxaEntrega.valor).toFixed(2);

      // Retorna a nova taxa de entrega com o valor formatado
      return res.status(201).json({
        ...novaTaxaEntrega,
        valor: valorFormatado,
      });
    } catch (error: any) {
      // Erros de validação (mensagens mais específicas)
      if (error.message.includes('distância') || error.message.includes('valor')) {
        return res.status(400).json({ message: error.message });
      }

      // Erro inesperado
      return res.status(500).json({
        message: 'Erro interno ao criar a taxa de entrega.',
      });
    }
  }
}

export { CreateTaxaEntregaController };
