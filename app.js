const playerSlots = [
	{ label: 'Wit', color: '#f8fafc', text: '#0f172a' },
	{ label: 'Zwart', color: '#111827', text: '#f8fafc' },
	{ label: 'Roze', color: '#f472b6', text: '#0f172a' },
	{ label: 'Rood', color: '#ef4444', text: '#f8fafc' },
	{ label: 'Oranje', color: '#fb923c', text: '#0f172a' },
	{ label: 'Groen', color: '#22c55e', text: '#0f172a' },
];

const quizByWord = {
	piloot: {
		question: 'Wat wordt volgens de chemtrail-theorie beweerd over vliegtuigen?',
		options: ['Dat ze extra brandstof verbruiken om hoger te vliegen', 'Dat ze geheime chemicaliën verspreiden via hun strepen', 'Dat ze onzichtbaar kunnen worden', 'Dat ze alleen ’s nachts vliegen'],
		correct: 'Dat ze geheime chemicaliën verspreiden via hun strepen',
		correctOutcome: { title: 'Je krijgt een upgrade', movement: 4, message: 'Ga 4 vakjes vooruit.' },
		wrongOutcome: { title: 'De douane houdt je tegen', movement: -4, message: 'Ga 4 vakjes terug.' },
	},
	giftig: {
		question: 'Wat is een andere naam voor een condensstreep?',
		options: ['Contrail', 'Uitlaat wolk', 'Chemtrail', 'Jetstream'],
		correct: 'Contrail',
		correctOutcome: { title: 'Snelle boarding', movement: 2, message: 'Ga 2 vakjes vooruit.' },
		wrongOutcome: { title: 'Je staat op het vliegveld van een andere speler', movement: 0, message: 'Keer terug naar je eigen vliegveld.' },
	},
	contrail: {
		question: 'Zijn contrails en chemtrails hetzelfde?',
		options: ['Ja', 'Nee'],
		correct: 'Nee',
		correctOutcome: { title: 'De vlucht vertrekt op tijd', movement: 3, message: 'Ga 3 vakjes vooruit.' },
		wrongOutcome: { title: 'Er is mist', movement: -2, message: 'Ga 2 vakjes terug.' },
	},
	vliegen: {
		question: 'Wanneer ontstaan contrails het snelst?',
		options: ['Bij warm weer', 'Bij koude en vochtige lucht', 'Alleen bij regen', 'Alleen ’s nachts'],
		correct: 'Bij koude en vochtige lucht',
		correctOutcome: { title: 'Perfecte landing', movement: 2, message: 'Ga 2 vakjes vooruit.' },
		wrongOutcome: { title: 'Er is regen', movement: 0, message: 'Sla een beurt over.' },
	},
};

// Volledige vraagpool (kan willekeurig worden gevraagd)
const questionPool = [
	{ question: 'Zijn contrails en chemtrails hetzelfde?', options: ['Ja', 'Nee'], correct: 'Nee', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Er is mist' } },
	{ question: 'Wat is een andere naam voor een condensstreep?', options: ['Contrail', 'Uitlaat wolk', 'Chemtrail', 'Jetstream'], correct: 'Contrail', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Keer terug naar je eigen vliegveld.' } },
	{ question: 'Wanneer ontstaan contrails het snelst?', options: ['Bij warm weer', 'Bij koude en vochtige lucht', 'Alleen bij regen', 'Alleen ’s nachts'], correct: 'Bij koude en vochtige lucht', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Er is regen' } },
	{ question: 'Wat wordt volgens de chemtrail-theorie beweerd over vliegtuigen?', options: ['Dat ze extra brandstof verbruiken om hoger te vliegen', 'Dat ze geheime chemicaliën verspreiden via hun strepen', 'Dat ze onzichtbaar kunnen worden', 'Dat ze alleen ’s nachts vliegen'], correct: 'Dat ze geheime chemicaliën verspreiden via hun strepen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waar denken aanhangers van de chemtrail-theorie dat de chemicaliën voor dienen?', options: ['Om regen te maken', 'Om vliegtuigen sneller te maken', 'Voor controle van het weer of de bevolking', 'Voor navigatie'], correct: 'Voor controle van het weer of de bevolking', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat zeggen wetenschappelijke organisaties over chemtrails?', options: ['Dat ze geheim maar echt zijn', 'Dat ze deels waar zijn', 'Dat er geen bewijs is voor chemtrails', 'Dat ze alleen in Europa voorkomen'], correct: 'Dat er geen bewijs is voor chemtrails', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom blijven sommige contrails langer zichtbaar dan andere?', options: ['Door de snelheid van het vliegtuig', 'Door temperatuur en luchtvochtigheid op grote hoogte', 'Door het type piloot', 'Door de kleur van het vliegtuig'], correct: 'Door temperatuur en luchtvochtigheid op grote hoogte', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke organisatie heeft onderzoek gedaan naar chemtrails en deze ontkracht?', options: ['NASA en andere wetenschappelijke instellingen', 'Alleen lokale luchthavens', 'Autofabrikanten', 'Voetbalclubs'], correct: 'NASA en andere wetenschappelijke instellingen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom denken sommige mensen dat chemtrails echt zijn?', options: ['Omdat ze duidelijke wetenschappelijke data hebben', 'Door wantrouwen in overheden en verkeerde interpretatie van contrails', 'Omdat vliegtuigen lawaai maken', 'Omdat piloten dat toegeven'], correct: 'Door wantrouwen in overheden en verkeerde interpretatie van contrails', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent de afkorting “gate” op een luchthaven?', options: ['Een controlepost voor piloten', 'De plek waar passagiers het vliegtuig instappen', 'De opslagplaats voor bagage', 'Een parkeerplaats voor vliegtuigen'], correct: 'De plek waar passagiers het vliegtuig instappen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wie is verantwoordelijk voor de veiligheid en controle van bagage en passagiers?', options: ['Piloten', 'Verkeersleiders', 'Luchthavenbeveiliging', 'Stewardessen'], correct: 'Luchthavenbeveiliging', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “boarding”?', options: ['Het uitstappen uit een vliegtuig', 'Het instappen in een vliegtuig', 'Het laden van brandstof', 'Het controleren van paspoorten'], correct: 'Het instappen in een vliegtuig', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een terminal op een luchthaven?', options: ['Een gebouw waar passagiers vertrekken en aankomen', 'Een vliegtuigtype', 'Een landingsbaan', 'Een radarinstallatie'], correct: 'Een gebouw waar passagiers vertrekken en aankomen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is de functie van een “taxiway”?', options: ['Een weg voor passagiersbussen', 'Een baan waar vliegtuigen parkeren', 'Een noodlandingsbaan', 'Een verbindingsweg voor vliegtuigen tussen runway en gate'], correct: 'Een verbindingsweg voor vliegtuigen tussen runway en gate', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “slot time” op een luchthaven?', options: ['Tijd voor bagagecontrole', 'Geplande tijd waarop een vliegtuig mag opstijgen of landen', 'Pauze voor personeel', 'Tijd waarop tickets worden verkocht'], correct: 'Geplande tijd waarop een vliegtuig mag opstijgen of landen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “pushback”?', options: ['Het versnellen van een vliegtuig op de baan', 'Het achteruit duwen van een vliegtuig van de gate', 'Het annuleren van een vlucht', 'Het laden van bagage'], correct: 'Het achteruit duwen van een vliegtuig van de gate', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke instantie regelt internationale luchtvaart standaarden en veiligheid?', options: ['FIFA', 'WHO', 'UNESCO', 'ICAO'], correct: 'ICAO', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een “holding pattern”?', options: ['Een parkeerplaats voor vliegtuigen', 'Een cirkelvormige route in de lucht om te wachten op landing', 'Een bagagesysteem', 'Een noodprocedure op de grond'], correct: 'Een cirkelvormige route in de lucht om te wachten op landing', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “runway incursion”?', options: ['Een vliegtuig dat te snel landt', 'Een ongeautoriseerde aanwezigheid op de landingsbaan', 'Een technische storing', 'Een vertraagde vlucht'], correct: 'Een ongeautoriseerde aanwezigheid op de landingsbaan', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “ETD” op een vluchtbord?', options: ['Estimated Time of Departure', 'Exact Time of Delay', 'Engine Test Data', 'Emergency Takeoff Decision'], correct: 'Estimated Time of Departure', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is de rol van een “marshaller”?', options: ['Tickets controleren', 'Vliegtuigen begeleiden op het platform met handsignalen', 'Brandstof tanken', 'Bagage controleren'], correct: 'Vliegtuigen begeleiden op het platform met handsignalen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat zijn contrails voornamelijk opgebouwd uit?', options: ['Koolstofdioxide en stikstof', 'IJskristallen gevormd uit waterdamp', 'Vloeibare brandstofresten', 'Zuurstof en ozon'], correct: 'IJskristallen gevormd uit waterdamp', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke factor is het belangrijkst voor het ontstaan van contrails?', options: ['De kleur van het vliegtuig', 'Lage temperatuur en hoge luchtvochtigheid op grote hoogte', 'De snelheid van de piloot', 'De grootte van de luchthaven'], correct: 'Lage temperatuur en hoge luchtvochtigheid op grote hoogte', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Op welke hoogte ontstaan contrails meestal?', options: ['Onder 1.000 meter', 'Tussen 2.000 en 4.000 meter', 'Boven ongeveer 8.000 meter', 'Alleen op de grond'], correct: 'Boven ongeveer 8.000 meter', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is het verschil tussen korte en langdurige contrails?', options: ['Alleen de kleur verschilt', 'Langdurige contrails ontstaan bij hogere snelheid', 'Langdurige contrails blijven bestaan door vochtige lucht en kunnen zich verspreiden', 'Er is geen verschil'], correct: 'Langdurige contrails blijven bestaan door vochtige lucht en kunnen zich verspreiden', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke wetenschappelijke term beschrijft het proces waarbij waterdamp direct in ijs verandert?', options: ['Verdamping', 'Condensatie', 'Sublimatie (of depositie)', 'Oxidatie'], correct: 'Sublimatie (of depositie)', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom lijken contrails soms breder te worden na verloop van tijd?', options: ['Door turbulentie en windschering die de ijskristallen verspreiden', 'Omdat vliegtuigen terugkomen', 'Door zwaartekracht', 'Door luchtvervuiling op de grond'], correct: 'Door turbulentie en windschering die de ijskristallen verspreiden', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke motor uitstoot draagt direct bij aan de vorming van contrails?', options: ['Waterdamp en fijne deeltjes (roet)', 'Alleen zuurstof', 'Alleen stikstof', 'Alleen geluidsgolven'], correct: 'Waterdamp en fijne deeltjes (roet)', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke rol spelen roetdeeltjes bij contrails?', options: ['Geen enkele', 'Ze zorgen voor kleur', 'Ze dienen als condensatiekernen waarop ijskristallen vormen', 'Ze maken contrails warmer'], correct: 'Ze dienen als condensatiekernen waarop ijskristallen vormen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een “persistent contrail”?', options: ['Een contrail die onmiddellijk verdwijnt', 'Een contrail die uren kan blijven hangen en zich kan ontwikkelen tot cirruswolken', 'Een contrail die alleen ’s nachts zichtbaar is', 'Een contrail op lage hoogte'], correct: 'Een contrail die uren kan blijven hangen en zich kan ontwikkelen tot cirruswolken', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'In welk jaar steeg het eerste gemotoriseerde vliegtuig op?', options: ['1914', '1899', '1945', '1903'], correct: '1903', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat veroorzaakt de witte kleur van een contrail?', options: ['Chemische verfstoffen', 'Reflectie van zonlicht op ijskristallen', 'Rook van de motor', 'Stof uit de atmosfeer'], correct: 'Reflectie van zonlicht op ijskristallen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom verdwijnen sommige contrails snel?', options: ['Omdat het vliegtuig te laag vliegt', 'Omdat de lucht droog is', 'Omdat de motor uitstaat', 'Omdat het nacht is'], correct: 'Omdat de lucht droog is', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een veelgebruikt argument van chemtrail-aanhangers?', options: ['Dat vliegtuigen altijd dezelfde route volgen', 'Dat sommige strepen langer blijven hangen dan andere', 'Dat vliegtuigen lawaai maken', 'Dat luchthavens te groot zijn'], correct: 'Dat sommige strepen langer blijven hangen dan andere', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke brandstof gebruiken commerciële vliegtuigen meestal?', options: ['Diesel', 'Benzine', 'Kerosine', 'LPG'], correct: 'Kerosine', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat gebeurt er met waterdamp uit vliegtuigmotoren op grote hoogte?', options: ['Ze verdwijnt meteen', 'Ze bevriest tot ijskristallen', 'Ze verandert in rook', 'Ze daalt naar de grond'], correct: 'Ze bevriest tot ijskristallen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent ATC in de luchtvaart?', options: ['Air Traffic Control', 'Aircraft Terminal Center', 'Air Travel Check', 'Airport Transport Crew'], correct: 'Air Traffic Control', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom kruisen contrails elkaar soms in de lucht?', options: ['Omdat vliegtuigen botsen', 'Omdat verschillende vliegroutes elkaar kruisen', 'Omdat de wind ze samenbrengt', 'Omdat piloten dat expres doen'], correct: 'Omdat verschillende vliegroutes elkaar kruisen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een cockpit?', options: ['De opslagruimte voor bagage', 'De ruimte waar piloten het vliegtuig besturen', 'De passagiersruimte', 'De brandstofruimte'], correct: 'De ruimte waar piloten het vliegtuig besturen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent turbulentie?', options: ['Een noodlanding', 'Onrustige luchtstromen waardoor een vliegtuig schudt', 'Een motorstoring', 'Slecht zicht op de luchthaven'], correct: 'Onrustige luchtstromen waardoor een vliegtuig schudt', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom zijn contrails soms niet zichtbaar achter elk vliegtuig?', options: ['Niet elk vliegtuig heeft motoren', 'De atmosferische omstandigheden verschillen', 'Sommige vliegtuigen gebruiken geen brandstof', 'Omdat piloten dat uitschakelen'], correct: 'De atmosferische omstandigheden verschillen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een black box in een vliegtuig?', options: ['Een geheime opslag voor chemicaliën', 'Een recorder die vluchtgegevens opslaat', 'Een navigatiesysteem', 'Een brandstoftank'], correct: 'Een recorder die vluchtgegevens opslaat', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “altitude”?', options: ['Snelheid', 'Hoogte', 'Richting', 'Temperatuur'], correct: 'Hoogte', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke wolkensoort kunnen langdurige contrails soms vormen?', options: ['Cumulus', 'Cirrus', 'Stratus', 'Nimbus'], correct: 'Cirrus', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom geloven sommige mensen sneller in complottheorieën zoals chemtrails?', options: ['Door misinformatie en wantrouwen', 'Omdat piloten dit bevestigen', 'Omdat het in schoolboeken staat', 'Omdat NASA dit promoot'], correct: 'Door misinformatie en wantrouwen', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “takeoff”?', options: ['Het landen van een vliegtuig', 'Het opstijgen van een vliegtuig', 'Het tanken van een vliegtuig', 'Het laden van bagage'], correct: 'Het opstijgen van een vliegtuig', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Welke stof komt NIET rechtstreeks uit vliegtuigmotoren?', options: ['Waterdamp', 'Koolstofdioxide', 'Roetdeeltjes', 'Vloeibaar aluminium'], correct: 'Vloeibaar aluminium', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat is een veelvoorkomend misverstand over chemtrails?', options: ['Dat contrails afhankelijk zijn van het weer', 'Dat alle zichtbare vliegtuigstrepen chemische sproeiingen zijn', 'Dat vliegtuigen brandstof verbranden', 'Dat piloten routes volgen'], correct: 'Dat alle zichtbare vliegtuigstrepen chemische sproeiingen zijn', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat doet een verkeerstoren?', options: ['Bagage controleren', 'Vluchten coördineren en begeleiden', 'Passagiers inchecken', 'Tickets verkopen'], correct: 'Vluchten coördineren en begeleiden', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Waarom zijn vliegtuigen efficiënter op grote hoogte?', options: ['Omdat daar meer zuurstof is', 'Omdat de lucht dunner is en minder weerstand geeft', 'Omdat het warmer is', 'Omdat contrails helpen duwen'], correct: 'Omdat de lucht dunner is en minder weerstand geeft', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
	{ question: 'Wat betekent “final approach”?', options: ['De laatste fase voor landing', 'De eerste opstijgfase', 'De veiligheidscontrole', 'Het taxiën naar de gate'], correct: 'De laatste fase voor landing', wrongOutcome: { title: 'Antwoord fout', movement: 0, message: 'Geen voordeel.' } },
];

// Lijst met codewoorden opgegeven door de gebruiker. Deze worden gekoppeld
// aan vragen uit `questionPool` via een stabiele indexverdeling.
const codewordList = [
	'jetstream','douane','hemel','condensatie','oxiden','blauw','chemie','horizon','complot','hoogte','valies','landen','autopilot',
	'vliegtuig','windstromen','douane','vliegroute','ijsvorming',
	'aerosolen','chemie','waterdamp','complot',
	'neerslag','barium','tickets','dutyfree','reis','vliegen','luchtdruk','turbulentie','regen','nevel','landen','stewardess','landing','aluminium','sneeuw','kerosine','wolk','mist','partikels','ijskristallen','regen','vergiftiging','piloot','giftig','contrail','strepen','luchtvaart','wolk','trail','verdacht','chem','atmosfeer','lucht','wolkvorming','steward'
];

// Bouw een stabiele mapping van codewoord -> vraagindex (cyclus over pool)
const codewordMap = {};
for (let i = 0; i < codewordList.length; i += 1) {
	const word = codewordList[i].trim().toLowerCase();
	// wijs vragen cyclisch toe zodat alle codewoorden een vraag krijgen
	codewordMap[word] = i % questionPool.length;
}



// Koppel zes groene banner-titels aan de bijbehorende "antwoord goed" acties
const correctBenefits = [
	{ title: 'Je vlucht vertrekt op tijd', movement: 0, message: 'Pak 1 trail van een andere speler.' },
	{ title: 'Snelle boarding', movement: 2, message: 'Ga 2 vakjes vooruit.' },
	{ title: 'Perfecte landing', movement: 0, message: 'Pak een nieuwe trail.' },
	{ title: 'je krijgt een upgrade', movement: 0, message: 'Pak 1 trail van een andere speler.' },
	{ title: 'perfecte luchtstroom', movement: 2, message: 'Ga 2 vakjes vooruit.' },
	{ title: 'Er is meewind', movement: 0, message: 'Pak een nieuwe trail.' },
];

// Rode banner-titels (gebruikt als de 'rode bubbel')
const wrongTitles = [
	'Er is mist',
	'Je staat op het vliegveld van een andere speler',
	'Er is regen',
	'De douane houdt je tegen',
	'Turbulentie',
	'Brandstoftekort',
];

// Acties die onder 'Antwoord fout' getoond en toegepast worden
// Mogelijke acties: beweging (movement), trail loss (takeTrail), of skip beurt (skip)
const wrongActions = [
	{ label: 'Ga 2 vakjes terug', movement: -2 },
	{ label: 'Je moet één trail afgeven.', takeTrail: true, movement: 0 },
	{ label: 'Sla een beurt over.', skip: true, movement: 0 },
	{ label: 'Ga 2 vakjes terug', movement: -2 },
	{ label: 'Je moet één trail afgeven.', takeTrail: true, movement: 0 },
	{ label: 'Sla een beurt over.', skip: true, movement: 0 },
];

const state = {
	names: Array(playerSlots.length).fill(''),
	players: [],
	activePlayerIndex: null,
	activeWord: '',
	activeQuestion: null,
	selectedQuestionWord: null,
};

const setupScreen = document.getElementById('setup-screen');
const rosterScreen = document.getElementById('roster-screen');
const quizScreen = document.getElementById('quiz-screen');
const setupGrid = document.getElementById('setup-grid');
const continueButton = document.getElementById('continue-button');
const rosterBoard = document.getElementById('roster-board');
const positionTrack = document.getElementById('position-track');
const activePlayerName = document.getElementById('active-player-name');
const activePlayerColor = document.getElementById('active-player-color');
const activePlayerPosition = document.getElementById('active-player-position');
const wordForm = document.getElementById('word-form');
const wordInput = document.getElementById('word-input');
const wordFeedback = document.getElementById('word-feedback');
const questionPanel = document.getElementById('question-panel');
const resultPanel = document.getElementById('result-panel');
const backToRosterButton = document.getElementById('back-to-roster');
const homeButton = document.getElementById('home-button');
const heroCopy = document.getElementById('hero-copy');

const heroCopyText = {
	setup: 'Vul je naam in bij de juiste kleur. Zet een schuine streep (/) bij de kleuren die niet gebruikt worden.',
	roster: 'Als je een kanskaart trekt, klik je op je eigen naam.',
	quiz: '',
};

function normalizeWord(value) {
	return value.trim().toLowerCase();
}

function clampPosition(position) {
	return Math.max(0, Math.min(12, position));
}

function showScreen(target) {
	setupScreen.classList.toggle('screen-active', target === 'setup');
	rosterScreen.classList.toggle('screen-active', target === 'roster');
	quizScreen.classList.toggle('screen-active', target === 'quiz');
	heroCopy.textContent = heroCopyText[target] ?? heroCopyText.roster;
}

function playerDisplayColor(player) {
	return player.color;
}

function playerTextColor(player) {
	return player.text;
}

function createPlayers() {
	state.players = playerSlots.map((slot, index) => ({
		name: state.names[index].trim(),
		label: slot.label,
		color: slot.color,
		text: slot.text,
		position: 0,
		skip: false,
	}));
}

function updateContinueButton() {
	continueButton.disabled = state.names.some((name) => !name.trim());
}

function renderSetupGrid() {
	setupGrid.innerHTML = '';

	playerSlots.forEach((slot, index) => {
		const field = document.createElement('label');
		field.className = 'hex-input';
		if (slot.label === 'Zwart') {
			field.classList.add('is-dark');
		}
		field.style.background = slot.color;
		field.style.color = slot.text;
		field.style.setProperty('--field-text', slot.text);

		field.innerHTML = `
			<p class="hex-label">${slot.label}</p>
			<input class="hex-input-field" type="text" maxlength="24" placeholder="Naam ${index + 1}" value="${state.names[index] ?? ''}" aria-label="Naam voor ${slot.label}">
		`;

		const input = field.querySelector('input');

		function syncEmptyState() {
			field.classList.toggle('is-empty', !input.value.trim());
		}

		input.addEventListener('input', (event) => {
			state.names[index] = event.target.value;
			syncEmptyState();
			updateContinueButton();
		});

		syncEmptyState();

		setupGrid.appendChild(field);
	});
}

function renderRosterBoard() {
	rosterBoard.innerHTML = '';

	state.players.forEach((player, index) => {
		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'player-card';
		button.style.background = playerDisplayColor(player);
		button.style.color = playerTextColor(player);
		button.innerHTML = `
			<div>
				<h3>${player.name}</h3>
				<p>${player.label}</p>
			</div>
			<div>
				<strong>Klik om verder te gaan</strong>
			</div>
		`;

		button.addEventListener('click', () => openPlayerTurn(index));
		rosterBoard.appendChild(button);
	});
}

function renderPositionTrack() {
	if (!positionTrack) {
		return;
	}

	positionTrack.innerHTML = '';

	for (let slotIndex = 0; slotIndex <= 12; slotIndex += 1) {
		const slot = document.createElement('div');
		slot.className = 'track-slot';

		if (slotIndex === 0) {
			slot.classList.add('is-start');
		}

		if (slotIndex === 12) {
			slot.classList.add('is-finish');
		}

		const stack = document.createElement('div');
		stack.className = 'track-stack';

		state.players
			.filter((player) => clampPosition(player.position) === slotIndex)
			.forEach((player) => {
				const token = document.createElement('span');
				token.className = 'track-token';
				token.title = player.name;
				token.style.background = player.color;
				stack.appendChild(token);
			});

		slot.innerHTML = '';
		slot.appendChild(stack);
		positionTrack.appendChild(slot);
	}
}

function renderActivePlayerSummary(player) {
	activePlayerName.textContent = player.name;
	activePlayerColor.textContent = player.label;
	activePlayerColor.style.color = player.text;
	activePlayerColor.style.background = player.color;
	activePlayerColor.style.padding = '0.35rem 0.7rem';
	activePlayerColor.style.borderRadius = '999px';
	activePlayerPosition.style.setProperty('--progress', `${(clampPosition(player.position) / 12) * 100}%`);
}

function clearQuizPanels() {
	questionPanel.classList.add('hidden');
	resultPanel.classList.add('hidden');
	questionPanel.innerHTML = '';
	resultPanel.innerHTML = '';
}

function openPlayerTurn(index) {
	state.activePlayerIndex = index;
	state.activeWord = '';
	state.activeQuestion = null;
	state.selectedQuestionWord = null;
	clearQuizPanels();
	wordInput.value = '';
	wordFeedback.textContent = '';
	renderActivePlayerSummary(state.players[index]);
	showScreen('quiz');
	// Wacht op invulling van het codewoord voordat er een vraag wordt getoond
	if (wordInput) {
		wordInput.focus();
	}
	backToRosterButton.classList.remove('hidden');
}

function getRandomQuestion() {
	const idx = Math.floor(Math.random() * questionPool.length);
	return questionPool[idx];
}

function renderQuestionPayload(payload) {
	if (!payload) return false;
	state.activeQuestion = payload;

	questionPanel.classList.remove('hidden');
	questionPanel.innerHTML = `
		<p class="panel-label">Vraag voor ${state.players[state.activePlayerIndex].name}</p>
		<h3>${payload.question}</h3>
		<p>Kies het juiste antwoord om de route te bepalen.</p>
		<div class="answer-grid"></div>
	`;

	const answerGrid = questionPanel.querySelector('.answer-grid');
	payload.options.forEach((option) => {
		const optionButton = document.createElement('button');
		optionButton.type = 'button';
		optionButton.className = 'choice-button';
		optionButton.textContent = option;
		optionButton.addEventListener('click', () => resolveAnswer(option));
		answerGrid.appendChild(optionButton);
	});

	resultPanel.classList.add('hidden');
	resultPanel.innerHTML = '';
	return true;
}

function goHome() {
	clearQuizPanels();
	showScreen('setup');
	backToRosterButton.classList.add('hidden');
	state.activePlayerIndex = null;
}

function renderQuestion(word) {
	// Probeer eerst de bestaande woord-mapping
	let payload = quizByWord[word];
	// Als niet gevonden, kijk in de codewordMap en gebruik questionPool
	if (!payload) {
		const key = (word || '').trim().toLowerCase();
		if (key && Object.prototype.hasOwnProperty.call(codewordMap, key)) {
			const qIndex = codewordMap[key];
			payload = questionPool[qIndex];
		}
	}

	if (!payload) return false;

	state.activeWord = word;
	state.selectedQuestionWord = word;
	state.activeQuestion = payload;

	questionPanel.classList.remove('hidden');
	questionPanel.innerHTML = `
		<p class="panel-label">Vraag voor ${state.players[state.activePlayerIndex].name}</p>
		<h3>${payload.question}</h3>
		<p>Kies het juiste antwoord om de route te bepalen.</p>
		<div class="answer-grid"></div>
	`;

	const answerGrid = questionPanel.querySelector('.answer-grid');
	payload.options.forEach((option) => {
		const optionButton = document.createElement('button');
		optionButton.type = 'button';
		optionButton.className = 'choice-button';
		optionButton.textContent = option;
		optionButton.addEventListener('click', () => resolveAnswer(option));
		answerGrid.appendChild(optionButton);
	});

	resultPanel.classList.add('hidden');
	resultPanel.innerHTML = '';
	return true;
}

function buildResultMarkup(player, outcome, isCorrect) {
	const bannerClass = isCorrect ? 'result-banner' : 'result-banner is-wrong';
	return `
		<div class="${bannerClass}">${outcome.title}</div>
		<h3>${isCorrect ? 'Antwoord goed' : 'Antwoord fout'}</h3>
		<p>${outcome.message}</p>
		<div class="result-actions">
			<button id="continue-turn" class="primary-button" type="button">Volgende speler</button>
		</div>
	`;
}

function resolveAnswer(answer) {
	const player = state.players[state.activePlayerIndex];
	const payload = state.activeQuestion;
	const isCorrect = answer === payload.correct;
	let outcome;
	if (isCorrect) {
		// Kies willekeurig één van de algemene voordelen
		const idx = Math.floor(Math.random() * correctBenefits.length);
		outcome = correctBenefits[idx];
	} else {
		// Kies willekeurig één rode banner-titel en één fout-actie
		const title = wrongTitles[Math.floor(Math.random() * wrongTitles.length)];
		const action = wrongActions[Math.floor(Math.random() * wrongActions.length)];
		outcome = {
			title,
			message: action.label,
			movement: action.movement || 0,
			skip: !!action.skip,
			takeTrail: !!action.takeTrail,
		};
	}

	// Pas beweging of speciale effecten toe
	if (outcome.reset) {
		player.position = 0;
	} else if (typeof outcome.movement === 'number' && outcome.movement !== 0) {
		player.position = clampPosition(player.position + outcome.movement);
	}

	if (outcome.skip) {
		player.skip = true;
	}

	if (outcome.takeTrail) {
		// Markeer dat deze speler een trail moet afgeven; implementatie
		// van daadwerkelijke trail-overdracht volgt op verzoek.
		player.mustGiveTrail = true;
	}

	renderActivePlayerSummary(player);
	questionPanel.classList.add('hidden');
	resultPanel.classList.remove('hidden');
	resultPanel.innerHTML = buildResultMarkup(player, outcome, isCorrect);

	const continueTurn = document.getElementById('continue-turn');
	continueTurn.addEventListener('click', () => {
		clearQuizPanels();
		showScreen('roster');
		renderRosterBoard();
		renderPositionTrack();
		backToRosterButton.classList.add('hidden');
		state.activePlayerIndex = null;
	});
}

function initializeSetup() {
	renderSetupGrid();
	updateContinueButton();
}

continueButton.addEventListener('click', () => {
	createPlayers();
	renderRosterBoard();
	renderPositionTrack();
	showScreen('roster');
});

wordForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const word = normalizeWord(wordInput.value);
	const opened = renderQuestion(word);
	wordFeedback.textContent = opened ? '' : 'Voer het woord in dat op je kanskaart staat.';
});

backToRosterButton.addEventListener('click', () => {
	clearQuizPanels();
	showScreen('roster');
	renderRosterBoard();
	renderPositionTrack();
	backToRosterButton.classList.add('hidden');
	state.activePlayerIndex = null;
});

homeButton.addEventListener('click', goHome);

initializeSetup();
showScreen('setup');
