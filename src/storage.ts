export type Set = {
    id: string;
    name: string;
    phrases: string[];
    interval: {
        min: number; // seconds
        max: number; // seconds
    };
    randomize: boolean;
    forceFullUseBeforeLoop: boolean;
    liked: boolean;
    custom?: boolean;
    bg?: string;
}

// User local sets are stored on the device
// Global default sets are always loaded from file and cannot be edited/removed.
export const STORAGE_KEY = 'pulse-sets';
import defaultSetsJson from './default_sets.json';
const defaultSets: Set[] = defaultSetsJson as unknown as Set[];


export function loadSets(): Set[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return defaultSets;
    try {
        return JSON.parse(data) as Set[];
    } catch {
        console.warn('Failed to parse sets from localStorage');
    }
    return defaultSets;
}

export function saveSets(sets: Set[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}
