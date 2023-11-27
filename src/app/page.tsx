'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CurrencyInputDropdown from '@/components/CurrencyInput';
import CoinAddressInput from '@/components/CoinAddressInput';
import OrderTypeToggle from '@/components/OrderTypeToggle';
import { BsArrowRight, BsArrowLeft  } from 'react-icons/bs'
import axios from 'axios';
import { Currency, ExtendedCurrency } from '@/types';
import { FromToCurrency } from '@/types';
// Assume currencies have an additional 'icon' field with the path to their respective icons.
// const currencies = [
//   { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
//   { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
//   { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
//   { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" },
//   { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg', color:"text-[#f7931a]", priority: "5" },
//   { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg', color:"text-white", priority: "5" }
// ];

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
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);

  // State for "from" currency
  // const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  // // State for "to" currency
  // const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [fromToCurrency, setFromToCurrency] = useState<FromToCurrency | null>(null);

  const [parentSelectedCurrency, setParentSelectedCurrency] = useState<Currency | null>(null);

  const [fixedSelectedCurrencyColor, setFixedSelectedCurrencyColor] = useState<string>();
  const [floatSelectedCurrencyColor, setFloatSelectedCurrencyColor] = useState<string>();

  useEffect(() => {
    const getAvailbaleCurrencies = async () => {
      try {
        const response = await axios.get(
          '/api/get-available-token',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("response", response)
        setCurrencies(response.data);
        const fromToCurrencyInitialData: FromToCurrency = {
          fromCurrency: response.data[0],
          toCurrency: response.data[1],
          direction: true
        }
        setFromToCurrency(fromToCurrencyInitialData);
        
        setFixedSelectedCurrencyColor(fromToCurrencyInitialData?.fromCurrency?.color);
        setFloatSelectedCurrencyColor(fromToCurrencyInitialData?.toCurrency?.color);
      } catch (error) {
        console.error("error", error)
      }
    }
    getAvailbaleCurrencies();
  }, [])
  useEffect(() => {

    if (currencies && !parentSelectedCurrency && currencies.length > 0) {
      setParentSelectedCurrency(currencies[0]);
    }
    
  }, [parentSelectedCurrency]);

  const handleFixedCurrencyColor = (fixedCurrencyColor: string) => {
    setFixedSelectedCurrencyColor(fixedCurrencyColor)
  }

  const handleFloatCurrencyColor = (floatCurrencyColor: string) => {
    setFloatSelectedCurrencyColor(floatCurrencyColor)
  }
  // Handler for swapping the currencies
  const handleSwapCurrencies = () => {
    // Swap the "from" and "to" currencies
    const tempColor = fixedSelectedCurrencyColor;
    setFixedSelectedCurrencyColor(floatSelectedCurrencyColor);
    setFloatSelectedCurrencyColor(tempColor)
    
    if(fromToCurrency) {
      const newFromToCurrencyData: FromToCurrency = {
        fromCurrency: fromToCurrency.toCurrency,
        toCurrency: fromToCurrency.fromCurrency,
        direction: !fromToCurrency.direction
      };
      setFromToCurrency(newFromToCurrencyData)
    }
  }
  const handleSetFromCurrency = (fromCurrency: Currency) => {
    if(fromToCurrency) {
      const newFromToCurrencyData: FromToCurrency = {
        ...fromToCurrency,
        fromCurrency: fromCurrency
      };
      setFromToCurrency(newFromToCurrencyData)
    }
  }
  const handleSetToCurrency = (toCurrency: Currency) => {
    if(fromToCurrency) {
      const newFromToCurrencyData: FromToCurrency = {
        ...fromToCurrency,
        toCurrency: toCurrency
      };
      setFromToCurrency(newFromToCurrencyData)
    }
  }
  console.log("fromtocurrency", fromToCurrency)
  return (
    <main className="w-screen ">
      <div className="flex flex-col items-center w-full h-screen relative">
        <div className="bg-dashboardbg bg-bottom bg-cover bg-no-repeat w-screen h-screen absolute"></div>
        
        <div className="flex flex-row items-center justify-center z-10">
          <div className="my-6 sm:my-[60px] ">
            <h1 className='text-center text-xl sm:text-[2em] md:text-[2.6em] font-semibold text-white'>Lightning cryptocurrency exchange</h1>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mt-16 lg:mt-24">
                <CurrencyInputDropdown 
                  currencies={currencies} 
                  onSwapCurrencies={handleSwapCurrencies}
                  onSetArrowColor={handleFixedCurrencyColor}
                  fromToCurrency={fromToCurrency && fromToCurrency.fromCurrency}
                  onSetCurrencyCurrency={handleSetFromCurrency}
                />
                <button className='text-lg sm:text-xl font-extrabold text-center mb-6 sm:mx-6' onClick={() => handleSwapCurrencies()}>
                  <div className={`ml-2  ${fromToCurrency?.fromCurrency?.color ?? "text-white"}`} style={{ color: fixedSelectedCurrencyColor }}>
                    <BsArrowRight /> 
                  </div>
                  <div className={`mr-2  ${fromToCurrency?.toCurrency?.color ?? "text-white"}`} style={{ color: floatSelectedCurrencyColor }}>
                    <BsArrowLeft />
                  </div>
                </button>
                <CurrencyInputDropdown 
                  currencies={currencies} 
                  onSwapCurrencies={handleSwapCurrencies}
                  onSetArrowColor={handleFloatCurrencyColor}
                  fromToCurrency={fromToCurrency && fromToCurrency.toCurrency}
                  onSetCurrencyCurrency={handleSetToCurrency}

                />
              </div>
              <div className="mt-10 sm:mt-14">
                <CoinAddressInput 
                  toCurrencyData={fromToCurrency && fromToCurrency.toCurrency}
                />
              </div>
              <div className="mt-10">
                <OrderTypeToggle />
              </div>
              
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-center sm:block sm:px-16 sm:mt-4 text-slate-400 text-[10px] sm:text-sm z-10'>
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
