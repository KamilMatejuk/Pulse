import { createContext } from 'react';
import type { Set } from '../storage';

export type SetsContextValue = {
  sets: Set[];
  addSet: (s: Set) => void;
  updateSet: (s: Set) => void;
  deleteSet: (id: string) => void;
};

export const SetsContext = createContext<SetsContextValue>({
  sets: [],
  addSet: () => { },
  updateSet: () => { },
  deleteSet: () => { },
});
