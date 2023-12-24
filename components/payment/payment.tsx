"use client"

import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PaymentProps {
  preferenceId: string;
}

const Payment: React.FC<PaymentProps> = ({
  preferenceId
}) => {

    const [showLink, setShowLink] = useState(false)

    const router = useRouter()

    const showRedirectLink = () => {
      setShowLink(true)
    }

    useEffect(() => {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_SAMPLE_PUBLIC_KEY!, { locale: 'pt-BR' });
    }, []);

    return (
      <div>
        {showLink && <Link className='my-4' href={"/cart/155fde0b-a678-4d94-9c9c-936d71c925ee/success"} onClick={() => router.push("/cart/155fde0b-a678-4d94-9c9c-936d71c925ee/success")} target="_blank">Clique aqui para acompanhar o pagamento</Link>}
        <Wallet 
        initialization={{preferenceId: preferenceId, redirectMode: "blank"}}
        onReady={() => showRedirectLink()}
        onError={() => {}}
        />
      </div>
    );
};

export default Payment;
        





