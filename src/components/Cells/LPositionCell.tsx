import { LPPos } from '@/types/types';
import { FC } from 'react'

interface Props {
  position?: LPPos | null,
}

const LPoolCell: FC<Props> = ({ position }) => {
  return (
    <div className='flex h-[75px] justify-between items-center p-4 gap-x-2'>
      <div className='font-mono text-sm'>
        {position?.liquidityToken.symbol}
      </div>
      <div className='font-mono text-sm'>
        {Number(position?.balance)}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token0?.symbol}: {String('X amount').slice(0,4)}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token1?.symbol}: {String('Y amount').slice(0,4)}
      </div>
    </div>
  )
};

export default LPoolCell