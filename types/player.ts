// Player interface
export interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  // Optional properties that might be added later
  health?: number;
  inventory?: Item[];
}

// Item interface
export interface Item {
  id: string;
  type: ItemType;
  count: number;
}

// Item types
export enum ItemType {
  LOG = 'log',
  COAL = 'coal',
  FISH = 'fish'
} 