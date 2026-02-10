
export enum View {
  DASHBOARD = 'dashboard',
  DRIVERS = 'drivers',
  PRICING = 'pricing',
  SUPPORT = 'support',
  AUTOMATION = 'automation',
  SETTINGS = 'settings'
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  rating: number;
  totalRides: number;
  earnings: number;
  status: 'active' | 'offline' | 'suspended';
  avatar: string;
}

export interface Message {
  id: string;
  sender: 'rider' | 'agent' | 'system';
  text: string;
  timestamp: string;
}

export interface PayoutBatch {
  id: string;
  date: string;
  amount: number;
  driverCount: number;
  status: 'dispatched' | 'processing' | 'scheduled';
}
