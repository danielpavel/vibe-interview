import Image from 'next/image';
import { FC } from 'react'

interface Props {
  tokenName?: any,
  symbol?: any,
  imageURL?: any
}

const TokenCard: FC<Props> = ({ symbol, tokenName }) => {
  return (
    <div className="p-1 w-[150px] h-[240px] rounded-2xl border hover:scale-105 duration-150 bg-slate-50">
      <div className='w-full h-3/5 bg-orange-100 rounded-2xl'>
        {/* Token image */}
      </div>

      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={50}
        priority
      /> */}

      <div className='p-2 w-full h-2/5 flex flex-col justify-center'>
        <div className='font-mono text-lg'>
          {tokenName}
        </div>
        <div className='font-mono text-sm text-slate-400'>
          {symbol}
        </div>
      </div>
    </div>
  );
}

export default TokenCard