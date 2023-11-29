import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ExchangeRateRequestData, ExchangeRateResponseData } from '@/types';
const crypto = require('crypto');

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        const reqData = requestData as ExchangeRateRequestData;
        const response = await getExchangeRateOfTokenPair(reqData);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ name: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}

const getExchangeRateOfTokenPair = async (params: ExchangeRateRequestData) : Promise<ExchangeRateResponseData> => {
    const url = `https://ff.io/api/v2/price`;
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

function sign(data:any) {
    return crypto
        .createHmac('sha256', process.env.NEXT_PUBLIC_FIXEDFLOAT_API_SECRET)
        .update(data)
        .digest('hex');
}
  