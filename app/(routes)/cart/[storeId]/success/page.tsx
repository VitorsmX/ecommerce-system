import getStore from "@/actions/get-store"
import Button from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

interface SuccessPageProps {
  params: {
    storeId: string
  }
};

const SuccessPage: React.FC<SuccessPageProps> = async ({
  params
}) => {

  const baseURL = `${process.env.FRONTEND_STORE_URL!}`
  const storeId = await getStore()

  if (params.storeId !== storeId.id) {
    return null
  }

  const onClick = () => {
    redirect(baseURL)
  }

  return (
    <>
      <div className="bg-green-300 text-3xl flex self-center justify-self-center w-2/3 mt-10">O pagamento foi realizado, seu produto chegará em breve, para dúvidas, entre em contato com: <Link className="text-lg" href="https://api.whatsapp.com/send?phone=5591980423355">+55 (91) 9 96360055</Link></div>
      <hr />
      <Button className="w-1/3 mt-6" onClick={onClick}>Voltar</Button>
    </>
  )
  }

export default SuccessPage;