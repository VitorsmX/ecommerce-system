"use client"

import getPaymentInfo from "@/actions/get-payment"
import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import { PaymentInfo } from "@/types"
import axios from "axios"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

interface SuccessPageProps {
  params: {
    storeId: string
  }
};

const SuccessPage: React.FC<SuccessPageProps> = ({
  params
}) => {

  const searchParams = useSearchParams()!
  const router = useRouter()
  const preferenceId = searchParams.get("preference_id")
  const paymentId = searchParams.get("payment_id")

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/payments/${paymentId}/${preferenceId}`;

  const fetcher = (url: string) => axios.get(url).then(res => res.data)

  const { data, error } = useSWR(URL, () => fetcher(URL))

  let paymentInfo = null;

  if (data) {

    const { id, userName, address, value }: PaymentInfo = data;

    paymentInfo = {
      id,
      userName,
      address,
      value
    }
  }

  if (!params.storeId && preferenceId === null) {
    router.push("/")
  }

  const onClick = () => {
    router.push("/")
  }

  return (
    <div className="flex-col space-y-4">
      <div className="bg-green-300 text-3xl flex-col self-center justify-self-center w-2/3 mt-10">O pagamento foi realizado, seu produto chegará em breve, para dúvidas, entre em contato com: <Link className="text-lg mt-3" href="https://api.whatsapp.com/send?phone=5591980423355">+55 (91) 9 96360055</Link></div>
      <hr />
      <div className="space-y-6">
        <h3>ID do pagamento: {paymentInfo?.id}</h3>
        <h3>Nome do comprador: {paymentInfo?.userName}</h3>
        <h3>Endereço onde será feita entrega: {paymentInfo?.address}</h3>
        <h3>Valor: {<Currency value={parseFloat(paymentInfo?.value as string)} />}</h3>
      </div>
      <Button className="w-1/3 mt-6" onClick={onClick}>Voltar</Button>
    </div>
  )
}

export default SuccessPage;