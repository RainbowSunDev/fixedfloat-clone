import { useState } from "react";
import { BsXLg } from "react-icons/bs";

type ModalProps = {
    setModalVisibility: (isModalOpen: boolean) => void;
}
const Modal = ({setModalVisibility}:ModalProps) => {
    
    return(
        
        <div className="fixed top-0 h-screen w-full bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <div className="flex justify-center lg:items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto lg:my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#21284B] outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t ">
                  <h3 className="text-3xl font=semibold text-white text-center">What is the difference between fixed and a float rates?</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setModalVisibility(false)}
                  >
                    <span className="text-slate-500 opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      <BsXLg />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto text-white">
                    {/* Fixed rate description */}
                    <div className="">
                        <h3 className="font-bold mb-1">Fixed rate</h3>
                        <p>Opting for a fixed rate, you get the price you see at the point of initiating a transaction.</p>
                        <ul className="list-disc ml-4 mb-1">
                            <li>Pay just 1% + network fee.</li>
                            <li>Rates freeze for 10 minutes.</li>
                            <li>If the market rate changes by more than 1.2% before the appearance of your transaction on the blockchain network, you will be asked to make a refund or continue exchanging at the market rate.</li>
                        </ul>
                        <p className="italic ">Attention! Your transaction must be received within 10 minutes and the amount must exactly match the amount of the order. Otherwise, you will be prompted to make a refund or continue the exchange at the market rate.</p>
                    </div>
                    {/* Float rate description */}
                    <div className="mt-4">
                        <h3 className="font-bold mb-1">Fixed rate</h3>
                        <p>The exchange rate is finally set when your transaction receives the necessary number of blockchain network confirmations. If the market goes up, you will get more cryptocurrency, if down - less. All fair.</p>
                        <ul className="list-disc ml-4 mb-1">
                            <li>Pay just 0.5% + network fee.</li>
                            <li>The exchange will be made at the market rate, which is finally set within 10 minutes after your transaction receives the required number of confirmations in the blockchain network.</li>
                        </ul>
                        <p className="italic border-l-2 border-solid border-[#0171a6] pl-3 text-sm mt-4 leading-[16px]"><span className="font-bold">Example:</span> you are exchanging 1 BTC for 28.37362388 ETH. With a <span className="font-bold">fixed rate</span>, you will receive exactly 28.37362388 ETH. With a <span className="font-bold">float</span>exchange rate, the amount of ETH can change both up and down. It depends on changes in the market rate.</p>
                    </div>
                </div>
                <div className="flex items-center justify-end p-6 border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setModalVisibility(false)}
                  >
                    Ok
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Modal;