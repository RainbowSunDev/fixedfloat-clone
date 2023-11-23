import React, { useState, useEffect } from 'react';

// Assume currencies have an additional 'icon' field with the path to their respective icons.
const currencies = [
  { name: 'Bitcoin', ticker: 'BTC', icon: 'path-to-btc-icon' },
  { name: 'Ethereum', ticker: 'ETH', icon: 'path-to-eth-icon' },
  // ...add other currencies with their icons
];

const CurrencyInputDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencies);
  const [showDropdown, setShowDropdown] = useState(false);

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
    <div className="flex flex-col items-center justify-center bg-red-500">
      <div className="relative w-full max-w-lg">
        <div className="flex">
          <input
            type="number"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="[0-9]*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            className="flex-grow p-2 bg-purple-800 text-white rounded-l-md focus:outline-none text-xl py-4"
            placeholder="Enter amount"
          />
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center px-4 bg-purple-800 text-white rounded-r-md text-xl"
          >
            {selectedCurrency.ticker}
            <span className="ml-2">▼</span>
          </button>
        </div>
        {showDropdown && (
          <ul className="absolute w-full bg-purple-800 rounded-b-md shadow-lg z-10">
            {filteredCurrencies.map((currency, index) => (
              <li
                key={index}
                onClick={() => handleCurrencyClick(currency)}
                className="px-4 py-2 cursor-pointer hover:bg-purple-600 flex items-center justify-between py-3"
              >
                <img src={currency.icon} alt="" className="w-4 h-4 mr-2" />
                {currency.name}
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
