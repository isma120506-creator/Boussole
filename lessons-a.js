/* Boussole — contenu pédagogique, partie A (modules 01 à 07). Chiffres vérifiés fin septembre 2026. */
window.BSL_TRACKS = [
  {id:"t1",name:"Les bases",desc:"Budget, banque, livrets, impôts : ce qu'il faut savoir avant d'investir.",c:"#1F46D1",cD:"#7B9BFF"},
  {id:"t2",name:"La Bourse",desc:"Actions, ETF, analyse et enveloppes fiscales (PEA, assurance-vie…).",c:"#6B3FC4",cD:"#B592F5"},
  {id:"t3",name:"L'immobilier",desc:"Acheter sa résidence principale, puis investir pour louer.",c:"#B8452B",cD:"#F2876F"},
  {id:"t4",name:"Aller plus loin",desc:"Actifs alternatifs, fiscalité du patrimoine, macro, stratégie.",c:"#0F7A6B",cD:"#4FCDB8"}
];
window.BSL_MODULES = [
/* ============================== 01 ============================== */
{id:"m01",code:"01",track:"t1",title:"Les fondations",tag:"Budget, épargne de précaution, intérêts composés",lessons:[
{id:"budget",title:"Faire un budget qui tient",min:6,body:`
<p>Avant de parler bourse ou immobilier, une seule question compte : <strong>combien il te reste à la fin du mois</strong>. Tout le reste (investir, emprunter, acheter) part de ce chiffre, qu'on appelle ta <strong>capacité d'épargne</strong>.</p>
<h3>La règle 50 / 30 / 20</h3>
<p>C'est un point de départ simple pour répartir ton revenu net :</p>
<ul><li><strong>50 %</strong> pour les besoins : loyer, courses, transport, assurance, forfait.</li><li><strong>30 %</strong> pour les envies : sorties, vêtements, abonnements, voyages.</li><li><strong>20 %</strong> pour l'épargne et l'investissement.</li></ul>
<div class="ex"><span class="eyebrow">Exemple alternant</span>Avec 1 100 € par mois : 550 € de besoins, 330 € d'envies, 220 € mis de côté. Sur un an, ça fait 2 640 € d'épargne sans rien sacrifier d'essentiel.</div>
<h3>Le vrai secret : se payer en premier</h3>
<p>Programme un <strong>virement automatique</strong> vers ton épargne le jour où ton salaire tombe. Ce que tu ne vois pas sur ton compte courant, tu ne le dépenses pas. C'est l'automatisme le plus rentable de toute la finance perso.</p>
<h3>Trois méthodes de suivi</h3>
<ul><li><strong>L'appli de ta banque</strong> : catégorisation automatique, zéro effort.</li><li><strong>Le tableur</strong> : plus de contrôle, idéal pour comprendre.</li><li><strong>Les enveloppes</strong> : un sous-compte par poste (courses, sorties). Quand l'enveloppe est vide, on s'arrête.</li></ul>
<p class="warn">Suis tes dépenses pendant un mois complet. La plupart des gens découvrent 50 à 150 € de « fuites » : abonnements oubliés, livraisons, petits achats.</p>`,
keys:["Ta capacité d'épargne est le point de départ de tout.","50/30/20 : besoins, envies, épargne.","Automatise l'épargne le jour de la paie : « se payer en premier »."],
quiz:[
{q:"Dans la règle 50/30/20, à quoi correspondent les 20 % ?",a:["Aux loisirs","À l'épargne et à l'investissement","Au loyer","Aux impôts"],c:1,e:"Les 20 % vont à l'épargne. 50 % pour les besoins, 30 % pour les envies."},
{q:"Que veut dire « se payer en premier » ?",a:["Acheter ce qu'on veut dès la paie","Virer automatiquement une somme vers l'épargne dès que le salaire arrive","Rembourser ses dettes en dernier","Demander une augmentation"],c:1,e:"On épargne d'abord, automatiquement, et on vit avec le reste."},
{q:"Avec 1 500 € nets, combien la règle 50/30/20 conseille-t-elle d'épargner ?",a:["150 €","450 €","300 €","750 €"],c:2,e:"20 % de 1 500 € = 300 €."}]},

{id:"precaution",title:"L'épargne de précaution",min:5,body:`
<p>L'épargne de précaution, c'est ton <strong>coussin de sécurité</strong> : de l'argent disponible immédiatement, sans risque, pour encaisser un coup dur (panne de voiture, frais médicaux, perte de job) sans t'endetter ni vendre tes placements au mauvais moment.</p>
<h3>Combien ?</h3>
<p>La règle courante : <strong>3 à 6 mois de dépenses</strong>. Plutôt 3 mois si ta situation est stable, plutôt 6 si tes revenus sont irréguliers ou si tu as une voiture, un logement ou des personnes à charge.</p>
<div class="ex"><span class="eyebrow">Calcul</span>Tu dépenses 900 € par mois → coussin visé entre 2 700 € et 5 400 €.</div>
<h3>Où la placer ?</h3>
<p>Sur des supports <strong>liquides et garantis</strong> : Livret A, LDDS, LEP si tu y as droit. Surtout pas en bourse : le jour où tu en as besoin, le marché peut être en baisse de 30 %.</p>
<h3>L'ordre des priorités</h3>
<ol><li>Rembourser les dettes chères (crédit conso, découvert).</li><li>Constituer l'épargne de précaution.</li><li>Seulement ensuite : investir sur le long terme.</li></ol>`,
keys:["3 à 6 mois de dépenses, disponibles tout de suite.","Sur des livrets garantis, jamais en bourse.","Dettes chères → précaution → investissement."],
quiz:[
{q:"Combien de mois de dépenses conseille-t-on généralement pour l'épargne de précaution ?",a:["1 mois","3 à 6 mois","12 à 24 mois","Aucune règle"],c:1,e:"3 à 6 mois de dépenses, selon la stabilité de tes revenus."},
{q:"Où placer son épargne de précaution ?",a:["Sur un ETF MSCI World","En cryptomonnaies","Sur un Livret A ou LDDS","Dans un bien immobilier"],c:2,e:"Elle doit être disponible à tout moment et sans risque de perte."},
{q:"Tu as un crédit conso à 9 % et 2 000 € d'économies. Que faire en premier ?",a:["Investir en bourse","Rembourser le crédit conso","Ouvrir un PEL","Acheter de l'or"],c:1,e:"Rembourser une dette à 9 %, c'est un « rendement » garanti de 9 %."}]},

{id:"composes",title:"Intérêts composés et inflation",min:7,body:`
<p>Les <strong>intérêts composés</strong>, c'est quand tes gains produisent à leur tour des gains. La première année, tu gagnes sur ton capital. La deuxième, sur ton capital <em>plus</em> les gains de l'année 1. La courbe s'accélère.</p>
<div class="ex"><span class="eyebrow">Exemple</span>1 000 € placés à 7 % par an :<br>après 10 ans → 1 967 € · après 20 ans → 3 870 € · après 30 ans → 7 612 €.</div>
<h3>La règle des 72</h3>
<p>Pour savoir en combien d'années ton argent double : <strong>72 ÷ taux</strong>. À 6 %, il double en 12 ans. À 2 %, en 36 ans.</p>
<h3>Commencer tôt change tout</h3>
<p>Léa investit 100 €/mois de 20 à 30 ans puis s'arrête. Tom investit 100 €/mois de 30 à 60 ans. À 7 %, à 60 ans, Léa (12 000 € versés) a environ 125 000 €. Tom (36 000 € versés) a environ 122 000 €. Dix ans d'avance valent plus que vingt ans d'efforts en plus.</p>
<h3>L'inflation, l'ennemi discret</h3>
<p>L'inflation, c'est la hausse générale des prix. Si ton argent rapporte 1,7 % et que les prix montent de 2 %, tu <strong>perds du pouvoir d'achat</strong>. Ce qui compte, c'est le <strong>rendement réel</strong> :</p>
<p class="ex"><span class="eyebrow">Formule approchée</span>Rendement réel ≈ rendement net − inflation</p>`,
keys:["Les gains génèrent des gains : commence tôt.","Règle des 72 : 72 ÷ taux = années pour doubler.","Rendement réel ≈ rendement − inflation."],
quiz:[
{q:"Selon la règle des 72, à 8 % par an, en combien de temps ton capital double-t-il ?",a:["8 ans","9 ans","12 ans","72 ans"],c:1,e:"72 ÷ 8 = 9 ans."},
{q:"Ton livret rapporte 1,7 % et l'inflation est de 2,5 %. Ton rendement réel est d'environ :",a:["+4,2 %","+1,7 %","−0,8 %","0 %"],c:2,e:"1,7 − 2,5 = −0,8 %. Tu perds du pouvoir d'achat."},
{q:"Pourquoi commencer à investir tôt est-il si puissant ?",a:["Les frais baissent avec l'âge","Les intérêts composés ont plus de temps pour s'accumuler","Les impôts sont plus bas pour les jeunes","Les banques offrent de meilleurs taux"],c:1,e:"L'effet boule de neige dépend surtout de la durée."}]}
]},

/* ============================== 02 ============================== */
{id:"m02",code:"02",track:"t1",title:"Banque & crédit",tag:"Compte courant, frais bancaires, crédit conso, fichage",lessons:[
{id:"banque",title:"Choisir sa banque et éviter les frais",min:6,body:`
<p>Une banque traditionnelle peut te coûter <strong>100 à 250 € par an</strong> (tenue de compte, carte, frais d'incidents). Une banque en ligne est souvent gratuite, sous conditions de revenus ou d'utilisation de la carte.</p>
<h3>Les frais qui piquent</h3>
<ul><li><strong>Commission d'intervention</strong> : facturée quand une opération passe alors que ton compte est dans le rouge (plafonnée par la loi : 8 € par opération, 80 € par mois).</li><li><strong>Agios</strong> : les intérêts du découvert, souvent 15 à 20 % par an.</li><li><strong>Frais de rejet</strong> de prélèvement ou de chèque.</li><li>Les frais de <strong>paiement en devises</strong> à l'étranger.</li></ul>
<h3>Ce que tu peux faire</h3>
<ol><li>Demande la <strong>plaquette tarifaire</strong> (obligatoire et publique).</li><li>Compare avec un comparateur public, comme celui du CCSF ou de service-public.fr.</li><li>Change de banque : la <strong>mobilité bancaire</strong> (loi Macron) oblige la nouvelle banque à transférer gratuitement tes prélèvements et virements.</li></ol>
<div class="ex"><span class="eyebrow">Astuce</span>Garde un compte dans une banque « physique » si tu vises un crédit immobilier plus tard : la relation client peut aider. Mais rien ne t'empêche d'avoir une banque en ligne à côté.</div>`,
keys:["Compare la plaquette tarifaire, les écarts sont énormes.","Le découvert coûte 15 à 20 % par an.","La mobilité bancaire est gratuite et gérée par la nouvelle banque."],
quiz:[
{q:"Qui s'occupe du transfert des prélèvements quand tu changes de banque ?",a:["Toi, un par un","La nouvelle banque, gratuitement","L'ancienne banque, contre des frais","La Banque de France"],c:1,e:"C'est le service de mobilité bancaire, gratuit."},
{q:"Les agios, ce sont :",a:["Les frais de carte","Les intérêts payés sur un découvert","Une prime de bienvenue","Un impôt bancaire"],c:1,e:"Ce sont les intérêts du découvert, souvent très élevés."},
{q:"Où trouver la liste des frais d'une banque ?",a:["Dans sa plaquette tarifaire","Nulle part, c'est secret","Au tribunal","Sur ton relevé d'impôts"],c:0,e:"La plaquette tarifaire est obligatoire et consultable par tous."}]},

{id:"creditconso",title:"Crédit conso, découvert et paiement fractionné",min:7,body:`
<p>Le <strong>crédit à la consommation</strong> finance un achat (voiture, équipement) ou donne de la trésorerie. Il coûte cher et il est facile d'en abuser.</p>
<h3>Les formes à connaître</h3>
<ul><li><strong>Prêt personnel</strong> : montant et durée fixes. Le plus transparent.</li><li><strong>Crédit affecté</strong> : lié à un achat précis (si la vente est annulée, le crédit l'est aussi).</li><li><strong>Crédit renouvelable</strong> (revolving) : une réserve d'argent qui se reconstitue. Taux très élevés, souvent proches du taux d'usure. À fuir.</li><li><strong>Paiement en 3 ou 4 fois / BNPL</strong> : pratique, mais il multiplie les petites dettes invisibles.</li></ul>
<h3>Le TAEG et le taux d'usure</h3>
<p>Le <strong>TAEG</strong> est le coût total annuel du crédit. La loi fixe un <strong>taux d'usure</strong> : un plafond au-delà duquel une banque n'a pas le droit de prêter. Il est publié chaque trimestre par la Banque de France.</p>
<h3>Si ça dérape</h3>
<p>Tu disposes de <strong>14 jours de rétractation</strong> après la signature d'un crédit conso. En cas de difficultés graves, la <strong>commission de surendettement</strong> de la Banque de France peut étaler ou effacer des dettes. Les incidents de remboursement caractérisés peuvent entraîner une inscription au <strong>FICP</strong>, qui bloque l'accès au crédit.</p>
<p class="warn">Règle simple : ne finance jamais à crédit ce qui perd de la valeur et que tu pourrais épargner en quelques mois.</p>`,
keys:["Le revolving est le crédit le plus dangereux.","14 jours de rétractation sur un crédit conso.","FICP = fichier des incidents de remboursement."],
quiz:[
{q:"Quel crédit est le plus risqué pour un particulier ?",a:["Le prêt immobilier","Le crédit renouvelable (revolving)","Le prêt étudiant garanti","Le crédit affecté"],c:1,e:"Taux très élevés et réserve qui se reconstitue : on peut s'y enfermer."},
{q:"Combien de jours de rétractation après un crédit conso ?",a:["3 jours","7 jours","14 jours","30 jours"],c:2,e:"14 jours calendaires."},
{q:"Le taux d'usure, c'est :",a:["Le taux du Livret A","Le taux maximum légal auquel une banque peut prêter","Le taux de l'inflation","Le taux de la BCE"],c:1,e:"Il plafonne les TAEG et est révisé chaque trimestre."}]},

{id:"pretetudiant",title:"Prêt étudiant et premiers contrats",min:5,body:`
<p>Le <strong>prêt étudiant</strong> sert à financer des études (frais d'école, logement). Sa particularité : le <strong>remboursement différé</strong>. Tu peux ne rembourser qu'à la fin de tes études.</p>
<h3>Différé total ou partiel</h3>
<ul><li><strong>Différé partiel</strong> : tu paies seulement les intérêts pendant les études.</li><li><strong>Différé total</strong> : tu ne paies rien, mais les intérêts s'ajoutent au capital. Le crédit coûte plus cher.</li></ul>
<h3>La garantie de l'État</h3>
<p>Le <strong>prêt étudiant garanti par l'État</strong> (via Bpifrance, dans les banques partenaires) permet d'emprunter sans caution parentale ni condition de ressources, dans la limite d'un plafond.</p>
<h3>Tes premiers contrats d'adulte</h3>
<ul><li><strong>Assurance habitation</strong> : obligatoire pour un locataire.</li><li><strong>Responsabilité civile</strong> : souvent incluse dans l'assurance habitation.</li><li><strong>Mutuelle</strong> : compare les garanties, pas seulement le prix.</li><li>Relis chaque année tes abonnements : la loi permet de résilier la plupart des contrats d'assurance à tout moment après un an.</li></ul>`,
keys:["Différé partiel : tu paies les intérêts. Total : ils s'accumulent.","Le prêt garanti par l'État évite la caution parentale.","Assurance habitation obligatoire pour un locataire."],
quiz:[
{q:"En différé total, que deviennent les intérêts pendant tes études ?",a:["Ils sont annulés","Ils s'ajoutent au capital à rembourser","L'État les paie","Ils sont payés par tes parents"],c:1,e:"Ils sont capitalisés : le crédit coûte plus cher au final."},
{q:"Le prêt étudiant garanti par l'État permet :",a:["D'emprunter sans caution","D'emprunter sans rembourser","D'avoir un taux à 0 % garanti","D'acheter un logement"],c:0,e:"Bpifrance garantit le prêt : pas besoin de caution."},
{q:"Quelle assurance est obligatoire pour un locataire ?",a:["L'assurance vie","L'assurance habitation","L'assurance emprunteur","Aucune"],c:1,e:"Le bailleur peut l'exiger chaque année."}]}
]},

/* ============================== 03 ============================== */
{id:"m03",code:"03",track:"t1",title:"Épargne sans risque",tag:"Livrets réglementés, PEL, comptes à terme, fonds euros",lessons:[
{id:"livrets",title:"Livret A, LDDS, LEP en 2026",min:6,body:`
<p>Les <strong>livrets réglementés</strong> ont des taux fixés par l'État, sont garantis, disponibles à tout moment et <strong>totalement défiscalisés</strong>. Le taux affiché est ton taux net.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Livret</th><th>Taux (1er août 2026)</th><th>Plafond</th><th>Pour qui</th></tr></thead><tbody>
<tr><td>Livret A</td><td class="n">1,70 %</td><td class="n">22 950 €</td><td>Tout le monde</td></tr>
<tr><td>LDDS</td><td class="n">1,70 %</td><td class="n">12 000 €</td><td>Majeurs</td></tr>
<tr><td>LEP</td><td class="n">2,50 %</td><td class="n">10 000 €</td><td>Sous conditions de revenus</td></tr>
<tr><td>Livret jeune</td><td class="n">≥ 1,70 %</td><td class="n">1 600 €</td><td>12–25 ans</td></tr></tbody></table></div>
<p>Le taux du Livret A est révisé deux fois par an (1er février et 1er août) selon une formule qui fait la moyenne de l'<strong>inflation</strong> et des <strong>taux courts</strong>. Il est passé de 1,5 % à 1,7 % le 1er août 2026, sa première hausse depuis 2023.</p>
<h3>Le LEP, le meilleur livret si tu y as droit</h3>
<p>Il est réservé aux revenus modestes (revenu fiscal de référence sous un plafond). En tant qu'étudiant ou alternant qui fait sa propre déclaration, tu es souvent éligible. Présente ton avis d'imposition à ta banque.</p>
<h3>Le Livret jeune</h3>
<p>Entre 12 et 25 ans, les banques proposent un Livret jeune au taux au moins égal au Livret A, parfois plus. Petit plafond, mais c'est un bonus.</p>
<p class="warn">Parfaits pour la précaution, mais sur 20 ans ils battent à peine l'inflation. Ce n'est pas un outil pour faire grossir un patrimoine.</p>`,
keys:["Livret A et LDDS : 1,7 % net depuis le 1er août 2026.","LEP : 2,5 %, sous conditions de revenus.","Livret jeune jusqu'à 25 ans : taux ≥ Livret A."],
quiz:[
{q:"Quel est le plafond de versement du Livret A ?",a:["10 000 €","12 000 €","22 950 €","150 000 €"],c:2,e:"22 950 € pour un particulier."},
{q:"Les intérêts du Livret A sont :",a:["Soumis à la flat tax","Soumis aux prélèvements sociaux uniquement","Totalement exonérés","Imposés au barème"],c:2,e:"Exonérés d'impôt et de prélèvements sociaux."},
{q:"Quel livret offre le meilleur taux garanti en 2026 ?",a:["Livret A","LDDS","LEP","Livret bancaire classique"],c:2,e:"Le LEP à 2,5 %, réservé aux revenus modestes."}]},

{id:"pel",title:"PEL, comptes à terme, fonds euros",min:6,body:`
<p>Au-delà des livrets, d'autres placements sont « sans risque » de perte en capital. Chacun a ses contreparties.</p>
<h3>Le PEL (plan épargne logement)</h3>
<p>Taux fixé à l'ouverture : <strong>2 % brut</strong> pour les PEL ouverts depuis le 1er janvier 2026, soit environ 1,4 % net. Versement minimum de 540 € par an. Intérêts taxés dès la première année, et un retrait ferme le plan.</p>
<h3>Le compte à terme (CAT)</h3>
<p>Tu bloques une somme pour une durée fixe à un taux garanti, autour de <strong>2,3 à 2,5 % brut</strong> en 2026. Les intérêts subissent la flat tax.</p>
<h3>Le fonds euros (assurance-vie)</h3>
<p>Le compartiment garanti d'une assurance-vie. Le capital est protégé par l'assureur et le rendement versé chaque année est acquis définitivement.</p>
<h3>Les fonds monétaires</h3>
<p>Des fonds (ou ETF) qui placent au jour le jour au taux de la BCE. Très peu risqués, logeables dans un PEA ou une assurance-vie : pratique pour « garer » de l'argent en attendant.</p>
<p class="warn">Méfie-toi des « super livrets » à 5 % : c'est un taux promotionnel de 2 ou 3 mois, puis il retombe sous 1 %.</p>`,
keys:["PEL 2026 : 2 % brut, taxé, retrait = clôture.","Compte à terme : taux garanti contre blocage.","Fonds monétaires : parking sûr dans un PEA ou une assurance-vie."],
quiz:[
{q:"Que se passe-t-il si tu retires de l'argent d'un PEL ?",a:["Rien de spécial","Le plan est clôturé","Tu paies une amende de 10 %","Le taux double"],c:1,e:"Tout retrait sur un PEL entraîne sa clôture."},
{q:"Un super livret affiche « 5 % ». Le piège le plus fréquent ?",a:["Il est plafonné à 100 €","Le taux est promotionnel pendant quelques mois seulement","Il est réservé aux retraités","Il n'est pas garanti"],c:1,e:"Le taux boosté dure en général 2 à 3 mois."},
{q:"Un fonds monétaire :",a:["Investit dans les actions tech","Place au jour le jour, proche du taux de la BCE","Est un livret réglementé","Est interdit en PEA"],c:1,e:"Il suit les taux courts et varie très peu."}]}
]},

/* ============================== 04 ============================== */
{id:"m04",code:"04",track:"t1",title:"Impôts : les bases",tag:"Barème, TMI, prélèvement à la source, jobs étudiants",lessons:[
{id:"ir",title:"Comment marche l'impôt sur le revenu",min:8,body:`
<p>L'impôt sur le revenu est <strong>progressif</strong> : ton revenu est découpé en tranches, et chaque tranche a son taux. On ne paie pas 30 % sur tout son revenu parce qu'on « passe dans la tranche à 30 % ».</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Tranche (par part, revenus 2025)</th><th>Taux</th></tr></thead><tbody>
<tr><td>Jusqu'à 11 600 €</td><td class="n">0 %</td></tr><tr><td>De 11 600 à 29 579 €</td><td class="n">11 %</td></tr><tr><td>De 29 579 à 84 577 €</td><td class="n">30 %</td></tr><tr><td>De 84 577 à 181 917 €</td><td class="n">41 %</td></tr><tr><td>Au-delà de 181 917 €</td><td class="n">45 %</td></tr></tbody></table></div>
<h3>TMI et taux moyen</h3>
<p>La <strong>TMI</strong> (tranche marginale d'imposition) est le taux de ta dernière tranche. Le <strong>taux moyen</strong> est ce que tu paies réellement en moyenne, toujours plus bas. La TMI sert à évaluer un PER ou l'option pour le barème.</p>
<div class="ex"><span class="eyebrow">Exemple</span>20 000 € de revenu imposable, 1 part : 0 € sur les 11 600 premiers, 11 % sur les 8 400 suivants = 924 €. TMI 11 %, taux moyen 4,6 %.</div>
<h3>Parts et quotient familial</h3>
<p>Le revenu est divisé par le nombre de <strong>parts</strong> (1 pour un célibataire, 2 pour un couple marié ou pacsé, + 0,5 par enfant pour les deux premiers). Plus de parts = tranches plus larges.</p>
<h3>Le prélèvement à la source</h3>
<p>Depuis 2019, l'impôt est prélevé directement sur ton salaire selon un taux calculé par l'administration. Chaque printemps, tu déclares tes revenus de l'année précédente pour régulariser.</p>`,
keys:["L'impôt est progressif, tranche par tranche.","TMI ≠ taux moyen.","Prélèvement à la source + déclaration annuelle pour régulariser."],
quiz:[
{q:"Tu passes dans la tranche à 30 %. Que se passe-t-il ?",a:["Tout ton revenu est taxé à 30 %","Seule la partie au-delà du seuil est taxée à 30 %","Tu ne paies plus d'impôt","Ton taux moyen devient 30 %"],c:1,e:"Chaque tranche garde son taux : seule la fraction au-dessus du seuil est taxée à 30 %."},
{q:"La TMI, c'est :",a:["Le taux moyen payé","Le taux de la dernière tranche atteinte","La taxe municipale","Le taux de la flat tax"],c:1,e:"Tranche marginale d'imposition."},
{q:"Combien de parts pour un célibataire sans enfant ?",a:["0,5","1","2","3"],c:1,e:"Une part."}]},

{id:"impotsetudiant",title:"Impôts quand on est étudiant ou alternant",min:7,body:`
<p>Bonne nouvelle : beaucoup de revenus d'étudiants sont <strong>exonérés</strong>. Encore faut-il le savoir et le déclarer correctement.</p>
<h3>Les exonérations principales</h3>
<ul><li><strong>Salaire d'apprenti</strong> : exonéré dans la limite du <strong>montant annuel du SMIC</strong>.</li><li><strong>Jobs étudiants</strong> (25 ans au plus au 1er janvier) : salaires exonérés jusqu'à <strong>3 fois le SMIC mensuel</strong> par an.</li><li><strong>Gratification de stage</strong> : exonérée jusqu'au montant annuel du SMIC.</li><li>Les <strong>bourses sur critères sociaux</strong> ne sont pas imposables.</li></ul>
<h3>Rattaché ou indépendant ?</h3>
<p>Tu peux rester <strong>rattaché au foyer fiscal de tes parents</strong> jusqu'à 21 ans, ou 25 ans si tu es étudiant. Tes parents gardent une demi-part, mais doivent déclarer tes revenus. Sinon tu fais ta propre déclaration.</p>
<p>Faire ta propre déclaration a des avantages : un <strong>avis d'imposition à ton nom</strong> (utile pour le LEP, un logement, une bourse), et l'accès à des dispositifs réservés aux faibles revenus. À comparer chaque année avec l'impact pour tes parents.</p>
<div class="ex"><span class="eyebrow">Réflexe</span>Même si tu n'es pas imposable, déclare-toi : ton avis de non-imposition sert de justificatif partout (LEP, CAF, logement social, PEA jeune…).</div>
<h3>Le prélèvement à la source d'un alternant</h3>
<p>Si ton salaire est sous le seuil d'exonération, tu peux demander un <strong>taux à 0 %</strong> dans ton espace impots.gouv.fr pour éviter un prélèvement inutile.</p>`,
keys:["Salaire d'apprenti exonéré jusqu'au SMIC annuel.","Rattachement possible jusqu'à 25 ans si étudiant.","Déclare-toi même non imposable : l'avis sert de justificatif."],
quiz:[
{q:"Jusqu'à quel montant le salaire d'un apprenti est-il exonéré d'impôt ?",a:["1 000 € par an","Le montant annuel du SMIC","3 SMIC mensuels","Il n'est jamais exonéré"],c:1,e:"Exonération dans la limite du SMIC annuel."},
{q:"Jusqu'à quel âge peut-on être rattaché au foyer fiscal de ses parents si on est étudiant ?",a:["18 ans","21 ans","25 ans","30 ans"],c:2,e:"21 ans en général, 25 ans pour les étudiants."},
{q:"Pourquoi faire sa propre déclaration même sans impôt à payer ?",a:["Pour payer moins de TVA","Pour obtenir un avis d'imposition à son nom (LEP, logement…)","C'est obligatoire dès 16 ans","Pour toucher une prime"],c:1,e:"L'avis de (non-)imposition est demandé partout."}]},

{id:"declarer",title:"Bien remplir sa déclaration",min:6,body:`
<p>La déclaration de revenus se fait chaque printemps sur <strong>impots.gouv.fr</strong>. Elle est en grande partie <strong>pré-remplie</strong>, mais c'est à toi de vérifier.</p>
<h3>Ce qu'il faut vérifier</h3>
<ul><li>Les <strong>salaires</strong> déclarés par ton employeur (et la part exonérée si tu es apprenti).</li><li>Les <strong>revenus de placements</strong> : ta banque transmet un IFU (imprimé fiscal unique) pour le compte-titres, les dividendes, les intérêts.</li><li>Les <strong>frais réels</strong> : si tes frais professionnels (trajets, repas) dépassent la déduction forfaitaire de 10 %, tu peux les déduire à la place.</li></ul>
<h3>Réductions et crédits d'impôt</h3>
<p>Une <strong>réduction</strong> diminue l'impôt, mais pas en dessous de zéro. Un <strong>crédit</strong> d'impôt peut être remboursé même si tu ne paies pas d'impôt. Exemples : dons aux associations (66 % du don en réduction), emploi à domicile (crédit de 50 %).</p>
<h3>Le compte-titres étranger</h3>
<p>Si tu ouvres un compte chez un courtier étranger, tu dois le <strong>déclarer</strong> (formulaire 3916). L'oubli coûte une amende par compte.</p>
<p class="warn">Une erreur de bonne foi se corrige : tu peux modifier ta déclaration en ligne pendant l'été, puis faire une réclamation ensuite.</p>`,
keys:["Pré-remplie ne veut pas dire exacte : vérifie.","Réduction ≠ crédit d'impôt.","Compte à l'étranger = formulaire 3916 obligatoire."],
quiz:[
{q:"Quelle différence entre une réduction et un crédit d'impôt ?",a:["Aucune","Le crédit peut être remboursé si tu n'as pas d'impôt","La réduction est toujours plus élevée","Le crédit est réservé aux entreprises"],c:1,e:"Le crédit d'impôt est « remboursable »."},
{q:"Tu ouvres un compte chez un courtier étranger. Que dois-tu faire ?",a:["Rien","Le déclarer avec le formulaire 3916","Prévenir la Banque de France","Payer une taxe d'ouverture"],c:1,e:"Tout compte détenu à l'étranger doit être déclaré."},
{q:"L'IFU, c'est :",a:["Un impôt foncier","Le récapitulatif fiscal envoyé par ta banque pour tes placements","Un identifiant fiscal","Une aide de la CAF"],c:1,e:"Imprimé fiscal unique : il récapitule dividendes, intérêts, plus-values."}]}
]},

/* ============================== 05 ============================== */
{id:"m05",code:"05",track:"t2",title:"La Bourse : les bases",tag:"Actions, obligations, ETF, risque, ordres",lessons:[
{id:"actions",title:"C'est quoi une action ?",min:6,body:`
<p>Une <strong>action</strong>, c'est une petite part de propriété d'une entreprise. Acheter une action Air Liquide, c'est devenir copropriétaire d'Air Liquide, pour une part minuscule.</p>
<h3>Comment on gagne de l'argent</h3>
<ul><li><strong>La plus-value</strong> : tu revends plus cher que ton prix d'achat.</li><li><strong>Les dividendes</strong> : une partie des bénéfices reversée aux actionnaires.</li></ul>
<h3>Pourquoi le prix bouge</h3>
<p>Le cours d'une action est fixé par l'offre et la demande, en temps réel. Il reflète ce que les investisseurs pensent des <strong>bénéfices futurs</strong> de l'entreprise.</p>
<h3>Les indices</h3>
<p>Un <strong>indice</strong> est un panier d'actions qui sert de thermomètre : le <strong>CAC 40</strong> (40 grandes entreprises françaises), le <strong>S&amp;P 500</strong> (500 grandes entreprises américaines), le <strong>MSCI World</strong> (environ 1 400 entreprises de 23 pays développés), le <strong>MSCI ACWI</strong> (pays développés + émergents).</p>
<div class="ex"><span class="eyebrow">Repère historique</span>Sur très longue période, les actions mondiales ont rapporté en moyenne autour de 6 à 8 % par an, dividendes réinvestis. Avec des années à −30 % ou −40 % (2008, par exemple).</div>`,
keys:["Action = part d'entreprise.","Gains : plus-value + dividendes.","Un indice mesure un panier d'actions."],
quiz:[
{q:"Posséder une action, c'est :",a:["Prêter de l'argent à une entreprise","Détenir une part de propriété d'une entreprise","Avoir un compte dans une banque","Acheter un produit garanti"],c:1,e:"Prêter, c'est une obligation. L'action est une part de propriété."},
{q:"Un dividende, c'est :",a:["Une taxe sur les actions","Une partie des bénéfices reversée aux actionnaires","Les frais du courtier","La baisse d'une action"],c:1,e:"L'entreprise redistribue une partie de ses bénéfices."},
{q:"Le MSCI World regroupe :",a:["Les 40 plus grandes entreprises françaises","Environ 1 400 entreprises de pays développés","Uniquement des entreprises américaines","Des obligations d'État"],c:1,e:"Environ 1 400 entreprises, avec une forte part américaine (autour de 70 %)."}]},

{id:"obligations",title:"Obligations et taux d'intérêt",min:6,body:`
<p>Une <strong>obligation</strong>, c'est un prêt. Tu prêtes à un État ou une entreprise, qui te verse des intérêts (le <strong>coupon</strong>) puis te rembourse à l'<strong>échéance</strong>.</p>
<div class="ex"><span class="eyebrow">Exemple</span>L'État français emprunte via les <strong>OAT</strong>. Fin septembre 2026, l'OAT 10 ans dépasse 4 %, un niveau inédit depuis 2009. C'est ce taux qui influence celui de ton crédit immobilier.</div>
<h3>La règle d'or : prix et taux vont en sens inverse</h3>
<p>Si les taux montent, les anciennes obligations (qui rapportent moins) valent moins cher. S'ils baissent, elles prennent de la valeur. C'est pour ça que 2022 a été terrible pour les obligations.</p>
<h3>Le risque de crédit</h3>
<p>Plus l'emprunteur est fragile, plus il paie cher. Les agences de notation (S&amp;P, Moody's, Fitch) notent les émetteurs de AAA à D. En dessous de BBB−, on parle de <strong>high yield</strong> (haut rendement, haut risque).</p>
<h3>À quoi ça sert ?</h3>
<p>Les obligations sont moins volatiles que les actions. Elles <strong>amortissent les chocs</strong>, surtout quand l'horizon se rapproche.</p>`,
keys:["Obligation = prêt avec coupon et échéance.","Taux ↑ → prix des obligations ↓.","Notation : de AAA (très sûr) à D (défaut)."],
quiz:[
{q:"Si les taux d'intérêt montent, le prix des obligations existantes :",a:["Monte","Baisse","Ne bouge pas","Double"],c:1,e:"Prix et taux évoluent en sens inverse."},
{q:"Le « coupon » d'une obligation, c'est :",a:["Une réduction chez le courtier","L'intérêt versé régulièrement","La date de remboursement","Le nom de l'émetteur"],c:1,e:"Le coupon est l'intérêt périodique."},
{q:"Une obligation « high yield » :",a:["Est garantie par l'État","Rapporte plus mais avec un risque de défaut plus élevé","Est réservée aux banques","Ne verse pas d'intérêts"],c:1,e:"Haut rendement = émetteur plus fragile."}]},

{id:"etf",title:"ETF et diversification",min:7,body:`
<p>Un <strong>ETF</strong> (ou tracker) est un fonds coté qui <strong>réplique un indice</strong>. En achetant une seule part d'ETF MSCI World, tu détiens indirectement plus de 1 400 entreprises.</p>
<h3>Pourquoi les ETF ont tout changé</h3>
<ul><li><strong>Frais très bas</strong> : 0,1 à 0,4 % par an (le TER), contre 1,5 à 2,5 % pour beaucoup de fonds actifs.</li><li><strong>Diversification immédiate</strong>.</li><li><strong>Simplicité</strong> : pas besoin de choisir des entreprises.</li></ul>
<div class="ex"><span class="eyebrow">L'impact des frais sur 30 ans</span>10 000 € à 7 % brut : avec 0,2 % de frais → environ 72 000 €. Avec 2 % de frais → environ 43 000 €.</div>
<h3>Réplication physique ou synthétique</h3>
<p>Un ETF <strong>physique</strong> achète vraiment les actions de l'indice. Un ETF <strong>synthétique</strong> utilise un contrat d'échange (swap) avec une banque pour obtenir la performance. C'est ce qui permet d'avoir des ETF monde <strong>éligibles au PEA</strong>.</p>
<h3>Capitalisant ou distribuant ?</h3>
<p>Un ETF <strong>capitalisant</strong> réinvestit les dividendes (idéal pour les intérêts composés). Un <strong>distribuant</strong> te les verse, imposés hors enveloppe.</p>
<h3>Lire le nom d'un ETF</h3>
<p>Émetteur + indice + particularités : « Amundi MSCI World UCITS ETF Acc » = émetteur Amundi, indice MSCI World, norme européenne UCITS, capitalisant (Acc). Le code <strong>ISIN</strong> l'identifie de façon unique.</p>`,
keys:["ETF = réplique un indice, frais minuscules.","Synthétique = swap, ce qui rend des ETF monde éligibles PEA.","Capitalisant (Acc) = dividendes réinvestis."],
quiz:[
{q:"Un ETF MSCI World te permet de :",a:["Parier sur une seule entreprise","Détenir d'un coup plus de 1 400 entreprises","Obtenir un rendement garanti","Éviter tout risque"],c:1,e:"Diversification immédiate, mais pas de garantie."},
{q:"Pourquoi des ETF monde sont-ils éligibles au PEA ?",a:["Parce qu'ils ne contiennent que des actions françaises","Grâce à la réplication synthétique (swap)","C'est une erreur","Parce qu'ils sont garantis"],c:1,e:"Le fonds détient des actions européennes et échange leur performance contre celle de l'indice monde."},
{q:"Le TER d'un ETF, c'est :",a:["Son rendement annuel","Ses frais annuels","Son nombre de lignes","Sa note de risque"],c:1,e:"Total Expense Ratio."}]},

{id:"risque",title:"Risque, volatilité et horizon",min:6,body:`
<p>La <strong>volatilité</strong> mesure l'ampleur des variations d'un placement. Les actions sont très volatiles : −20 % en quelques semaines, ça arrive. Un <strong>krach</strong>, c'est une chute brutale et généralisée.</p>
<h3>Le temps réduit le risque</h3>
<p>Sur 1 an, des actions mondiales peuvent perdre 40 %. Historiquement, sur <strong>15 ans ou plus</strong>, un portefeuille diversifié en actions mondiales a presque toujours fini en positif. Ce n'est pas une garantie : <strong>n'investis en bourse que l'argent dont tu n'as pas besoin avant 8 à 10 ans</strong>.</p>
<h3>Le drawdown</h3>
<p>Le <strong>drawdown</strong> est la baisse depuis le plus haut. Attention à l'asymétrie : après −50 %, il faut +100 % pour revenir au point de départ.</p>
<h3>L'échelle SRI</h3>
<p>Chaque fonds affiche un indicateur de risque de <strong>1 (très faible) à 7 (très élevé)</strong> dans son document d'informations clés (DIC). Un ETF actions monde est en général à 4 ou 5.</p>
<p class="warn">La pire erreur n'est pas la baisse, c'est de <strong>vendre pendant la baisse</strong> par panique.</p>`,
keys:["L'horizon long réduit fortement le risque.","−50 % demande +100 % pour revenir.","SRI : risque de 1 à 7 dans le DIC."],
quiz:[
{q:"Quel horizon minimum conseille-t-on pour investir en actions ?",a:["6 mois","1 an","8 à 10 ans ou plus","Aucun"],c:2,e:"Les marchés peuvent rester en baisse plusieurs années."},
{q:"Après une baisse de 50 %, quelle hausse faut-il pour revenir au départ ?",a:["+50 %","+75 %","+100 %","+25 %"],c:2,e:"100 € → 50 € → il faut doubler pour revenir à 100 €."},
{q:"L'indicateur SRI d'un fonds va de :",a:["A à G","1 à 7","0 à 100","1 à 5 étoiles"],c:1,e:"1 = très faible risque, 7 = très élevé."}]},

{id:"courtiers",title:"Courtiers, ordres et frais",min:5,body:`
<p>Pour acheter des actions ou des ETF, il te faut un <strong>intermédiaire</strong> : banque traditionnelle, banque en ligne ou courtier en ligne.</p>
<h3>Les frais à surveiller</h3>
<ul><li><strong>Frais de courtage</strong> : payés à chaque achat/vente.</li><li><strong>Droits de garde</strong> : frais annuels (souvent 0 € chez les courtiers en ligne).</li><li><strong>Frais de l'ETF</strong> (TER).</li><li><strong>Frais de change</strong> si tu achètes en dollars.</li></ul>
<h3>Les ordres</h3>
<ul><li><strong>Au marché</strong> : exécuté tout de suite, au prix disponible.</li><li><strong>À cours limité</strong> : tu fixes un prix maximum d'achat (ou minimum de vente). Le plus sûr.</li><li><strong>À seuil / plage de déclenchement</strong> (stop) : se déclenche quand un prix est franchi, souvent utilisé pour limiter une perte.</li></ul>
<h3>Le spread</h3>
<p>L'écart entre le meilleur prix d'achat et le meilleur prix de vente. Sur un ETF très échangé, il est minuscule. Sur un petit titre, il peut coûter plus que le courtage.</p>
<div class="ex"><span class="eyebrow">Astuce</span>Euronext Paris est ouvert de 9h à 17h30. Évite les 15 premières minutes, où les écarts de prix sont plus larges.</div>`,
keys:["Compare courtage, droits de garde, change.","Ordre à cours limité = tu contrôles le prix.","Le spread est un coût caché."],
quiz:[
{q:"Un ordre à cours limité :",a:["S'exécute toujours immédiatement","Ne s'exécute que si ton prix limite est atteint","Est interdit sur les ETF","Coûte plus cher en impôts"],c:1,e:"Tu fixes le prix : l'ordre attend."},
{q:"Le spread, c'est :",a:["Une taxe","L'écart entre prix d'achat et prix de vente","Un type d'ETF","La commission du courtier"],c:1,e:"C'est un coût implicite à chaque transaction."},
{q:"Quelles sont les heures d'ouverture d'Euronext Paris ?",a:["24h/24","8h–20h","9h–17h30","10h–16h"],c:2,e:"La séance continue va de 9h à 17h30."}]}
]},

/* ============================== 06 ============================== */
{id:"m06",code:"06",track:"t2",title:"La Bourse : aller plus loin",tag:"Lire des comptes, valorisation, stock picking, devises",lessons:[
{id:"comptes",title:"Lire les comptes d'une entreprise",min:8,body:`
<p>Si tu veux choisir des actions toi-même, tu dois savoir lire trois documents publiés chaque année (et souvent chaque trimestre).</p>
<h3>Le compte de résultat</h3>
<p>Ce que l'entreprise a gagné sur l'année : <strong>chiffre d'affaires</strong> (ventes) → moins les coûts → <strong>résultat d'exploitation</strong> → moins les intérêts et impôts → <strong>résultat net</strong> (le bénéfice).</p>
<h3>Le bilan</h3>
<p>Une photo à une date donnée : ce que l'entreprise <strong>possède</strong> (actif : usines, trésorerie, stocks) et ce qu'elle <strong>doit</strong> (passif : dettes, capitaux propres). Regarde surtout la <strong>dette nette</strong> (dettes − trésorerie).</p>
<h3>Le tableau des flux de trésorerie</h3>
<p>L'argent réellement entré et sorti. Le chiffre clé : le <strong>free cash-flow</strong>, l'argent qui reste après les investissements. Une entreprise peut afficher un bénéfice et brûler du cash.</p>
<h3>Les marges à suivre</h3>
<ul><li><strong>Marge opérationnelle</strong> = résultat d'exploitation ÷ chiffre d'affaires.</li><li><strong>Marge nette</strong> = résultat net ÷ chiffre d'affaires.</li><li>Comparer ces marges <strong>au sein d'un même secteur</strong> : un supermarché à 3 % peut être excellent, un éditeur de logiciels à 3 % inquiétant.</li></ul>
<p class="warn">Où trouver les comptes : rubrique « Investisseurs » du site de l'entreprise (document d'enregistrement universel, rapports annuels).</p>`,
keys:["Compte de résultat = l'année ; bilan = une photo.","Free cash-flow : l'argent qui reste vraiment.","Compare les marges dans un même secteur."],
quiz:[
{q:"Quel document montre ce qu'une entreprise possède et doit à une date donnée ?",a:["Le compte de résultat","Le bilan","Le cours de bourse","Le DIC"],c:1,e:"Le bilan est une photo du patrimoine de l'entreprise."},
{q:"Le free cash-flow, c'est :",a:["Le chiffre d'affaires","L'argent restant après les investissements","Le dividende","La dette"],c:1,e:"Il montre la capacité réelle à financer dividendes, rachats ou désendettement."},
{q:"Marge nette = ?",a:["Résultat net ÷ chiffre d'affaires","Chiffre d'affaires ÷ dette","Dividende ÷ cours","Cours ÷ bénéfice"],c:0,e:"La part de chaque euro de ventes qui finit en bénéfice."}]},

{id:"valorisation",title:"Valorisation : PER, rendement, cher ou pas cher ?",min:7,body:`
<p>Une bonne entreprise n'est pas forcément un bon investissement : tout dépend du <strong>prix</strong> que tu paies.</p>
<h3>Le PER (price earnings ratio)</h3>
<p><strong>PER = cours ÷ bénéfice par action</strong>. Un PER de 20 signifie que tu paies 20 années de bénéfices actuels. Historiquement, le marché mondial tourne autour de 15 à 20. Un PER élevé signale des attentes de croissance fortes (et plus de risque de déception).</p>
<h3>Le rendement du dividende</h3>
<p><strong>Dividende annuel ÷ cours</strong>. 4 % peut être attractif, 10 % est souvent un signal d'alerte : le marché anticipe peut-être une baisse du dividende.</p>
<h3>Autres ratios</h3>
<ul><li><strong>Capitalisation</strong> = cours × nombre d'actions : la valeur totale en bourse.</li><li><strong>PBR</strong> (price to book) = capitalisation ÷ capitaux propres.</li><li><strong>EV/EBITDA</strong> : compare la valeur de l'entreprise (dette incluse) à ses bénéfices d'exploitation.</li></ul>
<div class="ex"><span class="eyebrow">Exemple</span>Action à 50 €, bénéfice par action 2,50 €, dividende 1,50 € → PER 20, rendement 3 %.</div>
<p class="warn">Aucun ratio ne suffit seul. Les ratios se comparent aux concurrents du même secteur et à l'historique de l'entreprise.</p>`,
keys:["PER = cours ÷ bénéfice par action.","Rendement = dividende ÷ cours.","Un ratio se compare au secteur et à l'historique."],
quiz:[
{q:"Action à 60 €, bénéfice par action de 3 €. PER ?",a:["3","18","20","180"],c:2,e:"60 ÷ 3 = 20."},
{q:"Un rendement du dividende de 12 % est souvent :",a:["Une affaire garantie","Un signal d'alerte","Impossible","Imposé à 0 %"],c:1,e:"Le marché anticipe souvent une coupe du dividende ou des difficultés."},
{q:"La capitalisation boursière, c'est :",a:["Le chiffre d'affaires","Cours × nombre d'actions","Le bénéfice net","La dette"],c:1,e:"La valeur totale de l'entreprise en bourse."}]},

{id:"stockpicking",title:"Gestion passive ou stock picking ?",min:6,body:`
<p>Deux philosophies s'opposent : essayer de <strong>battre le marché</strong> (choisir les meilleures actions, le bon moment) ou <strong>acheter tout le marché</strong> via des ETF.</p>
<h3>Ce que disent les chiffres</h3>
<p>Les études SPIVA de S&amp;P le montrent année après année : sur 10 à 15 ans, <strong>une large majorité des fonds gérés activement font moins bien que leur indice</strong>, principalement à cause de leurs frais.</p>
<h3>Pourquoi c'est si dur</h3>
<ul><li>Tu joues contre des professionnels avec plus d'informations.</li><li>Les rendements de la bourse viennent d'une <strong>minorité d'actions</strong> : rater quelques grands gagnants suffit à sous-performer.</li><li>Les frais et la fiscalité de chaque vente grignotent le résultat.</li></ul>
<h3>Une approche « cœur + satellite »</h3>
<p>Beaucoup d'investisseurs gardent un <strong>cœur</strong> de 80 à 90 % en ETF larges, et un <strong>satellite</strong> de 10 à 20 % pour choisir des actions qui les passionnent. Tu apprends sans mettre en danger l'essentiel.</p>`,
keys:["La majorité des gérants actifs ne battent pas leur indice sur 10 ans.","Les frais sont la cause principale.","Cœur (ETF) + satellite (actions choisies)."],
quiz:[
{q:"Sur 10 à 15 ans, la plupart des fonds actifs :",a:["Battent leur indice","Font moins bien que leur indice","Sont garantis","Ont des frais nuls"],c:1,e:"C'est le constat répété des études SPIVA."},
{q:"L'approche « cœur + satellite » consiste à :",a:["Tout mettre sur une action","Garder l'essentiel en ETF larges et une petite part en choix personnels","Acheter uniquement des obligations","Trader tous les jours"],c:1,e:"80–90 % d'indiciel, 10–20 % de stock picking."},
{q:"Pourquoi rater quelques grandes actions coûte-t-il cher ?",a:["Parce qu'une minorité d'actions fait l'essentiel des gains","Parce qu'elles versent des taxes","Parce qu'elles sont obligatoires","Ça ne coûte rien"],c:0,e:"La performance du marché est très concentrée."}]},

{id:"monde",title:"Pays, devises et secteurs",min:6,body:`
<p>Investir « monde », c'est aussi s'exposer à des <strong>devises</strong> et à des <strong>concentrations</strong> qu'il faut connaître.</p>
<h3>La concentration américaine</h3>
<p>Le MSCI World est composé à environ <strong>70 % d'actions américaines</strong>, et les 10 premières entreprises (surtout la tech) pèsent un quart de l'indice. Diversifié, oui, mais pas équilibré.</p>
<h3>Le risque de change</h3>
<p>Si tu détiens des actions américaines et que le dollar baisse face à l'euro, ta performance en euros baisse. Certains ETF sont <strong>couverts</strong> (hedged) contre ce risque, avec un léger coût.</p>
<h3>Les pays émergents</h3>
<p>Chine, Inde, Brésil, Taïwan… Plus de croissance attendue, plus de volatilité, des risques politiques. Un ETF <strong>MSCI Emerging Markets</strong> ou un indice <strong>ACWI</strong> (monde entier) les inclut, souvent pour 10 à 12 %.</p>
<h3>Les ETF sectoriels et thématiques</h3>
<p>Santé, énergie, IA, eau… Ils sont souvent lancés <strong>après</strong> une forte hausse du thème, avec des frais plus élevés. À réserver à la partie satellite.</p>`,
keys:["MSCI World ≈ 70 % États-Unis.","Le change influence ta performance en euros.","Thématiques : à petite dose, souvent achetées trop tard."],
quiz:[
{q:"Quelle part environ des États-Unis dans le MSCI World ?",a:["20 %","45 %","70 %","95 %"],c:2,e:"Environ 70 %."},
{q:"Un ETF « hedged » :",a:["Est couvert contre le risque de change","N'a pas de frais","Ne contient que des obligations","Est interdit en France"],c:0,e:"Il neutralise en grande partie les variations de devises."},
{q:"Quel indice inclut à la fois pays développés et émergents ?",a:["CAC 40","S&P 500","MSCI ACWI","Euro Stoxx 50"],c:2,e:"ACWI = All Country World Index."}]}
]},

/* ============================== 07 ============================== */
{id:"m07",code:"07",track:"t2",title:"Les enveloppes",tag:"PEA, compte-titres, assurance-vie, PER",lessons:[
{id:"pea",title:"Le PEA, l'arme fiscale n°1",min:8,body:`
<p>Le <strong>Plan d'Épargne en Actions</strong> est une enveloppe fiscale : tu y places des actions et ETF <strong>européens (ou éligibles)</strong>, et après 5 ans tes gains échappent à l'impôt sur le revenu.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Retrait</th><th>Fiscalité des gains (2026)</th><th>Conséquence</th></tr></thead><tbody>
<tr><td>Avant 5 ans</td><td class="n">31,4 % (12,8 % + 18,6 %)</td><td>Clôture du plan (sauf exceptions)</td></tr>
<tr><td>Après 5 ans</td><td class="n">18,6 % (prélèvements sociaux seuls)</td><td>Le plan reste ouvert</td></tr></tbody></table></div>
<h3>Les règles clés</h3>
<ul><li><strong>Plafond de versements : 150 000 €</strong> (les gains peuvent le dépasser).</li><li>Un seul PEA par personne majeure.</li><li><strong>PEA Jeune</strong> : 18–25 ans rattachés au foyer fiscal des parents, plafond 20 000 €.</li><li><strong>PEA-PME</strong> : pour les petites entreprises, plafond commun de 225 000 € avec le PEA.</li><li>Il existe des <strong>ETF monde éligibles au PEA</strong> (MSCI World, S&amp;P 500).</li></ul>
<h3>Le conseil qui vaut de l'or</h3>
<p>C'est la <strong>date d'ouverture</strong> qui fait courir les 5 ans. Ouvre un PEA dès maintenant avec quelques euros : l'horloge fiscale tourne déjà.</p>
<p class="warn">La hausse de la CSG votée pour 2026 a porté les prélèvements sociaux du PEA de 17,2 % à 18,6 %. L'avantage reste énorme : 12,8 points économisés par rapport au compte-titres.</p>`,
keys:["Après 5 ans : seulement 18,6 % de prélèvements sociaux.","Plafond 150 000 € (PEA Jeune : 20 000 €).","Ouvre-le tôt : c'est la date d'ouverture qui compte."],
quiz:[
{q:"Quel est le plafond de versements d'un PEA classique ?",a:["22 950 €","75 000 €","150 000 €","Aucun plafond"],c:2,e:"150 000 € de versements."},
{q:"Après 5 ans, les gains d'un PEA sont taxés en 2026 à :",a:["0 %","18,6 %","30 %","31,4 %"],c:1,e:"Exonérés d'IR, soumis aux prélèvements sociaux de 18,6 %."},
{q:"Qu'est-ce qui fait courir le délai de 5 ans ?",a:["La date du premier achat","La date d'ouverture du PEA","La date du dernier versement","Ta date de naissance"],c:1,e:"C'est la date d'ouverture."},
{q:"Tu as 20 ans et tu es rattaché au foyer fiscal de tes parents. Quel PEA peux-tu ouvrir ?",a:["Aucun","Un PEA Jeune plafonné à 20 000 €","Un PEA-PME uniquement","Un PEA sans plafond"],c:1,e:"Le PEA Jeune, qui devient un PEA classique ensuite."}]},

{id:"cto",title:"Le compte-titres ordinaire",min:5,body:`
<p>Le <strong>CTO</strong> est l'enveloppe sans restriction : actions du monde entier, ETF, obligations, fonds… Pas de plafond, pas de durée minimale. En contrepartie : <strong>aucun avantage fiscal</strong>.</p>
<h3>La fiscalité en 2026</h3>
<p>Dividendes et plus-values sont soumis au <strong>PFU de 31,4 %</strong> : 12,8 % d'impôt + 18,6 % de prélèvements sociaux. Option possible pour le barème si ta TMI est à 0 % ou 11 %.</p>
<div class="ex"><span class="eyebrow">Comparaison</span>10 000 € de plus-value : sur CTO tu paies 3 140 €. Sur un PEA de plus de 5 ans, 1 860 €.</div>
<h3>Quand l'utiliser ?</h3>
<ul><li>Quand ton PEA est plein.</li><li>Pour des actifs non éligibles au PEA : actions américaines en direct, obligations, certains ETF.</li><li>Les moins-values compensent des plus-values pendant 10 ans.</li><li>Les titres d'un CTO peuvent être <strong>donnés</strong> : la plus-value latente est alors « purgée ».</li></ul>`,
keys:["CTO : liberté totale, zéro avantage fiscal.","Flat tax 31,4 % en 2026.","À utiliser en complément du PEA."],
quiz:[
{q:"Le CTO a-t-il un plafond de versements ?",a:["Oui, 150 000 €","Oui, 22 950 €","Non","Oui, 75 000 €"],c:2,e:"Aucun plafond."},
{q:"Quelle est la flat tax sur les plus-values d'un CTO en 2026 ?",a:["30 %","31,4 %","17,2 %","12,8 %"],c:1,e:"12,8 % + 18,6 % = 31,4 %."},
{q:"Pendant combien d'années une moins-value peut-elle compenser des plus-values ?",a:["1 an","5 ans","10 ans","Jamais"],c:2,e:"Les moins-values sont reportables 10 ans."}]},

{id:"av",title:"L'assurance-vie",min:8,body:`
<p>L'<strong>assurance-vie</strong> est une enveloppe d'épargne très souple, qui contient deux types de supports.</p>
<ul><li><strong>Fonds euros</strong> : capital garanti, rendement modeste.</li><li><strong>Unités de compte (UC)</strong> : ETF, fonds, SCPI… Non garanties.</li></ul>
<h3>La fiscalité, grande gagnante de 2026</h3>
<p>L'assurance-vie a été <strong>exclue de la hausse de CSG</strong> : ses prélèvements sociaux restent à <strong>17,2 %</strong>. Tu n'es imposé que sur la part de gains contenue dans un retrait.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Âge du contrat</th><th>Fiscalité des gains retirés</th></tr></thead><tbody>
<tr><td>Moins de 8 ans</td><td class="n">30 % (12,8 % + 17,2 %)</td></tr>
<tr><td>Plus de 8 ans</td><td>Abattement annuel de 4 600 € (9 200 € en couple) sur l'impôt, puis 7,5 % + 17,2 %</td></tr></tbody></table></div>
<h3>Gestion libre ou pilotée</h3>
<p>En <strong>gestion libre</strong>, tu choisis tes supports. En <strong>gestion pilotée</strong>, l'assureur arbitre selon ton profil, contre des frais supplémentaires.</p>
<h3>Transmission</h3>
<p>Les sommes versées avant 70 ans sont transmises hors succession, avec un abattement de <strong>152 500 € par bénéficiaire</strong>.</p>
<p class="warn">Choisis un contrat en ligne <strong>sans frais d'entrée</strong> et avec des frais de gestion bas (0,5 à 0,6 % par an).</p>`,
keys:["Fonds euros (garanti) + unités de compte (risquées).","PS maintenus à 17,2 % en 2026.","Après 8 ans : abattement de 4 600 € par an."],
quiz:[
{q:"Après 8 ans, quel abattement annuel s'applique aux gains retirés (personne seule) ?",a:["1 000 €","4 600 €","9 200 €","152 500 €"],c:1,e:"4 600 € (9 200 € en couple)."},
{q:"En 2026, les prélèvements sociaux sur l'assurance-vie sont de :",a:["17,2 %","18,6 %","12,8 %","0 %"],c:0,e:"Exclue de la hausse de CSG."},
{q:"Les unités de compte d'une assurance-vie sont :",a:["Garanties par l'assureur","Non garanties, leur valeur fluctue","Plafonnées à 10 000 €","Réservées aux retraités"],c:1,e:"Seul le fonds euros est garanti."}]},

{id:"per",title:"Le PER",min:6,body:`
<p>Le <strong>Plan d'Épargne Retraite</strong> sert à préparer la retraite. Tes versements peuvent être <strong>déduits de ton revenu imposable</strong>.</p>
<div class="ex"><span class="eyebrow">Exemple</span>TMI à 30 %, tu verses 5 000 € : tu économises 1 500 € d'impôt cette année. Mais ces sommes seront imposées à la sortie.</div>
<h3>Les contreparties</h3>
<ul><li>Argent <strong>bloqué jusqu'à la retraite</strong>, sauf cas particuliers (dont l'<strong>achat de la résidence principale</strong>, décès du conjoint, invalidité, surendettement…).</li><li>À la sortie, les versements déduits sont imposés au barème et les gains au PFU.</li></ul>
<h3>Pour qui ?</h3>
<p>Intéressant quand ta TMI est <strong>élevée aujourd'hui</strong> (30 % ou plus) et sera plus basse à la retraite. <strong>Pour un étudiant peu ou pas imposé, c'est rarement le bon outil.</strong></p>`,
keys:["Versements déductibles du revenu imposable.","Bloqué jusqu'à la retraite (sauf achat de la résidence principale…).","Rarement pertinent pour un étudiant."],
quiz:[
{q:"Quel est l'avantage principal du PER ?",a:["Disponible à tout moment","Versements déductibles du revenu imposable","Aucun impôt à la sortie","Capital garanti"],c:1,e:"Réduction d'impôt à l'entrée, imposition à la sortie."},
{q:"Peut-on débloquer un PER avant la retraite pour acheter sa résidence principale ?",a:["Oui","Non, jamais","Seulement après 70 ans","Seulement pour un investissement locatif"],c:0,e:"C'est un cas de déblocage anticipé."},
{q:"Pour qui le PER est-il le moins intéressant ?",a:["Un cadre à 41 %","Un étudiant non imposable","Un indépendant très imposé","Un couple à 30 %"],c:1,e:"Sans impôt à économiser à l'entrée, il ne reste que les contraintes."}]}
]}
];
