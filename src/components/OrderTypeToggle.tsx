import React, { useState } from 'react';

const OrderTypeToggle = () => {
  const [isFixedRate, setIsFixedRate] = useState(true);

  return (
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
            <button className="text-xs sm:text-lg sm:text-white sm:font-bold py-3 px-10 sm:py-4 sm:px-12 bg-blue-500 hover:bg-blue-700  rounded transition-all">
                Exchange now
            </button>
        </div>
    </div>
  );
};

export default OrderTypeToggle;
