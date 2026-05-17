const BASE_MEALS = [
  ['Chicken Alfredo','comfort','medium','medium','pasta','🍝'],['Baked Mac & Cheese','comfort','medium','medium','soul','🧀'],['Fried Catfish Plate','comfort','medium','medium','soul','🐟'],['Shrimp & Grits','comfort','medium','medium','soul','🍤'],['Oxtail Bowl','comfort','high','high','soul','🍖'],['Hot Wing Platter','chaos','medium','low','group','🍗'],['Loaded Fries','chaos','low','low','snack','🍟'],['Pantry Nacho Plate','broke','low','low','struggle','🧀'],['Butter Noodles','broke','low','low','struggle','🍜'],['Tuna Rice Bowl','broke','low','low','struggle','🍚'],['Air Fryer Nuggets','broke','low','low','airfryer','🍗'],['Cereal at 1AM','late-night','low','low','chaos','🥣'],['Freezer Pizza','late-night','low','low','pizza','🍕'],['Ramen Upgrade Bowl','late-night','low','medium','ramen','🍜'],['Sushi Date Night','date','high','low','date','🍣'],['Taco Night','date','medium','medium','group','🌮'],['Salmon Bowl','healthy','medium','medium','healthy','🍣'],['Turkey Burger','healthy','medium','medium','healthy','🍔'],['Protein Pasta','healthy','medium','medium','healthy','🍝'],['Smoothie Bowl','healthy','medium','low','healthy','🍓']
];
const moods=['comfort','broke','chaos','healthy','date','late-night'];
const proteins=['Chicken','Shrimp','Beef','Turkey','Salmon','Tuna','Catfish','Egg','Veggie','Sausage'];
const forms=['Bowl','Wrap','Plate','Skillet','Sandwich','Pasta','Rice Bowl','Loaded Fries','Tacos','Nachos'];
const flavors=['Cajun','Garlic Butter','Honey Hot','Lemon Pepper','Spicy Ranch','Teriyaki','BBQ','Creamy','Buffalo','Street Style'];
const extras=['comfort','broke','chaos','healthy','date','late-night'];
const GENERATED_MEALS=[];
let id=1;
BASE_MEALS.forEach(m=>GENERATED_MEALS.push(makeMeal(m[0],m[1],m[2],m[3],m[4],m[5])));
for(let i=0;i<320;i++){
  const mood=extras[i%extras.length];
  const protein=proteins[i%proteins.length];
  const form=forms[(i*3)%forms.length];
  const flavor=flavors[(i*5)%flavors.length];
  const budget=mood==='broke'?'low':mood==='date'?'high':(i%3===0?'low':i%3===1?'medium':'high');
  const energy=mood==='late-night'||mood==='broke'?'low':(i%3===0?'low':i%3===1?'medium':'high');
  GENERATED_MEALS.push(makeMeal(`${flavor} ${protein} ${form}`,mood,budget,energy,form.toLowerCase(),emojiFor(form,protein)));
}
function makeMeal(name,mood,budget,energy,category,emoji){
  return {id:id++,name,mood,budget,energy,category,emoji,time:energy==='low'?'10-15 min':energy==='medium'?'20-30 min':'35+ min',description:descFor(mood,name),tags:[mood,budget,energy,category]};
}
function descFor(mood,name){
  const lines={comfort:`${name} is giving soft life with a fork. Cozy, filling, emotionally supportive.`,broke:`${name} said the budget is tight but the flavor still has rights.`,chaos:`${name} is not a plan. It's a delicious incident.`,healthy:`${name} lets you pretend you have your life together for at least one meal.`,date:`${name} feels like you tried without doing too much. Respectfully romantic.`,"late-night":`${name} is for when good decisions went to bed without you.`};
  return lines[mood]||`${name} is the move.`;
}
function emojiFor(form,protein){if(form.includes('Taco'))return'🌮';if(form.includes('Pizza'))return'🍕';if(form.includes('Pasta'))return'🍝';if(form.includes('Fries'))return'🍟';if(protein==='Shrimp')return'🍤';if(protein==='Salmon'||protein==='Tuna'||protein==='Catfish')return'🐟';if(protein==='Chicken'||protein==='Turkey')return'🍗';return'🍽️'}
window.WTE_MEALS=GENERATED_MEALS;
