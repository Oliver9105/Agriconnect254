import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Listings
  await prisma.listing.createMany({
    data: [
      { title: 'Premium Kericho Gold Tea', category: 'Tea', priceKes: 185, unit: 'kg', quantity: '500kg available', seller: 'Samuel Koech', location: 'Kericho West', rating: 4.9, verified: true, delivery: '2-3 days', lat: -0.3689, lng: 35.2863 },
      { title: 'Arabica Coffee Beans', category: 'Coffee', priceKes: 420, unit: 'kg', quantity: '200kg available', seller: 'David Langat', location: 'Sotik', rating: 4.7, verified: true, delivery: '3-5 days', lat: -0.6789, lng: 35.1234 },
      { title: 'Yellow Maize (Grade A)', category: 'Maize', priceKes: 95, unit: 'kg', quantity: '2.5 Tons available', seller: 'Mary Chepkorir', location: 'Bomet Central', rating: 4.8, verified: false, delivery: '1-2 days', lat: -0.7890, lng: 35.3456 },
      { title: 'Organic Hass Avocados', category: 'Fruits', priceKes: 120, unit: 'kg', quantity: '150kg available', seller: 'Grace Mutai', location: 'Kericho East', rating: 5.0, verified: true, delivery: 'Next day', lat: -0.3800, lng: 35.3000 },
    ]
  });

  // Inventory
  await prisma.inventoryItem.createMany({
    data: [
      { sku: 'SKU-001', name: 'Premium Arabica Coffee', category: 'Coffee', stock: 1240, unit: 'KG', priceKes: 450, status: 'In Stock' },
      { sku: 'SKU-002', name: 'Organic Tea Leaves', category: 'Tea', stock: 850, unit: 'KG', priceKes: 320, status: 'Low Stock' },
      { sku: 'SKU-003', name: 'Macadamia Nuts', category: 'Nuts', stock: 0, unit: 'KG', priceKes: 850, status: 'Out of Stock' },
      { sku: 'SKU-004', name: 'Hass Avocados', category: 'Fruit', stock: 2100, unit: 'Units', priceKes: 45, status: 'In Stock' },
      { sku: 'SKU-005', name: 'Purple Passion Fruit', category: 'Fruit', stock: 450, unit: 'KG', priceKes: 120, status: 'In Stock' },
    ]
  });

  // Transactions
  await prisma.transaction.createMany({
    data: [
      { type: 'Escrow Release', amountKes: 124500, method: 'M-Pesa', status: 'Completed', farmer: 'John Kamau' },
      { type: 'Market Sale', amountKes: 45200, method: 'Bank Transfer', status: 'Pending', farmer: 'Sarah Wanjiku' },
      { type: 'Escrow Lock', amountKes: 850000, method: 'M-Pesa', status: 'Completed', farmer: 'Peter Maina' },
      { type: 'Market Sale', amountKes: 12400, method: 'Cash', status: 'Completed', farmer: 'Mary Atieno' },
      { type: 'Escrow Release', amountKes: 320000, method: 'M-Pesa', status: 'Failed', farmer: 'David Kipkorir' },
    ]
  });

  // Batches
  await prisma.batch.create({
    data: {
      id: 'B-102', product: 'Premium Kericho Tea', status: 'In Transit',
      origin: 'Kericho Hub', destination: 'Nairobi Market',
      originLat: -0.3689, originLng: 35.2863, destLat: -1.2864, destLng: 36.8172,
      progress: 65, temp: '18.4°C', humidity: '62%', eta: '2h 15m',
      lastUpdate: '2 mins ago', driver: 'John Kamau', driverPhone: '+254 712 345 678',
      vehicle: 'KDA 452L', securityHash: '0x8f...2e4a',
      history: {
        create: [
          { status: 'In Transit', location: 'Nairobi-Mombasa Highway', time: 'Today, 10:45 AM', iconName: 'Truck' },
          { status: 'Hub Processing', location: 'Nairobi Logistics Hub', time: 'Yesterday, 04:20 PM', iconName: 'Package' },
          { status: 'KEPHIS Verified', location: 'Quality Control Office', time: 'Mar 18, 09:15 AM', iconName: 'Shield' },
          { status: 'Batch Created', location: 'Kericho Farm Hub', time: 'Mar 17, 02:30 PM', iconName: 'Leaf' },
        ]
      }
    }
  });

  await prisma.batch.create({
    data: {
      id: 'B-105', product: 'Organic Avocados', status: 'Loading',
      origin: 'Bomet Central', destination: 'Nairobi Hub',
      originLat: -0.7813, originLng: 35.3416, destLat: -1.2921, destLng: 36.8219,
      progress: 10, temp: '21.2°C', humidity: '58%', eta: '6h 45m',
      lastUpdate: '15 mins ago', driver: 'Sarah Wanjiku', driverPhone: '+254 723 456 789',
      vehicle: 'KCB 981X', securityHash: '0x3a...9b1c',
      history: { create: [{ status: 'Loading', location: 'Bomet Central Farm', time: 'Today, 08:00 AM', iconName: 'Package' }] }
    }
  });

  await prisma.batch.create({
    data: {
      id: 'B-098', product: 'Specialty Coffee', status: 'Delivered',
      origin: 'Kericho East', destination: 'Mombasa Port',
      originLat: -0.3750, originLng: 35.3500, destLat: -4.0435, destLng: 39.6682,
      progress: 100, temp: '24.1°C', humidity: '70%', eta: 'Completed',
      lastUpdate: '1 hour ago', driver: 'Peter Maina', driverPhone: '+254 734 567 890',
      vehicle: 'KDD 223M', securityHash: '0x7d...5f2e',
      history: {
        create: [
          { status: 'Delivered', location: 'Mombasa Port', time: 'Mar 20, 02:00 PM', iconName: 'CheckCircle2' },
          { status: 'In Transit', location: 'Nairobi-Mombasa Highway', time: 'Mar 19, 10:00 AM', iconName: 'Truck' },
          { status: 'Batch Created', location: 'Kericho East Farm', time: 'Mar 17, 09:00 AM', iconName: 'Leaf' },
        ]
      }
    }
  });

  // Notifications
  await prisma.notification.createMany({
    data: [
      { title: 'Harvest Verified', message: 'Batch B-102 has been successfully verified by KEPHIS.', type: 'success', iconName: 'ShieldCheck', color: 'emerald' },
      { title: 'New Message', message: 'Samuel Koech sent you a message regarding the tea harvest.', type: 'message', iconName: 'MessageSquare', color: 'blue' },
      { title: 'Market Alert', message: 'Tea prices in Nairobi have increased by 12% this morning.', type: 'market', iconName: 'BarChart3', color: 'amber' },
      { title: 'Logistics Update', message: 'Driver John Kamau is 15 minutes away from Kericho Hub.', type: 'logistics', iconName: 'Truck', color: 'blue' },
    ]
  });

  // Growth data
  await prisma.growthData.createMany({
    data: [
      { day: 'Mon', momentum: 65, health: 82 },
      { day: 'Tue', momentum: 68, health: 84 },
      { day: 'Wed', momentum: 75, health: 85 },
      { day: 'Thu', momentum: 72, health: 83 },
      { day: 'Fri', momentum: 85, health: 88 },
      { day: 'Sat', momentum: 88, health: 90 },
      { day: 'Sun', momentum: 94, health: 92 },
    ]
  });

  // Batch momentum
  await prisma.batchMomentum.createMany({
    data: [
      { batchId: 'K-TEA-01', name: 'Kericho Gold A1', momentum: 92, status: 'Optimal', color: '#10b981' },
      { batchId: 'K-TEA-02', name: 'Highland Pekoe', momentum: 78, status: 'Steady', color: '#06b6d4' },
      { batchId: 'K-TEA-03', name: 'Purple Tea B2', momentum: 85, status: 'Optimal', color: '#8b5cf6' },
    ]
  });

  console.log('Seed complete');
}

main().catch(console.error).finally(() => prisma.$disconnect());
