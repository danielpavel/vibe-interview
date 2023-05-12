import { LPPos } from '@/types/types';
import { formatAmount } from '@/utils/utils';
import { FC } from 'react'

interface Props {
  position?: LPPos | null,
}

const LPoolCell: FC<Props> = ({ position }) => {
  return (
    <div className='flex h-[65px] bg-yellow-100 border-b border-l border-r rounded-b-2xl justify-between items-center p-4 gap-x-2'>
      <div className='font-mono text-sm'>
        {position?.pair?.liquidityToken.symbol}
      </div>
      <div className='font-mono text-sm'>
        {formatAmount(position?.balance, position?.pair?.liquidityToken)}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token0?.symbol}: {position?.token0Amount}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token1?.symbol}: {position?.token1Amount}
      </div>
    </div>
  )
};

export default LPoolCell