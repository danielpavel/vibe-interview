import { FC } from 'react'

interface Props {
  pool?: any,
}

const oneMillion = 1000000
const usdToMil = (usdValue: string | undefined) => {
  return usdValue ? Math.ceil(Number(usdValue) / oneMillion) : ''
}

const LPCell: FC<Props> = ({ pool }) => {
  return (
    <div className='flex h-[50px] justify-between items-center p-4 gap-x-2'>
      <div className='font-mono text-sm'>
        {pool.token0.symbol}/{pool.token1.symbol}
      </div>
      <div className='font-mono text-sm'>
        ${usdToMil(pool.tvl)}M
      </div>
      <div className='font-mono text-sm'>
        ${usdToMil(pool.volume)}M
      </div>
    </div>
  )
};

export default LPCell