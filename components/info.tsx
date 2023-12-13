"use client"

import { Product, ProductCard } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";
import { useState } from "react";

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({
    data
}) => {

    const [itemQuantity, setItemQuantity] = useState(0);

    const cart = useCart();

    const dataWithQuantity: ProductCard = {
            id: data.id,
            category: data.category,
            name: data.name,
            price: data.price,
            isFeatured: data.isFeatured,
            size: data.size,
            quantity: data.quantity,
            brand: data.brand,
            description: data.description,
            images: data.images,
            itemQuantity
    }

    const onAddToCart = () => {
        if(dataWithQuantity.itemQuantity <= 0) {
            dataWithQuantity.itemQuantity = 1
        }
        cart.addItem(dataWithQuantity);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price} />
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Tamanho/ Volume: </h3>
                    <div>
                        {data?.size?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Marca: </h3>
                    <div className="text-sm text-black">
                        {data?.brand?.name}
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Em Estoque: </h3>
                    <div className="text-sm text-black">
                        {data?.quantity}
                    </div>
                </div>
                <div className="flex items-center gap-x-4 border-black border p-1">
                    <h3 className="font-semibold text-black">Defina a quantidade: </h3>
                    <NumberInput onChange={(event, newValue) => setItemQuantity(newValue!)} min={0} max={data?.quantity} defaultValue={0} />
                </div>
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Descrição: </h3>
                    <div className="text-sm text-black h-28 overflow-scroll max-w-lg sm:max-w-md">
                        {data?.description?.description}
                    </div>
                </div>
            </div>
            <div className="mt-10 flex items-center gap-x-3">
                <Button onClick={onAddToCart} className="flex items-center gap-x-2">
                    Add To Cart
                    <ShoppingCart size={20} />
                </Button>
            </div>
        </div>
    )
}

export default Info