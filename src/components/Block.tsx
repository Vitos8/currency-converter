import React from "react";

const currencies: Array<string> = ['UAH','USD','EUR', 'PLN'];

interface BlockProps  {
     currency: any,
     value: string | number,
     onChangeValue: (value:string | number) => void,
     onChangeCurrency: (item:string) => void,
}

const Block: React.FC<BlockProps> = ({onChangeValue, value, currency, onChangeCurrency}) => {
     return( 
          <div className="flex flex-col items-center">
               <ul className="flex mb-4  text-lg font-bold text-indigo-500">
                    {currencies.map((item, index) =>(
                         <li onClick={() => onChangeCurrency(item)} key={index} className={`${currency === item ? 'bg-green-400 hover:bg-green-400 text-white' : ''} rounded-sm cursor-pointer py-1 px-2 border-2 border-grey-400 hover:bg-green-100 transition-all`}>{item}</li>
                    ))}
               </ul>
               <input   value={value} onChange={(e:React.ChangeEvent<HTMLInputElement>) => onChangeValue(e.target.value)} min={0} className="border-2 border-grey-400 rounded-lg p-5 text-xl font-bold " type="number" />
          </div>
     );
};

export default Block;
