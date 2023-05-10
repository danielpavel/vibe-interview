import { FC } from 'react'
import LPCell from '@/components/LPCell/LPCell';
import Image from 'next/image';
import { useLiquidityPools } from '@/hooks/useTokenPools';

interface Props {
}

const LPPositionTabContent: FC<Props> = ({ }) => {
  const liquidityPools = useLiquidityPools({ first: 20});

  const positions = [
    {
      pair: {
        token1: { tokneName: 'Ether', symbol: 'ETH' },
        token2: { tokneName: 'Uniswap', symbol: 'UNI' }
      },
      size: '0.3%'
    },
    {
      pair: {
        token1: { tokneName: 'Ether', symbol: 'ETH' },
        token2: { tokneName: 'Uniswap', symbol: 'UNI' }
      },
      size: '0.3%'
    },
    {
      pair: {
        token1: { tokneName: 'Ether', symbol: 'ETH' },
        token2: { tokneName: 'Uniswap', symbol: 'UNI' }
      },
      size: '0.3%'
    },
  ]

  return (
    <div className='flex py-20 px-5 w-full bg-cyan-100 justify-center'>
      <div className='w-3/4 px-14 py-5'>
        <div className='font-mono text-lg'>
          Your token pair selection:
        </div>

        <div className='font-mono text-sm mb-10 mt-2'>
          Token1 / Token 2
        </div>

        <div className='flex justify-between items-center mb-3'>
          <div className='font-mono text-lg'>
            Available pools
          </div>
          <div className='flex items-center gap-x-1'>
            <div className='font-mono text-xs'>
              Powered by
            </div>
            <Image
              src="/uniswap-logo.svg"
              alt="Uniswap Logo"
              className="dark:invert"
              width={30}
              height={30}
              priority
            />
          </div>
        </div>

        <div className='rounded-2xl bg-yellow-50 shadow-lg border'>
          <div className='flex h-[50px] justify-between items-center p-4 gap-x-2 font-mono text-lg border-b border-black shadow-sm'>
            <div>Pool</div>
            <div>TVL</div>
            <div>Volume 24H</div>
          </div>

          {liquidityPools.map((pool, idx) => (
            <LPCell key={idx} pool={pool}/>
          ))}

        </div>
      </div>
    </div>
  );
}

export default LPPositionTabContent