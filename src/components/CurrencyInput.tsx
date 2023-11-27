import React, { useState, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';
import { Currency, FromToCurrency } from '@/types';


// Define a type for the component props
type CurrencyInputDropdownProps = {
  currencies: Currency[] | null;
  fromToCurrency: Currency | null;
  onSwapCurrencies: () => void;
  onSetArrowColor: (color: string) => void;
  onSetCurrencyCurrency: (currency: Currency) => void;
};

const CurrencyInputDropdown = ({ onSetCurrencyCurrency, currencies, onSetArrowColor, fromToCurrency }: CurrencyInputDropdownProps) => {
  // current my selected currency
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<Currency[] | null>(currencies);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSelectActive, setIsSelectActive] = useState<boolean>(false);

  useEffect(() => {
    console.log("useEffect")
    if (fromToCurrency) {
      setSelectedCurrency(fromToCurrency);
    }
    // Filter currencies based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    console.log(typeof currencies)
    console.log("currencies",currencies)
    if(currencies) {
      const filtered = currencies.filter(currency =>
        currency.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCurrencies(filtered);
    }
  }, [searchQuery, fromToCurrency, selectedCurrency]);

  const calculateValue = (currency: Currency): string => {
    // Placeholder for calculation logic
    // Replace with actual calculation
    return `Calculated value for ${currency.name}`;
  };

  const handleCurrencyClick = (currency: Currency) => {
    setInputValue(calculateValue(currency)); // Set the calculated value
    setShowDropdown(false);
    setSearchQuery(''); // Reset the search query
    onSetArrowColor(currency.color);
    onSetCurrencyCurrency(currency)
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const value = e.target.value;
    if(value[value.length - 1] === "e" || value[value.length - 1] === "E"){
      setInputValue(value.slice(0, value.length - 1))
    }
    setInputValue(value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Prevent 'e', 'E', '+', '-', and '.' from being entered
    if (['e', 'E'].includes(event.key)) {
      event.preventDefault();
    }
  };
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
            placeholder="Enter amount"
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
        {showDropdown && (
          <ul className="absolute w-full max-h-72 bg-[#29315C] rounded-b-md shadow-lg z-50 overflow-y-auto">
            {filteredCurrencies && filteredCurrencies.map((currency, index) => (
              <li
                key={index}
                onClick={() => {
                  handleCurrencyClick(currency);
                  setIsSelectActive(!isSelectActive); // Toggle the background color when the button is clicked
                }}
                className={`px-4 py-2 cursor-pointer ${selectCurrencyColor} hover:bg-[#3a447c] flex items-center justify-between transition ease-in-out delay-150 `}
                style={{ color: currency.color }}
                
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
          1 {selectedCurrency?.name} ≈ 0.0000 ETH $0.00 {/* Replace with dynamic values */}
        </div>
      </div>
    </div>
  );
};

export default CurrencyInputDropdown;
