import React from 'react';
import { FarmerDashboard } from './FarmerDashboard';
import { Marketplace } from '../Marketplace';
import { SupplyChain } from './SupplyChain';

export const Dashboard = ({ role }: { role: 'farmer' | 'marketplace' | 'transit' }) => {
  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'marketplace':
      return <Marketplace />;
    case 'transit':
      return <SupplyChain />;
    default:
      return <FarmerDashboard />;
  }
};
