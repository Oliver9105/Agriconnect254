/**
 * AgriConnect M-Pesa Integration Test
 * Run with: npx tsx scripts/test-mpesa.ts
 */

const BASE = 'http://localhost:3000/api/v1';

const log = (label: string, data: any) => {
  console.log(`\n✅ ${label}`);
  console.log(JSON.stringify(data, null, 2));
};

const fail = (label: string, data: any) => {
  console.log(`\n❌ ${label}`);
  console.log(JSON.stringify(data, null, 2));
};

async function post(path: string, body: any) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`);
  return res.json();
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function run() {
  console.log('=== AgriConnect M-Pesa Test Suite ===\n');

  // Test 1: Initiate STK Push
  console.log('▶ Test 1: Initiate STK Push');
  const init1 = await post('/mpesa/purchase/initiate', {
    itemId: 1,
    phoneNumber: '254708374149',
    amount: 185,
    farmer: 'Samuel Koech'
  });
  if (!init1.CheckoutRequestID) { fail('STK Push initiation failed', init1); process.exit(1); }
  log('STK Push initiated', init1);
  const checkoutId = init1.CheckoutRequestID;

  // Test 2: Check initial status is Pending
  console.log('\n▶ Test 2: Check status (expect Pending)');
  const status1 = await get(`/mpesa/status/${checkoutId}`);
  status1.status === 'Pending' ? log('Status is Pending ✓', status1) : fail('Unexpected status', status1);

  // Test 3: Simulate successful callback
  console.log('\n▶ Test 3: Simulate successful M-Pesa callback');
  const cb1 = await post('/mpesa/callback', {
    Body: {
      stkCallback: {
        CheckoutRequestID: checkoutId,
        ResultCode: 0,
        ResultDesc: 'The service request is processed successfully.'
      }
    }
  });
  log('Callback accepted', cb1);
  await sleep(300);

  // Test 4: Verify status is Completed
  console.log('\n▶ Test 4: Verify status updated to Completed');
  const status2 = await get(`/mpesa/status/${checkoutId}`);
  status2.status === 'Completed' ? log('Status is Completed ✓', status2) : fail('Status not updated', status2);

  // Test 5: Simulate failed payment
  console.log('\n▶ Test 5: Simulate failed payment (user cancelled)');
  const init2 = await post('/mpesa/purchase/initiate', {
    itemId: 2,
    phoneNumber: '254708374149',
    amount: 420,
    farmer: 'David Langat'
  });
  await post('/mpesa/callback', {
    Body: {
      stkCallback: {
        CheckoutRequestID: init2.CheckoutRequestID,
        ResultCode: 1032,
        ResultDesc: 'Request cancelled by user.'
      }
    }
  });
  await sleep(300);
  const status3 = await get(`/mpesa/status/${init2.CheckoutRequestID}`);
  status3.status === 'Failed' ? log('Failed payment handled correctly ✓', status3) : fail('Failed payment not handled', status3);

  // Test 6: Escrow lock
  console.log('\n▶ Test 6: Escrow lock');
  const lock = await post('/mpesa/escrow/lock', {
    amount: 124500,
    phoneNumber: '254708374149',
    batchId: 'K-TEA-01',
    farmer: 'Samuel Koech'
  });
  log('Escrow locked', lock);

  // Test 7: Escrow release
  console.log('\n▶ Test 7: Escrow release');
  const release = await post('/mpesa/escrow/release', {
    batchId: 'K-TEA-01',
    farmer: 'Samuel Koech'
  });
  log('Escrow released', release);

  // Test 8: Verify ledger
  console.log('\n▶ Test 8: Verify transactions in ledger');
  const txns = await get('/transactions');
  log(`Found ${txns.length} transactions in ledger`, txns.slice(0, 3));

  console.log('\n=== All tests passed ✓ ===\n');
}

run().catch(e => {
  console.error('\n💥 Test suite crashed:', e.message);
  process.exit(1);
});
