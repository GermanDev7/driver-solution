// services/paymentProvider.js

const axios = require('axios');
const { config } = require('../config/config'); // Asegúrate de configurar tu clave privada en las variables de entorno

const wompiApi = axios.create({
  baseURL: 'https://sandbox.wompi.co/v1',
  headers: { 'Authorization': `Bearer ${config.privatekeywompi}` }
});

class WompiPaymentProvider {
  async charge(userId, amount, token) {
    try {
      const payload = {
        amount_in_cents: amount * 100,
        currency: 'COP',
        customer_email: 'customer@example.com', //db user example
        payment_method: {
          type: 'CARD',
          token: token,//tc tokn
          installments: 1 //
        }
      };

      const response = await wompiApi.post('/transactions', payload);

      if (response.data && response.data.data && response.data.data.status === 'APPROVED') {
        return {
          success: true,
          transactionId: response.data.data.id
        };
      } else {
        // El pago no fue aprobado
        return {
          success: false,
          failureReason: response.data.data.status_message,
          failureCode: response.data.data.status
        };
      }
    } catch (error) {
      console.error('Error processing payment with Wompi:', error);
      // Manejar adecuadamente el error
      return {
        success: false,
        failureReason: error.message,
        failureCode: 'ERROR'
      };
    }
  }
}

module.exports = new WompiPaymentProvider();
