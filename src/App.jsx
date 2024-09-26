import React, { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

const App = () => {
  const [amount,setAmount] = useState(0)
  const [form, setForm] = useState("usd")
  const [to,  setTo] = useState("eur")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo =  useCurrencyInfo(form)

  let options = Object.keys(currencyInfo)

  const convert = () => {
    setConvertedAmount(amount*currencyInfo[to])
  }

  const swap = () =>{
    setForm(to)
    setTo(form)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center content-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: "url('https://i.gifer.com/w40.gif')",
      }}
    >
      <h1 className='text-5xl text-purple-300 font-bold pb-6'> HAKKA Converter</h1>
      <div className="w-full">
        <div 
          className="w-full max-w-md mx-auto border border-gray-700 rounded-lg py-14 px-5  backdrop-blur-sm bg-white/30"
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
          >
            <div className='w-full mb-1'>
              <InputBox
                label="Form"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setForm(currency)}
                selectCurrency={form}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-purple-300 text-white px-2 py-0.5"
                onClick={swap}
              >
                SWAP
              </button>
            </div>
            <div className='w-full mb-1'>
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type='submit'
              className='w-full bg-purple-300 text-white px-5 py-3 rounded-lg'
            >
              Convert {form.toUpperCase()} to {to.toUpperCase()}
            </button>
            
          </form>

        </div>
      </div>
    </div>
  )
}

export default App
