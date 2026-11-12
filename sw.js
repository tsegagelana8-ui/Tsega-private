<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="theme-color" content="#120C25" />
  <title>Tsega Habit Tracker</title>
  <style>
    :root {
      --bg-deep: #0b0716;
      --bg-card: #150e2b;
      --bg-card-elevated: #1e153b;
      --border-subtle: rgba(152, 105, 255, 0.18);
      --purple-primary: #8b5cf6;
      --purple-glow: #9869ff;
      --purple-dark: #4518b8;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --success: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body {
      min-height: 100vh;
      overflow-y: auto !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
      background: radial-gradient(circle at top center, #1b1138 0%, var(--bg-deep) 65%);
      color: var(--text-main);
      padding-bottom: 80px;
    }
    #lockScreen {
      position: fixed; inset: 0; z-index: 9999;
      background: radial-gradient(circle at center, #1c1238 0%, #090512 85%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 24px; text-align: center;
    }
    #lockScreen.hidden { display: none; }
    .lock-icon {
      width: 72px; height: 72px; border-radius: 20px;
      background: linear-gradient(135deg, #9869ff, #4518b8);
      display: flex; align-items: center; justify-content: center;
      font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 20px;
    }
    .lock-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
    .lock-sub { font-size: 14px; color: var(--text-muted); max-width: 280px; margin-bottom: 24px; }
    .pin-input {
      width: 220px; padding: 14px; border-radius: 14px;
      border: 1px solid var(--border-subtle); background: rgba(255,255,255,0.05);
      color: #fff; font-size: 22px; letter-spacing: 8px; text-align: center; outline: none; margin-bottom: 14px;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--purple-glow), var(--purple-dark));
      color: #fff; border: none; padding: 13px 24px; border-radius: 14px;
      font-weight: 700; font-size: 15px; cursor: pointer; width: 220px; margin-bottom: 10px;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.06); color: var(--text-main);
      border: 1px solid var(--border-subtle); padding: 11px 20px; border-radius: 14px;
      font-weight: 600; font-size: 14px; cursor: pointer; width: 220px;
    }
    .app-container { max-width: 520px; margin: 0 auto; padding: 20px 16px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
    .greeting h1 { font-size: 26px; font-weight: 800; }
    .greeting p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
    .header-actions { display: flex; align-items: center; gap: 8px; }
    .status-pill {
      display: flex; align-items: center; gap: 6px;
      background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
      color: #6ee7b7; font-size: 11px; font-weight: 600; padding: 6px 10px; border-radius: 20px;
    }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--success); }
    .icon-btn {
      width: 36px; height: 36px; border-radius: 12px; background: var(--bg-card);
      border: 1px solid var(--border-subtle); color: var(--text-main);
      display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px;
    }
    .card {
      background: var(--bg-card); border: 1px solid var(--border-subtle);
      border-radius: 18px; padding: 16px; margin-bottom: 14px;
    }
    .card-label { font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; color: var(--purple-glow); margin-bottom: 8px; }
    .scripture-text { font-size: 14px; line-height: 1.5; color: #e2e8f0; }
    .intention-box { display: flex; align-items: center; gap: 12px; }
    .intention-icon {
      width: 40px; height: 40px; border-radius: 12px; background: rgba(139,92,246,0.15);
      display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
    }
    .intention-input { width: 100%; background: transparent; border: none; color: var(--text-main); font-size: 14px; font-weight: 600; outline: none; }
    .timer-display { font-size: 42px; font-weight: 800; text-align: center; font-variant-numeric: tabular-nums; margin: 10px 0 14px; color: #fff; }
    .timer-controls { display: flex; gap: 10px; justify-content: center; }
    .timer-btn {
      padding: 10px 20px; border-radius: 12px; border: 1px solid var(--border-subtle);
      background: var(--bg-card-elevated); color: #fff; font-weight: 700; font-size: 13px; cursor: pointer;
    }
    .timer-btn.active { background: var(--purple-primary); border-color: var(--purple-glow); }
    .add-row { display: flex; gap: 8px; margin-bottom: 12px; }
    .add-input {
      flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle);
      border-radius: 12px; padding: 10px 14px; color: #fff; font-size: 14px; outline: none;
    }
    .add-btn { background: var(--purple-primary); color: #fff; border: none; border-radius: 12px; padding: 0 16px; font-weight: 700; font-size: 18px; cursor: pointer; }
    .habit-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .habit-item {
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
      padding: 12px 14px; border-radius: 14px; cursor: pointer;
    }
    .habit-item.done { opacity: 0.55; }
    .habit-item.done span { text-decoration: line-through; }
    .habit-left { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; }
    .check-circle {
      width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--purple-glow);
      display: flex; align-items: center; justify-content: center; font-size: 12px;
    }
    .habit-item.done .check-circle { background: var(--purple-primary); }
    .del-btn { background: transparent; border: none; color: var(--text-muted); font-size: 16px; cursor: pointer; padding: 2px 6px; }
    #toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px);
      background: #1e153b; border: 1px solid var(--purple-glow); color: #fff;
      padding: 10px 18px; border-radius: 12px; font-size: 13px; font-weight: 600;
      z-index: 10000; transition: transform 0.25s ease; white-space: nowrap;
    }
    #toast.show { transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body>

  <div id="lockScreen">
    <div class="lock-icon">T</div>
    <h2 class="lock-title" id="lockTitle">Welcome back, Tsega</h2>
    <p class="lock-sub" id="lockSubtitle">Verify your PIN or Biometrics to unlock your workspace.</p>
    <input type="password" inputmode="numeric" maxlength="6" id="pinInput" class="pin-input" placeholder="••••" />
    <button class="btn-primary" id="unlockBtn">Unlock Workspace</button>
    <button class="btn-secondary" id="bioBtn">Use Biometrics</button>
  </div>

  <div class="app-container">
    <div class="header">
      <div class="greeting">
        <h1 id="greetingText">Good evening,<br>Tsega</h1>
        <p id="dateText"></p>
      </div>
      <div class="header-actions">
        <div class="status-pill">
          <span class="status-dot"></span>
          <span>Offline Ready</span>
        </div>
        <button class="icon-btn" id="resetPinBtn" title="Change PIN">⌘</button>
        <button class="icon-btn" id="lockNowBtn" title="Lock App">🔒</button>
      </div>
    </div>

    <div class="card">
      <div class="card-label">PROVERBS 16:3</div>
      <p class="scripture-text">“Commit to the Lord whatever you do, and he will establish your plans.”</p>
    </div>

    <div class="card">
      <div class="card-label">COLOSSIANS 3:23</div>
      <p class="scripture-text">“Whatever you do, work at it with all your heart, as working for the Lord.”</p>
    </div>

    <div class="card">
      <div class="intention-box">
        <div class="intention-icon">⚡</div>
        <div style="flex:1">
          <div class="card-label">TODAY'S PRIMARY INTENTION</div>
          <input type="text" id="intentionInput" class="intention-input" value="Execute high-leverage creative work with unwavering discipline and zero distractions." />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-label">DEEP FOCUS SESSION</div>
      <div class="timer-display" id="timerDisplay">25:00</div>
      <div class="timer-controls">
        <button class="timer-btn active" id="startTimerBtn">Start</button>
        <button class="timer-btn" id="pauseTimerBtn">Pause</button>
        <button class="timer-btn" id="resetTimerBtn">Reset</button>
      </div>
    </div>

    <div class="card">
      <div class="card-label">DAILY NON-NEGOTIABLES</div>
      <div class="add-row">
        <input type="text" id="newHabitInput" class="add-input" placeholder="Add new habit or task..." />
        <button class="add-btn" id="addHabitBtn">+</button>
      </div>
      <ul class="habit-list" id="habitList"></ul>
    </div>
  </div>

  <div id="toast"></div>

  <script>
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 2800);
    }

    async function sha256(str) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function updateHeader() {
      const now = new Date();
      const hr = now.getHours();
      let greet = 'Good evening,';
      if (hr < 12) greet = 'Good morning,';
      else if (hr < 18) greet = 'Good afternoon,';
      document.getElementById('greetingText').innerHTML = `${greet}<br>Tsega`;
      document.getElementById('dateText').textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
    updateHeader();

    const PIN_KEY = 'tsega_pin_hash';
    const CRED_KEY = 'tsega_bio_cred';
    const lockScreen = document.getElementById('lockScreen');
    const pinInput = document.getElementById('pinInput');
    const lockTitle = document.getElementById('lockTitle');
    const lockSubtitle = document.getElementById('lockSubtitle');

    function initSecurity() {
      const savedHash = localStorage.getItem(PIN_KEY);
      if (!savedHash) {
        lockTitle.textContent = 'Create Workspace PIN';
        lockSubtitle.textContent = 'Set a 4 to 6 digit PIN to protect your offline tracker.';
      } else {
        lockTitle.textContent = 'Welcome back, Tsega';
        lockSubtitle.textContent = 'Verify your PIN or Biometrics to unlock your workspace.';
      }
      lockScreen.classList.remove('hidden');
      pinInput.value = '';
    }

    document.getElementById('unlockBtn').addEventListener('click', async () => {
      const val = pinInput.value.trim();
      if (val.length < 4) { showToast('Enter at least 4 digits'); return; }
      const hash = await sha256(val);
      const savedHash = localStorage.getItem(PIN_KEY);
      if (!savedHash) {
        localStorage.setItem(PIN_KEY, hash);
        lockScreen.classList.add('hidden');
        showToast('PIN created & workspace unlocked');
      } else if (hash === savedHash) {
        lockScreen.classList.add('hidden');
        pinInput.value = '';
      } else {
        showToast('Incorrect PIN');
        pinInput.value = '';
      }
    });

    pinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('unlockBtn').click(); });

    document.getElementById('bioBtn').addEventListener('click', async () => {
      if (!window.PublicKeyCredential) { showToast('Biometrics unavailable'); return; }
      try {
        const challenge = new Uint8Array(32); crypto.getRandomValues(challenge);
        const existingCred = localStorage.getItem(CRED_KEY);
        if (!existingCred) {
          const cred = await navigator.credentials.create({
            publicKey: { challenge, rp: { name: 'Tsega Habit Tracker' }, user: { id: new Uint8Array([1, 2, 3, 4]), name: 'tsega', displayName: 'Tsega' }, pubKeyCredParams: [{ alg: -7, type: 'public-key' }] }
          });
          if (cred) { localStorage.setItem(CRED_KEY, 'enabled'); lockScreen.classList.add('hidden'); showToast('Biometrics enabled & unlocked'); }
        } else {
          await navigator.credentials.get({ publicKey: { challenge, userVerification: 'required' } });
          lockScreen.classList.add('hidden');
        }
      } catch (err) { showToast('Biometric check cancelled'); }
    });

    document.getElementById('lockNowBtn').addEventListener('click', initSecurity);
    document.getElementById('resetPinBtn').addEventListener('click', () => { localStorage.removeItem(PIN_KEY); initSecurity(); showToast('Enter a new PIN'); });
    document.addEventListener('visibilitychange', () => { if (document.hidden && localStorage.getItem(PIN_KEY)) initSecurity(); });
    initSecurity();

    const HABITS_KEY = 'tsega_habits_v1';
    const INTENTION_KEY = 'tsega_intention_v1';
    const intentionInput = document.getElementById('intentionInput');
    const savedIntention = localStorage.getItem(INTENTION_KEY);
    if (savedIntention) intentionInput.value = savedIntention;
    intentionInput.addEventListener('input', () => localStorage.setItem(INTENTION_KEY, intentionInput.value));

    let habits = JSON.parse(localStorage.getItem(HABITS_KEY) || 'null') || [
      { id: 1, text: 'Morning prayer & scripture reading', done: false },
      { id: 2, text: '2 hours deep motion design / editing sprint', done: false },
      { id: 3, text: 'Client outreach & portfolio update', done: false }
    ];

    function saveHabits() { localStorage.setItem(HABITS_KEY, JSON.stringify(habits)); }

    function renderHabits() {
      const list = document.getElementById('habitList');
      if (!list) return;
      list.innerHTML = '';
      habits.forEach((h) => {
        const li = document.createElement('li');
        li.className = `habit-item ${h.done ? 'done' : ''}`;
        li.innerHTML = `
          <div class="habit-left">
            <div class="check-circle">${h.done ? '✓' : ''}</div>
            <span>${h.text}</span>
          </div>
          <button class="del-btn">✕</button>
        `;
        li.querySelector('.habit-left').addEventListener('click', () => { h.done = !h.done; saveHabits(); renderHabits(); });
        li.querySelector('.del-btn').addEventListener('click', (e) => { e.stopPropagation(); habits = habits.filter(i => i.id !== h.id); saveHabits(); renderHabits(); });
        list.appendChild(li);
      });
    }

    const addHabitBtn = document.getElementById('addHabitBtn');
    if (addHabitBtn) {
      addHabitBtn.addEventListener('click', () => {
        const input = document.getElementById('newHabitInput');
        const text = input.value.trim();
        if (!text) return;
        habits.push({ id: Date.now(), text, done: false });
        input.value = '';
        saveHabits();
        renderHabits();
      });
    }

    const newHabitInput = document.getElementById('newHabitInput');
    if (newHabitInput) {
      newHabitInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addHabitBtn.click(); });
    }
    renderHabits();

    let secondsLeft = 25 * 60;
    let timerInterval = null;
    function updateTimerUI() {
      const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
      const secs = String(secondsLeft % 60).padStart(2, '0');
      const display = document.getElementById('timerDisplay');
      if (display) display.textContent = `${mins}:${secs}`;
    }

    document.getElementById('startTimerBtn').addEventListener('click', () => {
      if (timerInterval) return;
      timerInterval = setInterval(() => {
        if (secondsLeft > 0) { secondsLeft--; updateTimerUI(); }
        else { clearInterval(timerInterval); timerInterval = null; showToast('Focus session complete!'); }
      }, 1000);
    });

    document.getElementById('pauseTimerBtn').addEventListener('click', () => { clearInterval(timerInterval); timerInterval = null; });
    document.getElementById('resetTimerBtn').addEventListener('click', () => { clearInterval(timerInterval); timerInterval = null; secondsLeft = 25 * 60; updateTimerUI(); });
  </script>
</body>
</html>
