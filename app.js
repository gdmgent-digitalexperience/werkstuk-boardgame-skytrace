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
	backToRosterButton.classList.remove('hidden');
}

function goHome() {
	clearQuizPanels();
	showScreen('setup');
	backToRosterButton.classList.add('hidden');
	state.activePlayerIndex = null;
}

function renderQuestion(word) {
	const payload = quizByWord[word];
	if (!payload) {
		return false;
	}

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

function buildResultMarkup(player, payload, isCorrect) {
	const outcome = isCorrect ? payload.correctOutcome : payload.wrongOutcome;
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
	const outcome = isCorrect ? payload.correctOutcome : payload.wrongOutcome;

	if (outcome.movement !== 0) {
		player.position = clampPosition(player.position + outcome.movement);
	}

	if (!isCorrect && payload.wrongOutcome.movement === 0) {
		player.position = 0;
	}

	renderActivePlayerSummary(player);
	questionPanel.classList.add('hidden');
	resultPanel.classList.remove('hidden');
	resultPanel.innerHTML = buildResultMarkup(player, payload, isCorrect);

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
