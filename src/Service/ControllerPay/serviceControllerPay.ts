import { Request, Response } from "express";
import { createPayment } from '../../Utils/Config/configPayCreate'

export class PaymentController {
    async create(req: Request, res: Response) {
      try {
        const { amount, description } = req.body;
  
        // Chama a função createPayment para criar um pagamento
        const initPoint = await createPayment(amount, description);
  
        // Retorna o initPoint como resposta JSON
        res.json({ initPoint });
      } catch (error) {
        console.error('Erro ao criar pagamento:', error);
        res.status(500).json({ error: 'Erro ao criar pagamento' });
      }
    }
  }
  