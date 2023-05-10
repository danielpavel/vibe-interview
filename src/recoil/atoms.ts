import { atom } from 'recoil'
import { SelectedTokenPair } from '../types/types'

export const tokenPair = atom<SelectedTokenPair | undefined>({
  key: "tokenPair",
  default: undefined,
})