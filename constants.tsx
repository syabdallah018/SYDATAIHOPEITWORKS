
import React from 'react';
import { Network, Method, DataPlan } from './types';

export const COLORS = {
  MTN: 'bg-yellow-400 text-black border-yellow-500',
  AIRTEL: 'bg-red-600 text-white border-red-700',
  GLO: 'bg-green-600 text-white border-green-700',
};

export const NETWORK_LOGOS: Record<Network, string> = {
  MTN: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/MTN_Logo.svg/1024px-MTN_Logo.svg.png',
  AIRTEL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Airtel_logo.svg/1024px-Airtel_logo.svg.png',
  GLO: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Glo_logo.svg/1024px-Glo_logo.svg.png',
};

export const PLANS: Record<Network, Record<Method, DataPlan[]>> = {
  MTN: {
    MANUAL: [
      { id: 'mtn-m-1', label: '1GB', price: 450 },
      { id: 'mtn-m-2', label: '2GB', price: 900 },
      { id: 'mtn-m-3', label: '3GB', price: 1200 },
      { id: 'mtn-m-5', label: '5GB', price: 1800 },
    ],
    AUTO: [
      { id: 'mtn-a-1', label: '1GB', price: 500 },
      { id: 'mtn-a-2', label: '2GB', price: 1000 },
      { id: 'mtn-a-3', label: '3GB', price: 1500 },
      { id: 'mtn-a-5', label: '5GB', price: 2000 },
    ]
  },
  AIRTEL: {
    MANUAL: [], // Not explicitly provided in prompt, so empty
    AUTO: [
      { id: 'air-a-1', label: '1GB', price: 900 },
      { id: 'air-a-2', label: '2GB', price: 1600 },
      { id: 'air-a-4', label: '4GB', price: 2600 },
    ]
  },
  GLO: {
    MANUAL: [], // Not explicitly provided
    AUTO: [
      { id: 'glo-a-1', label: '1GB', price: 450 },
      { id: 'glo-a-2', label: '2GB', price: 900 },
      { id: 'glo-a-3', label: '3GB', price: 1350 },
    ]
  }
};
