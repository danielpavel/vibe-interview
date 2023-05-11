import { Token } from "@/types/types";

export const tokensEqual = (token1?: Token, token2?: Token) => {
  if (!token1 || !token2) return false;

  return (
    token1.id === token2.id &&
    token1.name === token2.name &&
    token1.symbol === token2.symbol
  );
}