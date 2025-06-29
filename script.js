const riddles = [
  { 
    question: "I am a 2-digit number. When reversed, I become 27 more than my original value. My digits add up to 9. What number am I?", 
    answer: "36", 
    hint: "The reversed number is 63", 
    solution: "63 - 36 = 27, and 3 + 6 = 9" 
  },
  {
    question: "If 1=5, 2=10, 3=15, 4=20, what does 5 equal?",
    answer: "1",
    hint: "Look at the first equation",
    solution: "The pattern shows 5=1 as given in the first equation"
  },
  {
    question: "2+2=6, 3+3=12, 4+4=?",
    answer: "20",
    hint: "Double the sum and subtract 2",
    solution: "2+2=4×2=8–2=6, 3+3=6×2=12, 4+4=8×2=16+4=20"
  },
  { 
    question: "If you divide 30 by half and then add 10, what do you get?", 
    answer: "70", 
    hint: "Dividing by half is the same as multiplying by 2", 
    solution: "30 ÷ 0.5 = 60, then 60 + 10 = 70" 
  },
  { 
    question: "What is the smallest 3-digit Armstrong number (a number that equals the sum of its own digits each raised to the power of the number of digits)?", 
    answer: "153", 
    hint: "1³ + 5³ + 3³ = ?", 
    solution: "1 + 125 + 27 = 153" 
  },
  {
    question: "3, 5, 7, 9, 11 — which number doesn't belong?",
    answer: "9",
    hint: "All are prime numbers except one",
    solution: "9 is not a prime number; others (3, 5, 7, 11) are"
  },
  {
    question: "If 1=11, 2=22, 3=33, what does 4 equal?",
    answer: "44",
    hint: "Look at the pattern",
    solution: "Each number equals itself repeated twice"
  },
  {
    question: "What is the smallest positive integer that is divisible by both 6 and 8?",
    answer: "24",
    hint: "Find the least common multiple (LCM) of 6 and 8",
    solution: "Multiples of 6: 6,12,18,24... Multiples of 8: 8,16,24... LCM is 24"
  },
  {
    question: "What is the next number: 1, 4, 9, 16, 25, __?",
    answer: "36",
    hint: "Perfect squares",
    solution: "1², 2², 3², 4², 5², 6²=36"
  },
  { 
    question: "What comes next in this sequence: 1, 11, 21, 1211, 111221, ...?", 
    answer: "312211", 
    hint: "1, one 1, two 1s, one 2 one 1, etc.", 
    solution: "312211" 
  },
  {
    question: "How many times can you subtract 5 from 25?",
    answer: "1",
    hint: "Think about the result after first subtraction",
    solution: "After subtracting once (25-5=20), you're subtracting from 20, not 25"
  },
  {
    question: "What is the only number that has the same number of letters as its value?",
    answer: "4",
    hint: "Count the letters in number words",
    solution: "'Four' has 4 letters"
  },
  {
    question: "If 2+3=10, 7+2=63, 6+5=66, what is 8+4?",
    answer: "96",
    hint: "Multiply then add",
    solution: "a+b becomes a×b + a → 8×4 + 8 = 40. Correction: The pattern is actually sum multiplied by first number: (2+3)×2=10, (7+2)×7=63 → (8+4)×8=96"
  },
  {
    question: "If three hens lay three eggs in three days, how many eggs will six hens lay in six days?",
    answer: "12",
    hint: "First determine how many eggs one hen lays in the given time",
    solution: "1 hen lays 1 egg in 3 days → 6 hens lay 6 eggs in 3 days → 12 eggs in 6 days"
  },
  {
    question: "What is 1/2 of 1/4 of 8?",
    answer: "1",
    hint: "Work from the end backwards",
    solution: "1/4 of 8 is 2, then 1/2 of 2 is 1"
  },
  {
    question: "6-2=16, 5-3=25, 9-2=?",
    answer: "49",
    hint: "Square of difference",
    solution: "6–2 = 6–2 = 4, 4² = 16; 9–2 = 7, 7² = 49"
  },
  {
   question: "What is the next number in this sequence: 1, 4, 9, 16, 25, ...?",
   answer: "36",
   hint: "Look at the squares of consecutive integers",
   solution: "1²=1, 2²=4, 3²=9, 4²=16, 5²=25, so next is 6²=36"
  },
  {
    question: "If you multiply all numbers on a telephone keypad (0-9), what do you get?",
    answer: "0",
    hint: "What's special about 0 in multiplication?",
    solution: "Any number multiplied by 0 equals 0"
  },
  {
   question: "A number when increased by 25% becomes 150. What is the original number?",
   answer: "120",
   hint: "The original number multiplied by 1.25 equals 150",
   solution: "x × 1.25 = 150 → x = 150 ÷ 1.25 = 120"
  },
  {
    question: "What is the sum of all prime numbers between 10 and 20?",
    answer: "60",
    hint: "The primes in this range are 11, 13, 17, 19",
    solution: "11 + 13 + 17 + 19 = 60"
  },
  {
    question: "What is the smallest whole number that when multiplied by 7 gives a product consisting entirely of 8's?",
    answer: "126984",
    hint: "You're looking for the smallest number n where 7×n=888...",
    solution: "888888 ÷ 7 = 126984 (smallest such number)"
  },
  {
    question: "How many months have 28 days?",
    answer: "12",
    hint: "Think about all months, not just February",
    solution: "All months have at least 28 days"
  },      
  {
    question: "3+4=21, 5+2=35, 4+6=40, what is 7+3?",
    answer: "70",
    hint: "Add then multiply with first number",
    solution: "(3+4)×3 = 21, (5+2)×5 = 35 → (7+3)×7 = 70"
  },
  {
    question: "The sum of three consecutive odd numbers is 57. What is the largest of these numbers?",
    answer: "21",
    hint: "Let the numbers be n, n+2, n+4",
    solution: "n + (n+2) + (n+4) = 57 → 3n+6=57 → n=17 → numbers are 17,19,21"
  },
  {
    question: "What is the smallest positive integer that has exactly 6 divisors?",
    answer: "12",
    hint: "Numbers with exactly 6 divisors have either p⁵ or p²×q form (p,q primes)",
    solution: "12 has divisors: 1,2,3,4,6,12 (smallest such number)"
  },
  {
    question: "If a train travels 300 miles in 5 hours, how many miles will it travel in 12 hours at the same speed?",
    answer: "720",
    hint: "First calculate the speed in miles per hour",
    solution: "Speed = 300mi/5hr = 60mph → Distance = 60mph × 12hr = 720 miles"
  },
  {
    question: "1+1=3, 2+2=5, 3+3=?",
    answer: "7",
    hint: "Add 1 extra to the real sum",
    solution: "1+1 = 2, but add 1 → 3. So 3+3 = 6 + 1 = 7"
  },
  {
    question: "What is the sum of the digits of the smallest 3-digit palindrome?",
    answer: "2",
    hint: "The smallest 3-digit palindrome is 101",
    solution: "1 + 0 + 1 = 2"
  },
  {
    question: "What is the largest number you can write with three 1's?",
    answer: "111",
    hint: "Consider different operations",
    solution: "111 is larger than 11^1 or 1^11"
  },
  {
    question: "A number is doubled and then increased by 10. The result is 50. What is the original number?",
    answer: "20",
    hint: "Set up the equation 2x + 10 = 50",
    solution: "2x + 10 = 50 → 2x = 40 → x = 20"
  },
  {
    question: "A train 120 m long crosses a pole in 6 seconds. What is its speed?",
    answer: "20",
    hint: "Speed = Distance / Time",
    solution: "Speed = 120 ÷ 6 = 20 m/s"
  },
  {
    question: "I am a two-digit number. My digits multiply to 8 and add to 6. What am I?",
    answer: "24",
    hint: "Try digit pairs",
    solution: "2 + 4 = 6 and 2 × 4 = 8 → 24"
  },
  {
    question: "What is the product of the first five prime numbers?",
    answer: "2310",
    hint: "First five primes: 2,3,5,7,11",
    solution: "2 × 3 × 5 × 7 × 11 = 2310"
  },
  {
    question: "How many times does the digit '7' appear from 1 to 100?",
    answer: "20",
    hint: "Count 7's in units place (10) and tens place (10)",
    solution: "Units place: 10 times (7,17,...,97) + Tens place: 10 times (70-79) = 20"
  },
  {
    question: "The sum of two numbers is 25 and their difference is 5. What is the larger number?",
    answer: "15",
    hint: "Set up equations x+y=25 and x-y=5",
    solution: "Add equations: 2x=30 → x=15 (larger number)"
  },
  {
    question: "What is the only even prime number?",
    answer: "2",
    hint: "Think about the definition of prime numbers",
    solution: "2 is divisible only by 1 and itself, and it's even"
  },
  {
    question: "If x + x = 10, then what is x × x?",
    answer: "25",
    hint: "First solve for x",
    solution: "x + x = 10 → 2x = 10 → x = 5 → x × x = 25"
  },
  {
    question: "A triangle has angles of 90° and 45°. What is the third angle?",
    answer: "45",
    hint: "Sum of angles in triangle = 180°",
    solution: "180 – 90 – 45 = 45"
  },
  {
    question: "A bat and a ball cost ₹110 in total. The bat costs ₹100 more than the ball. What is the cost of the ball?",
    answer: "5",
    hint: "Let x = cost of ball",
    solution: "Bat = x + 100 → x + (x + 100) = 110 → 2x = 10 → x = 5"
  },
  {
    question: "If 3! means 3×2×1, what is (4! - 3!) ÷ 3?",
    answer: "6",
    hint: "First calculate 4 factorial and 3 factorial",
    solution: "(24 - 6) ÷ 3 = 18 ÷ 3 = 6"
  },
  {
    question: "If 3 cats catch 3 mice in 3 minutes, how many cats would catch 100 mice in 100 minutes?",
    answer: "3",
    hint: "Determine the rate at which one cat catches mice",
    solution: "1 cat catches 1 mouse in 3 minutes → same 3 cats can catch 100 mice in 100 minutes"
  },
  {
    question: "A father is 36 years old and his son is 6. In how many years will the father be 4 times older than the son?",
    answer: "6",
    hint: "Set up equations for future age",
    solution: "Let x be years → (36+x) = 4(6+x) → 36 + x = 24 + 4x → x = 4"
  },
  {
    question: "In the Fibonacci sequence, what is the first 3-digit number?",
    answer: "144",
    hint: "Fibonacci sequence: 1,1,2,3,5,8,13,21,34,55,89,144...",
    solution: "12th Fibonacci number is 144"
  },
  {
    question: "What is half of two plus two?",
    answer: "3",
    hint: "Consider the order of operations",
    solution: "Half of two is 1, then 1 + 2 = 3"
  },
  {
    question: "What is the next number: 1, 1, 2, 3, 5, 8, 13, __?",
    answer: "21",
    hint: "Add the two previous numbers",
    solution: "Fibonacci sequence: 8+13=21"
  },
  {
    question: "Which number is divisible by 3: 123, 124, or 125?",
    answer: "123",
    hint: "Add the digits",
    solution: "1+2+3=6 → divisible by 3, others aren't"
  },
  {
    question: "What is 0.5 divided by 0.25?",
    answer: "2",
    hint: "Think in fractions",
    solution: "1/2 ÷ 1/4 = 1/2 × 4/1 = 2"
  },
  {
    question: "A square has a side of 5 cm. What is its area?",
    answer: "25",
    hint: "Area of square = side × side",
    solution: "5 × 5 = 25 cm²"
  },
  {
    question: "Find a 2-digit number where the sum of digits is 9 and their product is 20",
    answer: "45",
    hint: "Try combinations of digits that add to 9",
    solution: "4 + 5 = 9 and 4 × 5 = 20"
  },
  {
    question: "If you buy a ₹100 item at 50% off and then apply 50% tax, how much do you pay?",
    answer: "75",
    hint: "Apply discount first, then tax",
    solution: "₹100 – 50% = ₹50, then 50% of ₹50 = ₹25 tax → ₹50 + ₹25 = ₹75"
  }
];

let currentLevel = parseInt(localStorage.getItem("currentLevel") || "1");
let solved = JSON.parse(localStorage.getItem("solvedLevels") || "[]");
let hintsUsed = JSON.parse(localStorage.getItem("hintsUsed") || "{}");
let userAnswer = "";
let isProcessingInput = false;
let timerInterval = null;
let levelStartTime = 0;

const elements = {
  screens: {
    home: document.getElementById("homeScreen"),
    settings: document.getElementById("settingsScreen"),
    levels: document.getElementById("levelsScreen"),
    riddle: document.getElementById("riddleScreen")
  },
  buttons: {
    play: document.getElementById("playBtn"),
    levels: document.getElementById("levelsBtn"),
    settings: document.getElementById("settingsBtn"),
    quit: document.getElementById("quitBtn"),
    backFromSettings: document.getElementById("backFromSettingsBtn"),
    backFromLevels: document.getElementById("backFromLevelsBtn"),
    backFromGame: document.getElementById("backFromGameBtn"),
    clear: document.getElementById("clearBtn"),
    submit: document.getElementById("submitBtn"),
    hint: document.getElementById("hintBtn"),
    solution: document.getElementById("solutionBtn"),
    confirmQuit: document.getElementById("confirmQuitBtn"),
    cancelQuit: document.getElementById("cancelQuitBtn"),
    closeHint: document.getElementById("closeHintBtn"),
    closeSolution: document.getElementById("closeSolutionBtn")
  },
  gameElements: {
    levelTitle: document.getElementById("levelTitle"),
    questionText: document.getElementById("questionText"),
    answerBox: document.getElementById("answerBox"),
    resultMsg: document.getElementById("resultMsg"),
    levelButtons: document.getElementById("levelButtons"),
    hintText: document.getElementById("hintText"),
    solutionText: document.getElementById("solutionText"),
    progressBar: document.getElementById("progressBar"),
    levelTimer: document.getElementById("levelTimer"),
    achievementsList: document.getElementById("achievementsList")
  },
  audio: {
    bgMusic: document.getElementById("bgMusic"),
    click: document.getElementById("clickSound"),
    correct: document.getElementById("correctSound"),
    wrong: document.getElementById("wrongSound"),
    levelComplete: document.getElementById("levelCompleteSound"),
    hint: document.getElementById("hintSound"),
    solution: document.getElementById("solutionSound"),
    screenTransition: document.getElementById("screenTransitionSound"),
    buttonHover: document.getElementById("buttonHoverSound")
  },
  toggles: {
    music: document.getElementById("musicToggle"),
    sfx: document.getElementById("sfxToggle"),
    theme: document.getElementById("themeToggle")
  },
  splash: document.getElementById("splash"),
  confettiCanvas: document.getElementById("confetti-canvas"),
  particleCanvas: document.getElementById("particle-canvas"),
  quitModal: document.getElementById("quitModal"),
  hintPopup: document.getElementById("hintPopup"),
  solutionPopup: document.getElementById("solutionPopup")
};

function initGame() {
  // Set audio volumes
  elements.audio.bgMusic.volume = 0.3;
  elements.audio.click.volume = 0.6;
  elements.audio.correct.volume = 0.5;
  elements.audio.wrong.volume = 0.5;
  elements.audio.levelComplete.volume = 0.6;
  elements.audio.hint.volume = 0.5;
  elements.audio.solution.volume = 0.5;
  elements.audio.screenTransition.volume = 0.4;
  elements.audio.buttonHover.volume = 0.2; // Softer hover sound

  // Initialize music
  if (localStorage.getItem("music") !== "off") {
    elements.toggles.music.checked = true;
    setTimeout(() => {
      elements.audio.bgMusic.play().catch(e => {
        document.addEventListener('click', () => {
          elements.audio.bgMusic.play().catch(console.error);
        }, { once: true });
      });
    }, 1500);
  } else {
    elements.toggles.music.checked = false;
  }

  // Initialize SFX
  if (localStorage.getItem("sfx") !== "off") {
    elements.toggles.sfx.checked = true;
  } else {
    elements.toggles.sfx.checked = false;
  }

  // Initialize theme
  if (localStorage.getItem("theme") === "light") {
    elements.toggles.theme.checked = true;
    document.body.classList.add("light-theme");
  } else {
    elements.toggles.theme.checked = false;
  }

  setupEventListeners();
  renderLevels();
  updateAchievements();
  initParticles();

  // Hide splash screen after 2s
  setTimeout(() => {
    elements.splash.style.display = "none";
  }, 2000);
}

function setupEventListeners() {
  elements.buttons.play.addEventListener("click", startGame);
  elements.buttons.levels.addEventListener("click", () => showScreen("levelsScreen"));
  elements.buttons.settings.addEventListener("click", () => showScreen("settingsScreen"));
  elements.buttons.quit.addEventListener("click", showQuitModal);
  elements.buttons.backFromSettings.addEventListener("click", () => showScreen("homeScreen"));
  elements.buttons.backFromLevels.addEventListener("click", () => showScreen("homeScreen"));
  elements.buttons.backFromGame.addEventListener("click", () => showScreen("homeScreen"));
  elements.buttons.clear.addEventListener("click", clearAnswer);
  elements.buttons.submit.addEventListener("click", submitAnswer);
  elements.buttons.hint.addEventListener("click", showHint);
  elements.buttons.solution.addEventListener("click", showSolution);
  elements.buttons.confirmQuit.addEventListener("click", confirmQuit);
  elements.buttons.cancelQuit.addEventListener("click", hideQuitModal);
  elements.buttons.closeHint.addEventListener("click", hideHintPopup);
  elements.buttons.closeSolution.addEventListener("click", hideSolutionPopup);

  document.querySelector(".keypad").addEventListener("click", (e) => {
    if (isProcessingInput) return;
    isProcessingInput = true;
    
    const button = e.target.closest("button");
    if (button && button.dataset.number) {
      press(button.dataset.number);
    }
    
    setTimeout(() => { isProcessingInput = false; }, 100);
  });

  document.querySelector(".keypad").addEventListener("touchstart", (e) => {
    if (isProcessingInput) return;
    isProcessingInput = true;
    
    const button = e.target.closest("button");
    if (button) {
      if (button.dataset.number) {
        press(button.dataset.number);
      }
      button.classList.add("active");
    }
    
    setTimeout(() => { isProcessingInput = false; }, 100);
  }, { passive: true });

  document.querySelector(".keypad").addEventListener("touchend", (e) => {
    const button = e.target.closest("button");
    if (button) {
      button.classList.remove("active");
    }
  }, { passive: true });

  document.querySelectorAll(".btn, .level-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => playSound(elements.audio.buttonHover));
    btn.addEventListener("touchstart", () => {
      playSound(elements.audio.buttonHover);
    }, { passive: true });
  });

  elements.toggles.music.addEventListener("change", toggleMusic);
  elements.toggles.sfx.addEventListener("change", toggleSFX);
  elements.toggles.theme.addEventListener("change", toggleTheme);
  
  window.addEventListener("popstate", handleBackButton);
}

function showQuitModal() {
  playClick();
  elements.quitModal.classList.add("active");
}

function hideQuitModal() {
  playClick();
  elements.quitModal.classList.remove("active");
}

function confirmQuit() {
  playClick();
  elements.quitModal.classList.remove("active");
  try {
    window.close();
  } catch (e) {
    console.log("Window close failed, redirecting to home screen:", e);
    showScreen("homeScreen");
  }
}

function handleBackButton() {
  if (elements.screens.home.classList.contains("active")) {
    showQuitModal();
  } else {
    showScreen("homeScreen");
  }
}

function toggleMusic() {
  if (elements.toggles.music.checked) {
    elements.audio.bgMusic.play().catch(e => console.log("Music play error:", e));
    localStorage.setItem("music", "on");
  } else {
    elements.audio.bgMusic.pause();
    localStorage.setItem("music", "off");
  }
}

function toggleSFX() {
  if (elements.toggles.sfx.checked) {
    localStorage.setItem("sfx", "on");
  } else {
    localStorage.setItem("sfx", "off");
  }
}

function toggleTheme() {
  if (elements.toggles.theme.checked) {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
  }
}

function playSound(sound) {
  if (elements.toggles.sfx.checked && sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound error:", e));
  }
}

function playClick() {
  playSound(elements.audio.click);
}

function playCorrectSound() {
  playSound(elements.audio.correct);
}

function playWrongSound() {
  playSound(elements.audio.wrong);
}

function playLevelCompleteSound() {
  playSound(elements.audio.levelComplete);
}

function playHintSound() {
  playSound(elements.audio.hint);
}

function playSolutionSound() {
  playSound(elements.audio.solution);
}

function playScreenTransitionSound() {
  playSound(elements.audio.screenTransition);
}

function showScreen(id) {
  playScreenTransitionSound();
  history.pushState({screen: id}, "", "#"+id);
  Object.values(elements.screens).forEach(s => s.classList.remove("active"));
  elements.screens[id.replace("Screen", "")].classList.add("active");
  playClick();
  if (id === "levelsScreen") {
    animateLevelButtons();
  }
}

function startGame() {
  loadLevel(currentLevel);
}

function renderLevels() {
  const grid = elements.gameElements.levelButtons;
  grid.innerHTML = "";
  riddles.forEach((_, i) => {
    const level = i + 1;
    const btn = document.createElement("button");
    btn.textContent = level;
    btn.classList.add("level-btn");
    
    // Enable current level, solved levels, and the next level if current is solved
    btn.disabled = !(solved.includes(level) || level === currentLevel || (level === currentLevel + 1 && solved.includes(currentLevel)));
    
    if (solved.includes(level)) {
      btn.classList.add("completed");
      const hints = hintsUsed[level] || 0;
      btn.innerHTML = `${level} <span class="check">✔</span><span class="hint-count">${hints ? `💡${hints}` : ''}</span>`;
    } else if (level === currentLevel) {
      btn.classList.add("current");
    }
    
    btn.addEventListener("click", () => {
      if (!btn.disabled) {
        loadLevel(level);
      }
    });
    grid.appendChild(btn);
  });
}

function animateLevelButtons() {
  const buttons = document.querySelectorAll(".level-btn");
  buttons.forEach((btn, index) => {
    btn.style.animation = `bounceIn 0.5s ease ${index * 0.05}s forwards`;
    btn.style.opacity = "0";
  });
}

function updateProgressBar() {
  const progress = (solved.length / riddles.length) * 100;
  elements.gameElements.progressBar.style.width = `${progress}%`;
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  levelStartTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - levelStartTime) / 1000);
    elements.gameElements.levelTimer.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  return Math.floor((Date.now() - levelStartTime) / 1000);
}

function loadLevel(level) {
  clearConfetti();
  const r = riddles[level - 1];
  currentLevel = level;
  userAnswer = "";
  elements.gameElements.levelTitle.textContent = `Level ${ level }`;
  elements.gameElements.questionText.textContent = r.question;
  elements.gameElements.answerBox.textContent = "";
  elements.gameElements.resultMsg.textContent = "";
  elements.gameElements.resultMsg.className = "result";
  updateProgressBar();
  startTimer();
  showScreen("riddleScreen");
}

function press(n) {
  playClick();
  userAnswer += n;
  elements.gameElements.answerBox.textContent = userAnswer;
  elements.gameElements.resultMsg.textContent = "";
}

function clearAnswer() {
  playClick();
  userAnswer = "";
  elements.gameElements.answerBox.textContent = "";
  elements.gameElements.resultMsg.textContent = "";
}

function updateAchievements() {
  const achievements = [
    { name: "Novice", count: 10, emoji: "🏅" },
    { name: "Master", count: 25, emoji: "🥇" },
    { name: "Genius", count: 50, emoji: "🧠" }
  ];
  const list = elements.gameElements.achievementsList;
  list.innerHTML = "";
  achievements.forEach(ach => {
    const li = document.createElement("li");
    li.textContent = `${ach.emoji} ${ach.name}: Complete ${ach.count} levels`;
    if (solved.length >= ach.count) {
      li.classList.add("achieved");
    }
    list.appendChild(li);
  });
}

function submitAnswer() {
  const r = riddles[currentLevel - 1];
  const msg = elements.gameElements.resultMsg;
  
  if (userAnswer === r.answer) {
    const timeTaken = stopTimer();
    msg.textContent = timeTaken < 30 ? "🎉 Brilliant! Solved in " + timeTaken + "s!" : "🎉 Correct!";
    msg.className = "result";
    playCorrectSound();
    
    fireConfetti(() => {
      if (!solved.includes(currentLevel)) {
        solved.push(currentLevel);
        localStorage.setItem("solvedLevels", JSON.stringify(solved));
        updateAchievements();
      }
      currentLevel++;
      localStorage.setItem("currentLevel", currentLevel);
      playLevelCompleteSound();
      renderLevels();
      setTimeout(() => {
        if (currentLevel <= riddles.length) {
          loadLevel(currentLevel);
        } else {
          alert("🎊 All levels completed!");
          showScreen('homeScreen');
        }
      }, 1000);
    });
  } else {
    msg.textContent = "❌ Try again";
    msg.className = "result error";
    playWrongSound();
    userAnswer = "";
    elements.gameElements.answerBox.textContent = "";
    setTimeout(() => {
      elements.gameElements.resultMsg.textContent = "";
      elements.gameElements.resultMsg.className = "result";
    }, 1500);
  }
}

function showHint() {
  playHintSound();
  const r = riddles[currentLevel - 1];
  elements.gameElements.hintText.textContent = r.hint;
  elements.hintPopup.classList.add("active");
  hintsUsed[currentLevel] = (hintsUsed[currentLevel] || 0) + 1;
  localStorage.setItem("hintsUsed", JSON.stringify(hintsUsed));
}

function hideHintPopup() {
  playClick();
  elements.hintPopup.classList.remove("active");
}

function showSolution() {
  playSolutionSound();
  const r = riddles[currentLevel - 1];
  elements.gameElements.solutionText.textContent = r.solution;
  elements.solutionPopup.classList.add("active");
}

function hideSolutionPopup() {
  playClick();
  elements.solutionPopup.classList.remove("active");
}

function fireConfetti(callback) {
  const canvas = elements.confettiCanvas;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#6200EA', '#03DAC6', '#CF6679', '#FFD600', '#00B0FF'];
  const useStars = Math.random() > 0.5; // Randomly choose stars or circles
  
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 4 + 3,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 12 - 6
    });
  }
  
  let frame = 0;
  const anim = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (useStars) {
        // Draw star shape
        const spikes = 5;
        const outerRadius = p.size / 2;
        const innerRadius = p.size / 4;
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx.closePath();
      } else {
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      }
      ctx.fill();
      
      ctx.restore();
      
      p.y += p.speed;
      p.rotation += p.rotationSpeed;
      
      if (p.y > canvas.height + p.size) {
        p.y = -p.size;
        p.x = Math.random() * canvas.width;
      }
    });
    
    frame++;
    if (frame < 120) {
      requestAnimationFrame(anim);
    } else {
      clearConfetti();
      if (callback) callback();
    }
  };
  
  anim();
}

function clearConfetti() {
  const ctx = elements.confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height);
}

function initParticles() {
  const canvas = elements.particleCanvas;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.3 + 0.1
    });
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(179, 136, 255, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

document.addEventListener("DOMContentLoaded", initGame);
