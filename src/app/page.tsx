'use client'
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import CurrencyInputDropdown from '@/components/CurrencyInput';
import CoinAddressInput from '@/components/CoinAddressInput';
import OrderTypeToggle from '@/components/OrderTypeToggle';
import { BsArrowRight, BsArrowLeft  } from 'react-icons/bs'
import axios from 'axios';
import { Currency, FromToCurrency, ExchangeRateRequestData, ExchangeRateResponseData, CreateOrderRequestData } from '@/types';

const direction = "from"
export default function Home() {

  const [amount, setAmount] = useState<number | null>(null);
  const [isFixedRate, setIsFixedRate] = useState(true);
  const [isFrom, setIsFrom] = useState(true);
  const [address, setAddress] = useState<string | null>(null);

  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [exchangeRateData, setExchangeRateData] = useState<ExchangeRateResponseData | null>(null);
  const [fromToCurrency, setFromToCurrency] = useState<FromToCurrency | null>(null);
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
        console.log("availableData:", response.data)
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

  const onGetExchangeRate = useCallback(async (requestData: ExchangeRateRequestData) => {
    console.log("currencies3", currencies)
    try {
      const response = await axios.post(
        '/api/get-exchange-rate',
        {
          ...requestData,
          ccies: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("exchageData2----response", response.data)
      console.log("currencies2", currencies)
      if(response.data?.data){
        setExchangeRateData(response.data)
      
        const { ccies:data } = response.data.data;
        const newCurrencies = currencies && data && currencies.map((currency: Currency) => {
          const targetCurrency = data.find((value: any) => 
            currency.code === value.code
          );
        
          if (targetCurrency) {
            return {
              ...currency,
              recv: targetCurrency.recv,
              send: targetCurrency.send
            };
          } else {
            // If targetCurrency is not found, return the original currency object
            return currency;
          }
        });
        if(newCurrencies){
          setCurrencies(newCurrencies)
        }
        console.error(newCurrencies)
      }
      
    } catch (error) {
      console.error("error", error)
    }
  }, []);

  useEffect(() => {
    console.log("currencies66", currencies)
    
    const onGetExchangeRate = async (requestData: ExchangeRateRequestData) => {
      try {
        const response = await axios.post(
          '/api/get-exchange-rate',
          {
            ...requestData,
            ccies: true
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("exchageData1----response", response.data)

        if(response.data?.data){
          setExchangeRateData(response.data)
        
          const { ccies:data } = response.data.data;
          const newCurrencies = currencies && data && currencies.map((currency: Currency) => {
            const targetCurrency = data.find((value: any) => 
              currency.code === value.code
            );
          
            if (targetCurrency) {
              return {
                ...currency,
                recv: targetCurrency.recv,
                send: targetCurrency.send
              };
            } else {
              // If targetCurrency is not found, return the original currency object
              return currency;
            }
          });
          if(newCurrencies){
            setCurrencies(newCurrencies)
          }
          console.error(newCurrencies)
        }
      } catch (error) {
        console.error("error", error)
      }
    }

    if(fromToCurrency && amount) {
      const newRequestData: ExchangeRateRequestData = {
        type: isFixedRate ? "fixed" : "float",
        fromCcy: fromToCurrency.fromCurrency.code,
        toCcy: fromToCurrency.toCurrency.code,
        direction: direction,
        amount: amount
      }
      onGetExchangeRate(newRequestData);
    }

  }, [amount, isFixedRate, onGetExchangeRate])

  const handleFixedCurrencyColor = (fixedCurrencyColor: string) => {
    setFixedSelectedCurrencyColor(fixedCurrencyColor);
  }

  const handleFloatCurrencyColor = (floatCurrencyColor: string) => {
    setFloatSelectedCurrencyColor(floatCurrencyColor)
  }

  // Handler for swapping the currencies
  const handleSwapCurrencies = () => {
    
    if(fromToCurrency && exchangeRateData?.data.from.amount) {
      const tempColor = fixedSelectedCurrencyColor;
      setFixedSelectedCurrencyColor(floatSelectedCurrencyColor);
      setFloatSelectedCurrencyColor(tempColor)
      const newFromToCurrencyData: FromToCurrency = {
        fromCurrency: fromToCurrency.toCurrency,
        toCurrency: fromToCurrency.fromCurrency,
        direction: !fromToCurrency.direction
      };
      setFromToCurrency(newFromToCurrencyData);
      setIsFrom(!isFrom);
      if(exchangeRateData){
        const amount = exchangeRateData.data.to.amount;
        setAmount(parseFloat(amount));

        if(newFromToCurrencyData && amount) {
          const newRequestData: ExchangeRateRequestData = {
            type: isFixedRate ? "fixed" : "float",
            fromCcy: newFromToCurrencyData.fromCurrency.code,
            toCcy: newFromToCurrencyData.toCurrency.code,
            direction: direction,
            amount: parseFloat(amount)
          }
          onGetExchangeRate(newRequestData);
        }
      }
    }
  }

  const handleSetFromCurrency = (fromCurrency: Currency) => {
    console.log("currencies11:", currencies)
    let newFromToCurrencyData: FromToCurrency;
    if(fromToCurrency && currencies) {
      const toCurrency = fromToCurrency.toCurrency;
      const tetherCurrency =toCurrency.name !== "Tether (ERC20)" ? currencies.find((currency: Currency) => currency.name === "Tether (ERC20)") : currencies.find((currency: Currency) => currency.name === "Bitcoin");
      
      if(fromCurrency.name === toCurrency.name && tetherCurrency) {
        newFromToCurrencyData = {
          ...fromToCurrency,
          fromCurrency: fromCurrency,
          toCurrency: tetherCurrency
        };
        setFloatSelectedCurrencyColor(tetherCurrency.color);
        
      }else {
        newFromToCurrencyData = {
          ...fromToCurrency,
          fromCurrency: fromCurrency
        };
      }
      console.log("newFromToCurrencyData",newFromToCurrencyData)
      setFromToCurrency(newFromToCurrencyData);

      if(exchangeRateData){
        if(newFromToCurrencyData && amount) {
          const newRequestData: ExchangeRateRequestData = {
            type: isFixedRate ? "fixed" : "float",
            fromCcy: fromCurrency.code,
            toCcy: newFromToCurrencyData.toCurrency.code,
            direction: direction,
            amount: amount
          }
          console.log("currencies44:", currencies)
  
          onGetExchangeRate(newRequestData);
        }
      }
    }

  }

  const handleSetToCurrency = (toCurrency: Currency) => {
    if(fromToCurrency && currencies) {
      const fromCurrency = fromToCurrency.fromCurrency;
      const tetherCurrency = fromCurrency.name !== "Tether (ERC20)" ? currencies.find((currency) => currency.name === "Tether (ERC20)") : currencies.find((currency) => currency.name === "Bitcoin");

      let newFromToCurrencyData: FromToCurrency;
      if(toCurrency.name === fromCurrency.name && tetherCurrency) {
        newFromToCurrencyData = {
          ...fromToCurrency,
          toCurrency: toCurrency,
          fromCurrency: tetherCurrency
        };
        setFixedSelectedCurrencyColor(tetherCurrency.color);

      }else {
        newFromToCurrencyData = {
          ...fromToCurrency,
          toCurrency: toCurrency
        };
      }
      setFromToCurrency(newFromToCurrencyData)

      if(exchangeRateData){
        if(newFromToCurrencyData && amount) {
          const newRequestData: ExchangeRateRequestData = {
            type: isFixedRate ? "fixed" : "float",
            fromCcy: newFromToCurrencyData.fromCurrency.code,
            toCcy: toCurrency.code,
            direction: direction,
            amount: amount
          }
          onGetExchangeRate(newRequestData);
        }
      }
    }

  }

  const handleExchange = async () => {
    console.log(address)
    let requestData: CreateOrderRequestData;
    if(fromToCurrency && amount && address) {
      requestData = {
        type: isFixedRate ? "fixed" : "float",
        fromCcy: fromToCurrency.fromCurrency.code,
        toCcy: fromToCurrency.toCurrency.code,
        direction: direction,
        amount: amount,
        toAddress: address 
      }
    try {
      const response = await axios.post(
        '/api/create-order',
        {
          ...requestData
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      // Handle the response data
    } catch (error) {
      console.error('Error:', error);
    }
  }
  }
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
                  selectedCurrency={fromToCurrency && fromToCurrency.fromCurrency}
                  currecyDetail={exchangeRateData && exchangeRateData.data.from}
                  type="editable"
                  onSwapCurrencies={handleSwapCurrencies}
                  onSetArrowColor={handleFixedCurrencyColor}
                  onSetCurrentCurrency={handleSetFromCurrency}
                  onSetAmount={setAmount}
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
                  selectedCurrency={fromToCurrency && fromToCurrency.toCurrency}
                  currecyDetail={exchangeRateData && exchangeRateData.data.to}
                  onSwapCurrencies={handleSwapCurrencies}
                  onSetArrowColor={handleFloatCurrencyColor}
                  onSetCurrentCurrency={handleSetToCurrency}
                  onSetAmount={setAmount}

                />
              </div>
              <div className="mt-10 sm:mt-14">
                <CoinAddressInput 
                  toCurrencyData={fromToCurrency && fromToCurrency.toCurrency}
                  setAddress={setAddress}
                />
              </div>
              <div className="mt-10">
              <div className="flex flex-col sm:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row sm:items-center rounded-lg">
                  <div className="text-xs sm:text-base text-white sm:mr-4 hidden sm:block">Order type</div>
                  <div className="">
                      <button
                          onClick={() => setIsFixedRate(true)}
                          className={`text-xs sm:text-base py-3 px-8 sm:py-4 rounded-l-lg  ${isFixedRate ? 'border-[1px]' : 'bg-[rgba(0,0,0,0.5)]'} text-white transition-all`}
                      >
                          Fixed rate (1.0%)
                      </button>
                      <button
                          onClick={() => setIsFixedRate(false)}
                          className={`text-xs sm:text-base py-3 px-8 sm:py-4 rounded-r-lg ${!isFixedRate ? 'border-[1px]' : 'bg-[rgba(0,0,0,0.5)]'} text-white mr-2 transition-all`}
                      >
                          Float rate (0.5%)
                      </button>
                  </div>
                  <div className="flex flex-row items-center justify-start mt-1 sm:mt-0">
                      <button className="rounded-full text-white w-6 h-6 bg-[rgba(0,0,0,0.5)] ">?</button>
                      <span className='block sm:hidden text-slate-300 text-xs'>What is the difference?</span>
                  </div>

              </div>
              <div className="mt-3 sm:mt-0">
                  <button className="text-xs text-white sm:text-lg sm:font-bold py-3 px-10 sm:py-4 sm:px-12 bg-blue-500 hover:bg-blue-700  rounded transition-all" onClick={handleExchange}>
                      Exchange now
                  </button>
              </div>
          </div>
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
