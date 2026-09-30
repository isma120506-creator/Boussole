/* Boussole — contenu pédagogique, partie B. Chiffres vérifiés fin septembre 2026. */
window.BSL_MODULES.push(
{id:"pool-b",lessons:[
/* ---------- Budget expert ---------- */
{id:"patrimoine",title:"Piloter son patrimoine comme un pro",min:7,body:`
<p>Une fois les bases en place, on arrête de raisonner en « comptes » pour raisonner en <strong>patrimoine</strong> : tout ce que tu possèdes, moins tout ce que tu dois. C'est ton <strong>patrimoine net</strong> (net worth).</p>
<h3>Le bilan patrimonial</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Actif (ce que tu possèdes)</th><th>Passif (ce que tu dois)</th></tr></thead><tbody>
<tr><td>Comptes et livrets</td><td>Crédit immobilier restant dû</td></tr><tr><td>PEA, CTO, assurance-vie, PER</td><td>Crédit auto, crédit conso</td></tr><tr><td>Immobilier (valeur estimée)</td><td>Prêt étudiant</td></tr><tr><td>Véhicule (valeur de revente)</td><td>Dettes familiales</td></tr></tbody></table></div>
<h3>Trois indicateurs à suivre</h3>
<ul><li><strong>Patrimoine net</strong>, relevé une fois par trimestre.</li><li><strong>Taux d'épargne</strong> = épargne du mois ÷ revenus nets. 10 % c'est bien, 20 % très bien, 40 % et plus c'est le terrain des candidats à l'indépendance financière.</li><li><strong>Allocation</strong> : la part de liquidités, d'actions, d'immobilier, d'obligations. Tu la compares chaque année à ta cible.</li></ul>
<h3>Le rééquilibrage</h3>
<p>Si ta cible est 80 % actions / 20 % fonds euros et qu'une belle année porte les actions à 88 %, tu <strong>rééquilibres</strong> : soit en vendant un peu, soit (plus simple et sans impôt) en orientant tes nouveaux versements vers la poche en retard.</p>
<p class="warn">Un tableur suffit. Les agrégateurs (applis qui se connectent à tous tes comptes) sont pratiques, mais vérifie ce qu'ils font de tes données.</p>`,
keys:["Patrimoine net = actifs − dettes.","Suis ton taux d'épargne et ton allocation.","Rééquilibre avec tes nouveaux versements."],
quiz:[
{q:"Tu as 12 000 € d'actifs et 4 000 € de prêt étudiant. Ton patrimoine net ?",a:["16 000 €","12 000 €","8 000 €","4 000 €"],c:2,e:"12 000 − 4 000 = 8 000 €."},
{q:"Le taux d'épargne, c'est :",a:["Le taux du Livret A","Épargne du mois ÷ revenus nets","La part d'actions du portefeuille","Le rendement de ton PEA"],c:1,e:"C'est l'indicateur n°1 de ta progression."},
{q:"La façon la plus simple de rééquilibrer sans payer d'impôt ?",a:["Tout vendre","Orienter les nouveaux versements vers la poche en retard","Emprunter","Ne rien faire"],c:1,e:"Pas de vente, donc pas de plus-value imposable."}]},

/* ---------- Épargne expert ---------- */
{id:"pochesure",title:"Optimiser sa poche sans risque",min:6,body:`
<p>Au-delà de l'épargne de précaution, tu peux avoir besoin d'une poche <strong>sûre à moyen terme</strong> (un apport dans 3 ans, un projet). Le livret n'est pas toujours le meilleur choix.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Support</th><th>Rendement 2026 (ordre de grandeur)</th><th>Disponibilité</th><th>Fiscalité</th></tr></thead><tbody>
<tr><td>Livret A / LDDS</td><td class="n">1,7 % net</td><td>Immédiate</td><td>Exonéré</td></tr>
<tr><td>LEP</td><td class="n">2,5 % net</td><td>Immédiate</td><td>Exonéré</td></tr>
<tr><td>Compte à terme</td><td class="n">2,3–2,5 % brut</td><td>Bloqué</td><td>31,4 %</td></tr>
<tr><td>Fonds monétaire</td><td class="n">≈ taux BCE</td><td>2–3 jours</td><td>Selon enveloppe</td></tr>
<tr><td>Fonds euros</td><td class="n">≈ 2,5–3 % brut, variable</td><td>Quelques jours</td><td>Assurance-vie</td></tr>
<tr><td>Obligations datées</td><td class="n">selon émetteur</td><td>Échéance fixe</td><td>Selon enveloppe</td></tr></tbody></table></div>
<h3>Comparer en net</h3>
<p>Un compte à terme à 2,4 % brut rapporte environ 1,65 % net après flat tax : moins que le Livret A. Un fonds euros à 2,8 % brut dans une assurance-vie de plus de 8 ans, sous l'abattement, rapporte environ 2,3 % net. Compare <strong>toujours après impôt</strong>.</p>
<h3>Les fonds obligataires datés</h3>
<p>Des fonds qui achètent des obligations arrivant toutes à échéance la même année (ex. 2029). Si tu les gardes jusqu'au bout, le rendement est assez prévisible. Si tu sors avant, le prix dépend des taux.</p>`,
keys:["Compare toujours les rendements nets d'impôt.","Fonds euros et monétaire : utiles dans une assurance-vie ou un PEA.","Fonds datés : rendement prévisible si gardés jusqu'à l'échéance."],
quiz:[
{q:"Un compte à terme à 2,4 % brut rapporte net (flat tax 31,4 %) environ :",a:["2,4 %","2,0 %","1,65 %","0,75 %"],c:2,e:"2,4 × (1 − 0,314) ≈ 1,65 %."},
{q:"Un fonds obligataire daté est intéressant si :",a:["Tu sors au bout d'un mois","Tu le gardes jusqu'à son échéance","Les taux montent fortement juste après","Tu veux un rendement garanti par l'État"],c:1,e:"Le rendement annoncé suppose de le garder jusqu'au bout."},
{q:"Pour comparer deux placements sûrs, on regarde :",a:["Le taux brut","Le taux net d'impôt","La couleur du logo","Le nombre de clients"],c:1,e:"Seul le net compte pour toi."}]},

/* ---------- Impôts expert ---------- */
{id:"pfu",title:"Flat tax 2026 : 31,4 % ou 30 % ?",min:7,body:`
<p>Le <strong>PFU</strong> (prélèvement forfaitaire unique), ou flat tax, s'applique par défaut aux revenus du capital : <strong>12,8 %</strong> d'impôt + des <strong>prélèvements sociaux</strong>.</p>
<p>La loi de financement de la Sécurité sociale 2026 a relevé la CSG sur la plupart des revenus du capital : les prélèvements sociaux passent de <strong>17,2 % à 18,6 %</strong>. Deux taux coexistent désormais.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Placement</th><th>Taux global</th></tr></thead><tbody>
<tr><td>CTO : dividendes, plus-values</td><td class="n">31,4 %</td></tr><tr><td>Intérêts (CAT, livrets bancaires)</td><td class="n">31,4 %</td></tr><tr><td>Cryptomonnaies</td><td class="n">31,4 %</td></tr><tr><td>PEA après 5 ans</td><td class="n">18,6 % (PS seuls)</td></tr><tr><td>Assurance-vie &lt; 8 ans</td><td class="n">30 %</td></tr><tr><td>Revenus fonciers, plus-values immobilières</td><td class="n">PS 17,2 %</td></tr><tr><td>Livret A, LDDS, LEP</td><td class="n">0 %</td></tr></tbody></table></div>
<h3>L'option pour le barème</h3>
<p>Chaque année, tu peux renoncer au PFU et choisir le <strong>barème progressif</strong>. Intéressant si ta TMI est de 0 % ou 11 %. L'option vaut pour <strong>tous</strong> tes revenus du capital de l'année. Au barème, les dividendes profitent d'un abattement de 40 % et une partie de la CSG devient déductible.</p>
<h3>Le prélèvement à la source des dividendes</h3>
<p>Ta banque prélève un acompte de 12,8 % + PS au versement. Si ton revenu fiscal de référence est bas (moins de 50 000 € pour un célibataire), tu peux demander une <strong>dispense</strong> avant le 30 novembre pour l'année suivante.</p>`,
keys:["Flat tax 2026 : 31,4 % (CTO, intérêts, crypto).","Assurance-vie et immobilier restent à 17,2 % de PS.","Option barème : intéressante pour une TMI à 0 % ou 11 %."],
quiz:[
{q:"En 2026, de combien sont les prélèvements sociaux sur les dividendes d'un CTO ?",a:["12,8 %","17,2 %","18,6 %","31,4 %"],c:2,e:"Passés de 17,2 % à 18,6 %."},
{q:"Quelle enveloppe a été exclue de la hausse de CSG ?",a:["Le PEA","Le compte-titres","L'assurance-vie","Les cryptomonnaies"],c:2,e:"Elle reste à 30 % au total."},
{q:"L'option pour le barème s'applique :",a:["Ligne par ligne","À tous les revenus du capital de l'année","Uniquement aux cryptos","Uniquement au PEA"],c:1,e:"C'est une option globale et annuelle."}]},

/* ---------- Enveloppes expert ---------- */
{id:"combo",title:"Quelle enveloppe pour quel objectif ?",min:7,body:`
<p>Chaque enveloppe a ses forces. La bonne question n'est pas « laquelle est la meilleure » mais « <strong>laquelle pour quel projet et quel horizon</strong> ».</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Objectif</th><th>Horizon</th><th>Enveloppe logique</th></tr></thead><tbody>
<tr><td>Coup dur</td><td>Immédiat</td><td>Livret A, LDDS, LEP</td></tr>
<tr><td>Apport immobilier</td><td>2 à 5 ans</td><td>Livrets, fonds euros, fonds monétaire</td></tr>
<tr><td>Faire croître un capital</td><td>8 ans et plus</td><td>PEA (ETF monde)</td></tr>
<tr><td>Diversifier, projets à 8 ans, transmettre</td><td>8 ans et plus</td><td>Assurance-vie en ligne</td></tr>
<tr><td>Réduire ses impôts pour la retraite</td><td>Retraite</td><td>PER (si TMI ≥ 30 %)</td></tr>
<tr><td>Actions hors Europe en direct, obligations</td><td>Variable</td><td>CTO</td></tr></tbody></table></div>
<h3>L'ordre de remplissage classique</h3>
<ol><li>Épargne de précaution sur livrets.</li><li><strong>PEA</strong> jusqu'à ce qu'il soit bien alimenté (c'est la fiscalité la plus douce).</li><li><strong>Assurance-vie</strong> ouverte tôt pour prendre date, alimentée ensuite.</li><li>PER seulement quand ta TMI le justifie.</li><li>CTO pour ce qui ne rentre nulle part ailleurs.</li></ol>
<h3>Prendre date</h3>
<p>PEA (5 ans) et assurance-vie (8 ans) ont des horloges fiscales qui démarrent à l'ouverture. Les ouvrir tôt, même avec de petits montants, ne coûte rien et vaut beaucoup.</p>`,
keys:["Choisis l'enveloppe selon l'objectif et l'horizon.","Ordre classique : livrets → PEA → assurance-vie → PER → CTO.","Ouvre PEA et assurance-vie tôt pour prendre date."],
quiz:[
{q:"Pour un apport immobilier dans 3 ans, quel support est le plus adapté ?",a:["ETF actions monde","Livrets ou fonds euros","Crypto","Actions d'une seule entreprise"],c:1,e:"Sur un horizon court, on évite la volatilité des actions."},
{q:"Dans l'ordre classique, après l'épargne de précaution on alimente d'abord :",a:["Le PER","Le PEA","Le CTO","Un PEL"],c:1,e:"Le PEA offre la fiscalité la plus douce sur les actions."},
{q:"Pourquoi ouvrir une assurance-vie tôt ?",a:["Pour démarrer l'horloge fiscale des 8 ans","Pour toucher une prime","C'est obligatoire à 18 ans","Pour payer moins de TVA"],c:0,e:"L'antériorité fiscale démarre au premier versement."}]},

/* ---------- Immobilier ---------- */
{id:"achat",title:"Acheter ou louer sa résidence principale ?",min:7,body:`
<p>« Louer, c'est jeter l'argent par les fenêtres » : c'est faux dans beaucoup de cas. Quand tu achètes, tu paies aussi des choses que tu ne récupères jamais :</p>
<ul><li>Les <strong>frais de notaire</strong> : environ <strong>7 à 8 %</strong> du prix dans l'ancien, 2 à 3 % dans le neuf.</li><li>Les <strong>intérêts du crédit</strong> et l'assurance emprunteur.</li><li>La <strong>taxe foncière</strong>, les charges de copropriété, les travaux.</li></ul>
<h3>La durée de détention est décisive</h3>
<p>Il faut en général <strong>5 à 10 ans</strong> pour que l'achat devienne plus rentable que la location. Si tu risques de déménager dans 3 ans, louer est souvent plus malin.</p>
<h3>Les vrais avantages de l'achat</h3>
<ul><li>Tu te constitues un patrimoine en remboursant ton crédit.</li><li>Aucune imposition sur la plus-value de ta résidence principale.</li><li>À la retraite, plus de loyer.</li></ul>
<p class="warn">Compare avec le scénario « je loue et j'investis la différence » : c'est ce que fait le simulateur Acheter ou louer.</p>`,
keys:["Frais de notaire : 7 à 8 % dans l'ancien.","5 à 10 ans de détention pour que l'achat soit rentable.","Plus-value sur résidence principale : exonérée."],
quiz:[
{q:"Les frais de notaire dans l'ancien représentent environ :",a:["1 %","2 à 3 %","7 à 8 %","15 %"],c:2,e:"Surtout des taxes."},
{q:"Tu vas sûrement déménager dans 2 ans. Option généralement la plus logique ?",a:["Acheter","Louer","Acheter sur 25 ans","Acheter en SCPI"],c:1,e:"Les frais d'achat ne seraient pas amortis."},
{q:"La plus-value à la revente de ta résidence principale est :",a:["Taxée à 36,2 %","Exonérée","Taxée à 19 %","Taxée à 31,4 %"],c:1,e:"Toujours exonérée."}]},

{id:"credit",title:"Comprendre le crédit immobilier",min:8,body:`
<p>Un crédit immobilier se rembourse par <strong>mensualités</strong>, avec des intérêts et une assurance emprunteur.</p>
<h3>Les règles du HCSF</h3>
<ul><li><strong>Taux d'endettement max : 35 %</strong> des revenus nets, assurance comprise.</li><li><strong>Durée max : 25 ans</strong> (27 ans dans certains cas, comme le neuf).</li></ul>
<h3>Où en sont les taux ?</h3>
<p>En septembre 2026, le taux moyen sur 20 ans se situe autour de <strong>3,4 à 3,6 %</strong> hors assurance, en légère hausse avec l'OAT 10 ans au-dessus de 4 % et la remontée des taux de la BCE. Les meilleurs dossiers obtiennent autour de 3 %.</p>
<h3>TAEG, le seul taux qui compte</h3>
<p>Le <strong>TAEG</strong> inclut intérêts, assurance, frais de dossier et de garantie.</p>
<h3>L'assurance emprunteur</h3>
<p>Elle peut représenter un quart du coût du crédit. Depuis la <strong>loi Lemoine</strong> (2022), tu peux en changer <strong>à tout moment</strong>, et le questionnaire de santé est supprimé pour les prêts de moins de 200 000 € par personne remboursés avant 60 ans.</p>
<h3>L'apport et le dossier</h3>
<p>La plupart des banques demandent un <strong>apport d'au moins 10 %</strong>. Un bon dossier : revenus stables, comptes sans découvert, épargne régulière, « reste à vivre » suffisant.</p>
<div class="ex"><span class="eyebrow">Ordre de grandeur</span>200 000 € sur 20 ans à 3,5 % → environ 1 160 € par mois hors assurance, et près de 78 000 € d'intérêts.</div>`,
keys:["Endettement ≤ 35 %, durée ≤ 25 ans.","Comparer au TAEG.","Loi Lemoine : on change d'assurance emprunteur à tout moment."],
quiz:[
{q:"Quel taux d'endettement maximum imposent les règles du HCSF ?",a:["25 %","33 %","35 % assurance comprise","50 %"],c:2,e:"35 % des revenus nets."},
{q:"Tes revenus nets sont de 2 400 €/mois. Mensualité maximale à 35 % ?",a:["600 €","720 €","840 €","1 200 €"],c:2,e:"2 400 × 0,35 = 840 €."},
{q:"Depuis la loi Lemoine, l'assurance emprunteur peut être changée :",a:["Jamais","Seulement la première année","À tout moment","Tous les 5 ans"],c:2,e:"Résiliation possible à tout moment."}]},

{id:"ptz",title:"PTZ, aides et primo-accession",min:6,body:`
<p>Pour un premier achat, plusieurs dispositifs peuvent alléger le financement. Ils sont <strong>soumis à conditions</strong> (revenus, zone, type de logement) qui changent régulièrement.</p>
<h3>Le prêt à taux zéro (PTZ)</h3>
<ul><li>Réservé aux <strong>primo-accédants</strong> (pas propriétaires de leur résidence principale depuis 2 ans).</li><li>Conditions de <strong>ressources</strong>, montant selon la zone et la composition du foyer.</li><li>Depuis avril 2025, ouvert pour le <strong>neuf sur tout le territoire</strong> (appartements et maisons), et pour l'<strong>ancien avec travaux</strong> dans certaines zones.</li></ul>
<h3>Les autres aides</h3>
<ul><li><strong>Prêt Action Logement</strong> pour les salariés du privé (taux bas, montant limité).</li><li>Prêts et aides de certaines <strong>collectivités</strong> (région, ville).</li><li><strong>Don familial</strong> : un parent peut te donner jusqu'à 100 000 € sans droits (plus 31 865 € de don d'argent sous conditions d'âge). Jusqu'à fin 2026, un don supplémentaire de 100 000 € est exonéré s'il sert à acheter un logement neuf ou à faire des travaux de rénovation énergétique.</li></ul>
<h3>Qui te renseigne gratuitement ?</h3>
<p>L'<strong>ADIL</strong> de ton département (réseau ANIL) : conseil juridique et financier neutre et gratuit sur tout projet immobilier.</p>`,
keys:["PTZ : primo-accédants, sous conditions de ressources et de zone.","Don familial : abattement de 100 000 € par parent.","L'ADIL conseille gratuitement."],
quiz:[
{q:"Le PTZ est réservé :",a:["Aux investisseurs locatifs","Aux primo-accédants sous conditions","À tous sans condition","Aux retraités"],c:1,e:"Primo-accédants, sous conditions de ressources."},
{q:"Qui conseille gratuitement et de façon neutre sur un projet immobilier ?",a:["L'ADIL","Le vendeur","L'agent immobilier","Le notaire du vendeur"],c:0,e:"Le réseau ANIL/ADIL est public et gratuit."},
{q:"Quel abattement s'applique à une donation d'un parent à un enfant ?",a:["10 000 €","50 000 €","100 000 €","500 000 €"],c:2,e:"100 000 € par parent et par enfant, tous les 15 ans."}]},

{id:"visite",title:"Visiter, négocier, signer",min:7,body:`
<p>Le parcours d'achat suit toujours les mêmes étapes. Les connaître évite les mauvaises surprises.</p>
<ol><li><strong>Visite</strong> : luminosité, bruit, état des fenêtres, humidité, électricité, parties communes. Reviens à une autre heure.</li><li><strong>Documents</strong> : diagnostics (DPE, amiante, plomb, électricité), trois derniers PV d'assemblée générale, charges de copropriété, travaux votés.</li><li><strong>Offre d'achat</strong> écrite, avec un prix et une durée de validité.</li><li><strong>Compromis de vente</strong> : tu disposes de <strong>10 jours de rétractation</strong>. Il contient une <strong>condition suspensive d'obtention de prêt</strong>.</li><li><strong>Acte authentique</strong> chez le notaire, environ 3 mois plus tard.</li></ol>
<h3>Négocier</h3>
<ul><li>Compare avec les <strong>prix réellement vendus</strong> du quartier (base publique DVF, « Demandes de valeurs foncières »).</li><li>Appuie-toi sur des éléments concrets : DPE F ou G, travaux à prévoir, durée de mise en vente.</li><li>Un bien en vente depuis longtemps se négocie plus facilement.</li></ul>
<p class="warn">Ne signe jamais un compromis sans condition suspensive de prêt : si la banque refuse, tu perdrais ton dépôt de garantie (souvent 5 à 10 %).</p>`,
keys:["Lis les PV d'AG et les diagnostics.","10 jours de rétractation après le compromis.","Négocie avec les prix réels (DVF)."],
quiz:[
{q:"Combien de jours de rétractation après la signature du compromis ?",a:["3","7","10","30"],c:2,e:"10 jours pour l'acquéreur non professionnel."},
{q:"À quoi sert la condition suspensive de prêt ?",a:["À baisser le prix","À annuler la vente sans pénalité si le crédit est refusé","À payer moins de frais de notaire","À rien"],c:1,e:"Elle te protège si la banque refuse."},
{q:"Où trouver les prix réellement vendus d'un quartier ?",a:["Sur les annonces","Dans la base publique DVF","Chez le vendeur","Nulle part"],c:1,e:"DVF recense les transactions réelles."}]},

{id:"rendement",title:"Investissement locatif : rendement et cash-flow",min:8,body:`
<p>Acheter pour louer, c'est utiliser l'argent de la banque : l'<strong>effet de levier</strong>. Encore faut-il savoir calculer.</p>
<ul><li><strong>Rendement brut</strong> = loyers annuels ÷ prix d'achat × 100.</li><li><strong>Rendement net</strong> = (loyers − charges) ÷ (prix + frais + travaux) × 100. Charges : taxe foncière, copro non récupérable, assurance PNO, gestion, vacance.</li><li><strong>Cash-flow</strong> = loyer − mensualité − charges. Négatif : tu mets de ta poche chaque mois.</li></ul>
<div class="ex"><span class="eyebrow">Exemple</span>Studio à 100 000 €, loué 550 €/mois → 6 600 €/an → brut 6,6 %. Avec 8 000 € de notaire et 1 800 € de charges : net ≈ 4,4 %.</div>
<h3>Les règles du jeu</h3>
<ul><li>L'<strong>emplacement</strong> décide de tout : demande locative, transports, université.</li><li>Le <strong>DPE</strong> : logements G interdits à la location depuis 2025, F en 2028, E en 2034.</li><li>Prévois un mois de <strong>vacance locative</strong> par an.</li></ul>`,
keys:["Rendement brut = loyers ÷ prix.","Le cash-flow dit si tu paies de ta poche.","DPE : G interdits à la location depuis 2025."],
quiz:[
{q:"Un bien à 150 000 € loué 750 €/mois. Rendement brut ?",a:["5 %","6 %","7,5 %","9 %"],c:1,e:"9 000 ÷ 150 000 = 6 %."},
{q:"Un cash-flow négatif signifie :",a:["Le bien rapporte plus que le crédit","Tu complètes chaque mois de ta poche","Le bien est vide","Tu ne paies pas d'impôt"],c:1,e:"Les loyers ne couvrent pas tout."},
{q:"Depuis 2025, quels logements sont interdits à la location (nouveaux baux) ?",a:["Classés A","Classés D","Classés G","Tous ceux sans ascenseur"],c:2,e:"Puis F en 2028, E en 2034."}]},

{id:"bail",title:"Le bail et la gestion locative",min:7,body:`
<p>Être propriétaire bailleur, c'est aussi un <strong>métier</strong> avec des règles strictes.</p>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th></th><th>Location vide</th><th>Location meublée</th></tr></thead><tbody>
<tr><td>Durée du bail</td><td>3 ans</td><td>1 an (9 mois pour un étudiant)</td></tr>
<tr><td>Dépôt de garantie max</td><td>1 mois hors charges</td><td>2 mois hors charges</td></tr>
<tr><td>Préavis du locataire</td><td>3 mois (1 mois en zone tendue)</td><td>1 mois</td></tr></tbody></table></div>
<h3>Encadrement des loyers</h3>
<p>Dans certaines villes (Paris, Lyon, Lille, Bordeaux, Montpellier…), le loyer ne peut pas dépasser un <strong>loyer de référence majoré</strong>. En zone tendue, la hausse entre deux locataires est aussi limitée.</p>
<h3>Sécuriser les loyers</h3>
<ul><li>La garantie <strong>Visale</strong> (Action Logement) : gratuite, elle couvre les impayés pour de nombreux locataires, dont les étudiants.</li><li>L'assurance <strong>loyers impayés</strong> (GLI) : payante, environ 2 à 4 % des loyers.</li></ul>
<h3>Gérer soi-même ou déléguer ?</h3>
<p>Une agence prend en général <strong>6 à 10 % des loyers</strong> pour la gestion. À intégrer dans tes calculs de rendement.</p>`,
keys:["Vide : bail 3 ans, dépôt 1 mois. Meublé : 1 an, dépôt 2 mois.","Encadrement des loyers dans plusieurs grandes villes.","Visale protège gratuitement contre les impayés."],
quiz:[
{q:"Quel est le dépôt de garantie maximum en location vide ?",a:["1 mois hors charges","2 mois","3 mois","Libre"],c:0,e:"1 mois hors charges (2 en meublé)."},
{q:"Durée d'un bail meublé pour un étudiant ?",a:["3 mois","9 mois","3 ans","6 ans"],c:1,e:"Le bail étudiant meublé dure 9 mois."},
{q:"La garantie Visale est :",a:["Payante et chère","Gratuite, proposée par Action Logement","Réservée aux propriétaires","Un crédit"],c:1,e:"Elle couvre les impayés sans coût pour le bailleur ni le locataire."}]},

{id:"lmnp",title:"Location nue ou meublée (LMNP)",min:8,body:`
<p>Le choix entre louer <strong>vide</strong> ou <strong>meublé</strong> change complètement ta fiscalité.</p>
<h3>Location nue : revenus fonciers</h3>
<ul><li><strong>Micro-foncier</strong> si tes loyers sont inférieurs à <strong>15 000 €/an</strong> : abattement de <strong>30 %</strong> (maintenu en 2026).</li><li><strong>Régime réel</strong> : tu déduis les charges réelles. Le <strong>déficit foncier</strong> s'impute sur ton revenu global jusqu'à 10 700 €/an.</li><li>Nouveau en 2026 : le <strong>statut du bailleur privé</strong>, qui permet d'amortir une partie du prix d'un logement neuf ou ancien avec gros travaux loué nu, sous conditions (loyers plafonnés notamment).</li></ul>
<h3>Location meublée : LMNP</h3>
<ul><li><strong>Micro-BIC</strong> : abattement de <strong>50 %</strong> jusqu'à 77 700 € de loyers en meublé longue durée (30 % et 15 000 € pour les meublés de tourisme non classés).</li><li><strong>Régime réel</strong> : tu <strong>amortis</strong> le bien et les meubles. Souvent, cela efface l'impôt sur les loyers pendant des années. Régime conservé en 2026.</li></ul>
<p class="warn">Depuis février 2025, les amortissements LMNP sont <strong>réintégrés dans la plus-value</strong> à la revente.</p>`,
keys:["Nu : micro-foncier 30 % sous 15 000 €, ou réel avec déficit foncier.","Meublé longue durée : micro-BIC 50 % ou réel avec amortissement.","Amortissements LMNP réintégrés à la revente depuis 2025."],
quiz:[
{q:"En micro-foncier, quel est l'abattement forfaitaire ?",a:["10 %","30 %","50 %","71 %"],c:1,e:"30 %, si loyers < 15 000 €/an."},
{q:"Quel est l'atout majeur du LMNP au réel ?",a:["L'amortissement du bien et des meubles","Un loyer garanti par l'État","Aucun impôt à vie","Un plafond de loyer plus élevé"],c:0,e:"L'amortissement réduit le bénéfice imposable."},
{q:"Jusqu'à combien le déficit foncier s'impute-t-il sur le revenu global ?",a:["1 000 €","10 700 €","50 000 €","Sans limite"],c:1,e:"10 700 € par an (hors cas particuliers)."}]},

{id:"scpi",title:"SCPI et pierre-papier",min:6,body:`
<p>Une <strong>SCPI</strong> te permet d'acheter des parts d'un grand parc immobilier : bureaux, commerces, entrepôts, santé… Une société de gestion s'occupe de tout.</p>
<h3>Les avantages</h3>
<ul><li>Accessible dès quelques centaines d'euros.</li><li>Aucune gestion locative.</li><li>Diversification sur des centaines de biens.</li></ul>
<h3>Les inconvénients</h3>
<ul><li><strong>Frais d'entrée</strong> souvent de 8 à 12 %.</li><li>Rendement <strong>non garanti</strong> : souvent 4 à 6 % bruts ces dernières années, et plusieurs SCPI ont <strong>baissé leur prix de part</strong> en 2023–2024.</li><li>Revente parfois lente.</li><li>En direct, revenus imposés comme des revenus fonciers (TMI + 17,2 %).</li></ul>
<h3>Les alternatives</h3>
<p>Les <strong>SCI en unités de compte</strong> (dans une assurance-vie) et les <strong>foncières cotées</strong> (SIIC, REIT) : plus liquides, mais plus volatiles.</p>`,
keys:["SCPI = immobilier collectif, sans gestion.","Frais d'entrée 8–12 %, horizon 8–10 ans.","Prix de part et rendement non garantis."],
quiz:[
{q:"Une SCPI, c'est :",a:["Un livret garanti","Des parts d'un parc immobilier géré","Un crédit immobilier","Une action tech"],c:1,e:"Pierre-papier."},
{q:"Principal inconvénient des SCPI classiques ?",a:["Aucun revenu","Frais d'entrée élevés","Capital bloqué 30 ans","Interdites aux particuliers"],c:1,e:"Il faut un horizon long pour les amortir."},
{q:"Le prix des parts de SCPI peut-il baisser ?",a:["Non, jamais","Oui, c'est arrivé en 2023–2024","Seulement en cas de faillite","Non, garanti par l'AMF"],c:1,e:"Plusieurs SCPI ont baissé leur prix."}]},

{id:"sci",title:"Acheter à plusieurs : indivision et SCI",min:6,body:`
<p>Acheter avec un ou une partenaire, un ami ou sa famille : deux grands cadres existent.</p>
<h3>L'indivision</h3>
<p>Le régime par défaut quand on achète à plusieurs sans structure. Chacun possède une quote-part (ex. 60 / 40). Simple et sans frais, mais <strong>« nul n'est tenu de rester dans l'indivision »</strong> : un indivisaire peut demander la vente. Une <strong>convention d'indivision</strong> chez le notaire encadre les règles.</p>
<h3>La SCI (société civile immobilière)</h3>
<p>Une société qui détient le bien. Les associés détiennent des <strong>parts</strong>. Avantages : gestion organisée par des statuts, transmission facilitée (donner des parts progressivement), évite les blocages de l'indivision.</p>
<ul><li>Par défaut à l'<strong>impôt sur le revenu</strong> : chaque associé déclare sa part des revenus fonciers.</li><li>Option possible pour l'<strong>impôt sur les sociétés</strong> : amortissement du bien, mais fiscalité lourde à la revente.</li><li>Coûts : création (statuts, greffe), comptabilité, assemblée annuelle.</li></ul>
<p class="warn">Pour un couple non marié, la répartition des parts doit refléter l'apport de chacun. Un notaire peut t'aider à éviter les conflits futurs.</p>`,
keys:["Indivision : simple, mais chacun peut demander la vente.","SCI : statuts, parts, transmission facilitée.","SCI à l'IR par défaut, IS sur option."],
quiz:[
{q:"En indivision, un indivisaire peut :",a:["Être forcé à rester à vie","Demander la sortie de l'indivision","Vendre le bien seul sans accord","Rien du tout"],c:1,e:"« Nul n'est tenu de rester dans l'indivision »."},
{q:"Une SCI est par défaut soumise :",a:["À l'impôt sur les sociétés","À l'impôt sur le revenu","À aucun impôt","À la TVA"],c:1,e:"Transparence fiscale : chaque associé déclare sa part."},
{q:"Un avantage de la SCI :",a:["Aucun frais","Transmission progressive des parts","Taux de crédit à 0 %","Pas de notaire"],c:1,e:"On peut donner des parts au fil du temps."}]},

{id:"pvimmo",title:"La plus-value immobilière",min:6,body:`
<p>Quand tu revends un bien qui <strong>n'est pas ta résidence principale</strong>, la plus-value est taxée à <strong>19 %</strong> d'impôt + <strong>17,2 %</strong> de prélèvements sociaux, + une surtaxe au-delà de 50 000 € de plus-value.</p>
<h3>Des abattements selon la durée</h3>
<ul><li>Exonération d'<strong>impôt sur le revenu après 22 ans</strong>.</li><li>Exonération de <strong>prélèvements sociaux après 30 ans</strong>.</li></ul>
<h3>Le calcul</h3>
<p>Plus-value = prix de vente − (prix d'achat + frais d'acquisition + travaux). Forfaits possibles : 7,5 % pour les frais d'acquisition, 15 % pour les travaux après 5 ans de détention.</p>
<p class="warn">LMNP : depuis 2025, les amortissements déduits sont ajoutés à la plus-value (sauf résidences étudiantes, seniors et EHPAD).</p>`,
keys:["19 % + 17,2 %.","Exonération IR à 22 ans, PS à 30 ans.","Résidence principale toujours exonérée."],
quiz:[
{q:"Après combien d'années la plus-value immo est-elle exonérée d'IR ?",a:["5 ans","15 ans","22 ans","30 ans"],c:2,e:"22 ans pour l'IR, 30 pour les PS."},
{q:"Taux d'impôt sur le revenu d'une plus-value immobilière ?",a:["12,8 %","19 %","30 %","45 %"],c:1,e:"19 % + 17,2 % de PS."},
{q:"Forfait travaux possible après 5 ans de détention ?",a:["7,5 %","15 %","30 %","50 %"],c:1,e:"15 % du prix d'achat, sans justificatif."}]},

/* ---------- Alternatifs ---------- */
{id:"or",title:"L'or et les matières premières",min:6,body:`
<p>L'or est une valeur refuge : il ne verse ni intérêt ni dividende, mais il a tendance à résister quand la confiance dans les monnaies ou les marchés s'effrite.</p>
<h3>Comment en détenir</h3>
<ul><li><strong>Or physique</strong> : pièces (Napoléon, Krugerrand) ou lingots. Frais d'achat/revente (prime), stockage, risque de vol.</li><li><strong>ETC / ETF adossés à l'or</strong> : suivent le cours, négociables en bourse, sur CTO (pas en PEA).</li><li><strong>Actions de mines d'or</strong> : beaucoup plus volatiles que l'or lui-même.</li></ul>
<h3>Fiscalité de l'or physique</h3>
<p>À la revente : <strong>taxe forfaitaire de 11,5 %</strong> du prix de vente, ou sur option le régime des plus-values (avec abattement par année de détention au-delà de 2 ans), à condition de pouvoir prouver le prix d'achat.</p>
<h3>Quelle place ?</h3>
<p>Beaucoup d'allocations prudentes gardent <strong>0 à 10 %</strong> en or pour diversifier. Sur très longue période, il a fait moins bien que les actions.</p>`,
keys:["L'or ne produit pas de revenus, c'est une assurance.","Physique ou ETC (sur CTO).","Or physique : taxe forfaitaire de 11,5 % ou régime des plus-values."],
quiz:[
{q:"L'or verse-t-il des dividendes ?",a:["Oui, 3 % par an","Non, aucun revenu","Seulement les lingots","Seulement en PEA"],c:1,e:"Il ne produit rien : on parie sur son prix."},
{q:"Taxe forfaitaire à la revente d'or physique ?",a:["5 %","11,5 %","31,4 %","0 %"],c:1,e:"11,5 % du prix de vente, ou option régime des plus-values."},
{q:"Peut-on mettre un ETC or dans un PEA ?",a:["Oui","Non, il va sur un CTO","Seulement en PEA-PME","Seulement sur un livret"],c:1,e:"Les ETC or ne sont pas éligibles au PEA."}]},

{id:"crypto",title:"Cryptomonnaies : comprendre avant d'acheter",min:8,body:`
<p>Une <strong>cryptomonnaie</strong> est un actif numérique enregistré sur une <strong>blockchain</strong>, un registre partagé et infalsifiable. Bitcoin (2009) a un nombre maximum de 21 millions d'unités. Ethereum permet d'exécuter des programmes (smart contracts).</p>
<h3>Les risques</h3>
<ul><li><strong>Volatilité extrême</strong> : des baisses de 70 à 80 % sont déjà arrivées plusieurs fois.</li><li><strong>Pas de revenus</strong> sous-jacents pour la plupart : la valeur dépend de l'adoption.</li><li><strong>Arnaques</strong> et plateformes qui font faillite.</li><li><strong>Garde</strong> : « not your keys, not your coins ». Si tu perds ta phrase de récupération, l'argent est perdu.</li></ul>
<h3>Le cadre en Europe</h3>
<p>Le règlement européen <strong>MiCA</strong> encadre les prestataires depuis fin 2024. En France, vérifie que la plateforme est enregistrée ou agréée auprès de l'<strong>AMF</strong>.</p>
<h3>Fiscalité</h3>
<p>Les échanges crypto contre crypto ne sont pas imposés. La conversion en euros l'est, au-delà de <strong>305 €</strong> de cessions par an, au PFU de <strong>31,4 %</strong> en 2026. Les comptes détenus sur des plateformes étrangères doivent être déclarés (formulaire 3916-bis).</p>
<p class="warn">Règle de prudence : pas plus que ce que tu accepterais de perdre entièrement, et jamais avant d'avoir ton épargne de précaution.</p>`,
keys:["Volatilité extrême, pas de revenus sous-jacents.","MiCA + vérification AMF de la plateforme.","31,4 % sur les conversions en euros au-delà de 305 €/an."],
quiz:[
{q:"Un échange Bitcoin → Ethereum est-il imposable ?",a:["Oui, à 31,4 %","Non, seules les conversions en euros le sont","Oui, à 12,8 %","Seulement au-delà de 1 000 €"],c:1,e:"Les échanges entre cryptos sont neutres fiscalement."},
{q:"Que signifie « not your keys, not your coins » ?",a:["Les cryptos sont gratuites","Si une plateforme garde tes clés, tu dépends d'elle","Il faut une clé USB pour acheter","Rien"],c:1,e:"Sans tes clés privées, tu n'as pas le contrôle total."},
{q:"Quel règlement européen encadre les prestataires crypto ?",a:["MiFID","MiCA","RGPD","DSP2"],c:1,e:"Markets in Crypto-Assets."}]},

{id:"crowdfunding",title:"Crowdfunding et private equity",min:6,body:`
<p>Le <strong>financement participatif</strong> permet de prêter ou d'investir directement dans des projets via des plateformes.</p>
<h3>Crowdfunding immobilier</h3>
<p>Tu prêtes à un promoteur pour 12 à 36 mois, contre des intérêts affichés souvent autour de 9 à 11 % par an. Mais les <strong>retards et défauts</strong> ont fortement augmenté depuis la crise immobilière de 2023 : une partie des projets ne rembourse pas à temps, voire pas du tout.</p>
<h3>Private equity (capital-investissement)</h3>
<p>Investir dans des entreprises <strong>non cotées</strong>, via des fonds (FCPR, FCPI, FIP) ou des plateformes. Potentiel élevé, mais argent <strong>bloqué 5 à 10 ans</strong> et frais importants. Certains fonds offrent une réduction d'impôt en contrepartie.</p>
<h3>Les bonnes pratiques</h3>
<ul><li>Vérifie l'agrément de la plateforme (PSFP, AMF).</li><li>Diversifie sur <strong>beaucoup</strong> de petits tickets.</li><li>Limite ce type d'actif à une petite part de ton patrimoine.</li></ul>`,
keys:["Rendement affiché élevé = risque de défaut élevé.","Private equity : bloqué 5 à 10 ans.","Plateforme agréée + nombreux petits tickets."],
quiz:[
{q:"Le crowdfunding immobilier à 10 % est :",a:["Garanti","Risqué : retards et défauts possibles","Exonéré d'impôt","Un livret"],c:1,e:"Les défauts ont augmenté depuis 2023."},
{q:"Le private equity investit dans :",a:["Des entreprises cotées","Des entreprises non cotées","Des livrets","Des obligations d'État"],c:1,e:"Capital-investissement, hors bourse."},
{q:"Durée typique de blocage d'un fonds de private equity ?",a:["1 mois","1 an","5 à 10 ans","Aucune"],c:2,e:"L'argent est immobilisé longtemps."}]},

{id:"levier",title:"Trading, CFD et produits à levier",min:7,body:`
<p>Les réseaux sociaux regorgent de promesses de richesse rapide par le trading. La réalité est documentée par les régulateurs.</p>
<h3>Les CFD et le Forex</h3>
<p>Un <strong>CFD</strong> est un contrat qui te fait gagner ou perdre la variation d'un prix, avec un <strong>effet de levier</strong> : avec 1 000 €, tu prends une position de 5 000 ou 10 000 €. Une variation de 10 % peut effacer toute ta mise.</p>
<p>Les brokers sont obligés d'afficher un avertissement : <strong>entre 70 et 90 % des comptes de particuliers perdent de l'argent</strong> sur ces produits.</p>
<h3>Turbos, warrants, options</h3>
<p>Des produits dérivés à levier, cotés en bourse. Ils peuvent perdre toute leur valeur très vite (seuil de désactivation, échéance).</p>
<h3>Le day trading</h3>
<p>Acheter et revendre dans la journée. Les études sur les particuliers montrent qu'une très large majorité perd de l'argent sur la durée, frais et impôts inclus.</p>
<p class="warn">Ces produits ne sont pas des investissements pour construire un patrimoine. Si tu veux essayer, utilise un compte de démonstration ou une somme que tu considères comme perdue.</p>`,
keys:["Levier = gains ET pertes multipliés.","70 à 90 % des comptes CFD de particuliers perdent de l'argent.","Le trading n'est pas une stratégie patrimoniale."],
quiz:[
{q:"Avec un levier de 10, une baisse de 10 % du sous-jacent entraîne :",a:["−1 % sur ta mise","−10 % sur ta mise","−100 % de ta mise","Rien"],c:2,e:"10 × 10 % = 100 % de la mise."},
{q:"Selon les avertissements obligatoires, quelle part des comptes CFD de particuliers perd de l'argent ?",a:["10 à 20 %","30 à 40 %","70 à 90 %","Aucun"],c:2,e:"Les brokers doivent l'afficher."},
{q:"Le day trading consiste à :",a:["Investir sur 20 ans","Acheter et revendre dans la journée","Acheter un ETF par mois","Placer sur un livret"],c:1,e:"Un jeu de très court terme, perdant pour la majorité."}]},

/* ---------- Stratégie & économie ---------- */
{id:"dca",title:"Investir chaque mois (DCA) et répartir",min:6,body:`
<p>Le <strong>DCA</strong>, c'est investir <strong>la même somme à intervalle régulier</strong>, quoi qu'il se passe. Par exemple 100 € le 5 de chaque mois dans un ETF monde.</p>
<ul><li>Tu achètes plus de parts quand c'est bas, moins quand c'est haut.</li><li>Pas besoin de deviner le « bon moment ».</li><li>Beaucoup de courtiers proposent des <strong>investissements programmés</strong>.</li></ul>
<h3>L'allocation d'actifs</h3>
<div class="ex"><span class="eyebrow">Portefeuille « paresseux »</span>1. Épargne de précaution sur livrets.<br>2. Un ETF monde capitalisant sur PEA, alimenté chaque mois.<br>3. Une assurance-vie en ligne pour les projets à 5–8 ans.<br>Rééquilibrer une fois par an.</div>
<p>Plus ton horizon se rapproche, plus tu réduis la part d'actions.</p>`,
keys:["DCA : même somme, même date, chaque mois.","Programme-le : zéro émotion.","Allocation simple : précaution + ETF monde + assurance-vie."],
quiz:[
{q:"Le DCA consiste à :",a:["Tout investir en une fois","Investir la même somme à intervalles réguliers","Vendre à chaque baisse","Acheter pendant les krachs uniquement"],c:1,e:"On lisse le prix d'achat."},
{q:"Intérêt principal d'un investissement programmé ?",a:["Rendement garanti","Supprimer l'émotion et l'oubli","Éviter les impôts","Zéro frais partout"],c:1,e:"L'automatisation te protège de toi-même."},
{q:"L'allocation d'actifs, c'est :",a:["Le choix d'une banque","La répartition entre actions, obligations, immobilier, liquidités","Le calcul des impôts","Le nombre d'ETF"],c:1,e:"C'est la décision la plus importante."}]},

{id:"biais",title:"Biais psychologiques et arnaques",min:7,body:`
<p>En finance, ton pire ennemi, c'est souvent ton cerveau.</p>
<ul><li><strong>FOMO</strong> : acheter parce que « tout le monde en parle », souvent au plus haut.</li><li><strong>Aversion à la perte</strong> : une perte fait deux fois plus mal qu'un gain ne fait plaisir.</li><li><strong>Excès de confiance</strong> après quelques gains chanceux.</li><li><strong>Biais de confirmation</strong> : ne lire que ce qui confirme ce qu'on pense.</li><li><strong>Ancrage</strong> : rester fixé sur son prix d'achat.</li></ul>
<h3>Reconnaître une arnaque</h3>
<ul><li>Un <strong>rendement élevé et garanti</strong> : ça n'existe pas.</li><li>La <strong>pression</strong> : « offre valable aujourd'hui ».</li><li>Un contact non sollicité (Instagram, TikTok, WhatsApp, Telegram).</li><li>Un intermédiaire absent des registres officiels.</li></ul>
<p class="warn">Vérifie les <strong>listes noires de l'AMF</strong> et le registre <strong>ORIAS</strong>. En cas de doute, abstiens-toi.</p>`,
keys:["FOMO, aversion à la perte, excès de confiance, ancrage.","Rendement élevé + garanti = arnaque.","AMF + ORIAS avant tout placement."],
quiz:[
{q:"On te propose « 8 % par mois garantis » sur Telegram. C'est :",a:["Une belle opportunité","Très probablement une arnaque","Un livret réglementé","Un ETF"],c:1,e:"Rendement élevé ET garanti : alerte."},
{q:"L'ancrage, c'est :",a:["Rester fixé sur son prix d'achat pour décider","Diversifier","Acheter tous les mois","Un type d'ETF"],c:0,e:"Le marché se moque de ton prix d'achat."},
{q:"Où vérifier qu'un intermédiaire est autorisé ?",a:["Ses réseaux sociaux","Les avis Google","L'AMF et l'ORIAS","Nulle part"],c:2,e:"Registres officiels."}]},

{id:"bce",title:"BCE, taux et inflation",min:7,body:`
<p>La <strong>Banque centrale européenne</strong> a pour mission principale de maintenir l'inflation proche de <strong>2 %</strong> dans la zone euro. Son outil principal : les <strong>taux directeurs</strong>.</p>
<h3>Comment ça marche</h3>
<ul><li>Inflation trop haute → la BCE <strong>monte</strong> ses taux → le crédit coûte plus cher → la demande ralentit → les prix se calment.</li><li>Économie trop faible → elle <strong>baisse</strong> ses taux pour relancer.</li></ul>
<p>Après les baisses de 2024–2025, la BCE a de nouveau <strong>relevé ses taux en 2026</strong> : son taux de dépôt est à 2,50 % depuis le 16 septembre 2026.</p>
<h3>Ce que ça change pour toi</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Quand les taux montent</th><th>Effet</th></tr></thead><tbody>
<tr><td>Crédit immobilier</td><td>Plus cher, capacité d'emprunt en baisse</td></tr><tr><td>Livrets, fonds monétaires</td><td>Rémunération en hausse (avec retard)</td></tr><tr><td>Obligations existantes</td><td>Prix en baisse</td></tr><tr><td>Actions</td><td>Souvent sous pression (valorisations)</td></tr><tr><td>Immobilier</td><td>Prix freinés</td></tr></tbody></table></div>`,
keys:["Objectif de la BCE : inflation proche de 2 %.","Taux ↑ : crédit plus cher, livrets mieux rémunérés.","Taux de dépôt BCE : 2,50 % depuis le 16/09/2026."],
quiz:[
{q:"Quel est l'objectif d'inflation de la BCE ?",a:["0 %","2 %","5 %","10 %"],c:1,e:"Proche de 2 % à moyen terme."},
{q:"Si la BCE monte ses taux, le crédit immobilier devient :",a:["Moins cher","Plus cher","Gratuit","Interdit"],c:1,e:"Les banques répercutent la hausse."},
{q:"Quand les taux montent, le prix des obligations existantes :",a:["Monte","Baisse","Ne change pas","Double"],c:1,e:"Relation inverse."}]},

{id:"cycles",title:"Cycles économiques et krachs",min:6,body:`
<p>L'économie avance par <strong>cycles</strong> : expansion, surchauffe, ralentissement, récession, reprise. Une <strong>récession</strong> se définit souvent par deux trimestres consécutifs de baisse du PIB.</p>
<h3>Les grands krachs à connaître</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Année</th><th>Événement</th><th>Baisse approximative</th></tr></thead><tbody>
<tr><td>1929</td><td>Grande Dépression</td><td class="n">≈ −85 % (Dow Jones)</td></tr><tr><td>2000–2002</td><td>Bulle internet</td><td class="n">≈ −50 % (S&amp;P 500)</td></tr><tr><td>2008</td><td>Crise des subprimes</td><td class="n">≈ −55 %</td></tr><tr><td>2020</td><td>Covid</td><td class="n">≈ −34 % en un mois</td></tr><tr><td>2022</td><td>Inflation et hausse des taux</td><td class="n">≈ −25 %</td></tr></tbody></table></div>
<h3>Ce qu'on en retient</h3>
<ul><li>Personne ne prévoit les krachs de façon fiable.</li><li>Les marchés ont toujours fini par dépasser leurs anciens sommets, parfois après de longues années (le Nasdaq a mis environ 15 ans après 2000).</li><li>La diversification (géographique, par classes d'actifs) et le DCA réduisent l'impact.</li></ul>`,
keys:["Récession ≈ deux trimestres de baisse du PIB.","Krachs imprévisibles, reprises parfois longues.","Diversification et DCA amortissent les chocs."],
quiz:[
{q:"Définition courante d'une récession ?",a:["Une baisse de la bourse de 10 %","Deux trimestres consécutifs de baisse du PIB","Une inflation à 5 %","Une hausse des taux"],c:1,e:"C'est la définition usuelle."},
{q:"Combien de temps le Nasdaq a-t-il mis environ pour retrouver son sommet de 2000 ?",a:["6 mois","3 ans","15 ans","Jamais"],c:2,e:"D'où l'importance de la diversification."},
{q:"Peut-on prévoir les krachs de façon fiable ?",a:["Oui, avec des indicateurs","Non","Oui, en lisant les réseaux sociaux","Oui, chaque année en octobre"],c:1,e:"Aucune méthode n'y arrive durablement."}]},

{id:"retraite",title:"La retraite en France",min:7,body:`
<p>Le système français repose surtout sur la <strong>répartition</strong> : les cotisations des actifs d'aujourd'hui paient les pensions des retraités d'aujourd'hui.</p>
<h3>Les trois étages</h3>
<ol><li><strong>Régime de base</strong> (Sécurité sociale / CNAV pour les salariés du privé).</li><li><strong>Complémentaire</strong> obligatoire (Agirc-Arrco pour les salariés du privé, par points).</li><li><strong>Épargne individuelle</strong> facultative : PER, assurance-vie, patrimoine.</li></ol>
<h3>Âge et trimestres</h3>
<p>La réforme de 2023 relevait l'âge légal vers 64 ans. Sa <strong>suspension</strong>, effective au 1er septembre 2026, fige temporairement la hausse pour les générations nées entre 1964 et 1968. Les règles pour ta génération pourront encore évoluer : suis ton relevé sur <strong>info-retraite.fr</strong>.</p>
<p>Pour une pension à taux plein, il faut un nombre de <strong>trimestres</strong> validés (jusqu'à 172 selon la génération). En alternance, tes trimestres sont validés grâce à ton salaire.</p>
<h3>Pourquoi s'en préoccuper à 20 ans ?</h3>
<p>Le rapport entre actifs et retraités se dégrade : le <strong>taux de remplacement</strong> (pension ÷ dernier salaire) devrait baisser. Épargner tôt, même peu, profite des intérêts composés sur 40 ans.</p>`,
keys:["Répartition : les actifs paient les retraités.","Base + complémentaire + épargne perso.","Suis tes trimestres sur info-retraite.fr."],
quiz:[
{q:"Le système de retraite français repose surtout sur :",a:["La capitalisation individuelle","La répartition","L'assurance-vie","Le Livret A"],c:1,e:"Les cotisations actuelles financent les pensions actuelles."},
{q:"Où consulter ses droits à la retraite ?",a:["info-retraite.fr","impots.gouv.fr","Sur son compte bancaire","Nulle part avant 60 ans"],c:0,e:"Relevé de carrière et simulations."},
{q:"Le taux de remplacement, c'est :",a:["Le taux du Livret A","Pension ÷ dernier salaire","La part d'actions","Le taux de la BCE"],c:1,e:"Il devrait diminuer pour les jeunes générations."}]},

{id:"transmission",title:"Donation et succession",min:7,body:`
<p>Transmettre (ou recevoir) un patrimoine obéit à des règles fiscales précises. Les connaître aide aussi pour recevoir un coup de pouce familial.</p>
<h3>Les abattements principaux</h3>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lien</th><th>Abattement</th></tr></thead><tbody>
<tr><td>Parent → enfant</td><td class="n">100 000 € par parent</td></tr><tr><td>Grand-parent → petit-enfant</td><td class="n">31 865 €</td></tr><tr><td>Don familial de somme d'argent (donateur &lt; 80 ans, bénéficiaire majeur)</td><td class="n">+ 31 865 €</td></tr><tr><td>Entre époux / partenaires de Pacs (donation)</td><td class="n">80 724 €</td></tr></tbody></table></div>
<p>Pour les donations, ces abattements se <strong>renouvellent tous les 15 ans</strong>. Au-delà, un barème progressif s'applique (de 5 % à 45 % en ligne directe).</p>
<h3>Succession</h3>
<p>Au décès, les enfants sont <strong>héritiers réservataires</strong> : une part minimale leur revient obligatoirement. Le conjoint marié est exonéré de droits de succession. Le concubin, lui, n'hérite de rien sans testament et paie 60 % de droits.</p>
<h3>L'assurance-vie, outil clé</h3>
<p>Les sommes versées avant 70 ans bénéficient d'un abattement de <strong>152 500 € par bénéficiaire</strong>, en plus des abattements ci-dessus.</p>`,
keys:["100 000 € par parent et par enfant, tous les 15 ans.","Don familial d'argent : 31 865 € de plus.","Assurance-vie : 152 500 € par bénéficiaire."],
quiz:[
{q:"Abattement sur une donation d'un parent à un enfant ?",a:["31 865 €","80 724 €","100 000 €","152 500 €"],c:2,e:"Renouvelable tous les 15 ans."},
{q:"Tous les combien d'années les abattements de donation se renouvellent-ils ?",a:["5 ans","10 ans","15 ans","30 ans"],c:2,e:"15 ans."},
{q:"Un concubin non marié ni pacsé hérite-t-il automatiquement ?",a:["Oui, de tout","Non, et il paie 60 % de droits s'il est désigné par testament","Oui, sans droits","Oui, la moitié"],c:1,e:"D'où l'intérêt du Pacs, du mariage ou de l'assurance-vie."}]},

{id:"fire",title:"Indépendance financière (FIRE) et règle des 4 %",min:7,body:`
<p>Le mouvement <strong>FIRE</strong> (Financial Independence, Retire Early) vise à accumuler assez de patrimoine pour que ses revenus couvrent ses dépenses, et rendre le travail <strong>optionnel</strong>.</p>
<h3>La règle des 4 %</h3>
<p>Issue d'études américaines (« Trinity study »), elle dit qu'on peut retirer environ <strong>4 % de son portefeuille la première année</strong> (puis ajuster de l'inflation) avec une probabilité élevée de ne pas l'épuiser sur 30 ans.</p>
<div class="ex"><span class="eyebrow">Le calcul</span>Dépenses annuelles × 25 = capital visé.<br>24 000 € de dépenses par an → 600 000 € de patrimoine investi.</div>
<h3>Les limites</h3>
<ul><li>Études basées sur l'historique américain : pour un horizon de 40 à 50 ans, beaucoup visent plutôt <strong>3 à 3,5 %</strong>.</li><li>Impôts et frais à intégrer.</li><li>Le levier principal reste le <strong>taux d'épargne</strong> : à 50 %, on peut viser l'indépendance en environ 17 ans.</li></ul>
<h3>Version douce : Coast FI</h3>
<p>Avoir assez investi pour que, sans nouveaux versements, le capital atteigne ton objectif à la retraite. Tu peux alors travailler moins ou autrement.</p>`,
keys:["Capital visé ≈ dépenses annuelles × 25.","Règle des 4 % (3–3,5 % pour un horizon très long).","Le taux d'épargne est le levier principal."],
quiz:[
{q:"Dépenses de 30 000 €/an. Capital visé selon la règle des 4 % ?",a:["120 000 €","300 000 €","750 000 €","1 200 000 €"],c:2,e:"30 000 × 25 = 750 000 €."},
{q:"Pour un horizon de 50 ans, on vise souvent un taux de retrait :",a:["Plus élevé, 6 %","Plus prudent, 3 à 3,5 %","10 %","0 %"],c:1,e:"Plus l'horizon est long, plus il faut être prudent."},
{q:"Le levier principal pour atteindre l'indépendance financière ?",a:["Le taux d'épargne","Le choix de la banque","La couleur de la carte","Le nombre d'ETF"],c:0,e:"Plus tu épargnes, plus vite tu y arrives."}]},

{id:"plan",title:"Ton plan d'action étudiant",min:6,body:`
<p>Tu as les bases. Voici un plan concret pour un étudiant ou alternant.</p>
<h3>Mois 1 : les fondations</h3>
<ol><li>Fais le point sur tes dépenses et fixe ta capacité d'épargne.</li><li>Vérifie ton éligibilité au <strong>LEP</strong> (2,5 %). Sinon, Livret A / LDDS / Livret jeune.</li><li>Mets en place un <strong>virement automatique</strong> le jour de la paie.</li></ol>
<h3>Mois 2–6 : le coussin</h3>
<p>Remplis ton épargne de précaution jusqu'à 3 mois de dépenses.</p>
<h3>Dès que possible : prendre date</h3>
<ol><li><strong>Ouvre un PEA</strong> (ou PEA Jeune) chez un courtier en ligne à frais bas, même avec 10 €.</li><li>Ouvre une <strong>assurance-vie en ligne</strong> sans frais d'entrée.</li></ol>
<h3>Ensuite : pilote automatique</h3>
<p>Programme un DCA mensuel sur un ETF monde capitalisant éligible PEA. Rééquilibre une fois par an.</p>
<h3>Plus tard : l'immobilier</h3>
<p>Une fois en CDI avec un apport, utilise les simulateurs pour préparer ton dossier.</p>
<p class="warn">Parcours pédagogique. Pour une décision importante, fais-toi accompagner par un conseiller indépendant (CIF enregistré à l'ORIAS).</p>`,
keys:["LEP ou Livret A + virement automatique.","Ouvre PEA et assurance-vie tôt.","DCA mensuel sur ETF monde, immobilier plus tard."],
quiz:[
{q:"Pourquoi ouvrir un PEA même avec 10 € ?",a:["Pour une prime","Pour démarrer le délai fiscal de 5 ans","C'est obligatoire","Pour un crédit"],c:1,e:"L'antériorité démarre à l'ouverture."},
{q:"Quelle est la bonne première étape ?",a:["Acheter de la crypto","Connaître ses dépenses et sa capacité d'épargne","Emprunter pour investir","Acheter un studio"],c:1,e:"Tout part du budget."},
{q:"À quelle fréquence regarder son portefeuille en DCA long terme ?",a:["Plusieurs fois par jour","Chaque heure","Rarement, rééquilibrage annuel","Jamais"],c:2,e:"Regarder trop souvent pousse à réagir."}]}
]});

/* ================= Organisation par sujets et niveaux ================= */
window.BSL_SUBJECTS = [
 {id:"budget",name:"Budget & Banque",short:"Budget",obj:"card",c1:"#2B5BFF",c2:"#0A1A5C",glow:"#6F8DFF",tagline:"Maîtrise ton argent au quotidien.",
  levels:{debutant:["budget","precaution","banque"],intermediaire:["composes","creditconso","pretetudiant"],expert:["patrimoine"]}},
 {id:"epargne",name:"Épargne",short:"Épargne",obj:"coins",c1:"#12B886",c2:"#053B2C",glow:"#5CF0C2",tagline:"Livrets, PEL, fonds euros : l'argent en sécurité.",
  levels:{debutant:["livrets"],intermediaire:["pel"],expert:["pochesure"]}},
 {id:"impots",name:"Impôts",short:"Impôts",obj:"doc",c1:"#F5A524",c2:"#4A2A00",glow:"#FFD27A",tagline:"Comprendre l'impôt pour payer le juste prix.",
  levels:{debutant:["ir"],intermediaire:["impotsetudiant","declarer"],expert:["pfu"]}},
 {id:"bourse",name:"La Bourse",short:"Bourse",obj:"candles",c1:"#8B5CF6",c2:"#1E0B4A",glow:"#C4A8FF",tagline:"Actions, ETF, analyse : investir pour le long terme.",
  levels:{debutant:["actions","obligations","etf"],intermediaire:["risque","courtiers","monde"],expert:["comptes","valorisation","stockpicking"]}},
 {id:"enveloppes",name:"PEA & enveloppes",short:"Enveloppes",obj:"envelope",c1:"#EC4899",c2:"#4A0626",glow:"#FF9BCB",tagline:"PEA, assurance-vie, PER : le bon contenant fiscal.",
  levels:{debutant:["pea"],intermediaire:["cto","av"],expert:["per","combo"]}},
 {id:"immo",name:"Immobilier",short:"Immo",obj:"house",c1:"#FF6B2C",c2:"#4A1500",glow:"#FFB08A",tagline:"De ton premier appart à l'investissement locatif.",
  levels:{debutant:["achat","credit"],intermediaire:["ptz","visite","rendement","bail"],expert:["lmnp","scpi","sci","pvimmo"]}},
 {id:"alternatifs",name:"Or & Crypto",short:"Alternatifs",obj:"gold",c1:"#D4A017",c2:"#2A1E00",glow:"#FFE08A",tagline:"Or, crypto, crowdfunding, levier : le terrain à risques.",
  levels:{debutant:["or"],intermediaire:["crypto","crowdfunding"],expert:["levier"]}},
 {id:"strategie",name:"Stratégie & Économie",short:"Stratégie",obj:"compass",c1:"#14B8A6",c2:"#032E2A",glow:"#7FF5E6",tagline:"Macro, psychologie, retraite, indépendance financière.",
  levels:{debutant:["dca","biais"],intermediaire:["bce","cycles","retraite"],expert:["transmission","fire","plan"]}}
];
window.BSL_LEVELS = [
 {id:"debutant",name:"Débutant",n:1,desc:"Les notions essentielles, sans jargon."},
 {id:"intermediaire",name:"Intermédiaire",n:2,desc:"Les mécanismes et les chiffres qui comptent."},
 {id:"expert",name:"Expert",n:3,desc:"Optimisation, fiscalité fine, stratégie."}
];
