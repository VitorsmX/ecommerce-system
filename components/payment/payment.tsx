"use client"

import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Payment = (preferenceId: string | null) => {

    useEffect(() => {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_SAMPLE_PUBLIC_KEY!, { locale: 'pt-BR' });
    }, []);

    return (
      <div>
        <Wallet initialization={{preferenceId: preferenceId as string}} />
      </div>
    );
};

export default Payment;
        





