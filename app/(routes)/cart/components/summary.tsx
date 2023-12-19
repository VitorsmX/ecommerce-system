"use client"

import axios from "axios"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Button from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import { toast } from "react-hot-toast"
import { Wallet } from "@mercadopago/sdk-react"
import React from "react"
import Payment from "@/components/payment/payment"
import getPreferenceId from "@/actions/get-preferenceId"
import usePref from "@/hooks/use-preference-id"

const Summary = () => {

    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const setPrefId = usePref()
    const prefId = usePref((state) => state.item)
    const removeAll = useCart((state) => state.removeAll);
    const [isReady, setIsReady] = React.useState(false);

    const handleOnReady = () => {
        setIsReady(true);
      }

    const totalPrice = items.reduce((total, item) => {
        return total + (Number(item.price) * item.itemQuantity);
    }, 0)

    const renderCheckoutButton = (preferenceId: string | null) => {
        return Payment(preferenceId)
      }

    const onCheckout = async () => {
        
        const preferenceId = await getPreferenceId(items)

        if(preferenceId) {
            setPrefId.setItem(preferenceId)
            handleOnReady()
        } else {
            setIsReady(false)
        }
    }

    const totalQuantity = items.reduce((total, item) => {
        return total + item.itemQuantity
    }, 0)

    return (
        <div
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            {isReady && renderCheckoutButton(prefId)}
            <h2 className="text-lg font-medium text-gray-900">
                Pedido
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Valor Total
                    </div>
                    <Currency value={totalPrice} />
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Quantidade Total
                    </div>
                    {totalQuantity}
                </div>
            </div>
            <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
                Finalizar
            </Button>
        </div>
    )
}

export default Summary;