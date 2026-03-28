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

  console.log('Seed complete');
}

main().catch(console.error).finally(() => prisma.$disconnect());
