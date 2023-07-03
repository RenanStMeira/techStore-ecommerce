import mercadopago from 'mercadopago'
import { config } from 'mercadopago';

mercadopago.configure({
  access_token: 'TEST-7076964638916012-070221-be12a73bd0650fe626507f653265c262-448062399',
});
//Executar criaçao e pagamento
export async function run() {

    try{
        const amount = 1000;
        const description = 'Seu pedido'

        // Chama a função createPayment para criar um pagamento
        const initPoint = await createPayment(amount, description);
     
        console.log('', initPoint);

    } catch (error) {
        console.error('Erro no pagamento:', error)
    }
}

// Função assíncrona para criar um pagamento no Mercado Pago
export async function createPayment(amount: number, description: string): Promise<string> {
    const preference = {
      items: [
        {
          title: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: amount,
        },
      ],
      back_urls: {
        success: 'https://api.mercadopago.com',
        failure: 'https://seusite.com/falha',
        pending: 'https://seusite.com/pendente',
      },
      auto_return: 'approved',
    };
  
    // Cria o pagamento usando a API do Mercado Pago
    const response = await mercadopago.preferences.create(preference);
  
    // Imprime a resposta no console
    console.log(response.body);
  
    // Retorna o initPoint do pagamento
    return response.body.init_point;
  }
  
  // Executa a função run para iniciar o processo de pagamento
  run();
  