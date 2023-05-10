import { FC } from 'react'
import LPoolCell from '@/components/Cells/LPoolCell';
import Image from 'next/image';
import { useLiquidityPools } from '@/hooks/useTokenPools';
import { useRecoilState } from 'recoil'
import { tokenPair } from '../../recoil'
import { tokensEqual } from '@/utils/utils';
import { useLiqudityPositions } from '@/hooks/useLiquidityPositions';
import { LPositionCell } from '../Cells';

interface Props {
}

const LPPositionTabContent: FC<Props> = ({ }) => {
  const liquidityPools = useLiquidityPools({ first: 10 });
  const [selectedTokenPair, setSelectedTokenPair] = useRecoilState(tokenPair);
  const positions = useLiqudityPositions({
    first: 10,
    tokenPair: {
      token0: selectedTokenPair?.token0,
      token1: selectedTokenPair?.token1,
    },
  });

  return (
    <div className="flex py-20 px-5 w-full bg-cyan-100 justify-center">
      <div className="w-3/4 px-14 py-5">
        <div className="font-mono text-lg">Your token pair selection:</div>

        <div className="font-mono text-sm mt-2 mb-4">
          {selectedTokenPair?.token0?.symbol}/
          {selectedTokenPair?.token1?.symbol}
        </div>

        <button
          className="p-1 px-2 bg-slate-800 shadow-lg text-white font-mono border-2 border-slate-300 rounded-xl mb-10"
          onClick={() => setSelectedTokenPair(undefined)}
        >
          Clear selection
        </button>

        <div className="flex justify-between items-center mb-3">
          <div className="font-mono text-lg">Available pools</div>
          <div className="flex items-center gap-x-1">
            <div className="font-mono text-xs">Powered by</div>
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

        <div className="rounded-2xl bg-yellow-50 shadow-lg border">
          <div className="flex h-[50px] justify-between items-center p-4 gap-x-2 font-mono text-md border-b border-black shadow-sm">
            <div>Id</div>
            <div>Liquidity</div>
            <div>Token0</div>
            <div>Token1</div>
          </div>

          {/* {
            (selectedTokenPair?.token0 && selectedTokenPair?.token1) ?
              liquidityPools
                .filter((pool, idx) => {
                  return (
                    (tokensEqual(pool.token0, selectedTokenPair.token0) &&
                    tokensEqual(pool.token0, selectedTokenPair.token1)) ||
                    (tokensEqual(pool.token1, selectedTokenPair.token0) &&
                    tokensEqual(pool.token0, selectedTokenPair.token1))
                  )
                })
                .map((pool, idx) => <LPoolCell key={idx} pool={pool} />)
                :
              liquidityPools.map((pool, idx) => (
                <LPoolCell key={idx} pool={pool} />
              ))
          } */}
          {
            (selectedTokenPair?.token0 && selectedTokenPair?.token1) &&
              positions.map((pos, index) =>
                <LPositionCell position={pos} key={index}/>
              )
          }

        </div>
      </div>
    </div>
  );
}

export default LPPositionTabContent