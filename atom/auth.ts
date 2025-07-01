import { atom } from 'jotai';

// Holds the authentication token (JWT or similar)
export const tokenAtom = atom<string | null>(null);

// Optionally, you can add a user atom for user info (extend as needed)
export const userAtom = atom<any | null>(null); 