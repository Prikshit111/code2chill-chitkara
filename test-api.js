// Automated Test Suite for Code2Chill MERN Stack API
const http = require('http');

const BASE_URL = 'http://localhost:5000';

function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n🧪 ====================================================');
  console.log('   CODE2CHILL CLUB - AUTOMATED TEST SUITE');
  console.log('   Chitkara University, Rajpura, Punjab');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name} ->`, err.message);
    }
  }

  // 1. Health Endpoint
  await test('Backend Health & University Affiliation', async () => {
    const res = await makeRequest('/api/health');
    if (res.status !== 200 || res.data.club !== 'Code2Chill') {
      throw new Error(`Unexpected response: ${JSON.stringify(res.data)}`);
    }
  });

  // 2. Club Stats & Member Count
  await test('Club Stats & Active Members Count', async () => {
    const res = await makeRequest('/api/stats');
    if (res.status !== 200 || !res.data.stats || res.data.stats.activeMembers < 800) {
      throw new Error('Member count missing or below expected range');
    }
  });

  // 3. Instagram Handle & Feed
  await test('Instagram Handle (@code2chill.chitkara) Endpoint', async () => {
    const res = await makeRequest('/api/stats/instagram');
    if (res.status !== 200 || !res.data.handle.includes('code2chill')) {
      throw new Error('Instagram handle endpoint failed');
    }
  });

  // 4. Events Endpoint & Flagship Hackathon
  await test('Events Endpoint & ChillHack 2026', async () => {
    const res = await makeRequest('/api/events');
    if (res.status !== 200 || !Array.isArray(res.data.data) || res.data.data.length === 0) {
      throw new Error('Events list empty');
    }
  });

  // 5. Team Heads Endpoint
  await test('Team Heads & Core Leadership Roster', async () => {
    const res = await makeRequest('/api/team');
    if (res.status !== 200 || !Array.isArray(res.data.data) || res.data.data.length < 5) {
      throw new Error('Team heads list missing or incomplete');
    }
  });

  // 6. User Login Authentication (JWT)
  let authToken = null;
  await test('Login Authentication (Aryan Sharma - Team Head)', async () => {
    const res = await makeRequest('/api/auth/login', 'POST', {
      email: 'aryan@chitkara.edu.in',
      password: 'password123'
    });
    if (res.status !== 200 || !res.data.token || res.data.user.role !== 'head') {
      throw new Error(`Login failed: ${res.data.message || res.status}`);
    }
    authToken = res.data.token;
  });

  // 7. Member Registration
  const testEmail = `test.student.${Date.now()}@chitkara.edu.in`;
  await test('New Chitkarian Member Registration', async () => {
    const res = await makeRequest('/api/auth/register', 'POST', {
      name: 'Ramanjot Singh',
      email: testEmail,
      password: 'mypassword123',
      rollNumber: '2310998899',
      department: 'CSE',
      year: '2nd Year',
      interests: 'React, Node.js, MERN'
    });
    if (res.status !== 201 || !res.data.token) {
      throw new Error(`Registration failed: ${res.data.message || res.status}`);
    }
  });

  // 8. Event Registration (RSVP)
  await test('Event Registration (RSVP for ChillHack)', async () => {
    const res = await makeRequest('/api/events/evt-1/register', 'POST', {
      fullName: 'Ramanjot Singh',
      email: testEmail,
      rollNumber: '2310998899',
      department: 'CSE',
      year: '2nd Year',
      githubProfile: 'https://github.com/ramanjot'
    });
    if (res.status !== 201 || !res.data.success) {
      throw new Error(`Event RSVP failed: ${res.data.message || res.status}`);
    }
  });

  // 9. Join Club Application
  await test('Join Code2Chill Club Application', async () => {
    const res = await makeRequest('/api/stats/join-club', 'POST', {
      fullName: 'Harpreet Kaur',
      email: `harpreet.${Date.now()}@chitkara.edu.in`,
      rollNumber: '2410991122',
      department: 'CSE AI',
      year: '1st Year',
      interestDomain: 'AI / ML',
      whyJoin: 'Excited to build GenAI projects at Chitkara'
    });
    if (res.status !== 201 || !res.data.success) {
      throw new Error(`Club join application failed: ${res.data.message || res.status}`);
    }
  });

  console.log('\n====================================================');
  console.log(`   TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round(passed/total * 100)}%)`);
  console.log('====================================================\n');
}

runTests().catch(err => {
  console.error('Test suite error (is the server running?):', err.message);
});
