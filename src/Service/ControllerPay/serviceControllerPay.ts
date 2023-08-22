// import { Request, Response } from "express";
// import { createPayment } from '../../Utils/Config/configPayCreate'

// export class PaymentController {
//     async create(req: Request, res: Response) {
//       try {
//         const { amount, description } = req.body;
  
//         // Chama a função createPayment para criar um pagamento
//         const initPoint = await createPayment(amount, description);
  
//         // Retorna o initPoint como resposta JSON
//         res.json({ initPoint });
//       } catch (error) {
//         console.error('Erro ao criar pagamento:', error);
//         res.status(500).json({ error: 'Erro ao criar pagamento' });
//       }
//     }
//   }
  
import { Request, Response } from "express";
import { createPayment } from '../../Utils/Config/configPayCreate'

export class PaymentController {
  async create(req: Request, res: Response) {
    try {
      const products = req.body.products; // Assumindo que você envia a lista de produtos no corpo da solicitação

      const paymentResults = [];

      for (const product of products) {
        const { amount, description } = product;
  
        // Chama a função createPayment para criar um pagamento para este produto
        const initPoint = await createPayment(amount, description);
  
        paymentResults.push(initPoint);
      }

      // Retorna os resultados dos pagamentos como resposta JSON
      res.json({ paymentResults });
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
  }
}
