'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { BsQrCodeScan, BsClipboard, BsArrowRight, BsFillCloudUploadFill, BsArrowRepeat, BsDistributeVertical, BsCheckLg  } from 'react-icons/bs'
import QRCode  from 'qrcode.react';
import depositIcon from '../../../../public/images/deposit.png'
import confirmationIcon from '../../../../public/images/confirmation.jpg'
import exchangeIcon from '../../../../public/images/exchange.jpg'
import doneIcon from '../../../../public/images/dashboard.svg'
import vercel from '../../../../public/vercel.svg'

export default function Page({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    console.log("code",params.id, token);
    const id = params.id;

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
                                <p className='text-sm lg:text-xl'>0.000342 BTC</p>
                                <p className='hidden lg:block text-xs'>address of this token</p>
                            </div>
                            <div className="mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                                <Image 
                                    src={'https://fixedfloat.com/assets/images/coins/svg/eth.svg'} 
                                    width={40} 
                                    height={40} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>
                        </div>
                        {/* arrow */}
                        <div className={`text-white`}>
                            <BsArrowRight /> 
                        </div>
                        {/* first token part */}
                        <div className="flex flex-row items-center">
                            <div className="mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                                <Image 
                                    src={'https://fixedfloat.com/assets/images/coins/svg/eth.svg'} 
                                    width={40} 
                                    height={40} 
                                    alt={'No Currency Name'} 
                                    layout="responsive"
                                />
                            </div>
                            {/* detail part */}
                            <div className="flex flex-col">
                                <p className='text-[10px] lg:text-xs text-slate-400'>YOU RECEIVE</p>
                                <p className='text-sm lg:text-xl'>0.000342 BTC</p>
                                <p className='hidden lg:block text-xs'>address of this token</p>
                            </div>
                        </div>
                   </div>
                   {/* token detail section */}
                   <div className="flex flex-row items-center my-4 justify-evenly lg:justify-between text-white">
                        {/* Left section */}
                        <div className="flex flex-col bg-[rgba(0,0,0,0.5)] lg:w-[170px] p-2 h-[200px] lg:h-[260px]">
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Order ID</span>
                                <span className={`text-sm lg:text-lg`}>{id}</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Time remaining</span>
                                <span className={`text-sm lg:text-lg`}>{id}</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center p-1 lg:p-2 border-b-[1px] border-[rgba(135,159,171,0.31)]`}>
                                <span className='text-slate-400 text-xs'>Order type</span>
                                <span className={`text-sm`}>Float rate</span>
                            </div>
                            <div className={`flex flex-col items-center justify-center lg:p-2`}>
                                <span className='text-slate-400 text-xs'>Creation Time</span>
                                <span className={`text-xs lg:text-sm`}>11/11/2023/ 11:57 PM</span>
                            </div>
                        </div>
                        {/* Middle section */}
                        <div className="hidden lg:block ml-4 p-6 bg-[rgba(0,0,0,0.5)] lg:w-2/3 h-[260px]">
                            <p className='text-sm text-slate-400'>Send <span className={`text-lg text-white`}>0.00345434 BTC</span> to the address</p>
                            <div className='text-white text-lg'>adfdfei0430240432043204320432403243243242</div>
                            <div className='mt-10 text-sm text-slate-400'>The exchange rate will be fixed after receiving  network confirmations</div>
                            <div className="border-t-[1px] border-[rgba(135,159,171,0.31)] mt-8 py-4">
                                <p className='text-sm text-slate-400'>Receiving address ETH</p>
                                <p className='text-sm font-bold mt-2'>0x494jk3k494k4k43k434343k09000ffdmkkfdsa</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center lg:mx-2 lg:ml-4 w-[200px] h-[200px] lg:w-[260px] lg:h-[260px] bg-slate-200">
                            <QRCode value="Your value here" size={200} />
                        </div>
                        
                   </div>
                   {/* responsive middle section */}
                   <div className="block lg:hidden bg-[rgba(0,0,0,0.5)] p-4">
                            <p className='text-xs text-slate-400'>Send <span className={`text-sm text-white`}>0.00345434 BTC</span> to the address</p>
                            <div className='text-white text-xs min-w-fit'>adfdfei0430240432043204320432403243243242</div>
                            <div className='mt-4 text-xs text-slate-400'>The exchange rate will be fixed after receiving  network confirmations</div>
                            <div className="border-t-[1px] border-[rgba(135,159,171,0.31)] mt-4 py-2">
                                <p className='text-xs text-slate-400'>Receiving address ETH</p>
                                <p className='text-xs font-bold text-white mt-2'>0x494jk3k494k4k43k434343k09000ffdmkkfdsa</p>
                            </div>
                        </div>
                   {/* progress part */}
                   <div className="flex flex-row items-center justify-evenly mt-12 lg:mt-24">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-center rounded-full bg-blue-500 mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white text-6xl ">
                                <BsFillCloudUploadFill />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Awaiting deposit</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-center rounded-full bg-blue-500 mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white text-6xl ">
                                <BsArrowRepeat />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Awaiting confirmations</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-center rounded-full bg-blue-500 mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white text-6xl ">
                                <BsDistributeVertical />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Perform exchange</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-center rounded-full bg-blue-500 mr-1 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white text-6xl ">
                                <BsCheckLg />
                            </div>
                            <span className='text-sm mt-2 text-center lg:mt-6 text-white lg:text-xl'>Successfully Done</span>
                        </div>
                        
                   </div>
                </div>
            </div>
        </section>
    </main>
  );
}