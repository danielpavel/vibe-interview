import TokenCard from '@components/TokenCard/TokenCard';
import { FC } from 'react'

interface Props {
}

const TokenListTabContent: FC<Props> = ({ }) => {
  const tokens = [
    {
      tokenName: 'Ether',
      symbol: 'ETH',
      image: ''
    },
    {
      tokenName: 'Uniswap',
      symbol: 'UNI',
      image: ''
    },
    {
      tokenName: 'Sushiswap',
      symbol: 'SUSHI',
      image: ''
    },
    {
      tokenName: '1Inch',
      symbol: '1INCH',
      image: ''
    },
    {
      tokenName: 'USDCoin',
      symbol: 'USDC',
      image: ''
    },
    {
      tokenName: 'Dai Stablecoin',
      symbol: 'DAI',
      image: ''
    }
  ]

  return (
    <div className="p-24 w-full bg-slate-100">
      <div className='flex gap-x-2 gap-y-2 justify-center'>
        {tokens.map((t, idx) => (
          <TokenCard key={idx} symbol={t.symbol} tokenName={t.tokenName} imageURL={t.image}/>
        ))}
      </div>
    </div>
  );
}

export default TokenListTabContent