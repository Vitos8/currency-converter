import React from 'react';
import Block from './components/Block';
import axios from 'axios';

interface Irate {
     currency: number,
}

function App() {
     const [ fromCurrency, setFromCurrency] = React.useState<any | String >("UAH");
     const [ toCurrency, setToCurrency] = React.useState<any | String>("USD");
     const [ fromCurrencyValue, setFromCurrencyValue] = React.useState<number | string>(0);
     const [ toCurrencyValue, setToCurrencyValue] = React.useState<number | string>(0);
     const [ rates, setRates] = React.useState<Irate[]>([]);

     React.useEffect(() => {
          axios.get('https://cdn.cur.su/api/latest.json').then(({data}) => {
               setRates(data.rates);
          })
     },[]);

     let onChangeFromCurrencyValue = (value: string | number) => {
          const price = +value / +rates[fromCurrency];
          const result = price * +rates[toCurrency];
          
          setFromCurrencyValue(value);
          setToCurrencyValue(result.toFixed(2));
     }
     
     let onChangeToCurrencyValue = (value: string | number) => {
          const price = +value / +rates[toCurrency];
          const result = price * +rates[fromCurrency];

          setFromCurrencyValue(result.toFixed(2));
          setToCurrencyValue(value);
     }

     let swipeCurrencies = () => {
          setFromCurrency(toCurrency);
          setToCurrency(fromCurrency);
          setFromCurrencyValue(toCurrencyValue);
          setToCurrencyValue(fromCurrencyValue);
     }
     
     React.useEffect(() => {
          onChangeFromCurrencyValue(fromCurrencyValue);
     },[fromCurrency]);

     return (
          <div className="h-full pt-[100px] bg-yellow-200">
               <h1 className="text-center font-bold text-green-500 text-[40px] mb-10">Currency convertor</h1>
               <div className="w-[750px] py-10 rounded-2xl px-7 text-black flex  justify-around bg-white mx-auto">
                    <Block onChangeValue={onChangeFromCurrencyValue} value={fromCurrencyValue}  currency={fromCurrency} onChangeCurrency={setFromCurrency}/>
                    <img onClick={swipeCurrencies} className='h-[50px] cursor-pointer hover:bg-green-100 rounded-xl p-1 transition-all'  src="swipe-currencies.png" alt="changeImg"/>
                    <Block onChangeValue={onChangeToCurrencyValue} value={toCurrencyValue}  currency={toCurrency} onChangeCurrency={setToCurrency}/>
               </div>
          </div>
     );
}

export default App;
