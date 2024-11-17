import axios from 'axios';
import { izipayConfig } from '../config/izipay.js';

export const createPayment = async (amount, currency = 'PEN') => {
    const response = await axios.post(
        `${izipayConfig.baseUrl}/payment`,
        { amount, currency },
        {
            headers: {
                Authorization: `Bearer ${izipayConfig.apiKey}`,
            },
        }
    );
    return response.data;
};
