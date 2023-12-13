"use client"

import Image from "next/image"

import { Product, ProductCard } from "@/types";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { NumberInput } from "@mui/base/Unstable_NumberInput/NumberInput";

interface ProductCardView {
    data: Product;
}

const ProductCard: React.FC<ProductCardView> = ({
    data
}) => {

    const [itemQuantity, setItemQuantity] = useState(0);

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

    const cart = useCart()

    const previewModal = usePreviewModal()

    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        previewModal.onOpen(dataWithQuantity);
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        cart.addItem(dataWithQuantity)
    }

    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/* Images and Actions */}
            <div className="aspect-square rounded-xl gb-gray-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="image"
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600" />}
                        />
                        <IconButton
                            onClick={onAddToCart}
                            icon={<ShoppingCart size={20} className="text-gray-600" />}
                        />
                    </div>
                </div>
            </div>
            {/* Description */}
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category?.name}
                </p>
                <p className="text-sm text-gray-500">
                    Em Estoque: {data?.quantity}
                </p>
                <p className="text-sm text-gray-500">
                    Defina a quantidade: <NumberInput onChange={(event, newValue) => setItemQuantity(newValue!)} min={0} max={data.quantity} />
                </p>
            </div>
            {/* Price */}
            <div className="flex items-center justify-between">
                <Currency value={data?.price} />
            </div>
        </div>
    )
}

export default ProductCard;