import axios from "axios";
import { PaymentInfo } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/payments`;

const getPaymentInfo = async (paymentId: string, preferenceId: string): Promise<PaymentInfo | null> => {

    try {
        const response = await axios.get(`${URL}/${paymentId}/${preferenceId}`).then(function (response) {
            return response.data
        });

        const { id, userName, address, value }:PaymentInfo = response || null;

        const paymentInfo = {
            id,
            userName,
            address,
            value
        }

        return paymentInfo;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getPaymentInfo;
