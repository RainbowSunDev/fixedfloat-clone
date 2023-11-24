import React, { useState, useEffect } from 'react';
import { BsQrCodeScan, BsClipboard  } from 'react-icons/bs'

const CoinAddressInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative w-full  ">
        <div className={`flex `}>
          <input
            type="text"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="[0-9]*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            className={`flex-grow p-2 bg-[rgba(0,0,0,0.5)] text-white rounded-l-md focus:outline-none py-4`}
            placeholder="Your Litecoin address"
          />
          <button
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className={`flex items-center px-4 bg-black text-white rounded-r-md text-xl transition-all`}
          >
            <span className="ml-2 text-white text-2xl font-bold mr-1 hover:text-slate-400"><BsClipboard /></span>
            <span className="ml-2 text-white text-2xl font-bold hover:text-slate-400"><BsQrCodeScan /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinAddressInput;
