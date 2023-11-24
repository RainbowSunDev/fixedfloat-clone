'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CurrencyInputDropdown from '@/components/CurrencyInput';
import CoinAddressInput from '@/components/CoinAddressInput';
import OrderTypeToggle from '@/components/OrderTypeToggle';
import { BsArrowRight, BsArrowLeft  } from 'react-icons/bs'
import { Currency, ExtendedCurrency } from '@/types';
// Assume currencies have an additional 'icon' field with the path to their respective icons.
const currencies = [
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
];

// Initialize the state with default UI properties
const defaultFromCurrency: ExtendedCurrency = { 
  code: "", 
  coin: "BTC", 
  network: "BTC", 
  name: 'Bitcoin', 
  recv: true, 
  send: true, 
  tag:null, 
  logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', 
  color:"text-[#f7931a]", 
  priority: "5", 
  borderColor: 'border-blue-500', // Replace with actual default color
  textColor: 'text-blue-500'
}

const defaultToCurrency: ExtendedCurrency = {
  code: "", 
  coin: "ETH", 
  network: "ETH", 
  name: 'Ethereum', 
  recv: true, 
  send: true, 
  tag:null, 
  logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', 
  color:"text-[#f7931a]", 
  priority: "5", 
  borderColor: 'border-blue-500', 
  textColor: 'text-blue-500'
};

export default function Home() {
  // State for "from" currency
  const [fromCurrency, setFromCurrency] = useState<ExtendedCurrency | null>(null);
  // State for "to" currency
  const [toCurrency, setToCurrency] = useState<ExtendedCurrency | null>(null);

  const [parentSelectedCurrency, setParentSelectedCurrency] = useState<Currency | null>(null);

  useEffect(() => {
    if (!parentSelectedCurrency && currencies.length > 0) {
      setParentSelectedCurrency(currencies[0]);
    }
    
  }, [parentSelectedCurrency]);

  const handleCurrencyChange = (currency: Currency) => {
    setParentSelectedCurrency(currency);
  };

  // Handler for swapping the currencies
  const handleSwapCurrencies = () => {
    // Swap the "from" and "to" currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const selectCurrencyColor = parentSelectedCurrency ? parentSelectedCurrency.color : 'text-white';

  return (
    <main className="w-screen ">
      <div className="flex flex-col items-center w-full h-screen relative">
        <div className="bg-dashboardbg bg-bottom bg-cover bg-no-repeat w-screen h-screen absolute"></div>
        <header className=" w-full sm:px-8 z-10">
          <div className="flex justify-between border-b-[1px] border-b-slate-600 py-1 sm:py-3">
            <a href="https://" className="flex items-center text-lg pl-4 sm:text-2xl">
                <span className="self-center font-semibold whitespace-nowrap text-hover mr-2">Fixed</span>
                <span className=''>
                  <Image 
                    src="https://flowbite.com/docs/images/logo.svg" 
                    layout="responsive"
                    width={30} 
                    height={30} 
                    sizes="10px (max-width: 768px) 20px, (max-width: 1024px) 25px, 30px"
                    alt="FixedFloat Logo" 
                  />
                </span>
                <span className="self-center font-semibold whitespace-nowrap text-white ml-2">Float</span>
            </a>

            <button data-collapse-toggle="headerbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>

            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white rounded">My Account</a>
                </li>
                
              </ul>
            </div>
          </div>
        </header>
        <div className="flex flex-row items-center justify-center z-10">
          <div className="my-8 sm:my-[60px] ">
            <h1 className='text-center text-xl sm:text-[2em] md:text-[2.6em] font-semibold text-white'>Lightning cryptocurrency exchange</h1>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mt-16 lg:mt-24">
                <CurrencyInputDropdown 
                  parentSelectedCurrency={fromCurrency}
                  onSetCurrencyChange={setFromCurrency} 
                  currencies={currencies} 
                  borderColor={fromCurrency?.borderColor}
                  textColor={fromCurrency?.textColor}
                  onCurrencyChange={handleCurrencyChange} 
                  onSwapCurrencies={handleSwapCurrencies}
                />
                <button className='text-lg sm:text-xl font-extrabold text-center mb-6 sm:mx-6' onClick={() => handleSwapCurrencies()}>
                  <div className={`ml-2  ${toCurrency?.color ?? "text-white"}`}>
                    <BsArrowRight /> 
                  </div>
                  <div className={`mr-2  ${fromCurrency?.color ?? "text-white"}`}>
                    <BsArrowLeft />
                  </div>
                </button>
                <CurrencyInputDropdown 
                  parentSelectedCurrency={toCurrency}
                  onSetCurrencyChange={setToCurrency} 
                  currencies={currencies} 
                  borderColor={toCurrency?.borderColor}
                  textColor={toCurrency?.textColor} 
                  onCurrencyChange={handleCurrencyChange} 
                  onSwapCurrencies={handleSwapCurrencies}
                />
              </div>
              <div className="mt-10 sm:mt-14">
                <CoinAddressInput />
              </div>
              <div className="mt-10">
                <OrderTypeToggle />
              </div>
              
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-center sm:block sm:px-16 sm:mt-4 text-slate-400 text-[10px] sm:text-sm z-20'>
          <span>By using the site and creating an exchange, you agree to the FixedFloat`s</span>
          <span className="">
            <a className="text-blue-500 hover:border-b-[1px] hover:border-blue-500" href="http://"> Terms of Sevices</a>
          </span>
          <span>
            and
          </span> 
          <span>
            <a href="" className="text-blue-500 hover:border-b-[1px] hover:border-blue-500"> Privacy Policy</a>
          </span>
        </div>
      </div>
      
    </main>
  )
}
