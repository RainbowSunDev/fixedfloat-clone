import React, { useState, useEffect } from 'react';
import { BsQrCodeScan, BsClipboard  } from 'react-icons/bs'
import { Currency, FromToCurrency } from '@/types';
import QRCodeScanner from './QRCodeScanner';

// Define a type for the component props
type CoinAddressInputProps = {
  toCurrencyData: Currency | null;
  setAddress: (address: string) => void;
};


const CoinAddressInput = ({toCurrencyData, setAddress}: CoinAddressInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (toCurrencyData) {
      setToCurrency(toCurrencyData);
    }
  },[toCurrencyData]);

  const handleInputChange = (e:any) => {
    const value = e.target.value;
    setInputValue(value);
    setAddress(value);
  };
  
  const handlePaste = async () => {
    try {
      // Check if the Clipboard API is available
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        setInputValue(text);
        setAddress(text);

      } else {
        console.error('Clipboard API not available.');
      }
    } catch (error) {
      console.error('Error pasting text: ', error);
    }
  };

  const handleQrCodeScan = () => {
    setIsScannerVisible(true);
  };

  const handleScannedData = (data: string) => {
    setInputValue(data);
    setAddress(data);
    // ... handle the scanned data, e.g., save it, use it in a form, etc.
  };

  const handleCloseScanner = () => {
    setIsScannerVisible(false);
  };

  return (
    <div className="flex flex-col items-center  ">
       {isScannerVisible && (
        <QRCodeScanner
          isOpen={isScannerVisible}
          onScanned={handleScannedData}
          onClose={handleCloseScanner}
        />
      )}
      <div className="relative sm:w-full  ">
        <div className={`flex `}>
          <input
            type="text"
            inputMode="decimal" // Brings up the numeric keyboard on mobile devices
            pattern="[0-9]*" // This pattern restricts input to numbers only (integer numbers)
            value={inputValue}
            onChange={handleInputChange}
            className={`flex-grow px-6 py-2 sm:px-2 sm:py-4 bg-[rgba(0,0,0,0.5)] text-white rounded-l-md focus:outline-none `}
            placeholder={`Your ${toCurrency?.name} address`}
          />
          <div
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className={`flex flex-row items-center text-lg sm:text-xl p-2 sm:px-4 bg-black text-white rounded-r-md  transition-all`}
          >
            <span className="flex flex-row items-center ml-2 text-white text-lg sm:text-2xl text-center font-bold mr-1 hover:text-slate-400"><button className='text-center leading-[18px]' onClick={handlePaste}><BsClipboard /></button></span>
            <span className="flex flex-row items-center ml-2 text-white text-lg sm:text-2xl text-center font-bold hover:text-slate-400text-center "><button className='text-center leading-[18px]' onClick={handleQrCodeScan}><BsQrCodeScan /></button></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAddressInput;
