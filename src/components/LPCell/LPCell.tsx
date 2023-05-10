import { FC } from 'react'

interface Props {
  tokenPair?: any,
}

const LPCell: FC<Props> = ({ tokenPair }) => {
  return (
    <div className='flex h-[50px] items-center p-4 gap-x-2'>
      <div className='font-mono text-md'>
        {tokenPair.pair.token1.symbol}/{tokenPair.pair.token2.symbol}
      </div>
      <div className='font-mono text-xs'>
        {tokenPair.size}
      </div>
    </div>
  )
};

export default LPCell