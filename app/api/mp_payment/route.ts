import { MercadoPagoConfig, Preference } from 'mercadopago';
import { randomUUID } from 'crypto';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN as string,
});

const preferenceClient = new Preference(client);

// URL do seu webhook no n8n
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_POST_CLIENT as string;

export const POST = async (request: Request) => {
  try {
    const { nome, email, telefone, produto, client_id } = await request.json();
    const telefoneLimpo = telefone.replace(/\D/g, '');
    const area_code = telefoneLimpo.slice(0, 2);
    const number = telefoneLimpo.slice(2);
    const external_reference = randomUUID();

    const preference = {
      items: [
        {
          id: produto.id,
          title: produto.title,
          description: produto.description,
          quantity: produto.quantity,
          unit_price: Number(produto.price),
          picture_url: 'https://pmpr.profissionalizaead.com.br/assets/imgpmpr.webp',
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: nome,
        email: email,
        phone: {
          area_code: area_code,
          number: number,
        },
      },
      payment_methods: {
        excluded_payment_types: [],
      },
      back_urls: {
        success: 'https://pmpr.profissionalizaead.com.br/pay_status',
        failure: 'https://pmpr.profissionalizaead.com.br/pay_status',
        pending: 'https://pmpr.profissionalizaead.com.br/pay_status',
      },
      auto_return: 'approved',
      additional_info: '70% de Desconto',
      marketplace: 'NONE',
      marketplace_fee: 0,
      external_reference,
    };

    const response = await preferenceClient.create({ body: preference });

    // Enviando para o webhook do n8n
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email,
        telefoneLimpo,
        produto,
        external_reference,
        client_id,
        preference_id: response.id,
        init_point: response.init_point, // URL de checkout
        sandbox_init_point: response.sandbox_init_point,
        action: 'init_checkout',
      }),
    });

    return new Response(JSON.stringify({ id: response.id }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    console.error('Erro completo:', JSON.stringify(err, Object.getOwnPropertyNames(err)));

    return new Response(
      JSON.stringify({
        error: 'Erro ao criar preferência',
        detalhes: err?.message || 'Sem mensagem de erro',
        tokenRecebido: process.env.MP_ACCESS_TOKEN || 'Token não definido',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
