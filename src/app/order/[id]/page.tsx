'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link'
import axios from 'axios';
import Image from 'next/image';
import { BsArrowRight, BsFillCloudUploadFill, BsArrowRepeat, BsDistributeVertical, BsCheckLg  } from 'react-icons/bs'
import QRCode  from 'qrcode.react';
import { OrderDetailsRequest, CreateOrderResponse, CurrencyDetails, TimeDetails, FromToCurrency, OrderStatus, QrCodesResponse, QRCodeInfo } from '@/types';

const statusToStyle = {
    "NEW": {
        NEW: "bg-blue-500 text-white animate-fadeIn",
        PENDING: "bg-blue-400 text-slate-400",
        EXCHANGE: "bg-blue-400 text-slate-400",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-500 text-white",
        WITHDRAW: "bg-blue-500 text-white",
        EXPIRED: "bg-blue-500 text-white",
    },
    "PENDING": {
        NEW: "bg-blue-500 text-white",
        PENDING: "bg-blue-500 text-white animate-fadeIn",
        EXCHANGE: "bg-blue-400 text-slate-400",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-500 text-white",
        WITHDRAW: "bg-blue-500 text-white",
        EXPIRED: "bg-blue-500 text-white",
    },
    "EXCHANGE": {
        NEW: "bg-blue-500 text-white",
        PENDING: "bg-blue-500 text-white",
        EXCHANGE: "bg-blue-500 text-white animate-fadeIn",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-500 text-white",
        WITHDRAW: "bg-blue-500 text-white",
        EXPIRED: "bg-blue-500 text-white",
    },
    "DONE": {
        NEW: "bg-blue-500 text-white",
        PENDING: "bg-blue-500 text-white",
        EXCHANGE: "bg-blue-500 text-white",
        DONE: "bg-blue-500 text-white",
        EMERGENCY: "bg-blue-500 text-white",
        WITHDRAW: "bg-blue-500 text-white",
        EXPIRED: "bg-blue-500 text-white",
    },
    "EMERGENCY": {
        NEW: "bg-blue-400 text-slate-400",
        PENDING: "bg-blue-400 text-slate-400",
        EXCHANGE: "bg-blue-400 text-slate-400",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-400 text-slate-400",
        WITHDRAW: "bg-blue-400 text-slate-400",
        EXPIRED: "bg-blue-400 text-slate-400",
    },
    "WITHDRAW": {
        NEW: "bg-blue-400 text-slate-400",
        PENDING: "bg-blue-400 text-slate-400",
        EXCHANGE: "bg-blue-400 text-slate-400",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-400 text-slate-400",
        WITHDRAW: "bg-blue-400 text-slate-400",
        EXPIRED: "bg-blue-400 text-slate-400",
    },
    "EXPIRED": {
        NEW: "bg-blue-400 text-slate-400",
        PENDING: "bg-blue-400 text-slate-400",
        EXCHANGE: "bg-blue-400 text-slate-400",
        DONE: "bg-blue-400 text-slate-400",
        EMERGENCY: "bg-blue-400 text-slate-400",
        WITHDRAW: "bg-blue-400 text-slate-400",
        EXPIRED: "bg-blue-400 text-slate-400",
    }
};

export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const id = params.id;

    const [orderDetails, setOrderDetails] = useState<CreateOrderResponse | null>(null);
    const [qrCodes, setQrCodes] = useState<QrCodesResponse | null>(null);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [orderStatus, setOrderStatus] = useState<OrderStatus>('NEW');
    const [activeTab, setActiveTab] = useState<string>('');

  
    useEffect(() => {
        const getOrderDetails = async (requestData: OrderDetailsRequest) => {
            try {
                const response = await axios.post(
                    '/api/get-order-details',
                    {
                      ...requestData,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  );
                console.log("availableData:", response.data);
                const orderData: CreateOrderResponse = response.data;
                if(orderData.code === 0) {
                    setOrderDetails(orderData);
                    setOrderStatus(orderData.data.status)
                    setTimeLeft(orderData?.data.time.left);
                }
                
              } catch (error) {
                console.error("error", error)
              }
        };

        const getQRCodes = async (requestData: OrderDetailsRequest) => {
            try {
                const response = await axios.post(
                    '/api/get-qr-codes',
                    {
                      ...requestData,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  );
                console.log("availableData:", response.data);
                const orderData: QrCodesResponse = response.data;
                if(orderData.code === 0) {
                    setQrCodes(orderData);
                    const whoIsActive = orderData.data.find((qrCode) => qrCode.checked === true)?.title === "Address" ? "address" : "amount";
                    setActiveTab(whoIsActive);
                }
                
              } catch (error) {
                console.error("error", error)
              }
        };

        if(token && id){
            getOrderDetails({token, id});
            getQRCodes({token, id})
        }

        const tick = () => {
            console.log("tick")
            setTimeLeft((prevTime) => (prevTime !== null && prevTime > 0 ? prevTime - 1 : 0));
        };

        // Set up the interval to decrement the local time every second
        const intervalId = setInterval(tick, 1000);
    
        // Fetch new data from the server every 10 seconds
        const fetchIntervalId = setInterval(() => {
            if (token && id) {
            getOrderDetails({ token, id });
            }
        }, 60000);
        // Clear intervals on component unmount
        return () => {
          clearInterval(intervalId);
          clearInterval(fetchIntervalId);
        };
    }, [token, id])
    
    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    function formatTime(seconds: number): string {
        const minutes: number = Math.floor(seconds / 60);
        const remainingSeconds: number = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    const formattedTimeLeft: string = timeLeft ? formatTime(timeLeft): "Expired";
    const fromCurrency: CurrencyDetails | null = orderDetails && orderDetails.data.from;
    const toCurrency: CurrencyDetails | null = orderDetails && orderDetails.data.to;
    const timeDetail: TimeDetails | null = orderDetails && orderDetails.data.time;
    const type = orderDetails?.data.type;
    const fromToCurrencyLocalStorageData = localStorage.getItem('fromToCurrencyData')
    const fromToCurrency: FromToCurrency = fromToCurrencyLocalStorageData && JSON.parse(fromToCurrencyLocalStorageData);
    const timestamp = timeDetail?.reg;
    const addressQrCode: QRCodeInfo | undefined = qrCodes?.data.find((code) => code.title === "Address");
    const amountQrCode: QRCodeInfo | undefined = qrCodes?.data.find((code) => code.title !== "Address");
    // Convert the timestamp to milliseconds by multiplying by 1000
    const date = timestamp ? new Date(timestamp * 1000) : new Date();
    
    // Format the date to the desired format: 11/11/2023 11:57 PM
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', // not 'string'
        month: '2-digit', // not 'string'
        day: '2-digit', // not 'string'
        hour: '2-digit', // not 'string'
        minute: '2-digit', // not 'string'
        hour12: true, // boolean value, not 'string'
      };
    const formattedDate = date.toLocaleString('en-US', options);
    const getStatusStyles = (status: OrderStatus) => {
        return statusToStyle[orderStatus][status];
    };
  return (
    <main className="w-screen">
        <section className="flex flex-col items-center w-full h-screen">
            <div className="bg-dashboardbg bg-bottom bg-cover bg-no-repeat w-screen h-screen absolute"></div>
        
            <div className="z-10">
                <div className="p-2 lg:p-0 lg:w-full ">
                   {/* token pair section */}
                   <div className="flex flex-row items-center justify-center w-full lg:mt-16 bg-[rgba(0,0,0,0.5)] py-2 lg:py-6 text-white rounded-md">
                        {/* first token part */}
                        <div className="flex flex-row items-center">
                            {/* detail part */}
                            <div className="flex flex-col justify-end items-end">
                                <p className='text-[10px] lg:text-xs text-slate-400'>YOU SEND</p>
                                <p className={`text-sm lg:text-xl`} style={{color: fromToCurrency?.fromCurrency.color}}>{fromCurrency?.amount} {fromCurrency?.coin}</p>
                                <p className='hidden lg:block text-xs'>{fromCurrency?.address}</p>
                            </div>
                            <div className="mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                                <Image 
                                    src={fromToCurrency.fromCurrency.logo} 
                                    width={40} 
                                    height={40} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>
                        </div>
                        {/* arrow */}
                        <div className={`text-white mr-4`}>
                            <BsArrowRight /> 
                        </div>
                        {/* first token part */}
                        <div className="flex flex-row items-center">
                            <div className="mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                                <Image 
                                    src={fromToCurrency?.toCurrency.logo} 
                                    width={40} 
                                    height={40} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>
                            {/* detail part */}
                            <div className="flex flex-col">
                                <p className='text-[10px] lg:text-xs text-slate-400'>YOU RECEIVE</p>
                                <p className='text-sm lg:text-xl' style={{color: fromToCurrency?.toCurrency.color}}>{toCurrency?.amount} {toCurrency?.coin}</p>
                                <p className='hidden lg:block text-xs'>{toCurrency?.address}</p>
                            </div>
                        </div>
                   </div>
                   {/* token detail section */}
                   <div className="flex flex-row items-center my-4 justify-evenly lg:justify-between text-white">
                        {/* Left section */}
                        <div className="flex flex-col bg-[rgba(0,0,0,0.5)] lg:w-[170px] p-2 h-[200px] lg:h-[260px]">
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Order ID</span>
                                <span className={`text-sm lg:text-lg`} style={{color: fromToCurrency?.fromCurrency.color}}>{id}</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Time remaining</span>
                                <span className={`text-sm lg:text-lg`} style={{color: fromToCurrency?.fromCurrency.color}}>{formattedTimeLeft}</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Order type</span>
                                <span className={`text-sm`}>{type} rate</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center lg:py-2`}>
                                <span className='text-slate-400 text-xs'>Creation Time</span>
                                <span className={`text-xs lg:text-xs`}>{formattedDate}</span>
                            </div>
                        </div>
                        {/* Middle section */}
                        <div className="hidden lg:block ml-4 p-6 bg-[rgba(0,0,0,0.5)] lg:w-2/3 h-[260px]">
                            <p className='text-sm text-slate-400'>Send <span className={`text-lg text-white`} style={{color: fromToCurrency?.fromCurrency.color}}>0.00345434 BTC</span> to the address</p>
                            <div className='text-white text-lg'>{fromCurrency?.address}</div>
                            <div className='mt-10 text-sm text-slate-400'>The exchange rate will be fixed after receiving  network confirmations</div>
                            <div className="border-t-[1px] border-[rgba(135,159,171,0.31)] mt-8 py-4">
                                <p className='text-sm text-slate-400'>Receiving address ETH</p>
                                <p className='text-sm font-bold mt-2'>{toCurrency?.address}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-start justify-center lg:mx-2 lg:ml-4 w-[180px] h-[200px] lg:w-[260px] lg:h-[260px] bg-slate-200 relative">
                            {activeTab === 'address'  && <div className="mb-4 w-[170px] h-[170px] lg:w-fit lg:h-fit lg:mb-1">
                                {/* <QRCode value="Your value here" size={200} /> */}
                                <Image 
                                    src={addressQrCode ? addressQrCode.src : ""} 
                                    width={180} 
                                    height={180} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>}
                            {activeTab === 'amount' && <div className="mb-4 w-[170px] h-[170px] lg:w-fit lg:h-fit lg:mb-1">
                                {/* <QRCode value="Your value here" size={200} /> */}
                                <Image 
                                    src={amountQrCode ? amountQrCode.src : ""} 
                                    width={180} 
                                    height={180} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>}
                            
                            <div className="flex justify-center absolute bottom-0 ">
                                {/* Tab buttons */}
                                <button 
                                className={`px-3 lg:px-6 py-1 text-sm rounded-md ${activeTab === 'address' ? 'bg-slate-400 text-white' : 'bg-gray-200 text-black'}`} 
                                onClick={() => setActiveTab('address')}
                                >
                                Address
                                </button>
                                <button 
                                className={`px-2 lg:px-4 py-1 text-sm rounded-md ${activeTab === 'amount' ? 'bg-slate-400 text-white' : 'bg-gray-200 text-black'}`} 
                                onClick={() => setActiveTab('amount')}
                                >
                                With amount
                                </button>
                            </div>
                        </div>
                        
                   </div>
                   {/* responsive middle section */}
                   <div className="block lg:hidden bg-[rgba(0,0,0,0.5)] p-4">
                            <p className='text-xs text-slate-400'>Send <span className={`text-sm text-white`} style={{color: fromToCurrency?.fromCurrency.color}}>0.00345434 BTC</span> to the address</p>
                            <div className='text-white text-xs min-w-fit'>{fromCurrency?.address}</div>
                            <div className='mt-4 text-xs text-slate-400'>The exchange rate will be fixed after receiving  network confirmations</div>
                            <div className="border-t-[1px] border-[rgba(135,159,171,0.31)] mt-4 py-2">
                                <p className='text-xs text-slate-400'>Receiving address ETH</p>
                                <p className='text-xs font-bold text-white mt-2'>{toCurrency?.address}</p>
                            </div>
                        </div>
                   {/* progress part */}
                   <div className="flex flex-row items-center justify-evenly mt-8 lg:mt-24">
                        <div className="flex flex-col items-center justify-center">
                            <div className={`flex flex-row items-center justify-center rounded-full mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20  text-6xl ${getStatusStyles("NEW")}`}>
                                <BsFillCloudUploadFill />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Awaiting deposit</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className={`flex flex-row items-center justify-center rounded-full mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-6xl ${getStatusStyles("PENDING")}`}>
                                <BsArrowRepeat />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Awaiting confirmations</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className={`flex flex-row items-center justify-center rounded-full mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-6xl ${getStatusStyles("EXCHANGE")}`}>
                                <BsDistributeVertical />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Perform exchange</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className={`flex flex-row items-center justify-center rounded-full mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20  text-6xl ${getStatusStyles("DONE")}`}>
                                <BsCheckLg />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Successfully Done</span>
                        </div>
                        
                   </div>
                   { orderStatus === "DONE" ? (<div className="flex flex-row items-center justify-center text-xs text-white py-1 mt-6 lg:mt-8 bg-red-500 rounded-md">
                        <div className='w-1/6'>
                            <Link href={'/'}>back to</Link>
                        </div>
                   </div>) : ""}
                </div>
            </div>
        </section>
    </main>
  );
}