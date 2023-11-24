import React, { useState } from 'react';

const OrderTypeToggle = () => {
  const [isFixedRate, setIsFixedRate] = useState(true);

  return (
    <div className="flex items-center justify-between ">
        <div className="flex items-center rounded-lg">
            <div className="text-white mr-4">Order type</div>
            <button
                onClick={() => setIsFixedRate(true)}
                className={`px-8 py-4 rounded-l-lg  ${isFixedRate ? 'border-[1px]' : 'bg-[rgba(0,0,0,0.5)]'} text-white transition-all`}
            >
                Fixed rate (1.0%)
            </button>
            <button
                onClick={() => setIsFixedRate(false)}
                className={`px-8 py-4 rounded-r-lg ${!isFixedRate ? 'border-[1px]' : 'bg-[rgba(0,0,0,0.5)]'} text-white mr-2 transition-all`}
            >
                Float rate (0.5%)
            </button>
            <button
                onClick={() => {} /* Function to show help or info */}
                className="text-white rounded-full px-2 bg-[rgba(0,0,0,0.5)]"
            >
                ?
            </button>

        </div>
        <div className="">
            <button
                onClick={() => {} /* Function to execute exchange */}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded transition-all"
            >
                Exchange now
            </button>
        </div>
    </div>
  );
};

export default OrderTypeToggle;
