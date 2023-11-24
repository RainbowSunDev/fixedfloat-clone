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
    <div className="flex flex-col items-center  ">
      <div className="relative sm:w-full  ">
        <div className={`flex `}>
          <input
            type="text"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="[0-9]*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            className={`flex-grow px-6 py-2 sm:px-2 sm:py-4 bg-[rgba(0,0,0,0.5)] text-white rounded-l-md focus:outline-none `}
            placeholder="Your Litecoin address"
          />
          <div
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className={`flex flex-row items-center text-lg sm:text-xl p-2 sm:px-4 bg-black text-white rounded-r-md  transition-all`}
          >
            <span className="flex flex-row items-center ml-2 text-white text-lg sm:text-2xl text-center font-bold mr-1 hover:text-slate-400"><button className='text-center leading-[18px]'><BsClipboard /></button></span>
            <span className="flex flex-row items-center ml-2 text-white text-lg sm:text-2xl text-center font-bold hover:text-slate-400text-center "><button className='text-center leading-[18px]'><BsQrCodeScan /></button></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAddressInput;
