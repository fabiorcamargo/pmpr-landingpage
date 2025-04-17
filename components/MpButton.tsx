'use client';

import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { useEffect } from 'react';

interface MpButtonProps {
  preferenceId: string | null;
}

const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

export default function MpButton({ preferenceId }: MpButtonProps) {
  useEffect(() => {
    if (publicKey) {
      initMercadoPago(publicKey);
    }
  }, []);

  if (!preferenceId) return null;

  return (
    <div className="text-center">
      <p className="text-lg">Desconto concedido <br></br>Adquira Agora</p>
      <p className="mb-4"></p>
      <Wallet
        initialization={{
          preferenceId,
          redirectMode: 'self',
        }}
        customization={{
          theme: 'dark',
        }}
      />
    </div>
  );
}
