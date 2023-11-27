import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AvailableCurrencies, Currency } from '@/types';
const crypto = require('crypto');

export async function GET(request: NextRequest) {
    // return
    const method: string = "ccies";
    try {
        const response = await getCurrencies(method);
        const updatedCurrencies = response.data.map((currency) => ({
            ...currency,
            color: `${currency.color}`,
          }));
          const currencies = [...updatedCurrencies].sort((a, b) => parseInt(b.priority) - parseInt(a.priority));
        return NextResponse.json(currencies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ name: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}

function sign(data:any) {
    return crypto
        .createHmac('sha256', process.env.NEXT_PUBLIC_FIXEDFLOAT_API_SECRET)
        .update(data)
        .digest('hex');
}
  
const getCurrencies = async (method: string, params = {}) : Promise<AvailableCurrencies> => {
    const url = `https://ff.io/api/v2/${method}`;
    const data = JSON.stringify(params);
    const headers = {
        'X-API-KEY': process.env.NEXT_PUBLIC_FIXEDFLOAT_API_KEY,
        'X-API-SIGN': sign(data),
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Webhook error', { cause: error });
    }
}