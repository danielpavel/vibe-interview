import { FC } from 'react'
import LPCell from '@/components/LPCell/LPCell';

interface Props {
}

const LPPositionTabContent: FC<Props> = ({ }) => {


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
    <div className='flex p-20 w-full bg-cyan-100 justify-center'>
      <div className='w-3/4 px-24 py-5'>
        <div className='font-mono text-2xl mb-10'>
          Pools
        </div>

        <div className='rounded-2xl bg-yellow-50 shadow-lg border'>
          <div className='flex h-[50px] items-center font-mono border-b-2 p-4'>
            Your positions ({positions.length})
          </div>

          {positions.map((pos, idx) => (
            // <div key={idx} className='flex h-[50px] items-center font-mono p-4'>
            //   Position {idx}
            // </div>
            <LPCell key={idx} tokenPair={pos}/>
          ))}

        </div>
      </div>
    </div>
  );
}

export default LPPositionTabContent