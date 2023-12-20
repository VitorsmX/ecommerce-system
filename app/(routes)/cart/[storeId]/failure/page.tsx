"use client"

import Button from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

interface FailurePageProps {
  params: {
      storeid: string
  }
};


const FailurePage: React.FC<FailurePageProps> = ({
  params
}) => {

    const baseURL = `${process.env.FRONTEND_STORE_URL!}`

    if(!params.storeid) {
      redirect(baseURL)
    }

    const onClick = () => {
      redirect(baseURL)
    }

    return (
      <>
      <div className="bg-red-300 text-3xl flex self-center justify-self-center w-2/3 mt-10">Houve um problema com o pagamento, para dúvidas, entre em contato com: <Link className="text-lg" href="https://api.whatsapp.com/send?phone=5591980423355">+55 (91) 9 96360055</Link></div>
      <Button className="w-1/3 mt-6" onClick={onClick}>Voltar</Button>
      </>
    )
  }
  
  export default FailurePage