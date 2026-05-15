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
  lastMeal: null
};

const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function saveState(){
  localStorage.setItem('wte_picks', JSON.stringify(state.picks));
  localStorage.setItem('wte_saved', JSON.stringify(state.saved));
  localStorage.setItem('wte_defaultMood', state.defaultMood);
  localStorage.setItem('wte_streak', String(state.streak));
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
  let scored = meals.map(m=>({m,score:(m.mood.includes(mood)?3:0)+(m.budget===budget?2:0)+(m.energy===energy?2:0)+Math.random()})).sort((a,b)=>b.score-a.score);
  const meal = scored[0].m; state.lastMeal = meal; state.streak += 1; saveState();
  $('#smartResult').innerHTML = `<div class="glass-card"><p class="eyebrow">Your pick</p></div>${mealCard(meal,true)}<button class="ghost-btn full" onclick="smartPick()">Reroll, I deserve options</button>`;
  toast(`${meal.name} picked for your ${mood} mood`);
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
  $('#modalContent').innerHTML = `<div class="share-card-preview"><div><p class="eyebrow">WhatToEat picked</p><h2>${meal.emoji} ${meal.name}</h2></div><p>${meal.desc}</p><p>${meal.why}</p></div><button class="primary-btn full" id="copyShareBtn">Copy share text</button>`;
  modalBackdrop.hidden = false; modalBackdrop.removeAttribute('hidden');
  setTimeout(()=>$('#copyShareBtn').onclick=()=>{navigator.clipboard?.writeText(text); toast('Share text copied');},0);
}

function chaosPick(){
  const meal = meals[Math.floor(Math.random()*meals.length)]; state.lastMeal = meal;
  go('matchScreen'); $('#smartResult').innerHTML = mealCard(meal,true); toast('Chaos has chosen');
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
$('#closeModal').addEventListener('click', () => { modalBackdrop.hidden = true; modalBackdrop.setAttribute('hidden',''); });
$('#modalBackdrop').addEventListener('click', e => { if (e.target.id === 'modalBackdrop') { modalBackdrop.hidden = true; modalBackdrop.setAttribute('hidden',''); } });
$('#resetBtn').addEventListener('click',()=>{localStorage.clear(); location.reload();});
let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;});
$('#installBtn').addEventListener('click',()=>{ if(deferredPrompt){deferredPrompt.prompt();} else toast('Use browser menu → Add to Home screen'); });
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./sw.js?v=6').catch(()=>{}); }
renderHome(); renderFeed(); renderProfile();
