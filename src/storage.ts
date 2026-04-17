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

export function formatInterval(min: number, max?: number) {
    const _formatTime = (v: number) => {
        return v < 60
            ? `${v}s`
            : v % 60 == 0
                ? `${v / 60}m`
                : `${(v / 60).toFixed(1)}m`
    }
    if (max == undefined) return _formatTime(min)
    if (min == max) return _formatTime(min)
    return `${_formatTime(min)} - ${_formatTime(max)}`;
}

// User local sets are stored on the device
// Global default sets are always loaded from file and cannot be edited/removed.
export const STORAGE_KEY_SETS = 'pulse-sets';
export const STORAGE_KEY_SELECTED = 'pulse-selected';
import defaultSetsJson from './default_sets.json';
const defaultSets: Set[] = defaultSetsJson as unknown as Set[];


export function loadSets(): Set[] {
    const data = localStorage.getItem(STORAGE_KEY_SETS);
    if (!data) return defaultSets;
    try {
        return JSON.parse(data) as Set[];
    } catch {
        console.warn('Failed to parse sets from localStorage');
    }
    return defaultSets;
}

export function saveSets(sets: Set[]): void {
    localStorage.setItem(STORAGE_KEY_SETS, JSON.stringify(sets));
}

export function loadSelectedId(): string | undefined {
    const data = localStorage.getItem(STORAGE_KEY_SELECTED);
    if (!data) return undefined;
    return data;
}

export function saveSelectedId(id?: string): void {
    if (id) localStorage.setItem(STORAGE_KEY_SELECTED, id);
    else localStorage.removeItem(STORAGE_KEY_SELECTED);
}

