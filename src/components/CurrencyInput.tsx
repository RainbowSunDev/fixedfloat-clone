import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// Assume currencies have an additional 'icon' field with the path to their respective icons.
const currencies = [
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg' },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg' },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg' },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg' },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg' },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg' },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg' },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg' },
  { code: "", coin: "BTC", network: "BTC", name: 'Bitcoin', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/btc.svg' },
  { code: "", coin: "ETH", network: "BTC", name: 'Ethereum', recv: true, send: true, tag:null, logo: 'https://fixedfloat.com/assets/images/coins/svg/eth.svg' },
];

const CurrencyInputDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);

  useEffect(() => {
    // Filter currencies based on the search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = currencies.filter((currency) =>
      currency.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCurrencies(filtered);
  }, [searchQuery]);

  const calculateValue = (currency:any) => {
    // Placeholder for calculation logic
    // Replace with actual calculation
    return `Calculated value for ${currency.name}`;
  };

  const handleCurrencyClick = (currency:any) => {
    setSelectedCurrency(currency);
    setInputValue(calculateValue(currency)); // Set the calculated value
    setShowDropdown(false);
    setSearchQuery(''); // Reset the search query
  };

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-lg ">
        <div className={`flex ${isSelectActive ? 'border-b-[1px] border-b-slate-600 ' : 'border-[1px] border-white rounded-md'}`}>
          <input
            type="number"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="[0-9]*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            className={`flex-grow p-2 ${isSelectActive ? 'bg-[#29315C]' : 'bg-black'} text-white rounded-l-md focus:outline-none text-xl py-4 transition ease-in-out `}
            placeholder="Enter amount"
          />
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
              setIsSelectActive(!isSelectActive); // Toggle the background color when the button is clicked
            }}
            className={`flex items-center px-4 ${isSelectActive ? 'bg-[#29315C]' : 'bg-black'} text-white rounded-r-md text-xl transition ease-in-out `}
          >
            <span className='mr-1'>
             <Image src="https://fixedfloat.com/assets/images/coins/svg/btc.svg" width={30} height={30} alt="Bitcoin" />
            </span>
            {selectedCurrency.coin}
            <span className="ml-2">▼</span>
          </button>
        </div>
        {showDropdown && (
          <ul className="absolute w-full bg-[#29315C] rounded-b-md shadow-lg z-10">
            {filteredCurrencies.map((currency, index) => (
              <li
                key={index}
                onClick={() => handleCurrencyClick(currency)}
                className="px-4 py-2 cursor-pointer hover:bg-[#3a447c] flex items-center justify-between  transition ease-in-out delay-150 text-white"
              >
                <span className='flex items-center mr-1'>
                  <Image src={currency.logo} width={30} height={30} alt="Bitcoin" />
                  <span className='ml-2'>
                    {currency.name}
                  </span>

                </span>
                {currency.coin}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-2 text-xs text-purple-300">
          1 {selectedCurrency.name} ≈ 0.0000 ETH $0.00 {/* Replace with dynamic values */}
        </div>
      </div>
    </div>
  );
};

export default CurrencyInputDropdown;
