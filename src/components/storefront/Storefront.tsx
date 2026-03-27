import React from 'react';
import { Marketplace } from './Marketplace';
import { MyOrders } from './MyOrders';
import { HealthImpact } from './HealthImpact';

export const Storefront = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <h1 className="text-4xl font-black text-white mb-8">Buyer Storefront</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Marketplace />
        </div>
        <div className="space-y-8">
          <MyOrders />
          <HealthImpact />
        </div>
      </div>
    </div>
  );
};
