"use client"

import Button from "@/components/ui/button"
import { PaymentInfoFailure } from "@/types"
import axios from "axios"
import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

interface FailurePageProps {
  params: {
    storeId: string
  }
};


const FailurePage: React.FC<FailurePageProps> = ({
  params
}) => {

  const router = useRouter()
  const searchParams = useSearchParams()!
  const preferenceId = searchParams.get("preference_id")
  console.log(preferenceId)

  const URL = `${process.env.NEXT_PUBLIC_API_URL}/get-preference/${preferenceId}`;

  const fetcher = (url: string) => axios.get(url).then(res => res.data)

  const { data, error } = useSWR(URL, () => fetcher(URL))

  if (error) {
    console.log(error)
  }

  let paymentInfoFailure = null;
  
  if (data) {
    const { id, productNames }: PaymentInfoFailure = data;
    paymentInfoFailure = {
      id,
      productNames
    }
  }

  console.log(paymentInfoFailure)

  if (!params.storeId && preferenceId === null) {
    router.push("/")
  }

  const onClick = () => {
    router.push("/")
  }

  return (
    <div className="flex-col space-y-5">
      <div className="bg-red-300 text-3xl flex self-center justify-self-center w-2/3 mt-10">Houve um problema com o pagamento, para dúvidas, entre em contato com: <Link className="text-lg" href="https://api.whatsapp.com/send?phone=5591980423355">+55 (91) 9 96360055</Link></div>
      <div className="space-y-6">
        <h3>ID do pagamento: {paymentInfoFailure?.id}</h3>
        <h3>Produtos: {paymentInfoFailure?.productNames}</h3>
      </div>
      <Button className="w-1/3 mt-6" onClick={onClick}>Voltar</Button>
    </div>
  )
}

export default FailurePage