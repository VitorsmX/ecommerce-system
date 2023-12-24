"use client"

import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useRouter } from 'next/navigation';

interface PaymentProps {
  preferenceId: string;
}

const Payment: React.FC<PaymentProps> = ({
  preferenceId
}) => {

    const router = useRouter()

    const redirectSuccess = () => {
      router.push(`/cart/155fde0b-a678-4d94-9c9c-936d71c925ee/success`)
    }

    useEffect(() => {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_SAMPLE_PUBLIC_KEY!, { locale: 'pt-BR' });
    }, []);

    return (
      <div>
        <Wallet 
        initialization={{preferenceId: preferenceId, redirectMode: "blank"}}
        onReady={() => redirectSuccess()}
        onError={() => {}}
        />
      </div>
    );
};

export default Payment;
        





