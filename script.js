const questions = [
    // Single Letters (Basic Combinations)
    { hebrew: 'א', pronunciation: ['aleph', 'a'], meaning: 'Aleph (silent/vowel)', audio: 'aleph.mp3' },
    { hebrew: 'ב', pronunciation: ['bet', 'vet', 'b', 'v'], meaning: 'Bet/Vet (B/V sound)', audio: 'bet.mp3' },
    { hebrew: 'ג', pronunciation: ['gimmel', 'g'], meaning: 'Gimmel (G sound)', audio: 'gimmel.mp3' },
    { hebrew: 'ד', pronunciation: ['dalet', 'd'], meaning: 'Dalet (D sound)', audio: 'dalet.mp3' },
    { hebrew: 'ה', pronunciation: ['hey', 'h'], meaning: 'Hey (H sound)', audio: 'hey.mp3' },
    { hebrew: 'ו', pronunciation: ['vav', 'v', 'o', 'u'], meaning: 'Vav (V, O, U sound)', audio: 'vav.mp3' },
    { hebrew: 'ז', pronunciation: ['zayin', 'z'], meaning: 'Zayin (Z sound)', audio: 'zayin.mp3' },
    { hebrew: 'ח', pronunciation: ['chet', 'ch'], meaning: 'Chet (guttural Ch)', audio: 'chet.mp3' },
    { hebrew: 'ט', pronunciation: ['tet', 't'], meaning: 'Tet (T sound)', audio: 'tet.mp3' },
    { hebrew: 'י', pronunciation: ['yod', 'y', 'i'], meaning: 'Yod (Y/I sound)', audio: 'yod.mp3' },
    { hebrew: 'כ', pronunciation: ['kaf', 'chaf', 'k', 'ch'], meaning: 'Kaf/Chaf (K/Ch sound)', audio: 'kaf.mp3' },
    { hebrew: 'ך', pronunciation: ['kaf sofit', 'chaf sofit', 'k', 'ch'], meaning: 'Final Kaf/Chaf', audio: 'kaf_sofit.mp3' },
    { hebrew: 'ל', pronunciation: ['lamed', 'l'], meaning: 'Lamed (L sound)', audio: 'lamed.mp3' },
    { hebrew: 'מ', pronunciation: ['mem', 'm'], meaning: 'Mem (M sound)', audio: 'mem.mp3' },
    { hebrew: 'ם', pronunciation: ['mem sofit', 'm'], meaning: 'Final Mem', audio: 'mem_sofit.mp3' },
    { hebrew: 'נ', pronunciation: ['nun', 'n'], meaning: 'Nun (N sound)', audio: 'nun.mp3' },
    { hebrew: 'ן', pronunciation: ['nun sofit', 'n'], meaning: 'Final Nun', audio: 'nun_sofit.mp3' },
    { hebrew: 'ס', pronunciation: ['samekh', 's'], meaning: 'Samekh (S sound)', audio: 'samekh.mp3' },
    { hebrew: 'ע', pronunciation: ['ayin', 'a', 'silent'], meaning: 'Ayin (silent/guttural)', audio: 'ayin.mp3' },
    { hebrew: 'פ', pronunciation: ['pey', 'fey', 'p', 'f'], meaning: 'Pey/Fey (P/F sound)', audio: 'pey.mp3' },
    { hebrew: 'ף', pronunciation: ['pey sofit', 'fey sofit', 'p', 'f'], meaning: 'Final Pey/Fey', audio: 'pey_sofit.mp3' },
    { hebrew: 'צ', pronunciation: ['tzadi', 'tsadi', 'tz', 'ts'], meaning: 'Tzadi (Tz sound)', audio: 'tzadi.mp3' },
    { hebrew: 'ץ', pronunciation: ['tzadi sofit', 'tsadi sofit', 'tz', 'ts'], meaning: 'Final Tzadi', audio: 'tzadi_sofit.mp3' },
    { hebrew: 'ק', pronunciation: ['kuf', 'k'], meaning: 'Kuf (K sound)', audio: 'kuf.mp3' },
    { hebrew: 'ר', pronunciation: ['resh', 'r'], meaning: 'Resh (R sound)', audio: 'resh.mp3' },
    { hebrew: 'ש', pronunciation: ['shin', 'sin', 'sh', 's'], meaning: 'Shin/Sin (Sh/S sound)', audio: 'shin_sin.mp3' }, // Unified audio for Shin/Sin
    { hebrew: 'ת', pronunciation: ['tav', 't'], meaning: 'Tav (T sound)', audio: 'tav.mp3' },

    // Words
    { hebrew: 'שָׁלוֹם', pronunciation: ['shalom'], meaning: 'Hello / Peace / Bye', audio: 'shalom.mp3' },
    { hebrew: 'תּוֹדָה', pronunciation: ['toda'], meaning: 'Thank You', audio: 'toda.mp3' },
    { hebrew: 'בּוֹקֶר טוֹב', pronunciation: ['boker tov'], meaning: 'Good Morning', audio: 'boker_tov.mp3' },
    { hebrew: 'לַיְלָה טוֹב', pronunciation: ['layla tov'], meaning: 'Good Night', audio: 'layla_tov.mp3' },
    { hebrew: 'בְּבַקָּשָׁה', pronunciation: ['bevakasha'], meaning: 'Please / You\'re Welcome', audio: 'bevakasha.mpos' },
    { hebrew: 'סְלִיחָה', pronunciation: ['slicha'], meaning: 'Excuse Me / Sorry', audio: 'slicha.mp3' },
    { hebrew: 'כֵּן', pronunciation: ['ken'], meaning: 'Yes', audio: 'ken.mp3' },
    { hebrew: 'לֹא', pronunciation: ['lo'], meaning: 'No', audio: 'lo.mp3' },
    { hebrew: 'מַה שְׁלוֹמְךָ?', pronunciation: ['ma shlomcha'], meaning: 'How are you? (m.sg)', audio: 'ma_shlomcha.mp3' },
    { hebrew: 'מַה שְׁלוֹמֵךְ?', pronunciation: ['ma shlomech'], meaning: 'How are you? (f.sg)', audio: 'ma_shlomech.mp3' },
    { hebrew: 'אֲנִי', pronunciation: ['ani'], meaning: 'I / I am', audio: 'ani.mp3' },
    { hebrew: 'אַתָּה', pronunciation: ['ata'], meaning: 'You (m.sg)', audio: 'ata.mp3' },
    { hebrew: 'אַתְּ', pronunciation: ['at'], meaning: 'You (f.sg)', audio: 'at.mp3' },
    { hebrew: 'הוּא', pronunciation: ['hu'], meaning: 'He / He is', audio: 'hu.mp3' },
    { hebrew: 'הִיא', pronunciation: ['hi'], meaning: 'She / She is', audio: 'hi.mp3' },
    { hebrew: 'מַיִם', pronunciation: ['mayim'], meaning: 'Water', audio: 'mayim.mp3' },
    { hebrew: 'לֶחֶם', pronunciation: ['lehem'], meaning: 'Bread', audio: 'lehem.mp3' },
    { hebrew: 'קָפֶה', pronunciation: ['kafe'], meaning: 'Coffee', audio: 'kafe.mp3' },
    { hebrew: 'חָלָב', pronunciation: ['halav'], meaning: 'Milk', audio: 'halav.mp3' },
    { hebrew: 'אֹכֶל', pronunciation: ['ochel'], meaning: 'Food', audio: 'ochel.mp3' },
    { hebrew: 'כֶּלֶב', pronunciation: ['kelev'], meaning: 'Dog', audio: 'kelev.mp3' },
    { hebrew: 'חָתוּל', pronunciation: ['hatul'], meaning: 'Cat', audio: 'hatul.mp3' },
    { hebrew: 'סֵפֶר', pronunciation: ['sefer'], meaning: 'Book', audio: 'sefer.mp3' },
    { hebrew: 'עֵץ', pronunciation: ['etz'], meaning: 'Tree', audio: 'etz.mp3' },
    { hebrew: 'שֶׁמֶשׁ', pronunciation: ['shemesh'], meaning: 'Sun', audio: 'shemesh.mp3' },
    { hebrew: 'יָרֵחַ', pronunciation: ['yareah'], meaning: 'Moon', audio: 'yareah.mp3' },
    { hebrew: 'כִּיסֵא', pronunciation: ['kise'], meaning: 'Chair', audio: 'kise.mp3' },
    { hebrew: 'שֻׁלְחָן', pronunciation: ['shulhan'], meaning: 'Table', audio: 'shulhan.mp3' },
    { hebrew: 'דֶּלֶת', pronunciation: ['delet'], meaning: 'Door', audio: 'delet.mp3' },
    { hebrew: 'חַלּוֹן', pronunciation: ['halon'], meaning: 'Window', audio: 'halon.mp3' },
    { hebrew: 'בַּיִת', pronunciation: ['bayit'], meaning: 'House', audio: 'bayit.mp3' },
    { hebrew: 'רְחוֹב', pronunciation: ['rehov'], meaning: 'Street', audio: 'rehov.mp3' },
    { hebrew: 'עִיר', pronunciation: ['ir'], meaning: 'City', audio: 'ir.mp3' },
    { hebrew: 'כְּפָר', pronunciation: ['kfar'], meaning: 'Village', audio: 'kfar.mp3' },
    { hebrew: 'עַכְשָׁיו', pronunciation: ['achshav'], meaning: 'Now', audio: 'achshav.mp3' },
    { hebrew: 'מָחָר', pronunciation: ['machar'], meaning: 'Tomorrow', audio: 'machar.mp3' },
    { hebrew: 'אֶתְמוֹל', pronunciation: ['etmol'], meaning: 'Yesterday', audio: 'etmol.mp3' },
    { hebrew: 'גָּדוֹל', pronunciation: ['gadol'], meaning: 'Big / Large (m)', audio: 'gadol.mp3' },
    { hebrew: 'גְּדוֹלָה', pronunciation: ['gdola'], meaning: 'Big / Large (f)', audio: 'gdola.mp3' },
    { hebrew: 'קָטָן', pronunciation: ['katan'], meaning: 'Small / Little (m)', audio: 'katan.mp3' },
    { hebrew: 'קְטַנָּה', pronunciation: ['ktana'], meaning: 'Small / Little (f)', audio: 'ktana.mp3' },
    { hebrew: 'יָפֶה', pronunciation: ['yafe'], meaning: 'Beautiful / Nice (m)', audio: 'yafe.mp3' },
    { hebrew: 'יָפָה', pronunciation: ['yafa'], meaning: 'Beautiful / Nice (f)', audio: 'yafa.mp3' },
    { hebrew: 'מְאוֹד', pronunciation: ['meod'], meaning: 'Very', audio: 'meod.mp3' },
    { hebrew: 'וְ', pronunciation: ['ve'], meaning: 'And', audio: 've.mp3' },
    { hebrew: 'אוֹ', pronunciation: ['o'], meaning: 'Or', audio: 'o.mp3' },
    { hebrew: 'אֲבָל', pronunciation: ['aval'], meaning: 'But', audio: 'aval.mp3' },
    { hebrew: 'כִּי', pronunciation: ['ki'], meaning: 'Because', audio: 'ki.mp3' },
    { hebrew: 'מִי', pronunciation: ['mi'], meaning: 'Who', audio: 'mi.mp3' },
    { hebrew: 'מָה', pronunciation: ['ma'], meaning: 'What', audio: 'ma.mp3' },
    { hebrew: 'אֵיפֹה', pronunciation: ['eifo'], meaning: 'Where', audio: 'eifo.mp3' },
    { hebrew: 'מָתַי', pronunciation: ['matay'], meaning: 'When', audio: 'matay.mp3' },
    { hebrew: 'לָמָּה', pronunciation: ['lama'], meaning: 'Why', audio: 'lama.mp3' },
    { hebrew: 'אֵיךְ', pronunciation: ['eich'], meaning: 'How', audio: 'eich.mp3' },
    { hebrew: 'כַּמָּה', pronunciation: ['kama'], meaning: 'How Much / How Many', audio: 'kama.mp3' },
    { hebrew: 'אֶחָד', pronunciation: ['ehad'], meaning: 'One (m)', audio: 'ehad.mp3' },
    { hebrew: 'אַחַת', pronunciation: ['ahat'], meaning: 'One (f)', audio: 'ahat.mp3' },
    { hebrew: 'שְׁנַיִם', pronunciation: ['shnayim'], meaning: 'Two (m)', audio: 'shnayim.mp3' },
    { hebrew: 'שְׁתַּיִם', pronunciation: ['shtayim'], meaning: 'Two (f)', audio: 'shtayim.mp3' }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const numQuestionsInput = document.getElementById('num-questions');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizArea = document.getElementById('quiz-area');
const hebrewWordEl = document.getElementById('hebrew-word');
const englishMeaningEl = document.getElementById('english-meaning');
const playAudioBtn = document.getElementById('play-audio-btn');
const audioLoadingEl = document.getElementById('audio-loading');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const restartFromResultsBtn = document.getElementById('restart-from-results-btn');
const questionCounterEl = document.getElementById('question-counter');
const resultsArea = document.getElementById('results-area');
const correctCountEl = document.getElementById('correct-count');
const totalQuestionsEl = document.getElementById('total-questions');
const summaryList = document.getElementById('summary-list');

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let quizOrder = [];
let quizResults = [];
let totalQuestionsForQuiz = 0;

// Learning Improvement: Track incorrectly answered words/letters by their Hebrew text
let incorrectAttempts = JSON.parse(localStorage.getItem('incorrectHebrewQuizAttempts')) || {};
let audio = null; // Declare audio player globally

function showStartScreen() {
    startScreen.classList.remove('hidden');
    quizArea.classList.add('hidden');
    resultsArea.classList.add('hidden');
    numQuestionsInput.value = Math.min(Math.max(questions.length, 20), 100); // Default to a reasonable number
}

function startQuiz() {
    totalQuestionsForQuiz = parseInt(numQuestionsInput.value, 10);
    if (isNaN(totalQuestionsForQuiz) || totalQuestionsForQuiz < 5) {
        alert('Please enter a valid number of questions (minimum 5).');
        return;
    }
    if (totalQuestionsForQuiz > questions.length * 3) { // Cap quiz length to prevent infinite loops on very few incorrect answers
         alert(`You requested too many questions. Max allowed for meaningful practice is ${questions.length * 3}. Setting to ${questions.length * 3}.`);
         totalQuestionsForQuiz = questions.length * 3;
         numQuestionsInput.value = totalQuestionsForQuiz;
    }


    startScreen.classList.add('hidden');
    quizArea.classList.remove('hidden');
    initializeQuiz();
}

function initializeQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    quizResults = [];
    feedbackEl.textContent = '';
    answerInput.value = '';
    answerInput.disabled = false;
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');
    resultsArea.classList.add('hidden');
    
    generateQuizOrder();
    displayQuestion();
}

function generateQuizOrder() {
    let struggledQuestions = []; // Questions for which user has incorrect attempts
    let otherQuestions = [];    // All other questions

    questions.forEach((q, index) => {
        if (incorrectAttempts[q.hebrew] && incorrectAttempts[q.hebrew] > 0) {
            // Add struggled questions more frequently based on incorrect attempts, up to 3 times
            for (let i = 0; i < Math.min(incorrectAttempts[q.hebrew], 3); i++) {
                struggledQuestions.push(index);
            }
        }
        otherQuestions.push(index);
    });

    shuffleArray(struggledQuestions);
    shuffleArray(otherQuestions);

    // Combine them. Prioritize struggled, then ensure all unique questions appear at least once.
    let preliminaryOrder = Array.from(new Set(struggledQuestions.concat(otherQuestions)));

    // Fill the rest of the quiz length with a mix of all questions
    while (preliminaryOrder.length < totalQuestionsForQuiz) {
        let tempQuestions = Array.from({ length: questions.length }, (_, i) => i);
        shuffleArray(tempQuestions);
        preliminaryOrder = preliminaryOrder.concat(tempQuestions.slice(0, Math.min(tempQuestions.length, totalQuestionsForQuiz - preliminaryOrder.length)));
    }
    
    // Trim or extend to exact totalQuestionsForQuiz and then shuffle
    quizOrder = preliminaryOrder.slice(0, totalQuestionsForQuiz);
    shuffleArray(quizOrder);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    if (currentQuestionIndex < quizOrder.length) {
        const questionIndex = quizOrder[currentQuestionIndex];
        const currentQuestion = questions[questionIndex];
        
        hebrewWordEl.textContent = currentQuestion.hebrew;
        englishMeaningEl.textContent = currentQuestion.meaning; // Display meaning
        questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizOrder.length}`;
        
        answerInput.value = '';
        answerInput.focus();
        submitBtn.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        feedbackEl.textContent = '';
        answerInput.disabled = false;
        playAudioBtn.classList.remove('hidden'); // Ensure audio button is visible

        // Preload audio and show loading indicator
        if (currentQuestion.audio) {
            audioLoadingEl.classList.remove('hidden');
            playAudioBtn.querySelector('i').classList.add('hidden'); // Hide speaker icon
            audio = new Audio(`./audio/${currentQuestion.audio}`);
            audio.load(); // Start loading the audio
            audio.oncanplaythrough = () => {
                audioLoadingEl.classList.add('hidden');
                playAudioBtn.querySelector('i').classList.remove('hidden'); // Show speaker icon
            };
            audio.onerror = (e) => {
                console.error("Error loading audio:", e);
                audioLoadingEl.classList.add('hidden');
                playAudioBtn.querySelector('i').classList.remove('hidden'); // Show speaker icon
                feedbackEl.textContent = 'Audio failed to load. Please check your audio files.';
                feedbackEl.className = 'incorrect';
            };
        } else {
             playAudioBtn.classList.add('hidden'); // Hide button if no audio
        }

    } else {
        showResults();
    }
}

function playAudio() {
    if (audio) {
        audio.currentTime = 0; // Rewind to start
        audio.play().catch(e => console.error("Error playing audio:", e));
    }
}

function checkAnswer() {
    const questionIndex = quizOrder[currentQuestionIndex];
    const currentQuestion = questions[questionIndex];
    const userAnswer = answerInput.value.toLowerCase().trim();
    
    // Check if user's pronunciation matches any of the correct ones
    const isCorrect = currentQuestion.pronunciation.some(p => userAnswer === p.toLowerCase());

    quizResults.push({
        hebrew: currentQuestion.hebrew,
        meaning: currentQuestion.meaning,
        userAnswer: userAnswer,
        correctPronunciation: currentQuestion.pronunciation[0], // Store primary for display
        isCorrect: isCorrect
    });

    if (isCorrect) {
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'correct';
        correctAnswersCount++;
        // Reduce incorrect attempts count for this item
        if (incorrectAttempts[currentQuestion.hebrew] && incorrectAttempts[currentQuestion.hebrew] > 0) {
            incorrectAttempts[currentQuestion.hebrew]--;
        }
    } else {
        feedbackEl.textContent = `Incorrect. The pronunciation is "${currentQuestion.pronunciation.join(' / ')}".`;
        feedbackEl.className = 'incorrect';
        // Increment incorrect attempts for this item
        incorrectAttempts[currentQuestion.hebrew] = (incorrectAttempts[currentQuestion.hebrew] || 0) + 1;
    }

    localStorage.setItem('incorrectHebrewQuizAttempts', JSON.stringify(incorrectAttempts));

    answerInput.disabled = true;
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
}

function showResults() {
    quizArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');

    correctCountEl.textContent = correctAnswersCount;
    totalQuestionsEl.textContent = quizOrder.length;
    summaryList.innerHTML = '';

    quizResults.forEach(result => {
        const li = document.createElement('li');
        li.classList.add(result.isCorrect ? 'correct-summary' : 'incorrect-summary');
        li.innerHTML = `
            <span class="summary-word">${result.hebrew}</span>
            <div class="summary-details">
                <span class="summary-meaning">${result.meaning}</span>
                <span class="summary-pronunciation">Your: "${result.userAnswer}" (Correct: "${result.correctPronunciation}")</span>
            </div>
            <span class="summary-status ${result.isCorrect ? 'correct' : 'incorrect'}">${result.isCorrect ? 'Correct' : 'Incorrect'}</span>
        `;
        summaryList.appendChild(li);
    });
}

// Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});
restartBtn.addEventListener('click', showStartScreen); // Go back to start screen
restartFromResultsBtn.addEventListener('click', showStartScreen); // Go back to start screen
playAudioBtn.addEventListener('click', playAudio);

answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!submitBtn.classList.contains('hidden')) {
            checkAnswer();
        } else if (!nextBtn.classList.contains('hidden')) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }
});

// Initialize the quiz to show the start screen
showStartScreen();
