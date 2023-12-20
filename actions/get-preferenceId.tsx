import axios from "axios";
import { ProductCard } from "@/types";

const getPreferenceId = async (items: ProductCard[]): Promise<string | null> => {

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create-preference`, {
            productIds: items.map((item) => 
            {
                return {
                    id: item.id,
                    itemQuantity: item.itemQuantity
                }
            })
        }).then(function (response) {
            return response.data
        });

        const { id } = response || null;

        return id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getPreferenceId;
