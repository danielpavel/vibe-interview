import Image from 'next/image';
import { FC, useEffect, useState } from 'react'
import { SelectedTokenPair, Token } from '../../types/types';
import { useRecoilState } from 'recoil'
import { tokenPair } from '../../recoil'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  tokenName?: any,
  symbol?: any,
  tokenId?: any,
  imageURL?: any
}

const emptyToken: Token = {
  id: '', name: '', symbol: ''
}

const tokensEqual = (token1: Token, token2: Token) => {
  return (
    token1.id === token2.id &&
    token1.name === token2.name &&
    token1.symbol === token2.symbol
  );
}

const isTokenSelected = (pair: SelectedTokenPair | undefined, token: Token) => {
  if (!pair || (!pair.token0 && !pair.token1)) return false;

  let result = false;
  if (pair.token0) result = tokensEqual(token, pair.token0)
  if (pair.token1) result = tokensEqual(token, pair.token1)

  return result
}

const TokenCard: FC<Props> = ({ symbol, tokenName, tokenId }) => {
  const [token, setToken] = useState<Token>(emptyToken);
  const [tokenSelected, setTokenSelected] = useState<boolean>(false);
  const [selectedTokenPair, setSelectedTokenPair] = useRecoilState(tokenPair);

  useEffect(() => {
    setToken({
      id: tokenId,
      name: tokenName,
      symbol: symbol
    })
  }, [])

  const handleTokenOnClick = (e: any) => {
    console.log('[handleTokenOnClick] with token', token);

    if (!selectedTokenPair || !selectedTokenPair.token0) {
      setSelectedTokenPair({
        token0: token,
        token1: undefined,
      })
    } else if (!selectedTokenPair.token1) {
      setSelectedTokenPair({
        ...selectedTokenPair,
        token1: token,
      })
    } else if (isTokenSelected(selectedTokenPair, token)) {
      if (tokensEqual(selectedTokenPair.token0, token)) {
        setSelectedTokenPair({
          ...selectedTokenPair,
          token0: undefined,
        });
      }
      if (tokensEqual(selectedTokenPair.token1, token)) {
        setSelectedTokenPair({
          ...selectedTokenPair,
          token1: undefined,
        });
      }
    }
  }

  useEffect(() => {
    setTokenSelected(isTokenSelected(selectedTokenPair, token));
  }, [selectedTokenPair]);

  return (
    <button
      className={`p-1 w-[150px] min-w-[150px] h-[240px] rounded-2xl ${
        !isTokenSelected(selectedTokenPair, token)
          ? "border"
          : "border-2 border-green-300 shadow-lg"
      } hover:scale-105 duration-150 bg-slate-50`}
      onClick={handleTokenOnClick}
    >
      <div className="w-full h-3/5 bg-orange-100 rounded-2xl">
        {/* Token image */}
      </div>

      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={50}
        priority
      /> */}

      <div className="p-2 w-full h-2/5 flex flex-col justify-center">
        <div className="font-mono text-lg">{tokenName}</div>
        <div className="font-mono text-sm text-slate-400">{symbol}</div>
      </div>
    </button>
  );
}

export default TokenCard