'use client'
import Image from 'next/image'
import CurrencyInputDropdown from '@/components/CurrencyInput';

export default function Home() {
  return (
    <main className="w-full relative ">
      <section className="flex flex-col items-center bg-dashboardbg bg-no-repeat bg-center bg-cover w-full bg-white">
        <header className=" w-full px-8">
          <div className="flex justify-between border-b-[1px] border-b-slate-600 py-4">
            <a href="https://" className="flex items-center ">
                <span className="self-center text-3xl font-semibold whitespace-nowrap text-hover mr-2">Fixed</span>
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-3xl font-semibold whitespace-nowrap text-white ml-2">Float</span>
            </a>

            <button data-collapse-toggle="headerbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white rounded">My Account</a>
                </li>
                
              </ul>
            </div>
          </div>
        </header>
        <div className="flex justify-center h-[400px]">
          <div className="min-w-[890px] my-[70px] w-full">
            <h1 className='text-center text-[2.6em] font-semibold text-white mb-[34px]'>Lightning cryptocurrency exchange</h1>
            <div>
              <div className="flex flex-row justify-between">
                <CurrencyInputDropdown />
                <CurrencyInputDropdown />
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  )
}
