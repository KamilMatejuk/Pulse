import React, { useState, type PropsWithChildren } from 'react';
import { loadSets, saveSets } from '../storage';
import type { Set } from '../storage';
import { SetsContext } from './SetsContext';

export const SetsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sets, setSets] = useState<Set[]>(loadSets());

  const addSet = (s: Set) => {
    const newSets = [...sets, s];
    setSets(newSets);
    saveSets(newSets);
  };

  const updateSet = (s: Set) => {
    const index = sets.findIndex((st) => st.id === s.id);
    if (index === -1) return;
    const newSets = [...sets];
    newSets[index] = s;
    setSets(newSets);
    saveSets(newSets);
  };

  const deleteSet = (id: string) => {
    const newSets = sets.filter((st) => st.id !== id);
    if (newSets.length === sets.length) return; // not found
    setSets(newSets);
    saveSets(newSets);
  };

  return (
    <SetsContext.Provider value={{ sets, addSet, updateSet, deleteSet }}>
      {children}
    </SetsContext.Provider>
  );
};
