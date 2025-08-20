export type ID = string;

export interface Deck {
  id: ID;
  title: string;
  description?: string;
  isPublic?: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface Card {
  id: ID;
  deckId: ID;
  front: string;
  back: string;
  // SRS
  interval: number; // days
  ease: number;     // SM-2 style
  repetitions: number;
  due: string;      // ISO
  suspended: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type Rating = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy