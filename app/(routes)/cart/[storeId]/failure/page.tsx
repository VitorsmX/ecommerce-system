import getStore from "@/actions/get-store"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FailurePageProps {
  params: {
      storeId: string
  }
};

const FailurePage: React.FC<FailurePageProps> = async ({
  params
}) => {

    const router = useRouter();
    const baseURL = `${process.env.FRONTEND_STORE_URL!}`
    const storeId = await getStore()

    if(params.storeId !== storeId.id) {
      return null
    }

    const onClick = () => {
      router.push(baseURL)
    }

    return (
      <div className="bg-red-300 text-3xl flex self-center justify-self-center w-2/3 mt-10">Houve um problema com o pagamento, para dúvidas, entre em contato com: <Link className="text-lg" href="https://api.whatsapp.com/send?phone=5591980423355">+55 (91) 9 96360055</Link></div>
    )
  }
  
  export default FailurePage