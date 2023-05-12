import { LPPos } from '@/types/types';
import { Token } from '@uniswap/sdk-core';
import { BigNumber, ethers } from 'ethers';
import { FC } from 'react'

interface Props {
  position?: LPPos | null,
}

const formatAmount = (amount?: BigNumber | string, token?: Token) => {
  if (amount && token) {
    return parseFloat(ethers.utils.formatUnits(amount, token.decimals))
  }

  return ''
}

const LPoolCell: FC<Props> = ({ position }) => {
  return (
    <div className='flex h-[75px] justify-between items-center p-4 gap-x-2'>
      <div className='font-mono text-sm'>
        {position?.pair?.liquidityToken.symbol}
      </div>
      <div className='font-mono text-sm'>
        {formatAmount(position?.balance, position?.pair?.liquidityToken)}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token0?.symbol}: {/*position?.token0Amount?.toExact()*/}
      </div>
      <div className='font-mono text-sm'>
        {position?.pair?.token1?.symbol}: {/*position?.token1Amount?.toExact()*/}
      </div>
    </div>
  )
};

export default LPoolCell