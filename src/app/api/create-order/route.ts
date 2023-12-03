import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { sql } from '@vercel/postgres';
import { AvailableCurrencies, CreateOrderResponse, CreateOrderRequestData } from '@/types';
const crypto = require('crypto');

export async function POST(request: NextRequest) {

    try {
        
        const requestData = await request.json();
        const reqData = requestData as CreateOrderRequestData;
        const response = await getCreateOrderData(reqData);
        
        console.log("response:", response);
        const orderData: CreateOrderResponse = response;
        if(orderData.code === 0) {
            const id = orderData.data.id;
            const ipaddress = request.headers.get("x-forwarded-for");
            const user_agent = request.headers.get('user-agent');
            const accept_language = request.headers.get('accept-language');
            const timestamp = Math.floor(Date.now() / 1000); // Current time in seconds
            await sql`
                    INSERT INTO users (id, ipaddress, user_agent, accept_language, timestamp)
                    VALUES (${id}, ${ipaddress}, ${user_agent}, ${accept_language}, ${timestamp}) ON CONFLICT (id) DO UPDATE
                    SET
                    id = EXCLUDED.id,
                    ipaddress = EXCLUDED.ipaddress,
                    user_agent = EXCLUDED.user_agent,
                    accept_language = EXCLUDED.accept_language,
                    timestamp = EXCLUDED.timestamp;
                `;
        }
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ name: 'error', message: error }, { status: 500 });
    }
}

function sign(data:any) {
    return crypto
        .createHmac('sha256', process.env.NEXT_PUBLIC_FIXEDFLOAT_API_SECRET)
        .update(data)
        .digest('hex');
}
  
const getCreateOrderData = async (params = {}) : Promise<CreateOrderResponse> => {
    const url = `https://ff.io/api/v2/create`;
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