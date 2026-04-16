import React, { useContext, useState, type PropsWithChildren } from 'react';
import { loadSelectedId, saveSelectedId } from '../storage';
import type { Set } from '../storage';
import { SelectedContext } from './SelectedContext';
import { SetsContext } from './SetsContext';

export const SelectedProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { sets } = useContext(SetsContext);
  const [selected, setSelected] = useState<Set | undefined>(sets.find(s => s.id == loadSelectedId()));

  const select = (set: Set | undefined) => {
    setSelected(set);
    saveSelectedId(set?.id);
  };

  return (
    <SelectedContext.Provider value={{ selected, setSelected: select }}>
      {children}
    </SelectedContext.Provider>
  );
};
