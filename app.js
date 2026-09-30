/* Boussole — application */
(function(){
"use strict";
/* ============================ DONNÉES ============================ */
const SUBJ = window.BSL_SUBJECTS, LV = window.BSL_LEVELS, GLOSS = window.BSL_GLOSS, RES = window.BSL_RES, MISS = window.BSL_MISSIONS, MEMO = window.BSL_MEMO;
const POOL = {}; window.BSL_MODULES.forEach(m=>m.lessons.forEach(l=>POOL[l.id]=l));
const LESSONS = [];
SUBJ.forEach(s=>{s.all=[];LV.forEach(lv=>{s.levels[lv.id]=s.levels[lv.id].map(id=>{const l=POOL[id];if(!l){console.warn("leçon manquante",id);return null}l.sub=s;l.lvl=lv;s.all.push(l);LESSONS.push(l);return l}).filter(Boolean)})});
const ALLQ = LESSONS.flatMap(l=>l.quiz.map((q,i)=>Object.assign(q,{id:l.id+"-"+i,lesson:l})));
const QBYID = Object.fromEntries(ALLQ.map(q=>[q.id,q]));
const SBYID = Object.fromEntries(SUBJ.map(s=>[s.id,s]));
const LVBYID = Object.fromEntries(LV.map(l=>[l.id,l]));
const SIMS = [["ic","Intérêts composés"],["budget","Budget 50/30/20"],["objectif","Objectif d'épargne"],["credit","Crédit immobilier"],["louer","Acheter ou louer"],["loc","Investissement locatif"],["fisc","Fiscalité des enveloppes"],["fire","Indépendance financière"]];
const INTERVALS=[0,1,3,7,16,35];

/* ============================ ÉTAT ============================ */
const KEY="boussole.v2";
function def(){return{xp:0,done:{},best:{},streak:0,bestStreak:0,lastDay:null,cards:{},wrong:[],badges:[],daily:{},reviews:0,sims:0,aiq:0,chats:0,missions:{},profile:null,updatedAt:0}}
function loadLocal(){try{const r=localStorage.getItem(KEY);if(r)return Object.assign(def(),JSON.parse(r))}catch(e){}return def()}
let S=loadLocal();
const PREF=(()=>{try{return Object.assign({voice:true,rate:1.05,vname:""},JSON.parse(localStorage.getItem(KEY+".pref")||"{}"))}catch(e){return{voice:true,rate:1.05,vname:""}}})();
function savePref(){try{localStorage.setItem(KEY+".pref",JSON.stringify(PREF))}catch(e){}}
let pushTimer=null;
function save(){S.updatedAt=Date.now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}clearTimeout(pushTimer);pushTimer=setTimeout(pushRemote,2500)}
const dstr=d=>{const x=new Date(d);return x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0")};
const TODAY=()=>dstr(Date.now());
const addDays=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return dstr(d)};
function touchDay(){const t=TODAY();if(S.lastDay===t)return;S.streak=(S.lastDay===addDays(t,-1))?S.streak+1:1;S.bestStreak=Math.max(S.bestStreak,S.streak);S.lastDay=t}
const liveStreak=()=>{const t=TODAY();return(S.lastDay===t||S.lastDay===addDays(t,-1))?S.streak:0};
const RANKS=[[0,"Curieux"],[150,"Épargnant"],[400,"Petit porteur"],[800,"Investisseur"],[1400,"Stratège"],[2200,"Gestionnaire de patrimoine"],[3200,"Maître de la Boussole"]];
function rank(){let i=0;RANKS.forEach((r,k)=>{if(S.xp>=r[0])i=k});const cur=RANKS[i][0],nx=RANKS[i+1]?RANKS[i+1][0]:null;return{n:i+1,name:RANKS[i][1],pct:nx?(S.xp-cur)/(nx-cur)*100:100,toNext:nx?nx-S.xp:0}}
function addXP(n,why){if(!n)return;const b=rank().n;S.xp+=n;touchDay();toast("+"+n+" XP",why);const a=rank();if(a.n>b)toast("Nouveau rang",a.name);checkBadges();save();chrome()}
const lvlDone=(s,lv)=>s.levels[lv].filter(l=>S.done[l.id]).length;
const subDone=s=>s.all.filter(l=>S.done[l.id]).length;
const BADGES=[
["first","Premier pas","Terminer une leçon",()=>Object.keys(S.done).length>=1],
["lvl","Niveau validé","Terminer un niveau complet",()=>SUBJ.some(s=>LV.some(lv=>s.levels[lv.id].length&&lvlDone(s,lv.id)===s.levels[lv.id].length))],
["sub","Sujet maîtrisé","Terminer tout un sujet",()=>SUBJ.some(s=>subDone(s)===s.all.length)],
["expert","Expert","Réussir un quiz Expert à 80 %",()=>Object.entries(S.best).some(([k,v])=>k.endsWith("-expert")&&v>=.8)],
["perfect","Sans faute","Un quiz à 100 %",()=>Object.values(S.best).some(v=>v>=1)||Object.values(S.done).some(d=>d.perfect)],
["ai","Mélangeur","Terminer un quiz mélange",()=>S.aiq>=1],
["chat","Curieux","Poser 5 questions à Nord",()=>S.chats>=5],
["s3","Régulier","3 jours d'affilée",()=>S.bestStreak>=3],
["s7","Discipliné","7 jours d'affilée",()=>S.bestStreak>=7],
["cards","Mémoire d'éléphant","50 cartes révisées",()=>S.reviews>=50],
["sim","Calculateur","Utiliser 3 simulateurs",()=>S.sims>=3],
["miss","Passage à l'action","Réaliser 3 missions",()=>Object.keys(S.missions).length>=3],
["half","Mi-parcours","La moitié des leçons",()=>Object.keys(S.done).length>=LESSONS.length/2],
["all","Diplômé Boussole","Toutes les leçons",()=>Object.keys(S.done).length>=LESSONS.length]];
function checkBadges(){BADGES.forEach(([id,n,,t])=>{if(!S.badges.includes(id)&&t()){S.badges.push(id);toast("Badge débloqué",n)}})}
function nextLesson(){if(S.profile&&S.profile.order){for(const sid of S.profile.order){const s=SBYID[sid];const l=s&&s.all.find(x=>!S.done[x.id]);if(l)return l}}for(const lv of LV)for(const s of SUBJ){const l=s.levels[lv.id].find(x=>!S.done[x.id]);if(l)return l}return null}
function unlockedCards(){const subs=new Set(["budget"]);LESSONS.forEach(l=>{if(S.done[l.id])subs.add(l.sub.id)});return GLOSS.filter(g=>subs.has(g.s))}
function dueCards(filter){const t=TODAY();const u=unlockedCards().filter(g=>!filter||g.s===filter);return u.filter(g=>S.cards[g.t]&&S.cards[g.t].due<=t).concat(u.filter(g=>!S.cards[g.t]).slice(0,10))}

/* ============================ SYNC (db) ============================ */
let dbRef=null,syncState="local";
async function initSync(){
  return;
  try{const[db,user]=await Promise.all([claude.use("db"),claude.use("user")]);if(!db||!user)return;const id=await user.id();if(!id)return;
    dbRef=db.doc("data/users/"+id+"/state");const snap=await dbRef.get();
    if(snap.exists){const r=snap.data();if(r&&r.state&&(r.updatedAt||0)>(S.updatedAt||0)){S=Object.assign(def(),r.state);try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}route();toast("Progression synchronisée")}else if((S.updatedAt||0)>(r&&r.updatedAt||0))pushRemote()}
    else if(S.updatedAt)pushRemote();
    syncState="cloud";
  }catch(e){dbRef=null;syncState="local"}
}
let pushing=false;
async function pushRemote(){if(!dbRef||pushing)return;pushing=true;try{await dbRef.set({state:JSON.parse(JSON.stringify(S)),updatedAt:S.updatedAt});syncState="cloud"}catch(e){if(e&&(e.code==="invalid_argument"||e.code==="revoked"||e.code==="not_granted"))dbRef=null;syncState="local"}pushing=false}

/* ============================ UTILS ============================ */
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const eur=(n,d=0)=>new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR",maximumFractionDigits:d,minimumFractionDigits:d}).format(n);
const pct=(n,d=1)=>Number(n).toLocaleString("fr-FR",{minimumFractionDigits:d,maximumFractionDigits:d})+" %";
const norm=s=>String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
const strip=h=>{const d=document.createElement("div");d.innerHTML=h;return d.textContent.replace(/\s+/g," ").trim()};
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function toast(t,sub){const el=document.createElement("div");el.className="toast";el.innerHTML=`<span class="x">✦</span><span>${esc(t)}${sub?` <span style="opacity:.6;font-weight:500">· ${esc(sub)}</span>`:""}</span>`;$("#toasts").appendChild(el);setTimeout(()=>el.remove(),3200)}
function applySub(s){const r=document.documentElement.style;if(!s){r.setProperty("--sc1","#2B5BFF");r.setProperty("--sc2","#0A1A5C");r.setProperty("--glow","#6F8DFF");return}r.setProperty("--sc1",s.c1);r.setProperty("--sc2",s.c2);r.setProperty("--glow",s.glow)}
const worldBg=s=>`radial-gradient(ellipse 75% 65% at 55% 42%, ${s.c1} 0%, ${s.c2} 55%, #050608 100%)`;
const IC={
home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
rev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>',
calc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/></svg>',
lib:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6z"/><path d="M12 6v14.5"/></svg>',
user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
play:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
pause:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
stop:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>',
left:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>',
right:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg>'};
const NAV=[["accueil","Sujets","home"],["revisions","Révisions","rev"],["simulateurs","Simulateurs","calc"],["bibliotheque","Bibliothèque","lib"],["profil","Profil","user"]];
function chrome(){
  const r=(location.hash.slice(1)||"accueil").split("-")[0];
  const act={sujet:"accueil",lecon:"accueil",quiz:"accueil",quizia:"accueil"}[r]||r;
  const due=dueCards().length;
  $("#links").innerHTML=NAV.map(([id,l])=>`<a href="#${id}" class="${act===id?"on":""}">${l}${id==="revisions"&&due?` <span class="mono" style="color:var(--glow)">${due}</span>`:""}</a>`).join("");
  $("#tabbar").innerHTML=NAV.map(([id,l,ic])=>`<a href="#${id}" class="${act===id?"on":""}">${IC[ic]}${l}</a>`).join("");
  $("#streakChip").textContent="🔥 "+liveStreak();
  $("#xpChip").textContent=S.xp+" XP · "+rank().name;
}

/* ============================ VOIX (synthèse vocale) ============================ */
const TTS={ok:"speechSynthesis" in window,voices:[],speaking:false,queue:[],onchunk:null,ondone:null,paused:false};
function loadVoices(){if(!TTS.ok)return;const all=speechSynthesis.getVoices();TTS.voices=all.filter(v=>/^fr/i.test(v.lang));const sel=$("#voiceSel");if(!sel)return;
  if(!TTS.voices.length){sel.innerHTML='<option>Voix du système</option>';return}
  const pref=/Google|Amélie|Amelie|Audrey|Thomas|Denise|Henri|Vivienne|Remy|Aurélie|Marie|Natural/i;
  if(!PREF.vname){const best=TTS.voices.find(v=>/Natural|Online/i.test(v.name))||TTS.voices.find(v=>pref.test(v.name))||TTS.voices[0];PREF.vname=best.name}
  sel.innerHTML=TTS.voices.map(v=>`<option value="${esc(v.name)}" ${v.name===PREF.vname?"selected":""}>${esc(v.name.replace(/Microsoft |Google |\(.*\)/g,"").trim()||v.name)}</option>`).join("")}
if(TTS.ok){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
function cleanSpeech(t){return String(t).replace(/\[\[[^\]]+\]\]/g,"").replace(/\*\*/g,"").replace(/[#*_`>]/g,"").replace(/€/g," euros").replace(/%/g," pour cent").replace(/→/g,", ").replace(/≈/g,"environ ").replace(/\s+/g," ").trim()}
function splitSent(t){const out=[];let buf="";t.split(/(?<=[.!?:;])\s+/).forEach(s=>{if((buf+" "+s).length>220&&buf){out.push(buf);buf=s}else buf=buf?buf+" "+s:s});if(buf)out.push(buf);return out}
function speakItems(items,{onchunk,ondone}={}){if(!TTS.ok)return false;stopSpeak();TTS.queue=items.map((x,i)=>({...x,i}));TTS.onchunk=onchunk;TTS.ondone=ondone;TTS.speaking=true;wave(true);nextSpeak();return true}
function nextSpeak(){if(!TTS.speaking)return;const it=TTS.queue.shift();if(!it){TTS.speaking=false;wave(false);const d=TTS.ondone;TTS.ondone=null;if(d)d();return}
  if(TTS.onchunk)TTS.onchunk(it);const parts=splitSent(cleanSpeech(it.text));let k=0;
  const sayNext=()=>{if(!TTS.speaking)return;if(k>=parts.length){nextSpeak();return}const u=new SpeechSynthesisUtterance(parts[k++]);u.lang="fr-FR";u.rate=PREF.rate;const v=TTS.voices.find(v=>v.name===PREF.vname);if(v)u.voice=v;u.onend=sayNext;u.onerror=sayNext;speechSynthesis.speak(u)};
  if(!parts.length)nextSpeak();else sayNext()}
function stopSpeak(){if(!TTS.ok)return;TTS.speaking=false;TTS.queue=[];TTS.paused=false;speechSynthesis.cancel();wave(false);$$(".reading").forEach(e=>e.classList.remove("reading"));const d=TTS.ondone;TTS.ondone=null;if(d)d()}
function say(text){if(!PREF.voice||!TTS.ok)return;speakItems([{text}])}
function wave(on){const w=$("#wave");if(w)w.classList.toggle("off",!on);$("#nordStatus")&&($("#nordStatus").textContent=on?"Nord parle…":"Ton guide finance")}

/* ============================ NORD (IA) ============================ */
let sample=null,sampleReady=false;
sample=null;sampleReady=true;$("#nordNote").textContent="Nord répond à partir des 50 leçons, du glossaire et des chiffres 2026. Il ne donne pas de conseil personnalisé.";
const N={turns:[],busy:false,ctl:null,opened:false};
const FACTS=MEMO.map(m=>`${m[1]} : ${m[2]}${m[3]?" ("+m[3]+")":""}`).join("; ");
const CATALOG=LESSONS.map(l=>`${l.id}=${l.title} [${l.sub.short}/${l.lvl.name}]`).join("; ");
function ctxText(){
  const h=(location.hash.slice(1)||"accueil").split("-");let c="Page actuelle : "+h[0]+".";
  if(h[0]==="lecon"){const l=POOL[h.slice(1).join("-")];if(l)c+=` L'élève lit la leçon « ${l.title} » (sujet ${l.sub.name}, niveau ${l.lvl.name}). Contenu : ${strip(l.body).slice(0,3500)}`}
  if(h[0]==="sujet"){const s=SBYID[h[1]];if(s)c+=` Sujet ouvert : ${s.name}.`}
  const p=S.profile;if(p)c+=` Profil déclaré : ${p.age||"?"} ans, ${p.situation}, revenus nets ${p.revenu||"?"} €/mois, dépenses ${p.depenses||"?"} €/mois, épargne ${p.epargne||"?"} €, objectifs : ${(p.goals||[]).join(", ")}, horizon ${p.horizon}, tolérance au risque ${p.risque}.`;
  c+=` Progression : ${Object.keys(S.done).length}/${LESSONS.length} leçons, ${S.xp} XP.`;
  return c}
function rules(){return `Tu es NORD, le guide IA du site d'apprentissage « Boussole Finance » (finance personnelle en France, septembre 2026). Tu parles en français, en tutoyant, ton décontracté mais précis, comme un grand frère qui s'y connaît. Ton but : faire COMPRENDRE (explique le pourquoi, avec des exemples chiffrés simples), puis vérifier la compréhension avec une petite question quand c'est utile.
Règles :
- Réponses courtes : 60 à 170 mots sauf si on te demande plus. Paragraphes courts, listes avec "- ", **gras** pour les mots clés. Pas de titres, pas de tableaux.
- Chiffres officiels à jour à utiliser en priorité (ne jamais contredire) : ${FACTS}.
- Si tu n'es pas sûr d'un chiffre ou qu'il a pu changer, dis-le et renvoie vers service-public.fr ou impots.gouv.fr.
- Tu n'es pas conseiller financier : pas de recommandation d'achat d'un titre précis ni de promesse de rendement. Tu peux expliquer les options et leurs critères.
- Pour proposer une leçon du site, écris [[lecon:ID]] ; un simulateur [[sim:ID]] (ids : ${SIMS.map(s=>s[0]).join(", ")}) ; un quiz [[quiz:SUJET-NIVEAU]] (sujets : ${SUBJ.map(s=>s.id).join(", ")} ; niveaux : debutant, intermediaire, expert). Maximum 3 liens par réponse, placés à la fin.
Catalogue des leçons (id=titre) : ${CATALOG}.
Contexte : ${ctxText()}`}
function md(t){const lines=esc(t).split(/\n/);let html="",inList=false;
  lines.forEach(line=>{const L=line.trim();if(/^[-•]\s+/.test(L)){if(!inList){html+="<ul>";inList=true}html+="<li>"+L.replace(/^[-•]\s+/,"")+"</li>"}else{if(inList){html+="</ul>";inList=false}if(L)html+="<p>"+L.replace(/^#+\s*/,"")+"</p>"}});
  if(inList)html+="</ul>";return html.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")}
function actsFrom(t){const acts=[];const re=/\[\[(lecon|sim|quiz|sujet):([a-z0-9-]+)\]\]/gi;let m;while((m=re.exec(t))){const k=m[1].toLowerCase(),v=m[2];
  if(k==="lecon"&&POOL[v])acts.push(`<a href="#lecon-${v}">📖 ${esc(POOL[v].title)}</a>`);
  if(k==="sim"){const s=SIMS.find(x=>x[0]===v);if(s)acts.push(`<a href="#simulateurs-${v}">🧮 ${esc(s[1])}</a>`)}
  if(k==="quiz"){const[a,b]=v.split("-");if(SBYID[a]&&LVBYID[b])acts.push(`<a href="#quiz-${a}-${b}">✎ Quiz ${esc(SBYID[a].short)} · ${esc(LVBYID[b].name)}</a>`)}
  if(k==="sujet"&&SBYID[v])acts.push(`<a href="#sujet-${v}">◎ ${esc(SBYID[v].name)}</a>`)}
  return [...new Set(acts)].slice(0,4)}
function addMsg(role,text){const el=document.createElement("div");el.className="msg "+role;if(role==="me")el.textContent=text;else renderAi(el,text);$("#msgs").appendChild(el);$("#msgs").scrollTop=1e9;return el}
function renderAi(el,text,done=true){const body=text.replace(/\[\[[^\]]*\]?\]?/g,"");const acts=done?actsFrom(text):[];el.innerHTML=md(body)+(acts.length?`<div class="acts">${acts.join("")}</div>`:"")+(done&&TTS.ok?`<button class="say" type="button">🔊 Écouter</button>`:"");const b=el.querySelector(".say");if(b)b.onclick=()=>speakItems([{text:body}]);el.querySelectorAll(".acts a").forEach(a=>a.addEventListener("click",()=>{if(innerWidth<760)closeNord()}))}
function suggestions(){const h=(location.hash.slice(1)||"accueil").split("-")[0];
  if(h==="lecon")return["Explique-moi ça plus simplement","Donne un exemple avec des chiffres","Quelle erreur éviter ?","Pose-moi une question pour vérifier"];
  if(h==="simulateurs")return["Comment lire ce simulateur ?","Combien je peux emprunter avec 2 000 € nets ?","C'est quoi un bon rendement locatif ?"];
  return["Par quoi je commence ?","PEA ou assurance-vie ?","C'est quoi un ETF, simplement ?","Je suis alternant, je fais quoi de mon salaire ?"]}
function renderSugg(){$("#sugg").innerHTML=suggestions().map(s=>`<button type="button">${esc(s)}</button>`).join("");$$("#sugg button").forEach(b=>b.onclick=()=>ask(b.textContent))}
function openNord(prompt){$("#drawer").classList.add("open");$("#scrim").classList.add("on");renderSugg();
  if(!N.opened){N.opened=true;const w=`Salut, moi c'est **Nord**, ton guide. Pose-moi n'importe quelle question sur l'argent : budget, livrets, bourse, PEA, immobilier, impôts, crypto. Je t'explique simplement, je peux te lire les cours à voix haute et te proposer des quiz. Tu veux commencer par quoi ?`;addMsg("ai",w);if(!prompt)say(w.replace(/\*\*/g,""))}
  if(prompt)ask(prompt);else setTimeout(()=>$("#nordIn").focus(),300)}
function closeNord(){$("#drawer").classList.remove("open");$("#scrim").classList.remove("on")}
const FAQ=[
[/pea.*(assurance|av)|(assurance|av).*pea/,"Les deux ne font pas la même chose :\n- **PEA** : pour investir en actions et ETF (européens ou éligibles). Après 5 ans, tes gains ne paient que 18,6 % de prélèvements sociaux. Plafond 150 000 €.\n- **Assurance-vie** : plus souple (fonds euros garanti + unités de compte), idéale pour des projets à 8 ans, la diversification et la transmission. Après 8 ans, abattement de 4 600 € par an sur l'impôt.\nPour faire grossir un capital en bourse sur le long terme, le PEA passe en premier. L'idéal : **ouvrir les deux tôt** pour prendre date.\n\n[[lecon:pea]] [[lecon:av]] [[lecon:combo]]"],
[/etf|tracker/,"Un **ETF**, c'est un panier tout fait : en achetant une seule part d'ETF MSCI World, tu possèdes un petit bout d'environ 1 400 entreprises dans le monde.\n- Frais très bas (0,1 à 0,4 % par an).\n- Diversification immédiate.\n- Pas besoin de choisir des actions.\nC'est la base de la stratégie « j'investis chaque mois et j'oublie ».\n\n[[lecon:etf]] [[lecon:dca]]"],
[/alternan|salaire|apprenti/,"Avec un salaire d'alternant, l'ordre qui marche :\n- **1.** Fais ton budget et programme un virement d'épargne le jour de la paie.\n- **2.** Vérifie ton droit au **LEP** (2,5 %), sinon Livret A (1,7 %). Vise 3 mois de dépenses.\n- **3.** Ton salaire d'apprenti est exonéré d'impôt jusqu'au SMIC annuel : déclare-toi quand même pour avoir un avis d'imposition.\n- **4.** Ouvre un **PEA** avec quelques euros pour démarrer les 5 ans, puis investis chaque mois sur un ETF monde.\n\n[[lecon:plan]] [[lecon:impotsetudiant]] [[lecon:livrets]]"],
[/emprunt|credit immo|capacite/,"Règle des banques : ta mensualité (assurance comprise) ne doit pas dépasser **35 %** de tes revenus nets, sur **25 ans** maximum. Avec 2 000 € nets, ça fait 700 € par mois au plus. À 3,5 % sur 20 ans, ça correspond à environ 120 000 € empruntés.\n\n[[sim:credit]] [[lecon:credit]]"]];
const SIMHELP={ic:"Il montre comment ton capital grossit avec les intérêts composés : capital de départ, versement mensuel, rendement, durée. La courbe grise = ce que tu as versé, la bleue = ce que tu as au final. L'écart, ce sont les intérêts.",budget:"Tu entres ton revenu et tes dépenses : il compare ta répartition à la règle 50/30/20 et calcule ton épargne de précaution cible.",objectif:"Tu fixes un montant et une date : il calcule combien mettre de côté chaque mois.",credit:"Il calcule ta mensualité (assurance comprise), ton taux d'endettement (max 35 %), le coût total du crédit et ce que tu peux emprunter au maximum.",louer:"Il compare deux scénarios : acheter, ou louer et investir la différence. La courbe la plus haute à la fin est le plus avantageux avec tes hypothèses.",loc:"Il calcule le rendement brut, le rendement net de charges et le cash-flow mensuel d'un investissement locatif, avant impôt.",fisc:"Il compare l'impôt payé sur un même gain selon l'enveloppe : CTO, PEA avant ou après 5 ans, assurance-vie avant ou après 8 ans.",fire:"Il calcule le capital à atteindre pour vivre de tes placements (dépenses ÷ taux de retrait) et en combien d'années tu y arrives."};
function offline(q){const n=norm(q);
  const fq=FAQ.find(f=>f[0].test(n));if(fq)return fq[1];
  const quizQ=ALLQ.find(x=>n.includes(norm(x.q).slice(0,40)));
  if(quizQ)return `**Bonne réponse : ${quizQ.a[quizQ.c]}**\n${quizQ.e}\n\nPour revoir la notion : [[lecon:${quizQ.lesson.id}]]`;
  const les=LESSONS.find(l=>n.includes(norm(l.title)));
  if(les){
    if(n.includes("mots cles")){const t=strip(les.body).toLowerCase();const terms=GLOSS.filter(g=>norm(t).includes(norm(g.t)));return (terms.length?`Les mots clés de « ${les.title} » :\n`+terms.slice(0,8).map(g=>`- **${g.t}** : ${g.d}`).join("\n"):"Pas de mot du glossaire dans cette leçon.")+`\n\n[[quiz:${les.sub.id}-${les.lvl.id}]]`}
    const d=document.createElement("div");d.innerHTML=les.body;const ex=d.querySelector(".ex");
    return `L'essentiel de **${les.title}** :\n`+les.keys.map(k=>"- "+k).join("\n")+(ex?`\n\n**Exemple** : ${ex.textContent.replace(/^[A-ZÉÈa-zéè' ]+?(?=[A-Z0-9])/,"").trim()}`:"")+`\n\n[[lecon:${les.id}]] [[quiz:${les.sub.id}-${les.lvl.id}]]`}
  const sb=SUBJ.find(s=>n.includes(norm(s.name)));
  if(sb)return `Pour **${sb.name}**, commence par le niveau débutant :\n`+sb.levels.debutant.map(l=>`- **${l.title}** : ${l.keys[0]}`).join("\n")+`\n\n`+sb.levels.debutant.slice(0,3).map(l=>`[[lecon:${l.id}]]`).join(" ");
  const sm=SIMS.find(s=>n.includes(norm(s[1])));if(sm)return SIMHELP[sm[0]];
  if(/commence|debut|par quoi/.test(n))return "Commence par les bases, dans cet ordre :\n- **Faire un budget** : savoir combien tu peux mettre de côté.\n- **L'épargne de précaution** : 3 à 6 mois de dépenses sur un livret.\n- **Les livrets** : où mettre cet argent en 2026.\nEnsuite, passe au PEA et à la bourse.\n\n[[lecon:budget]] [[lecon:precaution]] [[lecon:livrets]]";
  const words=n.split(/[^a-z0-9]+/).filter(w=>w.length>3&&!["quoi","comment","pourquoi","cest","faire","faut","dois","quel","quelle","entre","avec","pour","sont","mon","mes"].includes(w));
  const score=t=>words.reduce((a,w)=>a+(t.includes(w)?1:0),0);
  const g=GLOSS.map(x=>({x,s:score(norm(x.t+" "+x.d))*2+(n.includes(norm(x.t))?6:0)})).filter(r=>r.s>0).sort((a,b)=>b.s-a.s).slice(0,3);
  const l=LESSONS.map(x=>({x,s:score(norm(x.title+" "+x.keys.join(" ")))*2+score(norm(strip(x.body)))*.3})).filter(r=>r.s>0).sort((a,b)=>b.s-a.s).slice(0,3);
  let t="";if(g.length)t+="Voici ce que disent les cours :\n"+g.map(r=>`- **${r.x.t}** : ${r.x.d}`).join("\n")+"\n";
  if(l.length&&l[0].s>=1){const top=l[0].x;t+=`\nL'essentiel de « ${top.title} » :\n`+top.keys.map(k=>"- "+k).join("\n")+"\n\n"+l.map(r=>`[[lecon:${r.x.id}]]`).join(" ")}
  return t||"Je n'ai rien trouvé de précis dans les cours. Essaie avec un mot clé (PEA, crédit, LEP, ETF…) ou la recherche (touche /)."}
async function ask(q){q=String(q||"").trim();if(!q||N.busy)return;$("#nordIn").value="";addMsg("me",q);N.turns.push({role:"user",content:q});S.chats++;checkBadges();save();
  const el=addMsg("ai","");el.innerHTML='<div class="thinking"><i></i><i></i><i></i></div>';
  if(!sampleReady)await new Promise(r=>{const t=setInterval(()=>{if(sampleReady){clearInterval(t);r()}},100)});
  if(!sample){await new Promise(r=>setTimeout(r,350));const t=offline(q);renderAi(el,t);N.turns.push({role:"assistant",content:t});if(PREF.voice)speakItems([{text:t.replace(/\[\[[^\]]+\]\]/g,"")}]);return}
  N.busy=true;N.ctl=new AbortController();
  const hist=N.turns.slice(-12);while(hist.length&&hist[0].role!=="user")hist.shift();
  try{const{text}=await sample([{role:"user",content:rules()},...hist],{cache:false,signal:N.ctl.signal,onText:({text})=>{renderAi(el,text,false);$("#msgs").scrollTop=1e9}});
    renderAi(el,text);N.turns.push({role:"assistant",content:text});if(PREF.voice)speakItems([{text:text.replace(/\[\[[^\]]+\]\]/g,"")}])}
  catch(e){const code=e&&e.code;
    if(code==="not_granted"||code==="sampling_disabled"||code==="not_declared"||code==="capability_disabled"){sample=null;renderAi(el,offline(q));$("#nordNote").textContent="IA non autorisée : Nord répond à partir des cours."}
    else if(code==="cancelled"){renderAi(el,(e.text||"")+"\n\n(arrêté)")}
    else if(code==="rate_limited")renderAi(el,(e.text?e.text+"\n\n":"")+"J'ai atteint une limite d'utilisation. Réessaie dans un moment.");
    else if(code==="refused"){el.innerHTML="<p>Je ne peux pas répondre à ça. Reformule ta question autrement.</p>"}
    else renderAi(el,(e&&e.text?e.text+"\n\n":"")+"La connexion a coupé. Tu peux reposer la question.");
    N.turns.pop()}
  N.busy=false}
$("#nordBtn").onclick=()=>openNord();$("#nordClose").onclick=closeNord;$("#scrim").onclick=closeNord;
$("#nordForm").onsubmit=e=>{e.preventDefault();ask($("#nordIn").value)};
$("#nordIn").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();ask($("#nordIn").value)}});
$("#voiceOn").checked=PREF.voice;$("#voiceOn").onchange=e=>{PREF.voice=e.target.checked;savePref();if(!PREF.voice)stopSpeak()};
$("#voiceRate").value=PREF.rate;$("#voiceRate").oninput=e=>{PREF.rate=+e.target.value;savePref()};
$("#voiceSel").onchange=e=>{PREF.vname=e.target.value;savePref();say("Voilà ma nouvelle voix.")};
$("#stopVoice").onclick=()=>{stopSpeak();if(N.ctl)N.ctl.abort()};
if(!TTS.ok){$("#voiceOn").closest(".dset").innerHTML='<span>La synthèse vocale n\'est pas disponible dans ce navigateur.</span>'}

/* ============================ QUIZ ENGINE ============================ */
let Q=null;
function startQuiz(box,items,opts){Q=Object.assign({items:items.map(q=>({...q,_o:shuffle(q.a.map((_,i)=>i))})),i:0,res:[],box},opts);renderQuiz()}
function renderQuiz(){if(!Q)return;const box=Q.box;if(!box||!document.body.contains(box))return;
  if(Q.i>=Q.items.length)return renderResult();
  const q=Q.items[Q.i],ans=Q.res[Q.i];
  box.innerHTML=`<div class="quiz"><div class="qhead"><span class="eyebrow">${esc(Q.title||"Quiz")} · ${Q.i+1}/${Q.items.length}</span><div class="qdots">${Q.items.map((_,i)=>`<i class="${Q.res[i]?(Q.res[i].ok?"ok":"ko"):i===Q.i?"cur":""}"></i>`).join("")}</div></div>
  <p class="qq">${esc(q.q)}</p><div style="display:grid;gap:8px">${q._o.map((oi,k)=>{let c="";if(ans){if(oi===q.c)c="ok";else if(oi===ans.pick)c="ko"}return `<button class="opt ${c}" data-oi="${oi}" ${ans?"disabled":""}><span class="k">${"ABCD"[k]}</span><span>${esc(q.a[oi])}</span></button>`}).join("")}</div>
  ${ans?`<div class="expl"><b style="color:${ans.ok?"var(--good)":"var(--bad)"}">${ans.ok?"Bonne réponse":"Pas tout à fait"}</b>${esc(q.e||"")}</div><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><button class="btn ghost sm" id="qWhy" type="button">Nord, explique-moi</button><button class="btn sm" id="qNext" type="button">${Q.i+1<Q.items.length?"Suivante →":"Résultat"}</button></div>`:""}</div>`;
  box.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const oi=+b.dataset.oi,ok=oi===q.c;Q.res[Q.i]={pick:oi,ok};
    if(q.id){if(ok)S.wrong=S.wrong.filter(x=>x!==q.id);else if(!S.wrong.includes(q.id))S.wrong.push(q.id)}touchDay();save();renderQuiz()});
  const n=$("#qNext");if(n){n.onclick=()=>{Q.i++;renderQuiz()};n.focus({preventScroll:true})}
  const w=$("#qWhy");if(w)w.onclick=()=>openNord(`Dans un quiz, la question était : « ${q.q} ». J'ai répondu « ${q.a[ans.pick]} » et la bonne réponse est « ${q.a[q.c]} ». Explique-moi pourquoi, simplement.`)}
function renderResult(){const box=Q.box,good=Q.res.filter(r=>r&&r.ok).length,tot=Q.items.length,ratio=good/tot;
  const r=Q.onDone?Q.onDone(good,tot):{};
  box.innerHTML=`<div class="result"><span class="eyebrow">${esc(Q.title||"Résultat")}</span><div class="score" style="color:${ratio>=.8?"var(--good)":ratio>=.5?"var(--warn)":"var(--bad)"}">${good}/${tot}</div><p class="muted" style="max-width:44ch">${esc(r.msg||(ratio===1?"Parfait !":ratio>=.8?"Très bien, niveau validé.":ratio>=.5?"Pas mal. Les erreurs sont dans ta pile de révision.":"Relis les leçons de ce niveau, puis retente."))}</p><div class="pills" style="justify-content:center;margin-top:6px">${r.actions||""}<button class="btn ghost sm" id="qRetry" type="button">Recommencer</button></div></div>`;
  $("#qRetry").onclick=()=>{Q.items=shuffle(Q.items).map(q=>({...q,_o:shuffle(q.a.map((_,i)=>i))}));Q.i=0;Q.res=[];renderQuiz()};
  if(r.after)r.after()}
async function aiQuiz(box,sub,lv,n=5){
  box.innerHTML=`<div class="empty"><div class="orb" style="width:56px;height:56px"></div><h3 style="font-size:20px">Nord prépare ${n} questions…</h3><p class="muted">Niveau ${esc(LVBYID[lv].name)} · ${sub?esc(sub.name):"tous sujets"}. Ça peut prendre jusqu'à une minute.</p><button class="btn ghost sm" id="aiStop" type="button">Annuler</button></div>`;
  if(!sampleReady)await new Promise(r=>{const t=setInterval(()=>{if(sampleReady){clearInterval(t);r()}},100)});
  if(!sample){const pool=shuffle((sub?sub.levels[lv]:SUBJ.flatMap(s=>s.levels[lv])).flatMap(l=>l.quiz)).slice(0,10);startQuiz(box,pool,{title:`Quiz mélange · ${sub?sub.short:"Mix"} · ${LVBYID[lv].name}`,onDone:(g,t)=>{S.aiq++;addXP(g*5,"Quiz mélange");return{actions:`<button class="btn sm glow" id="aiMore" type="button">Nouveau mélange</button>`,after:()=>{$("#aiMore").onclick=()=>aiQuiz(box,sub,lv,n)}}}});return}
  if(false){box.innerHTML=`<div class="empty"><h3 style="font-size:20px">Le quiz IA a besoin de Claude</h3><p class="muted" style="max-width:48ch">Ouvre cette page dans l'app Claude (connecté) et autorise-la à utiliser Claude. En attendant, voici le quiz classique du niveau.</p><a class="btn sm" href="#quiz-${sub?sub.id:"all"}-${lv}">Quiz classique</a></div>`;return}
  const ctl=new AbortController();$("#aiStop").onclick=()=>ctl.abort();
  const src=(sub?sub.levels[lv]:SUBJ.flatMap(s=>s.levels[lv])).map(l=>`## ${l.title}\n${strip(l.body)}`).join("\n\n").slice(0,24000);
  const diff={debutant:"débutant : définitions et notions de base, formulations simples",intermediaire:"intermédiaire : mécanismes, petits calculs, comparaisons",expert:"expert : cas pratiques chiffrés, fiscalité fine, pièges, raisonnements en plusieurs étapes"}[lv];
  const prompt=`Crée ${n} questions QCM NOUVELLES en français, niveau ${diff}, à partir UNIQUEMENT des cours ci-dessous et de ces chiffres officiels 2026 : ${FACTS}.
Chaque question a exactement 4 réponses plausibles dont une seule correcte, et une explication de 1 à 2 phrases. Varie la position de la bonne réponse. N'invente aucun chiffre absent du contexte. Tutoiement.
Réponds uniquement avec un tableau JSON : [{"q":"question","a":["r1","r2","r3","r4"],"c":0,"e":"explication"}] (c = index de la bonne réponse, 0 à 3).
Graine de variété : ${Date.now()%9973}.

COURS :
${src}`;
  try{const arr=await sample.json(prompt,{signal:ctl.signal,cache:false});
    const items=(Array.isArray(arr)?arr:[]).filter(x=>x&&typeof x.q==="string"&&Array.isArray(x.a)&&x.a.length===4&&Number.isInteger(+x.c)&&+x.c>=0&&+x.c<4).map(x=>({q:String(x.q),a:x.a.map(String),c:+x.c,e:String(x.e||"")}));
    if(!items.length)throw{code:"invalid_json"};
    startQuiz(box,items,{title:`Quiz IA · ${sub?sub.short:"Mix"} · ${LVBYID[lv].name}`,onDone:(g,t)=>{S.aiq++;addXP(g*6,"Quiz IA");return{actions:`<button class="btn sm glow" id="aiMore" type="button">5 nouvelles questions</button>`,after:()=>{$("#aiMore").onclick=()=>aiQuiz(box,sub,lv,n)}}}})}
  catch(e){if(e&&e.code==="cancelled"){box.innerHTML=`<div class="empty"><p class="muted">Quiz annulé.</p><button class="btn sm" id="aiAgain" type="button">Relancer</button></div>`;$("#aiAgain").onclick=()=>aiQuiz(box,sub,lv,n);return}
    if(e&&(e.code==="not_granted"||e.code==="sampling_disabled"))sample=null;
    box.innerHTML=`<div class="empty"><h3 style="font-size:20px">Le quiz n'a pas pu être généré</h3><p class="muted">${e&&e.code==="rate_limited"?"Limite d'utilisation atteinte, réessaie plus tard.":"Réessaie, ou lance le quiz classique."}</p><div class="pills" style="justify-content:center"><button class="btn sm" id="aiAgain" type="button">Réessayer</button><a class="btn ghost sm" href="#quiz-${sub?sub.id:"all"}-${lv}">Quiz classique</a></div></div>`;$("#aiAgain").onclick=()=>aiQuiz(box,sub,lv,n)}}

/* ============================ VUES ============================ */
if(window.BSL_3D.ok){try{window.BSL_3D.init(SUBJ)}catch(e){console.error(e);window.BSL_3D.ok=false}}
let cur=0; // index sujet actif sur l'accueil
try{cur=+(localStorage.getItem(KEY+".cur")||0)||0}catch(e){}
const TICK=MEMO.filter((_,i)=>i%2===0||i<6).map(m=>`<span class="tk"><span>${esc(m[1])}</span><b>${esc(m[2])}</b><i>${esc(m[3])}</i></span>`).join("");

function worldHTML(s,mode){
  return `<section class="world ${mode==="single"?"sm":""}" id="world"><div class="bgl" style="background:${worldBg(s)}"></div><div class="grain"></div>
  <div class="wghost" id="ghost">${esc(s.short)}</div><div id="glhost" style="position:absolute;inset:0;z-index:1">${window.BSL_3D.ok?"":'<div class="fallback-orb"></div>'}</div>
  <div class="w-ui" id="wui"></div></section>`}
function mount3D(mode,idx){const h=$("#glhost");if(h&&window.BSL_3D.ok){window.BSL_3D.mount(h,mode,idx)}}
function lvPills(s){return `<div class="lvlpills">${LV.map(lv=>`<span class="lvlpill">${lv.name} <b>${lvlDone(s,lv.id)}/${s.levels[lv.id].length}</b></span>`).join("")}</div>`}
function homeUI(){const s=SUBJ[cur];
  $("#wui").innerHTML=`<div class="w-top"><div><span class="eyebrow" style="color:rgba(255,255,255,.75)">Choisis ton sujet</span><div class="counter" style="margin-top:6px"><b>${String(cur+1).padStart(2,"0")}</b> / ${String(SUBJ.length).padStart(2,"0")}</div></div>${lvPills(s)}</div>
  <div class="w-bottom"><div><h1 class="w-name">${esc(s.name)}</h1><p class="w-tag">${esc(s.tagline)} ${s.all.length} leçons, 3 niveaux, quiz illimités.</p><div class="w-cta"><a class="btn" href="#sujet-${s.id}">Entrer dans le sujet →</a><a class="btn glass" href="#quiz-${s.id}-debutant">Quiz rapide</a></div></div>
  <div style="display:flex;flex-direction:column;gap:14px;align-items:flex-end"><div class="ctrl"><button class="arrow" id="prev" type="button" aria-label="Sujet précédent">${IC.left}</button><button class="arrow" id="next" type="button" aria-label="Sujet suivant">${IC.right}</button></div><div class="dots">${SUBJ.map((x,i)=>`<button type="button" class="${i===cur?"on":""}" data-i="${i}" aria-label="${esc(x.name)}"></button>`).join("")}</div></div></div>`;
  $("#prev").onclick=()=>goSub(cur-1);$("#next").onclick=()=>goSub(cur+1);$$(".dots button").forEach(b=>b.onclick=()=>goSub(+b.dataset.i))}
function goSub(i){cur=(i+SUBJ.length)%SUBJ.length;try{localStorage.setItem(KEY+".cur",cur)}catch(e){}const s=SUBJ[cur];applySub(s);
  const w=$("#world");if(!w)return;const layer=document.createElement("div");layer.className="bgl";layer.style.background=worldBg(s);layer.style.opacity="0";w.insertBefore(layer,w.querySelector(".grain"));requestAnimationFrame(()=>{layer.style.opacity="1"});setTimeout(()=>{$$("#world .bgl").slice(0,-1).forEach(x=>x.remove())},1100);
  const g=$("#ghost");g.style.opacity="0";setTimeout(()=>{g.textContent=s.short;g.style.opacity="1"},250);
  if(window.BSL_3D.ok)window.BSL_3D.setActive(cur);homeUI()}

function vAccueil(){const s=SUBJ[cur];applySub(s);const nx=nextLesson();const done=Object.keys(S.done).length;
  const dq=ALLQ[Math.abs([...TODAY()].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7))%ALLQ.length];const dA=S.daily[TODAY()];
  return worldHTML(s,"carousel")+`<div class="ticker" aria-label="Chiffres clés 2026"><div class="ticker-track">${TICK}${TICK}</div></div>
  <div class="page">
    <section class="promo"><div><span class="eyebrow" style="color:var(--glow)">Guide vocal</span><h2 style="margin-top:10px">Nord t'explique tout, à voix haute</h2><p>Pose une question avec tes mots : Nord cherche dans les 50 leçons et le glossaire, te résume l'essentiel, te lit les cours à voix haute et t'envoie vers la bonne leçon.</p><div class="pills" style="margin-top:22px"><button class="btn glow" id="tour" type="button">▶ Lancer la visite guidée</button><button class="btn ghost" id="askNord" type="button">Poser une question</button></div></div><div class="bigorb" aria-hidden="true"></div></section>
    <div class="grid g4"><div class="stat"><b>${done}<span style="font-size:16px;color:var(--muted)">/${LESSONS.length}</span></b><span>Leçons terminées</span></div><div class="stat"><b>${S.xp}</b><span>XP · ${esc(rank().name)}</span></div><div class="stat"><b>${liveStreak()} j</b><span>Série en cours</span></div><a class="stat" href="#revisions" style="text-decoration:none;color:inherit"><b style="color:var(--glow)">${dueCards().length}</b><span>Cartes à réviser</span></a></div>
    ${nx?`<a class="qcard" href="#lecon-${nx.id}" style="--glow:${nx.sub.glow};--sc1:${nx.sub.c1};padding:22px 24px"><span class="ic">▶</span><span style="min-width:0"><small class="eyebrow">${done?"Reprendre":"Commencer"} · ${esc(nx.sub.name)} · ${esc(nx.lvl.name)}</small><b style="font-size:20px;font-family:var(--f-display);text-transform:uppercase;letter-spacing:-.02em;margin-top:4px">${esc(nx.title)}</b></span><span class="mono muted" style="margin-left:auto">${nx.min} min</span></a>`:""}
    <section style="display:flex;flex-direction:column;gap:20px"><div class="sh"><div><h2>Tous les sujets</h2><p>${LESSONS.length} leçons, ${ALLQ.length} questions de quiz, et un nombre illimité de questions générées par Nord.</p></div></div>
    <div class="grid g4">${SUBJ.map((x,i)=>`<a class="stile" href="#sujet-${x.id}" style="--c1:${x.c1};--c2:${x.c2}"><div class="num"><span>${String(i+1).padStart(2,"0")}</span><span>${subDone(x)}/${x.all.length}</span></div><div><h3>${esc(x.name)}</h3><p>${esc(x.tagline)}</p><div class="pbar"><i style="width:${subDone(x)/x.all.length*100}%"></i></div></div></a>`).join("")}</div></section>
    <section style="display:flex;flex-direction:column;gap:20px"><div class="sh"><div><h2>Quiz par niveau</h2><p>Tous sujets confondus. Choisis ta difficulté.</p></div></div>
    <div class="grid g3">${LV.map(lv=>`<div class="panel" style="display:flex;flex-direction:column;gap:14px"><div style="display:flex;justify-content:space-between;align-items:center"><span class="eyebrow">Niveau ${lv.n}</span><span class="mono muted" style="font-size:12px">${S.best["all-"+lv.id]!=null?"Record "+Math.round(S.best["all-"+lv.id]*100)+" %":""}</span></div><h3 style="font-size:24px;text-transform:uppercase">${lv.name}</h3><p class="muted" style="font-size:14px">${lv.desc}</p><div class="pills"><a class="btn sm" href="#quiz-all-${lv.id}">Quiz 10 questions</a><a class="btn ghost sm" href="#quizia-all-${lv.id}">✦ Quiz mélange</a></div></div>`).join("")}</div></section>
    <section class="grid g2"><div class="panel"><span class="eyebrow">Question du jour · +15 XP</span><p class="qq" style="margin-top:10px;font-size:19px">${esc(dq.q)}</p><div style="display:grid;gap:8px;margin-top:14px" id="dOpts">${dq.a.map((a,i)=>{let c="";if(dA!=null){if(i===dq.c)c="ok";else if(i===dA)c="ko"}return `<button class="opt ${c}" data-i="${i}" ${dA!=null?"disabled":""}><span class="k">${"ABCD"[i]}</span><span>${esc(a)}</span></button>`}).join("")}</div>${dA!=null?`<div class="expl" style="margin-top:10px">${esc(dq.e)}</div>`:""}</div>
    <div class="panel" style="display:flex;flex-direction:column;gap:12px"><span class="eyebrow">Ce qui se fait tout seul</span>
      <div class="step"><span class="i">1</span><span>Chaque erreur de quiz part dans ta pile <a href="#quiz-erreurs-all">« Mes erreurs »</a> (${S.wrong.length} en attente).</span></div>
      <div class="step"><span class="i">2</span><span>Les flashcards d'un sujet se débloquent à ta première leçon, puis reviennent à 1, 3, 7, 16 et 35 jours.</span></div>
      <div class="step"><span class="i">3</span><span>Le quiz mélange pioche au hasard dans les questions de ton niveau, à l'infini.</span></div>
      <div class="step"><span class="i">4</span><span>${syncState==="cloud"?"Ta progression est synchronisée sur ton compte.":"Ta progression est sauvegardée automatiquement."}</span></div></div></section>
    <p class="disclaimer">Boussole est un outil pédagogique, pas un conseil en investissement personnalisé. Chiffres à jour fin septembre 2026 : ils évoluent, vérifie-les sur service-public.fr ou impots.gouv.fr avant toute décision.</p>
  </div>`}
function bindAccueil(){homeUI();mount3D("carousel",cur);
  const h=$("#glhost");let sx=null;h.addEventListener("pointerdown",e=>{sx=e.clientX});h.addEventListener("pointerup",e=>{if(sx==null)return;const dx=e.clientX-sx;sx=null;if(Math.abs(dx)>45)goSub(cur+(dx<0?1:-1))});
  $("#tour").onclick=tour;$("#askNord").onclick=()=>openNord();
  const dq=ALLQ[Math.abs([...TODAY()].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7))%ALLQ.length];
  $$("#dOpts .opt").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;S.daily[TODAY()]=i;if(i===dq.c)addXP(15,"Question du jour");else{if(!S.wrong.includes(dq.id))S.wrong.push(dq.id);touchDay();save()}route()})}
function tour(){openNord();const steps=[
  `Bienvenue sur Boussole ! Je vais te faire le tour en trente secondes.`,
  `Le site est organisé en huit sujets : budget et banque, épargne, impôts, bourse, PEA et enveloppes, immobilier, or et crypto, et enfin stratégie et économie. Tu les fais défiler en haut de la page, comme des produits en vitrine.`,
  `Chaque sujet a trois niveaux : débutant, intermédiaire et expert. Chaque niveau a ses leçons et son quiz. Et si tu veux t'entraîner encore, je peux générer des questions nouvelles à l'infini.`,
  `Dans chaque leçon, appuie sur lecture pour que je te la lise à voix haute. Tu peux aussi me demander de réexpliquer autrement, ou de donner un exemple avec des chiffres.`,
  `Les révisions reviennent toutes seules grâce aux flashcards, et les simulateurs te permettent de calculer un crédit, un investissement locatif ou tes intérêts composés.`,
  `Mon conseil pour démarrer : commence par Budget et Banque, niveau débutant. Et si tu as une question, écris-la moi en bas.`];
  const m=addMsg("ai","");let i=0;const txt=[];
  const show=()=>{m.innerHTML=md(txt.join("\n"))+`<div class="acts"><a href="#sujet-budget">◎ Budget & Banque</a><a href="#profil">✎ Créer mon plan perso</a></div>`;$("#msgs").scrollTop=1e9};
  if(PREF.voice&&TTS.ok){speakItems(steps.map(t=>({text:t})),{onchunk:it=>{txt.push(steps[it.i]);show()}})}else{steps.forEach(t=>txt.push(t));show()}}

/* ---------- sujet ---------- */
function vSujet(id,lvId){const s=SBYID[id];if(!s)return vAccueil();applySub(s);const lv=LVBYID[lvId]||LV.find(l=>lvlDone(s,l.id)<s.levels[l.id].length)||LV[0];
  const idx=SUBJ.indexOf(s);cur=idx;
  const terms=GLOSS.filter(g=>g.s===s.id);const res=RES.filter(r=>r.s.includes(s.id)).slice(0,6);const miss=MISS.filter(m=>m.s===s.id);
  const list=s.levels[lv.id];
  return worldHTML(s,"single")+`<div class="page tight">
  <div class="ltabs" role="tablist">${LV.map(l=>{const d=lvlDone(s,l.id),t=s.levels[l.id].length;return `<a class="ltab ${l.id===lv.id?"on":""}" href="#sujet-${s.id}-${l.id}" role="tab" style="text-decoration:none;color:inherit"><span class="bars">${[1,2,3].map(k=>`<i class="${k<=l.n?"f":""}"></i>`).join("")}</span><span><b>${l.name}</b><small>${d}/${t} leçons${S.best[s.id+"-"+l.id]!=null?" · quiz "+Math.round(S.best[s.id+"-"+l.id]*100)+" %":""}</small></span></a>`}).join("")}</div>
  <section style="display:flex;flex-direction:column;gap:6px"><p class="muted" style="margin-bottom:8px">${esc(lv.desc)}</p>
  ${list.map((l,i)=>`<a class="lrow ${S.done[l.id]?"done":""}" href="#lecon-${l.id}"><span class="n">${S.done[l.id]?"✓":String(i+1).padStart(2,"0")}</span><span style="min-width:0"><span class="t">${esc(l.title)}</span><br><span class="d">${l.min} min · ${l.quiz.length} questions · ${esc(l.keys[0])}</span></span><span class="go">${S.done[l.id]?S.done[l.id].score+"/"+l.quiz.length:"Lire →"}</span></a>`).join("")}</section>
  <section class="qcards"><a class="qcard" href="#quiz-${s.id}-${lv.id}"><span class="ic">${lv.n}</span><span><b>Quiz ${esc(lv.name)}</b><small>${list.reduce((a,l)=>a+l.quiz.length,0)} questions · valide le niveau à 80 %</small></span></a><a class="qcard" href="#quizia-${s.id}-${lv.id}"><span class="ic">✦</span><span><b>Quiz mélange</b><small>10 questions au hasard, niveau ${esc(lv.name.toLowerCase())}</small></span></a></section>
  ${miss.length?`<section style="display:flex;flex-direction:column;gap:12px"><div class="sh"><h2 style="font-size:22px">Passer à l'action</h2></div>${miss.map(m=>`<button class="mission ${S.missions[m.id]?"on":""}" data-m="${m.id}" type="button"><span class="cb">${S.missions[m.id]?"✓":""}</span><span class="t">${esc(m.t)}</span><span class="xp">+${m.xp} XP</span></button>`).join("")}</section>`:""}
  <section style="display:flex;flex-direction:column;gap:14px"><div class="sh"><h2 style="font-size:22px">Vocabulaire du sujet</h2><a href="#bibliotheque-glossaire" class="muted">Tout le glossaire →</a></div><div class="glgrid">${terms.slice(0,8).map(g=>`<div class="gterm"><h4>${esc(g.t)}</h4><p>${esc(g.d)}</p></div>`).join("")}</div></section>
  ${res.length?`<section style="display:flex;flex-direction:column;gap:14px"><div class="sh"><h2 style="font-size:22px">Ressources pour aller plus loin</h2><a href="#bibliotheque" class="muted">Bibliothèque →</a></div><div class="grid g3">${res.map(resCard).join("")}</div></section>`:""}
  </div>`}
function sujetUI(s){$("#wui").innerHTML=`<div class="w-top"><div class="crumbs"><a href="#accueil">Sujets</a> / <span>${esc(s.name)}</span></div>${lvPills(s)}</div><div class="w-bottom"><div><span class="eyebrow" style="color:rgba(255,255,255,.75)">Sujet ${String(SUBJ.indexOf(s)+1).padStart(2,"0")} · ${s.all.length} leçons</span><h1 class="w-name" style="margin-top:10px">${esc(s.name)}</h1><p class="w-tag">${esc(s.tagline)}</p><div class="w-cta">${(()=>{const n=s.all.find(l=>!S.done[l.id]);return n?`<a class="btn" href="#lecon-${n.id}">${subDone(s)?"Continuer":"Commencer"} : ${esc(n.title)} →</a>`:`<a class="btn" href="#quizia-${s.id}-expert">Défi niveau expert →</a>`})()}<button class="btn glass" id="askSub" type="button">Demander à Nord</button></div></div></div>`;
  $("#askSub").onclick=()=>openNord(`Fais-moi un résumé en 5 points de ce qu'il faut savoir sur « ${s.name} » quand on débute, puis dis-moi par quelle leçon commencer.`)}
function bindMissions(){$$("[data-m]").forEach(b=>b.onclick=()=>{const m=MISS.find(x=>x.id===b.dataset.m);if(S.missions[m.id]){delete S.missions[m.id];S.xp=Math.max(0,S.xp-m.xp);save();chrome()}else{S.missions[m.id]=TODAY();addXP(m.xp,"Mission accomplie")}route(true)})}

/* ---------- leçon ---------- */
function vLecon(id){const l=POOL[id];if(!l||!l.sub)return vAccueil();const s=l.sub;applySub(s);
  const seq=s.all,i=seq.indexOf(l),nx=seq[i+1],pv=seq[i-1];
  return `<header class="lhead"><div class="in"><div class="crumbs"><a href="#accueil">Sujets</a> / <a href="#sujet-${s.id}">${esc(s.name)}</a> / <a href="#sujet-${s.id}-${l.lvl.id}">${esc(l.lvl.name)}</a></div><h1>${esc(l.title)}</h1><div class="lmeta"><span class="chip">${l.min} min</span><span class="chip">${esc(l.lvl.name)}</span><span class="chip">${l.quiz.length} questions</span>${S.done[l.id]?`<span class="chip" style="color:var(--good)">✓ Terminée ${S.done[l.id].score}/${l.quiz.length}</span>`:`<span class="chip" style="color:var(--warn)">+${30+l.quiz.length*10} XP</span>`}</div></div></header>
  <div class="page tight"><div class="lbody"><div style="display:flex;flex-direction:column;gap:28px;min-width:0"><article class="prose" id="prose">${l.body}</article>
  <div class="keys" id="keys"><h3>À retenir</h3><ul>${l.keys.map(k=>`<li>${esc(k)}</li>`).join("")}</ul></div>
  <div class="panel" id="quizBox"><div class="qhead"><div><span class="eyebrow">Quiz de validation</span><p class="qq" style="margin-top:6px">Vérifie que tu as compris</p><p class="muted" style="font-size:14px;margin-top:4px">${l.quiz.length} questions. Les erreurs partent dans ta pile de révision.</p></div><button class="btn" id="qStart" type="button">Lancer le quiz</button></div></div>
  <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">${pv?`<a class="btn ghost sm" href="#lecon-${pv.id}">← ${esc(pv.title)}</a>`:"<span></span>"}${nx?`<a class="btn ghost sm" href="#lecon-${nx.id}">${esc(nx.title)} →</a>`:`<a class="btn ghost sm" href="#quiz-${s.id}-expert">Quiz expert du sujet →</a>`}</div></div>
  <aside class="side"><div class="panel player"><span class="eyebrow">Écouter la leçon</span><div class="row"><button class="ibtn main" id="pPlay" type="button" aria-label="Lire">${IC.play}</button><button class="ibtn" id="pStop" type="button" aria-label="Arrêter">${IC.stop}</button><div class="wave off" id="pWave"><i></i><i></i><i></i><i></i><i></i></div></div><p class="note">${TTS.ok?"Voix et vitesse se règlent dans le panneau de Nord.":"La lecture vocale n'est pas disponible dans ce navigateur."}</p></div>
  <div class="panel" style="display:flex;flex-direction:column;gap:8px;padding:18px"><span class="eyebrow" style="margin-bottom:4px">Demander à Nord</span>
  <button class="aib" data-ai="sum" type="button"><i>≡</i>L'essentiel de la leçon</button><button class="aib" data-ai="terms" type="button"><i>Aa</i>Les mots clés expliqués</button><button class="aib" data-ai="read" type="button"><i>🔊</i>Écouter le résumé</button><a class="aib" href="#quizia-${s.id}-${l.lvl.id}" style="text-decoration:none;color:inherit"><i>✦</i>Quiz mélange du niveau</a></div>
  <div class="panel" style="padding:18px"><span class="eyebrow">${esc(s.name)} · ${esc(l.lvl.name)}</span><div class="bar" style="margin-top:10px"><i style="width:${lvlDone(s,l.lvl.id)/s.levels[l.lvl.id].length*100}%"></i></div><p class="note" style="margin-top:8px">${lvlDone(s,l.lvl.id)}/${s.levels[l.lvl.id].length} leçons du niveau</p></div></aside></div></div>`}
function bindLecon(id){const l=POOL[id];if(!l)return;
  $("#qStart").onclick=()=>startQuiz($("#quizBox"),l.quiz,{title:"Quiz · "+l.title,onDone:(g,t)=>{const first=!S.done[l.id];const prev=S.done[l.id]?S.done[l.id].score:0;S.done[l.id]={score:Math.max(g,prev),date:TODAY(),perfect:g===t||(S.done[l.id]&&S.done[l.id].perfect)};const gain=first?30+g*10:Math.max(0,(g-prev)*10);save();if(gain)addXP(gain,first?"Leçon terminée":"Meilleur score");else{checkBadges();save();chrome()}
    const s=l.sub,seq=s.all,nx=seq[seq.indexOf(l)+1];const lvDoneNow=lvlDone(s,l.lvl.id)===s.levels[l.lvl.id].length;
    return{actions:(lvDoneNow?`<a class="btn sm glow" href="#quiz-${s.id}-${l.lvl.id}">Valider le niveau ${esc(l.lvl.name)}</a>`:"")+(nx?`<a class="btn sm" href="#lecon-${nx.id}">Leçon suivante →</a>`:"")}}});
  const prompts={simple:`Réexplique-moi la leçon « ${l.title} » beaucoup plus simplement, comme à quelqu'un qui n'y connaît rien, avec une image de la vie de tous les jours.`,ex:`Donne-moi un exemple concret et chiffré (situation d'un étudiant ou d'un jeune actif) pour bien comprendre la leçon « ${l.title} ».`,sum:`Résume la leçon « ${l.title} » en 3 phrases maximum.`,err:`Quelles sont les 3 erreurs les plus fréquentes sur le thème « ${l.title} » et comment les éviter ?`};
  prompts.terms=`Mots clés de la leçon « ${l.title} »`;prompts.sum=`L'essentiel de « ${l.title} »`;
  $$("[data-ai]").forEach(b=>b.onclick=()=>{if(b.dataset.ai==="read"){speakItems([{text:"L'essentiel de la leçon. "+l.keys.join(". ")}]);return}openNord(prompts[b.dataset.ai])});
  const play=$("#pPlay"),pw=$("#pWave");
  const setBtn=on=>{play.innerHTML=on?IC.pause:IC.play;pw.classList.toggle("off",!on)};
  play.onclick=()=>{if(!TTS.ok)return;
    if(TTS.speaking&&!TTS.paused){speechSynthesis.pause();TTS.paused=true;setBtn(false);return}
    if(TTS.paused){speechSynthesis.resume();TTS.paused=false;setBtn(true);return}
    const els=[];$$("#prose > *").forEach(el=>{if(el.matches("ul,ol"))el.querySelectorAll("li").forEach(li=>els.push(li));else if(!el.matches(".tbl-wrap"))els.push(el)});$$("#keys li").forEach(li=>els.push(li));
    const items=[{text:l.title,el:null},...els.map(el=>({text:el.textContent,el}))];
    speakItems(items,{onchunk:it=>{$$(".reading").forEach(e=>e.classList.remove("reading"));if(it.el){it.el.classList.add("reading");it.el.scrollIntoView({behavior:"smooth",block:"center"})}},ondone:()=>{$$(".reading").forEach(e=>e.classList.remove("reading"));setBtn(false)}});setBtn(true)};
  $("#pStop").onclick=()=>{stopSpeak();setBtn(false)}}

/* ---------- quiz pages ---------- */
function vQuiz(parts,ai){const[a,b]=parts;const sub=SBYID[a]||null;const lv=LVBYID[b];
  if(sub)applySub(sub);else applySub(null);
  let title,desc;
  if(a==="erreurs"){title="Mes erreurs";desc=`${S.wrong.length} question${S.wrong.length>1?"s":""} ratée${S.wrong.length>1?"s":""}. Chaque bonne réponse la retire de la pile.`}
  else{title=(ai?"Quiz mélange · ":"Quiz · ")+(sub?sub.name:"Tous sujets")+(lv?" · "+lv.name:"");desc=ai?"10 questions tirées au hasard dans toutes les leçons du niveau.":sub?`Toutes les questions du niveau ${lv?lv.name.toLowerCase():""}. 80 % pour valider.`:"10 questions tirées au hasard dans tous les sujets."}
  return `<header class="lhead"><div class="in"><div class="crumbs"><a href="#accueil">Sujets</a>${sub?` / <a href="#sujet-${sub.id}">${esc(sub.name)}</a>`:""}</div><h1>${esc(title)}</h1><p class="muted" style="margin-top:12px;color:rgba(255,255,255,.75)">${esc(desc)}</p>
  ${a!=="erreurs"?`<div class="lmeta">${LV.map(l=>`<a class="chip" href="#${ai?"quizia":"quiz"}-${a}-${l.id}" style="${lv&&l.id===lv.id?"background:#fff;color:#07080B":""}">${l.name}</a>`).join("")}<a class="chip" href="#${ai?"quiz":"quizia"}-${a}-${lv?lv.id:"debutant"}">${ai?"Quiz classique":"✦ Version IA"}</a></div>`:""}</div></header>
  <div class="page tight"><div class="qwrap panel" id="quizBox"></div></div>`}
function bindQuiz(parts,ai){const[a,b]=parts;const sub=SBYID[a]||null;const lv=LVBYID[b]||LV[0];const box=$("#quizBox");
  if(ai)return aiQuiz(box,sub,lv.id);
  let items;
  if(a==="erreurs"){items=shuffle(S.wrong.map(id=>QBYID[id]).filter(Boolean)).slice(0,15);if(!items.length){box.innerHTML=`<div class="empty"><h3 style="font-size:22px">Aucune erreur en attente</h3><p class="muted">Bravo. Lance un quiz pour t'entraîner.</p><a class="btn sm" href="#quiz-all-intermediaire">Quiz intermédiaire</a></div>`;return}}
  else if(sub)items=shuffle(sub.levels[lv.id].flatMap(l=>l.quiz));
  else items=shuffle(SUBJ.flatMap(s=>s.levels[lv.id].flatMap(l=>l.quiz))).slice(0,10);
  const key=(sub?sub.id:"all")+"-"+lv.id;
  startQuiz(box,items,{title:a==="erreurs"?"Mes erreurs":(sub?sub.short:"Mix")+" · "+lv.name,onDone:(g,t)=>{const r=g/t;const prev=S.best[key];if(a!=="erreurs"&&(prev==null||r>prev))S.best[key]=r;let gain=g*5+(r>=.8&&a!=="erreurs"&&(prev==null||prev<.8)?40:0);save();addXP(gain,r>=.8&&a!=="erreurs"?"Niveau validé":"Quiz terminé");
    const nlv=LV[lv.n];return{msg:r>=.8&&a!=="erreurs"?`Niveau ${lv.name} validé${sub?" en "+sub.name:""} !`:null,actions:(r>=.8&&nlv&&sub?`<a class="btn sm glow" href="#sujet-${sub.id}-${nlv.id}">Passer au niveau ${esc(nlv.name)} →</a>`:"")+`<a class="btn sm" href="#quizia-${a==="erreurs"?"all":a}-${lv.id}">✦ Questions IA</a>`}}})}

/* ---------- révisions ---------- */
let FC=null,fcFilter="";
function vRevisions(){applySub(null);const u=unlockedCards();const boxes=[0,0,0,0,0,0];u.forEach(g=>{const c=S.cards[g.t];if(c)boxes[c.box]++});
  FC={deck:shuffle(dueCards(fcFilter)),i:0,flip:false};
  return `<div class="page"><div class="sh"><div><span class="eyebrow">Répétition espacée</span><h2 style="margin-top:8px">Révisions</h2><p>Flashcards qui reviennent au bon moment, pile d'erreurs et missions concrètes.</p></div><a class="btn" href="#quiz-erreurs-all">Mes erreurs (${S.wrong.length})</a></div>
  <div class="tabs"><button class="tab ${fcFilter===""?"on":""}" data-f="" type="button">Tous</button>${SUBJ.map(s=>`<button class="tab ${fcFilter===s.id?"on":""}" data-f="${s.id}" type="button">${esc(s.short)}</button>`).join("")}</div>
  <div class="boxes"><div class="box"><b>${u.filter(g=>!S.cards[g.t]).length}</b><span>Nouvelles</span></div>${[1,2,3,4,5].map(i=>`<div class="box"><b>${boxes[i]}</b><span>Boîte ${i} · ${INTERVALS[i]} j</span></div>`).join("")}</div>
  <div id="fcArea"></div>
  <p class="note">${u.length}/${GLOSS.length} cartes débloquées. Une carte sue monte d'une boîte et revient plus tard. Ratée, elle revient demain.</p>
  <section style="display:flex;flex-direction:column;gap:12px"><div class="sh"><div><h2 style="font-size:24px">Missions</h2><p>Des actions concrètes pour appliquer ce que tu apprends.</p></div><span class="chip">${Object.keys(S.missions).length}/${MISS.length}</span></div>${MISS.map(m=>`<button class="mission ${S.missions[m.id]?"on":""}" data-m="${m.id}" type="button"><span class="cb">${S.missions[m.id]?"✓":""}</span><span class="t">${esc(m.t)}</span><span class="xp">+${m.xp} XP</span></button>`).join("")}</section></div>`}
function renderFC(){const a=$("#fcArea");if(!a)return;
  if(FC.i>=FC.deck.length){a.innerHTML=`<div class="panel empty"><h3 style="font-size:22px">Rien à réviser pour l'instant</h3><p class="muted">Reviens demain, ou termine une leçon pour débloquer de nouvelles cartes.</p><a class="btn sm" href="#accueil">Continuer à apprendre</a></div>`;return}
  const g=FC.deck[FC.i],s=SBYID[g.s],c=S.cards[g.t];
  a.innerHTML=`<div class="fc-stage"><div class="fc ${FC.flip?"flip":""}" id="fc" tabindex="0" role="button" aria-label="Retourner la carte" style="--c1:${s.c1};--c2:${s.c2}"><div class="fc-face"><div style="display:flex;justify-content:space-between;gap:8px"><span class="eyebrow" style="color:rgba(255,255,255,.8)">${esc(s.name)}</span><span class="eyebrow" style="color:rgba(255,255,255,.8)">${c?"Boîte "+c.box:"Nouvelle"}</span></div><div class="term">${esc(g.t)}</div><span style="font-size:13px;color:rgba(255,255,255,.7)">Touche pour retourner · ${FC.i+1}/${FC.deck.length}</span></div><div class="fc-face fc-back"><span class="eyebrow">${esc(g.t)}</span><div class="def">${esc(g.d)}</div><span class="note">${TTS.ok?'<button type="button" id="fcSay" class="chip">🔊 Écouter</button>':""}</span></div></div></div>
  <div class="pills" style="justify-content:center;margin-top:18px">${FC.flip?`<button class="btn ghost" id="fcNo" type="button" style="border-color:var(--bad);color:var(--bad)">À revoir</button><button class="btn" id="fcYes" type="button" style="background:var(--good)">Je savais</button>`:`<button class="btn" id="fcFlip" type="button">Retourner</button>`}</div>`;
  const flip=()=>{FC.flip=!FC.flip;renderFC()};$("#fc").onclick=e=>{if(e.target.id!=="fcSay")flip()};$("#fc").onkeydown=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();flip()}};
  const sb=$("#fcSay");if(sb)sb.onclick=e=>{e.stopPropagation();speakItems([{text:g.t+". "+g.d}])};
  const f=$("#fcFlip");if(f)f.onclick=flip;
  const grade=ok=>{const cr=S.cards[g.t]||{box:0};const box=ok?Math.min(5,cr.box+1):1;S.cards[g.t]={box,due:addDays(TODAY(),ok?INTERVALS[box]:1)};S.reviews++;S.xp+=ok?3:1;touchDay();checkBadges();save();chrome();FC.i++;FC.flip=false;renderFC()};
  const y=$("#fcYes"),n=$("#fcNo");if(y)y.onclick=()=>grade(true);if(n)n.onclick=()=>grade(false)}
function bindRevisions(){renderFC();$$("[data-f]").forEach(b=>b.onclick=()=>{fcFilter=b.dataset.f;route(true)});bindMissions()}

/* ---------- simulateurs ---------- */
let SIM="ic";
function vSim(k){applySub(null);if(k&&SIMS.some(s=>s[0]===k))SIM=k;return `<div class="page tight"><div class="sh"><div><span class="eyebrow">Calculer pour comprendre</span><h2 style="margin-top:8px">Simulateurs</h2><p>Huit calculateurs pour tester des scénarios. Résultats indicatifs, avant impôt sauf mention.</p></div><button class="btn ghost sm" id="simAsk" type="button">Nord, explique ce simulateur</button></div>
  <div class="tabs">${SIMS.map(([k,l])=>`<button class="tab ${SIM===k?"on":""}" data-sim="${k}" type="button">${l}</button>`).join("")}</div><div class="panel" id="simBox"></div></div>`}
function field(id,label,min,max,step,val,fmt){return `<div class="field"><label for="${id}">${label}<output id="${id}o"></output></label><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" data-fmt="${fmt}"></div>`}
const FMT={eur:v=>eur(v),pct:v=>pct(+v,2),y:v=>v+" ans",m:v=>v+" mois",p1:v=>pct(+v,1)};
let simUsed={};
function bindFields(fn){const box=$("#simBox");const upd=()=>{box.querySelectorAll("input[type=range]").forEach(i=>{$("#"+i.id+"o").textContent=FMT[i.dataset.fmt](+i.value)});fn()};box.querySelectorAll("input,select").forEach(i=>i.oninput=upd);upd();box.addEventListener("input",()=>{if(!simUsed[SIM]){simUsed[SIM]=1;S.sims++;checkBadges();save()}},{once:true})}
const V=id=>+$("#"+id).value;
function mensu(C,a,n){const t=a/12;return t?C*t/(1-Math.pow(1+t,-n)):C/n}
function niceMax(v){if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v)));const n=v/p;return(n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*p}
function kfmt(v){const a=Math.abs(v),s=v<0?"−":"";return a>=1e6?s+(a/1e6).toLocaleString("fr-FR",{maximumFractionDigits:1})+" M€":a>=1e3?s+Math.round(a/1e3)+" k€":s+Math.round(a)+" €"}
function lineChart(svg,series,xmax,xlab){const W=640,H=270,L=58,R=16,T=12,B=30;let mx=niceMax(Math.max(...series.flatMap(s=>s.pts.map(p=>p[1])))),mn=Math.min(0,...series.flatMap(s=>s.pts.map(p=>p[1])));if(mn<0)mn=-niceMax(-mn);
  const X=t=>L+(W-L-R)*t/xmax,Y=v=>T+(H-T-B)*(1-(v-mn)/(mx-mn));let g="";
  for(let i=0;i<=4;i++){const v=mn+(mx-mn)*i/4;g+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="rgba(255,255,255,.08)" ${i?'stroke-dasharray="2 4"':""}/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end">${kfmt(v)}</text>`}
  const st=xmax<=10?1:xmax<=20?5:xmax<=40?10:15;for(let t=0;t<=xmax;t+=st)g+=`<text x="${X(t)}" y="${H-8}" text-anchor="middle">${t}${xlab}</text>`;
  series.forEach(s=>{const d=s.pts.map((p,i)=>(i?"L":"M")+X(p[0])+","+Y(p[1])).join(" ");if(s.area)g+=`<path d="${d} L${X(s.pts[s.pts.length-1][0])},${Y(Math.max(0,mn))} L${X(s.pts[0][0])},${Y(Math.max(0,mn))}Z" fill="${s.color}" fill-opacity="${s.area}"/>`;g+=`<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.4"/>`;const l=s.pts[s.pts.length-1];g+=`<circle cx="${X(l[0])}" cy="${Y(l[1])}" r="4.5" fill="${s.color}" stroke="#11141B" stroke-width="2"/>`});
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`);svg.innerHTML=g}
const SIMF={
ic(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("a0","Capital de départ",0,50000,500,1000,"eur")}${field("am","Versement mensuel",0,2000,10,150,"eur")}${field("ar","Rendement annuel",0,12,.25,6,"pct")}${field("ay","Durée",1,45,1,25,"y")}${field("ai","Inflation estimée",0,5,.25,2,"pct")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi hl"><span>Capital final</span><b id="k1"></b></div><div class="kpi"><span>Total versé</span><b id="k2"></b></div><div class="kpi good"><span>Intérêts gagnés</span><b id="k3"></b></div></div><svg class="chart" id="ch" role="img" aria-label="Évolution du capital"></svg><div class="legend"><span><i style="background:var(--glow)"></i>Capital total</span><span><i style="background:#9AA0AE"></i>Versements cumulés</span></div><p class="note" id="nt"></p></div></div>`;
  bindFields(()=>{const c0=V("a0"),m=V("am"),r=V("ar")/100,y=V("ay"),inf=V("ai")/100,rm=Math.pow(1+r,1/12)-1;let cap=c0,dep=c0;const p1=[[0,c0]],p2=[[0,c0]];for(let k=1;k<=y*12;k++){cap=cap*(1+rm)+m;dep+=m;if(k%12===0){p1.push([k/12,cap]);p2.push([k/12,dep])}}
  $("#k1").textContent=eur(cap);$("#k2").textContent=eur(dep);$("#k3").textContent=eur(cap-dep);$("#nt").innerHTML=`En euros d'aujourd'hui, ce capital vaut environ <b>${eur(cap/Math.pow(1+inf,y))}</b>. À ${pct(r*100,2)}, un capital double en ${r>0?"≈ "+(Math.round(72/(r*100)*10)/10).toLocaleString("fr-FR")+" ans":"… jamais"} (règle des 72).`;
  lineChart($("#ch"),[{pts:p1,color:getComputedStyle(document.documentElement).getPropertyValue("--glow").trim()||"#6F8DFF",area:.18},{pts:p2,color:"#9AA0AE",area:.12}],y," a")})},
budget(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("br","Revenu net mensuel",300,6000,50,1200,"eur")}${field("bl","Loyer et charges",0,2500,10,450,"eur")}${field("bf","Autres dépenses fixes (transport, forfait, assurance…)",0,1500,10,150,"eur")}${field("bv","Dépenses variables estimées",0,3000,10,350,"eur")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi"><span>Besoins (cible 50 %)</span><b id="b1"></b></div><div class="kpi"><span>Envies (cible 30 %)</span><b id="b2"></b></div><div class="kpi hl"><span>Épargne (cible 20 %)</span><b id="b3"></b></div></div><div id="bb" style="display:flex;flex-direction:column;gap:10px"></div><p class="note" id="bn"></p></div></div>`;
  bindFields(()=>{const r=V("br"),l=V("bl"),f=V("bf"),v=V("bv");const need=l+f,left=r-need-v;$("#b1").textContent=eur(r*.5);$("#b2").textContent=eur(r*.3);$("#b3").textContent=eur(r*.2);
  const rows=[["Besoins actuels",need,need/r,"#6F8DFF",.5],["Envies actuelles",v,v/r,"#EC4899",.3],["Reste à épargner",Math.max(0,left),Math.max(0,left)/r,"#3DDC97",.2]];
  $("#bb").innerHTML=`<span class="eyebrow">Ta répartition vs la cible</span>`+rows.map(x=>`<div class="hbar"><span>${x[0]}</span><div class="track"><i style="width:${Math.min(100,x[2]*100)}%;background:${x[3]}"></i></div><span class="val">${pct(x[2]*100,0)} <span class="muted">/ ${x[4]*100}</span></span></div>`).join("");
  const dep=need+v;$("#bn").innerHTML=left<0?`<b style="color:var(--bad)">Tu dépenses ${eur(-left)} de plus que tes revenus.</b> Commence par les dépenses variables et les abonnements.`:`Tu peux épargner <b>${eur(left)}</b> par mois (${pct(left/r*100,0)}). Épargne de précaution visée : entre <b>${eur(dep*3)}</b> et <b>${eur(dep*6)}</b>${left>0?`, atteinte en ${Math.ceil(dep*3/left)} mois pour 3 mois de dépenses`:""}.`})},
objectif(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("oc","Objectif",1000,300000,1000,20000,"eur")}${field("oy","Dans combien de temps",1,30,1,5,"y")}${field("o0","Déjà de côté",0,100000,500,1000,"eur")}${field("or","Rendement annuel attendu",0,10,.25,2,"pct")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi hl"><span>À épargner par mois</span><b id="o1"></b></div><div class="kpi"><span>Total versé</span><b id="o2"></b></div><div class="kpi good"><span>Intérêts</span><b id="o3"></b></div></div><p class="note" id="on"></p></div></div>`;
  bindFields(()=>{const C=V("oc"),y=V("oy"),c0=V("o0"),r=V("or")/100,n=y*12,rm=Math.pow(1+r,1/12)-1;const fv0=c0*Math.pow(1+rm,n);const need=Math.max(0,C-fv0);const m=rm?need*rm/(Math.pow(1+rm,n)-1):need/n;
  $("#o1").textContent=eur(m);$("#o2").textContent=eur(c0+m*n);$("#o3").textContent=eur(Math.max(0,C-(c0+m*n)));
  $("#on").innerHTML=y<5&&r>.03?`<b style="color:var(--warn)">Attention :</b> sur moins de 5 ans, viser plus de 3 % demande de prendre du risque (actions). Pour un projet court, reste sur des supports sûrs.`:`Horizon ${y} ans : ${y<5?"privilégie livrets, fonds euros ou monétaire.":y<8?"un mélange fonds euros / ETF est envisageable.":"un ETF monde en DCA sur PEA est la piste classique."}`})},
credit(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("cp","Prix du bien",50000,600000,5000,200000,"eur")}${field("ca","Apport",0,150000,1000,20000,"eur")}${field("cn","Frais de notaire",2,8,.5,7.5,"p1")}${field("ct","Taux du crédit",1,6,.05,3.5,"pct")}${field("cy","Durée",7,25,1,20,"y")}${field("cas","Assurance emprunteur (an)",0,.6,.01,.25,"pct")}${field("cr","Revenus nets mensuels du foyer",1000,10000,50,3200,"eur")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi hl"><span>Mensualité (assurance incluse)</span><b id="c1"></b></div><div class="kpi"><span>Montant emprunté</span><b id="c2"></b></div><div class="kpi" id="c3k"><span>Taux d'endettement</span><b id="c3"></b></div><div class="kpi"><span>Coût des intérêts</span><b id="c4"></b></div><div class="kpi"><span>Coût de l'assurance</span><b id="c5"></b></div><div class="kpi"><span>Capacité max à 35 %</span><b id="c6"></b></div></div><div id="cb" style="display:flex;flex-direction:column;gap:8px"></div><p class="note" id="cnt"></p></div></div>`;
  bindFields(()=>{const P=V("cp"),A=V("ca"),fn=V("cn")/100,t=V("ct")/100,y=V("cy"),as=V("cas")/100,rev=V("cr"),n=y*12;const fr=P*fn,C=Math.max(0,P+fr-A),m=mensu(C,t,n),ma=C*as/12,tot=m+ma,it=m*n-C,aT=ma*n,en=tot/rev*100,cap=rev*.35/(mensu(1,t,n)+as/12);
  $("#c1").textContent=eur(tot);$("#c2").textContent=eur(C);$("#c3").textContent=pct(en,1);$("#c4").textContent=eur(it);$("#c5").textContent=eur(aT);$("#c6").textContent=eur(cap);$("#c3k").className="kpi "+(en<=35?"good":"bad");
  const all=C+it+aT,seg=[["Capital",C,"#6F8DFF"],["Intérêts",it,"#FFC857"],["Assurance",aT,"#FF6B81"]];
  $("#cb").innerHTML=`<span class="eyebrow">Coût total : ${eur(all)}</span><div class="hbar" style="grid-template-columns:minmax(0,1fr)"><div class="track" style="height:30px">${seg.map(s=>`<i style="width:${s[1]/all*100}%;background:${s[2]}"></i>`).join("")}</div></div><div class="legend">${seg.map(s=>`<span><i style="background:${s[2]}"></i>${s[0]} ${eur(s[1])}</span>`).join("")}</div>`;
  $("#cnt").innerHTML=en<=35?`Dans les clous du HCSF (≤ 35 %). Frais de notaire estimés : ${eur(fr)}.`:`<b style="color:var(--bad)">Au-delà de 35 %</b> : la banque refusera probablement. Maximum ≈ ${eur(cap)} empruntés.`})},
louer(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("lp","Prix du logement",60000,600000,5000,200000,"eur")}${field("la","Apport",0,150000,1000,25000,"eur")}${field("lt","Taux du crédit",1,6,.05,3.5,"pct")}${field("ld","Durée du crédit",10,25,1,20,"y")}${field("lr","Loyer équivalent",300,3000,10,800,"eur")}${field("lv","Valorisation annuelle du logement",-2,5,.25,1.5,"pct")}${field("li","Rendement si tu investis (net)",0,8,.25,5,"pct")}${field("lh","Horizon",2,30,1,12,"y")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi" id="lk1"><span>Patrimoine si tu achètes</span><b id="l1"></b></div><div class="kpi" id="lk2"><span>Patrimoine si tu loues et investis</span><b id="l2"></b></div><div class="kpi hl"><span>Écart</span><b id="l3"></b></div></div><svg class="chart" id="lch" role="img" aria-label="Comparaison achat location"></svg><div class="legend"><span><i style="background:#FF6B2C"></i>Acheter</span><span><i style="background:#6F8DFF"></i>Louer et investir</span></div><p class="note" id="ln">Hypothèses : frais de notaire 7,5 %, charges de propriétaire (taxe foncière, entretien) 1,2 % du prix par an, loyer +1,5 %/an, frais de revente 5 %. Le locataire investit l'apport, les frais évités et chaque mois la différence de coût.</p></div></div>`;
  bindFields(()=>{const P=V("lp"),A=V("la"),t=V("lt")/100,d=V("ld"),R0=V("lr"),va=V("lv")/100,ri=V("li")/100,H=V("lh");const fr=P*.075,C=Math.max(0,P+fr-A),m=mensu(C,t,d*12);const rm=Math.pow(1+ri,1/12)-1;
  let bal=C,port=A,rent=R0,val=P,side=0;const pb=[[0,P-C-0]],pr=[[0,A]];
  for(let k=1;k<=H*12;k++){const pay=k<=d*12?m:0;if(k<=d*12){const int=bal*t/12;bal=Math.max(0,bal-(pay-int))}const own=pay+P*.012/12;port=port*(1+rm);side=side*(1+rm);const diff=own-rent;if(diff>0)port+=diff;else side+=-diff;if(k%12===0){rent*=1.015;val*=1+va;pb.push([k/12,val*.95-bal+side]);pr.push([k/12,port])}}
  const b=pb[pb.length-1][1],r=pr[pr.length-1][1];$("#l1").textContent=eur(b);$("#l2").textContent=eur(r);$("#l3").textContent=(b>=r?"Achat +":"Location +")+eur(Math.abs(b-r)).replace("-","");$("#lk1").className="kpi "+(b>=r?"good":"");$("#lk2").className="kpi "+(r>b?"good":"");
  lineChart($("#lch"),[{pts:pb,color:"#FF6B2C"},{pts:pr,color:"#6F8DFF"}],H," a")})},
loc(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("rp","Prix d'achat",30000,400000,5000,110000,"eur")}${field("rw","Travaux",0,80000,1000,5000,"eur")}${field("rl","Loyer mensuel (hors charges)",200,2500,10,580,"eur")}${field("rc","Charges annuelles (TF, copro, PNO…)",0,8000,50,1600,"eur")}${field("rv","Vacance locative",0,3,.5,1,"m")}${field("ra","Apport",0,100000,1000,12000,"eur")}${field("rt","Taux du crédit",1,6,.05,3.5,"pct")}${field("ry","Durée du crédit",10,25,1,20,"y")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi"><span>Rendement brut</span><b id="r1"></b></div><div class="kpi hl"><span>Rendement net de charges</span><b id="r2"></b></div><div class="kpi" id="r3k"><span>Cash-flow mensuel</span><b id="r3"></b></div><div class="kpi"><span>Coût total d'acquisition</span><b id="r4"></b></div><div class="kpi"><span>Mensualité crédit</span><b id="r5"></b></div><div class="kpi"><span>Loyers perçus / an</span><b id="r6"></b></div></div><div id="rf" style="display:flex;flex-direction:column;gap:8px"></div><p class="note">Avant impôt. Notaire 7,5 %, assurance emprunteur 0,25 %.</p></div></div>`;
  bindFields(()=>{const P=V("rp"),W=V("rw"),Lm=V("rl"),Ch=V("rc"),vac=V("rv"),A=V("ra"),t=V("rt")/100,y=V("ry");const tot=P+P*.075+W,loy=Lm*(12-vac),br=Lm*12/P*100,net=(loy-Ch)/tot*100,C=Math.max(0,tot-A),m=mensu(C,t,y*12)+C*.0025/12,cf=(loy-Ch)/12-m;
  $("#r1").textContent=pct(br,2);$("#r2").textContent=pct(net,2);$("#r3").textContent=(cf>=0?"+":"−")+eur(Math.abs(cf));$("#r4").textContent=eur(tot);$("#r5").textContent=eur(m);$("#r6").textContent=eur(loy);$("#r3k").className="kpi "+(cf>=0?"good":"bad");
  const rows=[["Loyers encaissés",loy/12,"#3DDC97"],["Crédit + assurance",-m,"#6F8DFF"],["Charges",-Ch/12,"#FFC857"]],mx=Math.max(...rows.map(r=>Math.abs(r[1])));
  $("#rf").innerHTML=`<span class="eyebrow">Flux mensuels</span>`+rows.map(r=>`<div class="hbar"><span>${r[0]}</span><div class="track"><i style="width:${Math.abs(r[1])/mx*100}%;background:${r[2]}"></i></div><span class="val">${r[1]>=0?"+":"−"}${eur(Math.abs(r[1]))}</span></div>`).join("")})},
fisc(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("fg","Gain réalisé",500,100000,500,10000,"eur")}<div class="field"><label for="fs">Situation (assurance-vie)</label><select id="fs"><option value="4600">Personne seule (abattement 4 600 €)</option><option value="9200">Couple (abattement 9 200 €)</option></select></div><p class="note">Règles 2026 : PFU 31,4 % (CTO), PS 18,6 % (PEA), assurance-vie maintenue à 17,2 % de PS.</p></div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div id="fb" style="display:flex;flex-direction:column;gap:12px"></div><div class="tbl-wrap"><table class="tbl" id="ft"></table></div></div></div>`;
  bindFields(()=>{const G=V("fg"),ab=+$("#fs").value;const rows=[["CTO (flat tax)",G*.314,"12,8 % + 18,6 %"],["PEA < 5 ans",G*.314,"31,4 % + clôture"],["PEA > 5 ans",G*.186,"18,6 % PS seuls"],["Assurance-vie < 8 ans",G*.30,"12,8 % + 17,2 %"],["Assurance-vie > 8 ans",Math.max(0,G-ab)*.075+G*.172,"7,5 % au-delà de l'abattement + 17,2 %"]];const mx=Math.max(...rows.map(r=>r[1])),mn=Math.min(...rows.map(r=>r[1]));
  $("#fb").innerHTML=`<span class="eyebrow">Impôt sur ${eur(G)} de gain</span>`+rows.map(r=>`<div class="hbar"><span>${r[0]}</span><div class="track"><i style="width:${r[1]/mx*100}%;background:${r[1]===mn?"#3DDC97":"#6F8DFF"}"></i></div><span class="val">${eur(r[1])}</span></div>`).join("");
  $("#ft").innerHTML=`<thead><tr><th>Enveloppe</th><th>Taux effectif</th><th>Net en poche</th><th>Détail</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td class="n">${pct(r[1]/G*100,1)}</td><td class="n">${eur(G-r[1])}</td><td class="muted">${r[2]}</td></tr>`).join("")}</tbody>`})},
fire(){$("#simBox").innerHTML=`<div class="sim"><div class="fields">${field("xd","Dépenses mensuelles visées",500,6000,50,1800,"eur")}${field("x0","Patrimoine investi actuel",0,500000,1000,5000,"eur")}${field("xm","Épargne investie par mois",0,5000,25,400,"eur")}${field("xr","Rendement réel (après inflation)",1,7,.25,4,"pct")}${field("xw","Taux de retrait",2.5,5,.25,3.5,"pct")}</div><div style="display:flex;flex-direction:column;gap:14px;min-width:0"><div class="kpis"><div class="kpi hl"><span>Capital à atteindre</span><b id="x1"></b></div><div class="kpi"><span>Années nécessaires</span><b id="x2"></b></div><div class="kpi"><span>Revenu passif / mois</span><b id="x3"></b></div></div><svg class="chart" id="xch" role="img" aria-label="Trajectoire vers l'indépendance"></svg><p class="note" id="xn"></p></div></div>`;
  bindFields(()=>{const d=V("xd")*12,c0=V("x0"),m=V("xm"),r=V("xr")/100,w=V("xw")/100,target=d/w,rm=Math.pow(1+r,1/12)-1;let c=c0,k=0;const pts=[[0,c0]];while(c<target&&k<12*70){c=c*(1+rm)+m;k++;if(k%12===0)pts.push([k/12,c])}const yrs=c>=target?k/12:null;if(yrs&&k%12)pts.push([Math.ceil(k/12),c]);
  $("#x1").textContent=eur(target);$("#x2").textContent=yrs?(Math.round(yrs*10)/10).toLocaleString("fr-FR")+" ans":"> 70 ans";$("#x3").textContent=eur(target*w/12);
  const xm=Math.max(1,pts[pts.length-1][0]);lineChart($("#xch"),[{pts,color:"#14B8A6",area:.18},{pts:[[0,target],[xm,target]],color:"#FFC857"}],xm," a");
  $("#xn").innerHTML=`Ligne jaune : ton objectif (dépenses annuelles ÷ ${pct(w*100,2)}). ${yrs?`Avec ces hypothèses, tu l'atteins vers <b>${Math.round(yrs)} ans</b> d'ici.`:"Augmente ton épargne mensuelle ou baisse tes dépenses visées."}`})}};
function bindSim(){$$("[data-sim]").forEach(b=>b.onclick=()=>{SIM=b.dataset.sim;history.replaceState(null,"","#simulateurs-"+SIM);$$("[data-sim]").forEach(x=>x.classList.toggle("on",x===b));SIMF[SIM]()});SIMF[SIM]();
  $("#simAsk").onclick=()=>openNord(`J'utilise le simulateur « ${SIMS.find(s=>s[0]===SIM)[1]} ». Explique-moi à quoi il sert, comment lire ses résultats et quelles hypothèses sont importantes.`)}

/* ---------- bibliothèque ---------- */
let LIB="ressources",resK="",resS="";
const KINDS={officiel:"Officiel",outil:"Outil",livre:"Livre",video:"Vidéo",presse:"Presse",communaute:"Communauté"};
function resCard(r){let host="";try{host=new URL(r.u).hostname.replace(/^www\./,"")}catch(e){}return `<a class="res" href="${esc(r.u)}" target="_blank" rel="noopener"><div class="top"><span class="kind">${KINDS[r.k]}</span><span class="mono muted" style="font-size:12px">↗</span></div><b>${esc(r.t)}</b><p>${esc(r.d)}</p><span class="host">${esc(host)}</span></a>`}
function vLib(tab){applySub(null);if(tab)LIB=tab;return `<div class="page tight"><div class="sh"><div><span class="eyebrow">Tout pour aller plus loin</span><h2 style="margin-top:8px">Bibliothèque</h2><p>${RES.length} ressources sélectionnées, ${GLOSS.length} définitions et tous les chiffres clés de 2026.</p></div></div>
  <div class="tabs">${[["ressources","Ressources"],["glossaire","Glossaire"],["memo","Mémo 2026"]].map(([k,l])=>`<button class="tab ${LIB===k?"on":""}" data-lib="${k}" type="button">${l}</button>`).join("")}</div><div id="libBox" style="display:flex;flex-direction:column;gap:16px"></div></div>`}
function renderLib(){const b=$("#libBox");
  if(LIB==="ressources"){b.innerHTML=`<div class="tabs"><button class="tab ${!resK?"on":""}" data-k="" type="button">Tout</button>${Object.entries(KINDS).map(([k,l])=>`<button class="tab ${resK===k?"on":""}" data-k="${k}" type="button">${l} <span class="mono" style="opacity:.6">${RES.filter(r=>r.k===k).length}</span></button>`).join("")}</div><div class="tabs"><button class="tab ${!resS?"on":""}" data-s="" type="button">Tous sujets</button>${SUBJ.map(s=>`<button class="tab ${resS===s.id?"on":""}" data-s="${s.id}" type="button">${esc(s.short)}</button>`).join("")}</div><div class="grid g3">${RES.filter(r=>(!resK||r.k===resK)&&(!resS||r.s.includes(resS))).map(resCard).join("")||'<p class="muted">Aucune ressource pour ce filtre.</p>'}</div><p class="note">Liens externes : ils s'ouvrent dans un nouvel onglet. Les livres renvoient vers leur fiche descriptive.</p>`;
    $$("[data-k]").forEach(x=>x.onclick=()=>{resK=x.dataset.k;renderLib()});$$("[data-s]").forEach(x=>x.onclick=()=>{resS=x.dataset.s;renderLib()})}
  if(LIB==="glossaire"){b.innerHTML=`<input class="search" id="gq" type="search" placeholder="Chercher : PEA, TAEG, LMNP, drawdown…" autocomplete="off"><div class="tabs" id="gf"><button class="tab on" data-g="" type="button">Tous</button>${SUBJ.map(s=>`<button class="tab" data-g="${s.id}" type="button">${esc(s.short)}</button>`).join("")}</div><div class="glgrid" id="gl"></div>`;let f="";
    const draw=()=>{const q=norm($("#gq").value.trim());const L=GLOSS.filter(g=>(!f||g.s===f)&&(!q||norm(g.t+" "+g.d).includes(q))).sort((a,b)=>a.t.localeCompare(b.t,"fr"));$("#gl").innerHTML=L.map(g=>`<div class="gterm"><h4>${esc(g.t)}<span>${esc(SBYID[g.s].short)}</span></h4><p>${esc(g.d)}</p></div>`).join("")||`<p class="muted">Rien trouvé. Demande à Nord !</p>`};
    $("#gq").oninput=draw;$$("[data-g]").forEach(x=>x.onclick=()=>{f=x.dataset.g;$$("[data-g]").forEach(y=>y.classList.toggle("on",y===x));draw()});draw()}
  if(LIB==="memo"){const groups=[...new Set(MEMO.map(m=>m[0]))];b.innerHTML=groups.map(g=>`<div style="display:flex;flex-direction:column;gap:10px"><span class="eyebrow">${esc(g)}</span><div class="memo">${MEMO.filter(m=>m[0]===g).map(m=>`<div class="m"><span>${esc(m[1])}</span><b>${esc(m[2])}</b><small>${esc(m[3])}</small></div>`).join("")}</div></div>`).join("")+`<p class="note">À jour fin septembre 2026. Ces chiffres changent (taux révisés en février et août, lois de finances en décembre) : vérifie avant de décider.</p>`}}
function bindLib(){$$("[data-lib]").forEach(x=>x.onclick=()=>{LIB=x.dataset.lib;history.replaceState(null,"","#bibliotheque-"+LIB);$$("[data-lib]").forEach(y=>y.classList.toggle("on",y===x));renderLib()});renderLib()}

/* ---------- profil & plan ---------- */
const GOALS=[["precaution","Me constituer un coussin"],["bourse","Investir en bourse"],["rp","Acheter ma résidence"],["locatif","Investissement locatif"],["impots","Payer moins d'impôts"],["retraite","Préparer la retraite"],["crypto","Comprendre la crypto"]];
function planFor(p){const steps=[];const dep=+p.depenses||0,ep=+p.epargne||0,rev=+p.revenu||0;
  steps.push({t:"Poser ton budget",d:rev?`Avec ${eur(rev)} nets et ${eur(dep)} de dépenses, ta capacité d'épargne est d'environ ${eur(Math.max(0,rev-dep))} par mois.`:"Calcule ta capacité d'épargne avec le simulateur Budget.",l:"budget"});
  if(ep<dep*3)steps.push({t:"Construire ton épargne de précaution",d:`Vise ${eur(dep*3)} (3 mois de dépenses) sur Livret A, LDDS ou LEP si tu y as droit.`,l:"precaution"});
  steps.push({t:"Vérifier le LEP et ta déclaration",d:p.situation!=="salarie"?"Étudiant ou alternant : vérifie les exonérations et ton éligibilité au LEP.":"Vérifie ta TMI : elle guide tes choix d'enveloppes.",l:p.situation!=="salarie"?"impotsetudiant":"ir"});
  if(p.goals.includes("bourse")||p.goals.includes("retraite"))steps.push({t:"Ouvrir un PEA et investir chaque mois",d:"Prends date avec un PEA, puis un investissement programmé sur un ETF monde.",l:"pea"});
  if(p.goals.includes("rp"))steps.push({t:"Préparer ton achat immobilier",d:"Apport, capacité d'emprunt, PTZ : prépare ton dossier.",l:"credit"});
  if(p.goals.includes("locatif"))steps.push({t:"Apprendre l'investissement locatif",d:"Rendement, cash-flow, fiscalité nu ou meublé.",l:"rendement"});
  if(p.goals.includes("impots"))steps.push({t:"Optimiser ta fiscalité",d:"Flat tax, enveloppes, PER si ta TMI le justifie.",l:"pfu"});
  if(p.goals.includes("crypto"))steps.push({t:"Comprendre la crypto avant d'y toucher",d:"Risques, fiscalité, plateformes autorisées.",l:"crypto"});
  steps.push({t:"Éviter les pièges",d:"Biais et arnaques : la leçon qui protège tout le reste.",l:"biais"});
  return steps}
function vProfil(){applySub(null);const p=S.profile||{age:"",situation:"alternant",revenu:"",depenses:"",epargne:"",goals:["precaution","bourse"],horizon:"long",risque:"moyen"};const r=rank();const plan=S.profile?planFor(S.profile):null;
  return `<div class="page tight"><div class="sh"><div><span class="eyebrow">Ton espace</span><h2 style="margin-top:8px">Profil & plan perso</h2><p>Réponds à quelques questions : Boussole réorganise ton parcours et Nord adapte ses explications.</p></div><span class="chip">${syncState==="cloud"?"☁ Synchronisé sur ton compte":"Sauvegardé dans ce navigateur"}</span></div>
  <div class="panel"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap"><div><span class="eyebrow">Rang ${r.n}</span><h3 style="font-size:28px;margin-top:6px;text-transform:uppercase">${esc(r.name)}</h3></div><span class="mono">${S.xp} XP${r.toNext?" · encore "+r.toNext:""}</span></div><div class="bar" style="margin-top:14px"><i style="width:${r.pct}%"></i></div></div>
  <form class="panel" id="pf" style="display:flex;flex-direction:column;gap:18px"><div class="form">
  <div class="field"><label for="pAge">Âge</label><input type="number" id="pAge" min="15" max="99" value="${esc(p.age)}"></div>
  <div class="field"><label for="pSit">Situation</label><select id="pSit">${[["etudiant","Étudiant"],["alternant","Alternant"],["salarie","Salarié"],["independant","Indépendant"],["autre","Autre"]].map(([k,l])=>`<option value="${k}" ${p.situation===k?"selected":""}>${l}</option>`).join("")}</select></div>
  <div class="field"><label for="pRev">Revenus nets / mois (€)</label><input type="number" id="pRev" min="0" value="${esc(p.revenu)}"></div>
  <div class="field"><label for="pDep">Dépenses / mois (€)</label><input type="number" id="pDep" min="0" value="${esc(p.depenses)}"></div>
  <div class="field"><label for="pEp">Épargne actuelle (€)</label><input type="number" id="pEp" min="0" value="${esc(p.epargne)}"></div>
  <div class="field"><label for="pRisk">Face à une baisse de 30 % de tes placements…</label><select id="pRisk"><option value="faible" ${p.risque==="faible"?"selected":""}>Je vends tout, je ne dors plus</option><option value="moyen" ${p.risque==="moyen"?"selected":""}>Je stresse mais je garde</option><option value="fort" ${p.risque==="fort"?"selected":""}>J'en rachète</option></select></div></div>
  <div class="field"><label>Tes objectifs</label><div class="checks">${GOALS.map(([k,l])=>`<label><input type="checkbox" name="goal" value="${k}" ${p.goals.includes(k)?"checked":""}>${l}</label>`).join("")}</div></div>
  <div class="field"><label for="pHz">Horizon principal</label><select id="pHz"><option value="court" ${p.horizon==="court"?"selected":""}>Moins de 3 ans</option><option value="moyen" ${p.horizon==="moyen"?"selected":""}>3 à 8 ans</option><option value="long" ${p.horizon==="long"?"selected":""}>Plus de 8 ans</option></select></div>
  <div class="pills"><button class="btn" type="submit">${S.profile?"Mettre à jour mon plan":"Créer mon plan"}</button></div></form>
  ${plan?`<section class="panel"><div class="sh" style="margin-bottom:10px"><h2 style="font-size:22px">Ton plan</h2></div>${plan.map((s,i)=>`<div class="step"><span class="i">${i+1}</span><div><b>${esc(s.t)}</b><p class="muted" style="font-size:14.5px;margin-top:2px">${esc(s.d)}</p>${POOL[s.l]?`<a href="#lecon-${s.l}" style="font-size:14px">${S.done[s.l]?"✓ ":""}${esc(POOL[s.l].title)} →</a>`:""}</div></div>`).join("")}</section>`:""}
  <section style="display:flex;flex-direction:column;gap:14px"><div class="sh"><h2 style="font-size:22px">Badges</h2><span class="chip">${S.badges.length}/${BADGES.length}</span></div><div class="badges">${BADGES.map(([id,n,d])=>`<div class="badge ${S.badges.includes(id)?"":"off"}"><span class="ic">${S.badges.includes(id)?"★":"·"}</span><span><b>${n}</b><small>${d}</small></span></div>`).join("")}</div></section>
  <div class="grid g4"><div class="stat"><b>${S.bestStreak}</b><span>Meilleure série</span></div><div class="stat"><b>${S.reviews}</b><span>Cartes révisées</span></div><div class="stat"><b>${S.aiq}</b><span>Quiz mélange terminés</span></div><div class="stat"><b>${S.chats}</b><span>Questions à Nord</span></div></div>
  <div class="panel" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><b>Réinitialiser</b><p class="muted" style="font-size:14px">Efface XP, leçons, cartes, badges et profil.</p></div><div id="rz"><button class="btn ghost sm" id="rz1" type="button">Réinitialiser</button></div></div></div>`}
function bindProfil(){$("#pf").onsubmit=e=>{e.preventDefault();const goals=$$("input[name=goal]:checked").map(i=>i.value);const first=!S.profile;
  S.profile={age:$("#pAge").value,situation:$("#pSit").value,revenu:$("#pRev").value,depenses:$("#pDep").value,epargne:$("#pEp").value,goals,horizon:$("#pHz").value,risque:$("#pRisk").value};
  const map={precaution:"budget",bourse:"bourse",rp:"immo",locatif:"immo",impots:"impots",retraite:"enveloppes",crypto:"alternatifs"};S.profile.order=["budget","epargne",...goals.map(g=>map[g])].filter((v,i,a)=>a.indexOf(v)===i);
  save();if(first)addXP(30,"Plan créé");else toast("Plan mis à jour");route(true)};
  const pa=$("#planAi");if(pa)pa.onclick=()=>openNord("Voici mon profil (dans le contexte). Affine mon plan d'action en 5 étapes concrètes et ordonnées pour les 12 prochains mois, avec des montants indicatifs et les leçons du site à suivre.");
  $("#rz1").onclick=()=>{$("#rz").innerHTML=`<span class="muted" style="font-size:14px;margin-right:8px">Tout effacer ?</span><button class="btn ghost sm" id="rzN" type="button">Annuler</button> <button class="btn sm" id="rzY" type="button" style="background:var(--bad)">Oui, effacer</button>`;$("#rzN").onclick=()=>route(true);$("#rzY").onclick=()=>{S=def();save();pushRemote();toast("Progression effacée");route(true)}};bindMissions()}

/* ============================ RECHERCHE ============================ */
const IDX=[...LESSONS.map(l=>({k:"Leçon",t:l.title,s:l.sub.name+" · "+l.lvl.name,h:"#lecon-"+l.id,x:norm(l.title+" "+l.keys.join(" ")+" "+strip(l.body))})),...SUBJ.map(s=>({k:"Sujet",t:s.name,s:s.tagline,h:"#sujet-"+s.id,x:norm(s.name+" "+s.tagline)})),...GLOSS.map(g=>({k:"Définition",t:g.t,s:g.d,h:"#bibliotheque-glossaire",x:norm(g.t+" "+g.d)})),...RES.map(r=>({k:"Ressource",t:r.t,s:r.d,h:r.u,ext:1,x:norm(r.t+" "+r.d)})),...SIMS.map(([k,l])=>({k:"Simulateur",t:l,s:"",h:"#simulateurs-"+k,x:norm(l)}))];
function openSearch(){$("#sov").hidden=false;$("#sq").value="";drawSearch();setTimeout(()=>$("#sq").focus(),30)}
function closeSearch(){$("#sov").hidden=true}
function drawSearch(){const q=norm($("#sq").value.trim());let L;if(!q)L=IDX.filter(x=>x.k==="Sujet");else{const w=q.split(/\s+/);L=IDX.map(x=>({x,s:w.every(t=>x.x.includes(t))?(norm(x.t).includes(q)?3:1)+(x.k==="Leçon"?.5:0):0})).filter(r=>r.s>0).sort((a,b)=>b.s-a.s).slice(0,14).map(r=>r.x)}
  $("#sres").innerHTML=L.map((x,i)=>`<a href="${esc(x.h)}" ${x.ext?'target="_blank" rel="noopener"':""} class="${i===0?"sel":""}"><span class="k">${x.k}</span><span style="min-width:0"><b>${esc(x.t)}</b>${x.s?`<br><span class="muted" style="font-size:13px">${esc(x.s.slice(0,110))}</span>`:""}</span></a>`).join("")||`<div class="panel"><p class="muted">Rien trouvé. <button class="chip" id="sAsk" type="button">Demander à Nord</button></p></div>`;
  $$("#sres a").forEach(a=>a.onclick=closeSearch);const sa=$("#sAsk");if(sa)sa.onclick=()=>{const q=$("#sq").value;closeSearch();openNord(q)}}
$("#searchBtn").onclick=openSearch;$("#sq").oninput=drawSearch;$("#sov").onclick=e=>{if(e.target.id==="sov")closeSearch()};
$("#sq").onkeydown=e=>{if(e.key==="Enter"){const a=$("#sres a");if(a)a.click()}if(e.key==="Escape")closeSearch()};
addEventListener("keydown",e=>{const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
  if((e.key==="/"&&!typing)||(e.key.toLowerCase()==="k"&&(e.metaKey||e.ctrlKey))){e.preventDefault();openSearch()}
  if(e.key==="Escape"){closeSearch();closeNord()}
  if(!typing&&$("#sov").hidden&&(location.hash||"#accueil").startsWith("#accueil")){if(e.key==="ArrowRight")goSub(cur+1);if(e.key==="ArrowLeft")goSub(cur-1)}});

/* ============================ ROUTEUR ============================ */
function route(keepScroll){
  const h=(location.hash.slice(1)||"accueil").split("-");const r=h[0];const v=$("#view");
  if(window.BSL_3D.ok)window.BSL_3D.unmount();
  if(TTS.speaking&&r!=="lecon")stopSpeak();
  if(r==="sujet"&&SBYID[h[1]]){v.innerHTML=vSujet(h[1],h[2]);const s=SBYID[h[1]];sujetUI(s);mount3D("single",SUBJ.indexOf(s));bindMissions()}
  else if(r==="lecon"&&POOL[h.slice(1).join("-")]){const id=h.slice(1).join("-");v.innerHTML=vLecon(id);bindLecon(id)}
  else if(r==="quiz"||r==="quizia"){v.innerHTML=vQuiz(h.slice(1),r==="quizia");bindQuiz(h.slice(1),r==="quizia")}
  else if(r==="revisions"){v.innerHTML=vRevisions();bindRevisions()}
  else if(r==="simulateurs"){v.innerHTML=vSim(h[1]);bindSim()}
  else if(r==="bibliotheque"){v.innerHTML=vLib(h[1]);bindLib()}
  else if(r==="profil"){v.innerHTML=vProfil();bindProfil()}
  else{v.innerHTML=vAccueil();bindAccueil()}
  chrome();if($("#drawer").classList.contains("open"))renderSugg();
  if(!keepScroll)scrollTo({top:0});
}
addEventListener("hashchange",()=>route());
checkBadges();route();initSync();
})();
