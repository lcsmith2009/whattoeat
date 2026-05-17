const meals = [
  {id:1,name:'Crispy Burger Plate',emoji:'🍔',mood:['comfort','chaos'],budget:'mid',energy:'medium',time:'20 min',photo:'burger',desc:'A burger, fries, and peace. Not health. Peace.',why:'You picked comfort energy, so we went with something that feels like a reward for surviving the day.',steps:['Toast bun','Cook patty or heat frozen burger','Add cheese and sauce','Serve with fries or chips']},
  {id:2,name:'Late Night Ramen Bowl',emoji:'🍜',mood:['late','lazy','comfort'],budget:'cheap',energy:'low',time:'8 min',photo:'ramen',desc:'Ramen upgraded with egg, sauce, and delusion.',why:'Your vibe said it is too late to be responsible, but not too late to eat dramatically.',steps:['Boil noodles','Add seasoning and chili/garlic','Drop in egg','Top with cheese or green onion']},
  {id:3,name:'Pantry Nacho Plate',emoji:'🧀',mood:['broke','lazy','chaos'],budget:'cheap',energy:'low',time:'5 min',photo:'nachos',desc:'Chips, cheese, toppings, microwave. The economy made you creative.',why:'Your hunger is giving struggle energy, so this is cheap, fast, and suspiciously satisfying.',steps:['Spread chips','Add cheese','Microwave until melty','Top with salsa, beans, meat, or whatever exists']},
  {id:4,name:'Taco Night Remix',emoji:'🌮',mood:['comfort','chaos'],budget:'mid',energy:'medium',time:'18 min',photo:'taco',desc:'Tacos fix arguments. Not legally, but spiritually.',why:'You need something flexible, fun, and hard to be mad at.',steps:['Warm tortillas','Cook meat or beans','Add toppings','Sauce aggressively']},
  {id:5,name:'Main Character Salad',emoji:'🥗',mood:['healthy'],budget:'mid',energy:'medium',time:'12 min',photo:'salad',desc:'Healthy-ish, but still trying to be cute.',why:'You wanted lighter food without eating sadness from a bowl.',steps:['Add greens','Add protein','Add crunchy topping','Use a dressing you actually like']},
  {id:6,name:'Garlic Butter Pasta',emoji:'🍝',mood:['comfort','lazy'],budget:'cheap',energy:'medium',time:'15 min',photo:'pasta',desc:'Cheap pasta pretending it has a reservation.',why:'This matches low-drama hunger: warm, simple, and classy enough to fake it.',steps:['Boil pasta','Melt butter with garlic','Toss pasta with cheese','Add pepper or chili flakes']},
  {id:7,name:'Breakfast-for-Dinner Stack',emoji:'🥞',mood:['comfort','late'],budget:'cheap',energy:'medium',time:'15 min',photo:'breakfast',desc:'Because rules are made up and pancakes know the truth.',why:'You need cozy food that ignores the clock.',steps:['Make eggs or pancakes','Add bacon/sausage if available','Add syrup/hot sauce','Plate like you meant it']},
  {id:8,name:'Saucy Wing Situation',emoji:'🍗',mood:['chaos','comfort'],budget:'treat',energy:'medium',time:'25 min',photo:'wings',desc:'Wings are not dinner. Wings are an event.',why:'Your choices said “feed me something that feels like a group chat argument.”',steps:['Bake or air fry wings','Toss in sauce','Add fries or celery','Prepare napkins emotionally']},
  {id:9,name:'Pizza Emergency',emoji:'🍕',mood:['lazy','late','comfort'],budget:'mid',energy:'low',time:'10 min',photo:'pizza',desc:'Pizza does not ask questions. Pizza shows up.',why:'This is the correct answer when decision fatigue has entered the chat.',steps:['Heat pizza','Add extra cheese or seasoning','Use ranch/hot sauce','Eat before judging yourself']}
];

const dailyVibes = [
  ['Comfort food with main-character seasoning','The day was loud. Your plate should be easy, warm, and a little dramatic.'],
  ['Struggle meal, but make it legendary','Cheap does not mean sad. It means resourceful with seasoning.'],
  ['Late-night snack court is now in session','The fridge light is your spotlight. Choose accordingly.'],
  ['Healthy-ish with a side of realism','Add vegetables, but do not remove joy. We are not doing punishment food.']
];

let state = {
  picks: JSON.parse(localStorage.getItem('wte_picks') || '{}'),
  saved: JSON.parse(localStorage.getItem('wte_saved') || '[]'),
  defaultMood: localStorage.getItem('wte_defaultMood') || 'comfort',
  streak: Number(localStorage.getItem('wte_streak') || '1'),
  history: JSON.parse(localStorage.getItem('wte_history') || '[]'),
  moodCounts: JSON.parse(localStorage.getItem('wte_moodCounts') || '{}'),
  lastVisit: localStorage.getItem('wte_lastVisit') || '',
  lastMeal: null,
  lastSmartMealId: null,
  lastChaosMealId: null,
  rerollCount: 0
};

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);


function todayKey(){
  return new Date().toISOString().slice(0,10);
}

function registerDailyVisit(){
  const today = todayKey();
  if (state.lastVisit !== today) {
    state.streak = state.lastVisit ? state.streak + 1 : Math.max(state.streak,1);
    state.lastVisit = today;
    saveState();
  }
}

function rememberPick(meal, source='smart'){
  const mood = state.picks.mood || state.defaultMood || meal.mood[0] || 'comfort';
  state.moodCounts[mood] = (state.moodCounts[mood] || 0) + 1;
  state.history = [{id:meal.id,name:meal.name,emoji:meal.emoji,mood,source,time:Date.now()}, ...state.history.filter(x=>x.id!==meal.id)].slice(0,20);
  saveState();
}

function topMood(){
  const entries = Object.entries(state.moodCounts);
  if (!entries.length) return state.defaultMood || 'comfort';
  return entries.sort((a,b)=>b[1]-a[1])[0][0];
}

function timeMood(){
  const h = new Date().getHours();
  if (h >= 22 || h < 5) return 'late';
  if (h >= 16 && h < 21) return 'comfort';
  if (h >= 11 && h < 15) return 'lazy';
  return state.defaultMood || 'comfort';
}

function renderForYou(){
  const mood = topMood();
  const clockMood = timeMood();
  const finalMood = state.history.length ? mood : clockMood;
  const pool = meals.filter(m=>m.mood.includes(finalMood));
  const meal = (pool.length ? pool : meals).find(m=>!state.history.slice(0,3).some(h=>h.id===m.id)) || (pool[0] || meals[0]);
  $('#forYouTitle').textContent = `${meal.emoji} ${meal.name}`;
  $('#forYouText').textContent = state.history.length
    ? `Because you usually lean ${finalMood}, this feels like your kind of plate tonight.`
    : `Based on the time of day, your hunger might be giving ${finalMood} energy.`;
  $('#forYouPickBtn').dataset.mealId = meal.id;
}

function saveState(){
  localStorage.setItem('wte_picks', JSON.stringify(state.picks));
  localStorage.setItem('wte_saved', JSON.stringify(state.saved));
  localStorage.setItem('wte_defaultMood', state.defaultMood);
  localStorage.setItem('wte_streak', String(state.streak));
  localStorage.setItem('wte_history', JSON.stringify(state.history.slice(0,20)));
  localStorage.setItem('wte_moodCounts', JSON.stringify(state.moodCounts));
  localStorage.setItem('wte_lastVisit', state.lastVisit);
}

function toast(msg){
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),1800);
}

function go(screenId){
  $$('.screen').forEach(s=>s.classList.remove('active'));
  $('#'+screenId).classList.add('active');
  $$('.bottom-nav button').forEach(b=>b.classList.toggle('active', b.dataset.go===screenId));
  window.scrollTo({top:0,behavior:'smooth'});
  if(screenId==='savedScreen') renderSaved();
  if(screenId==='profileScreen') renderProfile();
}

function mealCard(meal, large=false){
  const saved = state.saved.includes(meal.id);
  return `<article class="food-card ${large?'large':''}">
    <div class="food-img ${meal.photo}"></div>
    <div class="food-body">
      <div class="tags"><span>${meal.emoji} ${meal.time}</span><span>${meal.budget}</span><span>${meal.mood[0]}</span></div>
      <h3>${meal.name}</h3>
      <p>${meal.desc}</p>
      <p><strong>Why:</strong> ${meal.why}</p>
      <div class="card-actions">
        <button onclick="openMeal(${meal.id})">Recipe</button>
        <button onclick="toggleSave(${meal.id})">${saved?'Saved':'Save'}</button>
        <button onclick="openShare(${meal.id})">Share</button>
      </div>
    </div>
  </article>`;
}

function renderHome(){
  $('#homeFeed').innerHTML = meals.slice(0,6).map(m=>mealCard(m)).join('');
  refreshDaily(false);
  renderForYou();
}

function renderFeed(filter='all'){
  const list = filter==='all' ? meals : meals.filter(m=>m.mood.includes(filter));
  $('#verticalFeed').innerHTML = list.map(m=>mealCard(m,true)).join('');
}

function renderSaved(){
  $('#savedList').innerHTML = state.saved.length ? state.saved.map(id=>mealCard(meals.find(m=>m.id===id),true)).join('') : `<div class="glass-card"><h3>No saved cravings yet.</h3><p>Save a meal when the app clocks your hunger correctly.</p></div>`;
}

function renderProfile(){
  $('#streakCount').textContent = state.streak;
  $('#savedCount').textContent = state.saved.length;
  $('#historyCount').textContent = state.history.length;
  $('#topMoodText').textContent = topMood();
  $('#recentList').innerHTML = state.history.length ? state.history.slice(0,6).map(item=>`<button onclick="openMeal(${item.id})">${item.emoji} ${item.name}<span>${item.mood}</span></button>`).join('') : '<p class="tiny-note">No history yet. Pick a meal and I’ll start learning your food chaos.</p>';
  renderForYou();
  $$('[data-group="defaultMood"] button').forEach(b=>b.classList.toggle('active', b.dataset.value===state.defaultMood));
}

function refreshDaily(show=true){
  const vibe = dailyVibes[Math.floor(Math.random()*dailyVibes.length)];
  $('#dailyTitle').textContent = vibe[0]; $('#dailyText').textContent = vibe[1];
  if(show) toast('Tonight\'s vibe refreshed');
}

function smartPick(){
  const mood = state.picks.mood || state.defaultMood;
  const budget = state.picks.budget || 'mid';
  const energy = state.picks.energy || 'medium';
  let scored = meals
    .map(m=>({m,score:(m.mood.includes(mood)?3:0)+(m.budget===budget?2:0)+(m.energy===energy?2:0)+Math.random()}))
    .sort((a,b)=>b.score-a.score);

  // Never return the same exact meal twice in a row when the user hits reroll.
  let chosen = scored[0].m;
  if (state.lastSmartMealId && scored.length > 1) {
    const different = scored.find(item => item.m.id !== state.lastSmartMealId);
    if (different) chosen = different.m;
  }

  state.lastMeal = chosen;
  state.lastSmartMealId = chosen.id;
  state.rerollCount += 1;
  rememberPick(chosen, 'smart');
  saveState();

  const result = $('#smartResult');
  result.classList.remove('result-pop');
  result.innerHTML = `<div class="glass-card result-header"><p class="eyebrow">Your pick #${state.rerollCount}</p><p class="tiny-note">Fresh reroll locked in — no same-meal back-to-back nonsense.</p></div>${mealCard(chosen,true)}<button class="ghost-btn full" onclick="smartPick()">Reroll, I deserve options</button>`;
  requestAnimationFrame(()=>result.classList.add('result-pop'));
  toast(`${chosen.name} picked for your ${mood} mood`);
}

function toggleSave(id){
  state.saved = state.saved.includes(id) ? state.saved.filter(x=>x!==id) : [...state.saved,id];
  saveState(); renderHome(); renderFeed(document.querySelector('.mode-strip .active')?.dataset.filter || 'all'); renderSaved(); renderProfile();
  toast(state.saved.includes(id) ? 'Saved to cravings' : 'Removed from cravings');
}

function openMeal(id){
  const meal = meals.find(m=>m.id===id);
  $('#modalContent').innerHTML = `<div class="food-img ${meal.photo}" style="border-radius:24px;height:210px"></div><h2>${meal.emoji} ${meal.name}</h2><p>${meal.desc}</p><p><strong>Why this works:</strong> ${meal.why}</p><h3>Quick steps</h3><ol>${meal.steps.map(s=>`<li>${s}</li>`).join('')}</ol><button class="primary-btn full" onclick="openShare(${meal.id})">Make share card</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
}

function openShare(id){
  const meal = meals.find(m=>m.id===id);
  const text = `WhatToEat picked ${meal.emoji} ${meal.name} for me because ${meal.why} ${meal.desc}\nhttps://whattoeat-ten-hazel.vercel.app/`;
  $('#modalContent').innerHTML = `<div class="share-card-preview"><div><p class="eyebrow">WhatToEat picked</p><h2>${meal.emoji} ${meal.name}</h2></div><p>${meal.desc}</p><p>${meal.why}</p><p class="tiny-note">V9.1 share card ready for screenshots, downloads, and group chats.</p></div><button class="primary-btn full" id="copyShareBtn">Copy share text</button><button class="ghost-btn full" onclick="downloadShareCard(${meal.id},'share')">Download share card</button><button class="ghost-btn full" onclick="openRoastMode()">Roast this pick</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
  setTimeout(()=>$('#copyShareBtn').onclick=()=>{navigator.clipboard?.writeText(text); toast('Share text copied');},0);
}


const roastLines = [
  'This craving has no budget, no plan, and somehow still has confidence.',
  'Your hunger said “I deserve better” while holding pantry ingredients.',
  'This meal is not a choice. It is a cry for sauce.',
  'Respectfully, your stomach is making executive decisions with intern energy.',
  'The fridge saw you coming and turned the light on like a stage spotlight.',
  'This is the kind of meal that says “I am healing” and “I am tired” at the same time.'
];

function socialMeal(){
  return state.lastMeal || (state.history[0] ? meals.find(m=>m.id===state.history[0].id) : null) || meals[2];
}

function makeRoast(meal=socialMeal()){
  const line = roastLines[Math.floor(Math.random()*roastLines.length)];
  return `${meal.emoji} ${meal.name}: ${line}`;
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines=8){
  const words = text.split(' ');
  let line = '';
  let lines = 0;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lines++;
      if (lines >= maxLines - 1) break;
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) ctx.fillText(line.trim(), x, y);
  return y + lineHeight;
}

function drawShareCanvas(meal=socialMeal(), mode='share'){
  const canvas = $('#shareCanvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const grad = ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,'#ff8a1f');
  grad.addColorStop(.48,'#ff4d4d');
  grad.addColorStop(1,'#111111');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = 'rgba(0,0,0,.22)';
  ctx.beginPath(); ctx.arc(930,150,260,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(80,1220,280,0,Math.PI*2); ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,.14)';
  ctx.roundRect(70,70,w-140,h-140,58);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.28)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = '#fff7e8';
  ctx.font = '900 46px Arial, sans-serif';
  ctx.fillText('WhatToEat picked', 110, 170);

  ctx.font = '900 120px Arial, sans-serif';
  ctx.fillText(meal.emoji, 110, 315);

  ctx.font = '900 76px Arial, sans-serif';
  let y = wrapCanvasText(ctx, meal.name, 110, 420, 860, 86, 3);

  ctx.fillStyle = 'rgba(255,255,255,.92)';
  ctx.font = '700 38px Arial, sans-serif';
  const mainText = mode === 'roast' ? makeRoast(meal) : `${meal.desc} ${meal.why}`;
  y = wrapCanvasText(ctx, mainText, 110, y + 40, 860, 50, 7);

  ctx.fillStyle = '#111111';
  ctx.fillRect(110, h-250, 860, 120);
  ctx.fillStyle = '#fff7e8';
  ctx.font = '900 38px Arial, sans-serif';
  ctx.fillText('Send this to the group chat.', 150, h-178);
  ctx.font = '800 28px Arial, sans-serif';
  ctx.fillText('whattoeat-ten-hazel.vercel.app', 150, h-134);
  return canvas;
}

function downloadShareCard(id, mode='share'){
  const meal = meals.find(m=>m.id===id) || socialMeal();
  const canvas = drawShareCanvas(meal, mode);
  const link = document.createElement('a');
  link.download = `whattoeat-${meal.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  link.remove();
  toast('Share card downloaded');
}

function openRoastMode(){
  const meal = socialMeal();
  const roast = makeRoast(meal);
  $('#modalContent').innerHTML = `<div class="share-card-preview roast-preview"><div><p class="eyebrow">Roast mode</p><h2>${meal.emoji} ${meal.name}</h2></div><p>${roast}</p><p class="tiny-note">Screenshot this when the app clocks you too accurately.</p></div><button class="primary-btn full" id="copyRoastBtn">Copy roast</button><button class="ghost-btn full" onclick="downloadShareCard(${meal.id},'roast')">Download roast card</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
  setTimeout(()=>$('#copyRoastBtn').onclick=()=>{navigator.clipboard?.writeText(`${roast}\nhttps://whattoeat-ten-hazel.vercel.app/`); toast('Roast copied');},0);
}

function openCoupleMode(){
  const comfort = meals.filter(m=>m.mood.includes('comfort'));
  const lowDrama = meals.filter(m=>m.energy !== 'high');
  const meal = (comfort.concat(lowDrama)).filter((m,i,arr)=>arr.findIndex(x=>x.id===m.id)===i)[Math.floor(Math.random()*comfort.concat(lowDrama).length)] || socialMeal();
  state.lastMeal = meal;
  rememberPick(meal,'couple');
  $('#modalContent').innerHTML = `<div class="share-card-preview couple-preview"><div><p class="eyebrow">Couple mode picked</p><h2>${meal.emoji} ${meal.name}</h2></div><p>This is the compromise meal. If y’all still argue, it was never about dinner.</p><p>${meal.desc}</p></div><button class="primary-btn full" onclick="openShare(${meal.id})">Make share card</button><button class="ghost-btn full" onclick="openCoupleMode()">Pick another couple meal</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
  toast('Couple mode picked');
}

function openGroupVote(){
  const shuffled = [...meals].sort(()=>Math.random()-.5).slice(0,3);
  const text = `WhatToEat group vote:\n${shuffled.map((m,i)=>`${i+1}. ${m.emoji} ${m.name} — ${m.desc}`).join('\n')}\nVote before somebody says “I don’t care” again.\nhttps://whattoeat-ten-hazel.vercel.app/`;
  $('#modalContent').innerHTML = `<div class="group-vote-card"><p class="eyebrow">Group vote</p><h2>Send these to the chat</h2>${shuffled.map((m,i)=>`<div class="vote-option"><span>${i+1}</span><div><strong>${m.emoji} ${m.name}</strong><p>${m.desc}</p></div></div>`).join('')}</div><button class="primary-btn full" id="copyVoteBtn">Copy group vote</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
  setTimeout(()=>$('#copyVoteBtn').onclick=()=>{navigator.clipboard?.writeText(text); toast('Group vote copied');},0);
}

function chaosPick(){
  let pool = meals.filter(m => m.id !== state.lastChaosMealId);
  if (!pool.length) pool = meals;
  const meal = pool[Math.floor(Math.random()*pool.length)];
  state.lastMeal = meal;
  state.lastChaosMealId = meal.id;
  state.rerollCount += 1;
  rememberPick(meal, 'chaos');
  saveState();
  go('matchScreen');
  const result = $('#smartResult');
  result.classList.remove('result-pop');
  result.innerHTML = `<div class="glass-card result-header"><p class="eyebrow">Chaos pick #${state.rerollCount}</p><p class="tiny-note">Different from the last chaos pick, because repeats are lazy.</p></div>${mealCard(meal,true)}<button class="ghost-btn full" onclick="chaosPick()">Reroll chaos</button>`;
  requestAnimationFrame(()=>result.classList.add('result-pop'));
  toast('Chaos has chosen');
}

$$('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
$$('.option-grid').forEach(grid=>grid.addEventListener('click',e=>{
  if(e.target.tagName!=='BUTTON') return;
  const group = grid.dataset.group;
  grid.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  if(group==='defaultMood') state.defaultMood = e.target.dataset.value; else state.picks[group]=e.target.dataset.value;
  saveState(); renderProfile();
}));
$$('.mode-strip button').forEach(btn=>btn.addEventListener('click',()=>{ $$('.mode-strip button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderFeed(btn.dataset.filter); }));
$('#smartPickBtn').addEventListener('click',smartPick);
$('#chaosPickBtn').addEventListener('click',chaosPick);
$('#refreshDailyBtn').addEventListener('click',()=>refreshDaily(true));
$('#makeShareBtn').addEventListener('click',()=>openShare((state.lastMeal || meals[2]).id));
$('#forYouPickBtn').addEventListener('click',()=>{ const id = Number($('#forYouPickBtn').dataset.mealId || meals[0].id); const meal = meals.find(m=>m.id===id) || meals[0]; state.lastMeal = meal; rememberPick(meal,'for-you'); go('matchScreen'); $('#smartResult').innerHTML = `<div class="glass-card result-header"><p class="eyebrow">For You Tonight</p><p class="tiny-note">Picked from your saved vibe + recent cravings.</p></div>${mealCard(meal,true)}<button class="ghost-btn full" onclick="smartPick()">Reroll with my taste</button>`; toast('For You pick loaded'); });
$('#roastModeBtn').addEventListener('click', openRoastMode);
$('#coupleModeBtn').addEventListener('click', openCoupleMode);
$('#groupVoteBtn').addEventListener('click', openGroupVote);
$('#closeModal').addEventListener('click', () => { modalBackdrop.hidden = true; modalBackdrop.setAttribute('hidden',''); });
$('#modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') { modalBackdrop.hidden = true; modalBackdrop.setAttribute('hidden',''); } });
$('#resetBtn').addEventListener('click',()=>{localStorage.clear(); location.reload();});
let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
$('#installBtn').addEventListener('click',()=>{ if(deferredPrompt){deferredPrompt.prompt();} else toast('Use browser menu → Add to Home screen'); });
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js?v=9.1').catch(()=>{}); }
registerDailyVisit();
renderHome(); renderFeed(); renderProfile();
