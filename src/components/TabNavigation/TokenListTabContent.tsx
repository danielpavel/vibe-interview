import TokenCard from '@/components/TokenCard/TokenCard';
import { useTokenList } from '@/hooks/useTokenList';
import { FC, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { tokenPair } from '../../recoil';

interface Props {
}

const TokenListTabContent: FC<Props> = ({ }) => {
  const tokens = useTokenList({ first: 10 });
  const [selectedTokenPair, setSelectedTokenPair] = useRecoilState(tokenPair);

  useEffect(() => {
    console.log('[TokenListTabContent][selectedTokenPair]', selectedTokenPair);
  }, [selectedTokenPair, setSelectedTokenPair])

  return (
    <div className="p-24 w-full bg-slate-100 flex justify-center">
      {/* <div className='font-mono text-2xl mb-10'>
        Token List
      </div> */}

      <div className='flex px-24 py-5 gap-x-2 gap-y-2 justify-center flex-wrap w-3/4'>
        {/* <div className='font-mono text-2xl mb-10'>
          Token List
        </div> */}

          {tokens.map((t, idx) => (
            <TokenCard key={idx} symbol={t.symbol} tokenName={t.name} tokenId={t.id} />
          ))}
      </div>
    </div>
  );
}

export default TokenListTabContent