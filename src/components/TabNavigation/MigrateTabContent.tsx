import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { tokenPair } from '../../recoil'

interface Props {

}

const MigrateTabContent: FC<Props> = ({ }) => {
  const [selectedTokenPair, setSelectedTokenPair] = useRecoilState(tokenPair);

  return (
    // <div className='p-5 bg-yellow-200 w-full'>
    //   This is Migrate Tab content
    // </div>
    <div className="flex py-20 px-5 w-full bg-green-100 justify-center">
      <div className='w-3/4 px-14 py-5'>
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

        <div className='font-mono text-2xl mb-10'>
          Migrate
        </div>

        <div className='rounded-2xl bg-yellow-50 shadow-lg border'>
          <div className='flex h-[50px] items-center font-mono p-4'>
            <></>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MigrateTabContent