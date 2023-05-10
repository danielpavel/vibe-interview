import { FC } from 'react'

interface Props {
  position?: any,
}

const LPoolCell: FC<Props> = ({ position }) => {
  return (
    <div className='flex h-[100px] justify-between items-center p-4 gap-x-2'>
      <div className='font-mono text-sm'>
        {position?.id}
      </div>
      <div className='font-mono text-sm'>
        {Number(position?.liquidity)}
      </div>
      <div className='font-mono text-sm'>
        {position?.token0?.symbol}: {String(position?.depositedToken0).slice(0,4)}
      </div>
      <div className='font-mono text-sm'>
        {position.token1?.symbol}: {String(position?.depositedToken1).slice(0,4)}
      </div>
    </div>
  )
};

export default LPoolCell