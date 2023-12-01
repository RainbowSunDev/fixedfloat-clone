import React, { useState, useEffect, KeyboardEvent, useCallback } from 'react';
import Image from 'next/image';
import { Currency, CurrencyDetail, ExchangeRateResponseData } from '@/types';
import { debounce } from "lodash"
import { IoWarningOutline } from 'react-icons/io5';
// Define a type for the component props
type CurrencyInputDropdownProps = {
  currencies: Currency[] | null;
  selectedCurrency: Currency | null;
  currecyDetail: CurrencyDetail | null;
  type?: string;
  direction: string;
  toCurrecyDetail: CurrencyDetail | null;
  onSwapCurrencies: () => void;
  onSetArrowColor: (color: string) => void;
  onSetCurrentCurrency: (currency: Currency) => void;
  onSetAmount: (amount: number) => void;
  onSetDirection: (direction: string) => void;

};

const CurrencyInputDropdown = ({ currecyDetail, type, direction, toCurrecyDetail, onSetCurrentCurrency, currencies, onSetArrowColor, selectedCurrency, onSetAmount, onSetDirection }: CurrencyInputDropdownProps) => {
  // current my selected currency
  // const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[] | null>(currencies);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSelectActive, setIsSelectActive] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isExceed, setIsExceed] = useState<boolean>(false);

  useEffect(() => {
    // if (fromToCurrency) {
    //   setSelectedCurrency(fromToCurrency);
    // }
    // Filter currencies based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    if(currencies) {
      const filtered = currencies.filter(currency =>
        currency.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCurrencies(filtered);
    }
  }, [searchQuery, selectedCurrency]);

  useEffect(() => {
    if(currecyDetail){
      setInputValue(currecyDetail.amount);
      setShowTooltip(false)

      if(currecyDetail && parseFloat(currecyDetail.amount) > parseFloat(currecyDetail.max)) {
        setShowTooltip(true)
        setIsExceed(true)
      } else if (currecyDetail && parseFloat(currecyDetail.amount) < parseFloat(currecyDetail.min)) {
        setShowTooltip(true)
        setIsExceed(false)
  
      } 
    }
    
  }, [currecyDetail]);
  

  const handleCurrencyClick = (currency: Currency) => {
    setShowDropdown(false);
    setSearchQuery(''); // Reset the search query
    onSetArrowColor(currency.color);
    onSetCurrentCurrency(currency)
    // onSetAmount(parseFloat(inputValue))
  };

  const setProps = useCallback(debounce((data, direction = "from") => {
    onSetDirection(direction)
    onSetAmount(parseFloat(data))
  }, 700), []);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setProps(value)
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Prevent 'e', 'E', '+', '-', and '.' from being entered
    if (['e', 'E'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const onSetMinValue = () => {
    const value = currecyDetail?.min;
    if(value) {
      setInputValue(value);
      setProps(value, direction)
    }
  }
  const onSetMaxValue = () => {
    const value = currecyDetail?.max;
    if(value) {
      setInputValue(value);
      setProps(value, direction)
    }
  }
  const selectCurrencyColor = selectedCurrency ? selectedCurrency.color : '#ffffff';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-sm sm:max-w-lg ">
        <div className={`flex ${isSelectActive ? 'border-b-[1px] border-b-slate-600 ' : 'border-[1px] border-white rounded-md'} `} style={{borderColor: selectCurrencyColor}}>
          <input
            type="number"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="\d*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`flex-grow  ${isSelectActive ? 'bg-[#29315C]' : 'bg-black'} rounded-l-md focus:outline-none text-lg sm:text-xl py-1 px-2 sm:py-4 transition ease-in-out `}
            style={{ color: selectCurrencyColor }}
            placeholder=""
            readOnly={type ? false : true}
          />
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
              setIsSelectActive(!isSelectActive); // Toggle the background color when the button is clicked
            }}
            style={{ color: selectCurrencyColor }}
            className={`flex items-center text-base sm:px-4 sm:text-xl first-letter ${isSelectActive ? 'bg-[#29315C]' : 'bg-black'} ${selectCurrencyColor ? selectCurrencyColor : "text-white"} rounded-r-md  transition ease-in-out `}
          >
            <span className='mr-1 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'>
              <Image 
                src={selectedCurrency?.logo ?? 'https://fixedfloat.com/assets/images/coins/svg/eth.svg'} 
                width={40} 
                height={40} 
                alt={selectedCurrency?.name ?? 'No Currency Name'} 
                layout="responsive"
              />
            </span>
            {selectedCurrency?.coin}
            <span className="text-xs sm:ml-2">▼</span>
          </button>
        </div>
        {showTooltip && isExceed && type &&
          <div className="relative flex items-center transition-all">
            <div className="absolute top-full left-0 mt-1 w-80 bg-[#a90707] text-white text-sm rounded-lg p-2">
              <div className="flex items-center">
                <IoWarningOutline className="text-xl" />
                <span className="ml-1">You exceeded the limit</span>
                <button className='hover:border-b-[1px] hover:mb-[-1px] mx-1 leading-tight' onClick={onSetMaxValue}>
                  <span>{currecyDetail?.max}</span>
                  <span> {selectedCurrency?.coin}</span>
                </button>
              </div>
              <div className="absolute left-2 top-[-10px] w-0 h-0 border-x-transparent border-x-8 border-b-8 border-b-red-600"></div>
            </div>
          </div>
        }
        {showTooltip && !isExceed && type &&
          <div className="relative flex items-center transition-all">
            <div className="absolute top-full left-0 mt-1 w-80 bg-[#a90707] text-white text-sm rounded-lg p-2">
              <div className="flex items-center">
                <IoWarningOutline className="text-xl" />
                <span className="ml-1">Minimum amount</span>
                <button className='hover:border-b-[1px] hover:mb-[-1px] mx-1 leading-tight' onClick={onSetMinValue}>
                  <span>{currecyDetail?.min}</span>
                  <span> {selectedCurrency?.coin}</span>
                </button>
              </div>
              <div className="absolute left-2 top-[-10px] w-0 h-0 border-x-transparent border-x-8 border-b-8 border-b-red-600"></div>
            </div>
          </div>
        }
        {showDropdown && (
          <ul className="absolute w-full max-h-72 bg-[#29315C] rounded-b-md shadow-lg z-50 overflow-y-auto">
            {filteredCurrencies && filteredCurrencies.map((currency, index) => (
              <li
              key={index}
              onClick={() => {
                if (currency.recv && type) {
                  handleCurrencyClick(currency);
                  setIsSelectActive(!isSelectActive);
                } else if (currency.send && !type) {
                  handleCurrencyClick(currency);
                  setIsSelectActive(!isSelectActive);
                }
              }}
              className={`px-4 py-2 cursor-pointer ${selectCurrencyColor} flex items-center justify-between transition ease-in-out delay-150 ${
                (currency.recv && type) || (currency.send && !type) ? 'hover:bg-[#3a447c]' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ 
                color: currency.color,
                pointerEvents: (currency.recv && type) || (currency.send) ? 'auto' : 'none'
              }}
            >
              <span className='flex items-center mr-1'>
                <Image src={currency.logo} width={30} height={30} alt={currency.name} />
                <span className='ml-2'>
                  {currency.name}
                </span>
              </span>
              {currency.coin}
            </li>
            ))}
          </ul>
        )}
        <div className="mt-2 text-xs text-purple-300 ">
          1 {selectedCurrency?.coin} ≈ {currecyDetail?.rate} {toCurrecyDetail?.coin}  
        </div>
        <div className="flex flex-row items-center justify-between text-white mt-1 text-sm">
          {/* min */}
          <div className="">
            <span className='text-slate-400'>min:</span>
            <button className='hover:border-b-[1px] hover:mb-[-1px] mx-1 leading-tight' onClick={onSetMinValue}>
              <span>{currecyDetail?.min}</span>
              <span> {selectedCurrency?.coin}</span>
            </button>
          </div>
          {/* max */}
          <div className="">
            <span className='text-slate-400'>max:</span>
            <button className='hover:border-b-[1px] hover:mb-[-1px] mx-1 leading-tight' onClick={onSetMaxValue}>
              <span>{currecyDetail?.max}</span>
              <span> {selectedCurrency?.coin}</span>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CurrencyInputDropdown;
