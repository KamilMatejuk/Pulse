import { createContext } from 'react';
import type { Set } from '../storage';

export type SelectedContextValue = {
  selected?: Set;
  setSelected: (s: Set | undefined) => void;
};

export const SelectedContext = createContext<SelectedContextValue>({
  selected: undefined,
  setSelected: () => { },
});
