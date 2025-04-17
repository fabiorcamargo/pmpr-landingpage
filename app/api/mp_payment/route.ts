import { MercadoPagoConfig, Preference } from 'mercadopago';
import { randomUUID } from 'crypto';
import AWS from 'aws-sdk';

const ssm = new AWS.SSM({
  region: 'sa-east-1', // Substitua pela sua região da AWS
});

async function getSecret(secretName: string): Promise<string | undefined> {
  try {
    const response = await ssm.getParameter({
      Name: secretName,
      WithDecryption: true,
    }).promise();
    return response.Parameter?.Value;
  } catch (error) {
    console.error('Erro ao buscar segredo do SSM:', error);
    return undefined;
  }
}

export const POST = async (request: Request) => {
  try {
    const accessToken = await getSecret('/amplify/shared/darz2fi62yq86/MP_ACCESS_TOKEN');

    if (!accessToken) {
      console.error('MP_ACCESS_TOKEN não encontrado nos segredos do SSM.');
      return new Response(JSON.stringify({ error: 'Erro de configuração do servidor' }), { status: 500 });
    }

    const client = new MercadoPagoConfig({
      accessToken: accessToken,
    });

    const preferenceClient = new Preference(client);

    // ... restante do seu código
    const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_POST_CLIENT as string;
    // ... restante do seu código usando preferenceClient e N8N_WEBHOOK_URL

  } catch (err: any) {
    console.error('Erro completo:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    return new Response(
      JSON.stringify({
        error: 'Erro ao criar preferência',
        detalhes: err?.message || 'Sem mensagem de erro',
        tokenRecebido: process.env.MP_ACCESS_TOKEN || 'Token não definido', // Isso agora será undefined se não estiver em env vars
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