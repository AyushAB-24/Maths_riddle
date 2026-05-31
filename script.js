// Global tracking references for Native Capacitor Ecosystem
let nativeAdMob = null;

// Framework Bootstrapper & Ad System Setup
document.addEventListener('deviceready', async () => {
    // Safely resolve the native community plugins from window context
    if (window.Capacitor && window.Capacitor.Plugins) {
        nativeAdMob = window.Capacitor.Plugins.AdMob;
    }

    if (nativeAdMob) {
        try {
            // Initialize the AdMob engine using your original App ID configuration
            await nativeAdMob.initialize({
                initializeForTesting: false
            });
            console.log("Capacitor AdMob engine initialized successfully.");

            // Show your live banner safely anchored at the bottom
            await nativeAdMob.showBanner({
                adId: 'ca-app-pub-1825832964235064/5196004433', // Original Live Banner Ad ID
                position: 'BOTTOM_CENTER',
                margin: 0,
                isTesting: false // Live Mode
            });
            console.log("AdMob Banner displayed successfully.");

            // Pre-load your live rewarded ad slot ready for use
            await nativeAdMob.prepareRewardedAd({
                adId: 'ca-app-pub-1825832964235064/8252422930', // Original Live Rewarded Ad ID
                isTesting: false // Live Mode
            });
            console.log("AdMob Rewarded Ad pre-loaded.");

        } catch (error) {
            console.error("AdMob initialization failed:", error);
        }
    }
});

const riddles = [
  { 
    question: "I am a 2-digit number. When reversed, I become 27 more than my original value. My digits add up to 9. What number am I?", 
    answer: "36", 
    hint: "The tens digit is 3.", 
    solution: "Original number is 36. Reversed it becomes 63. 63 is exactly 27 more than 36 (36 + 27 = 63), and 3 + 6 = 9." 
  },
  {
    question: "If 1=5, 2=10, 3=15, 4=20, what does 5 equal?",
    answer: "1",
    hint: "Look closely at the very first equation.",
    solution: "Since the first equation explicitly states that 1 = 5, then 5 must equal 1."
  },
  {
    question: "2+2=6, 3+3=12, 4+4=?",
    answer: "20",
    hint: "Multiply the number by the next consecutive integer.",
    solution: "The pattern is n + n = n × (n + 1). So, 2×3=6, 3×4=12, and 4×5=20."
  },
  { 
    question: "If you divide 30 by half and then add 10, what do you get?", 
    answer: "70", 
    hint: "Dividing by half (0.5) is the same as multiplying by 2.", 
    solution: "30 ÷ 0.5 = 60. Then, 60 + 10 = 70." 
  },
  { 
    question: "What is the smallest 3-digit Armstrong number (a number that equals the sum of its own digits each raised to the power of the number of digits)?", 
    answer: "153", 
    hint: "Try checking the cubes of 1, 5, and 3.", 
    solution: "1³ + 5³ + 3³ = 1 + 125 + 27 = 153." 
  },
  {
    question: "3, 5, 7, 9, 11 — which number doesn't belong?",
    answer: "9",
    hint: "All numbers in the list are prime numbers except one.",
    solution: "9 is a composite number (3×3), whereas 3, 5, 7, and 11 are all prime numbers."
  },
  {
    question: "If 1=11, 2=22, 3=33, what does 4 equal?",
    answer: "44",
    hint: "Look at how the digits repeat.",
    solution: "The pattern repeats the given number twice, so 4 becomes 44."
  },
  {
    question: "What is the smallest positive integer that is divisible by both 6 and 8?",
    answer: "24",
    hint: "Find the Least Common Multiple (LCM) of 6 and 8.",
    solution: "Multiples of 6: 6, 12, 18, 24... Multiples of 8: 8, 16, 24... The smallest shared multiple is 24."
  },
  {
    question: "What is the next number: 1, 4, 9, 16, 25, __?",
    answer: "36",
    hint: "Think about perfect squares.",
    solution: "The sequence is made of perfect squares: 1², 2², 3², 4², 5². The next is 6² = 36."
  },
  { 
    question: "What comes next in this sequence: 1, 11, 21, 1211, 111221, ...?", 
    answer: "312211", 
    hint: "Read the previous number out loud by counting its digits (e.g., 'one 1', 'two 1s').", 
    solution: "This is the Look-and-Say sequence. The last term '111221' is read as 'three 1s, two 2s, one 1', resulting in 312211." 
  },
  {
    question: "How many times can you subtract 5 from 25?",
    answer: "1",
    hint: "Think about what the total becomes after you subtract the first 5.",
    solution: "After the first subtraction, 25 becomes 20. The next time you subtract 5, you are subtracting it from 20, not 25."
  },
  {
    question: "What is the only number that has the same number of letters as its value?",
    answer: "4",
    hint: "Spell out small numbers in your head and count their letters.",
    solution: "The word 'FOUR' is spelled with exactly 4 letters."
  },
  {
    question: "If 2+3=10, 7+2=63, 6+5=66, what is 8+4?",
    answer: "96",
    hint: "Multiply the sum of the numbers by the first number.",
    solution: "The pattern is (a + b) × a. So, (8 + 4) × 8 = 12 × 8 = 96."
  },
  {
    question: "If three hens lay three eggs in three days, how many eggs will six hens lay in six days?",
    answer: "12",
    hint: "Determine how many eggs a single hen lays in 3 days first.",
    solution: "3 hens lay 3 eggs in 3 days means 1 hen lays 1 egg every 3 days. Therefore, 6 hens will lay 6 eggs in 3 days, and double that amount (12 eggs) in 6 days."
  },
  {
    question: "What is 1/2 of 1/4 of 8?",
    answer: "1",
    hint: "Calculate 1/4 of 8 first, then cut that result in half.",
    solution: "1/4 of 8 is 2. Then, 1/2 of 2 is 1."
  },
  {
    question: "6-2=16, 5-3=25, 9-2=?",
    answer: "49",
    hint: "Square the result after subtracting the numbers backward, or square their absolute difference.",
    solution: "(6 - 2)² = 4² = 16. Following this rule, (9 - 2)² = 7² = 49."
  },
  {
   question: "What is the next number in this sequence: 1, 8, 27, 64, ...?",
   answer: "125",
   hint: "Look at the cubes of consecutive integers (n³).",
   solution: "1³=1, 2³=8, 3³=27, 4³=64. The next consecutive integer cube is 5³ = 125."
  },
  {
    question: "If you multiply all numbers on a telephone keypad (0-9), what do you get?",
    answer: "0",
    hint: "Remember that a telephone keypad includes the number 0.",
    solution: "Any product multiplied by 0 will always result in 0."
  },
  {
   question: "A number when increased by 25% becomes 150. What is the original number?",
   answer: "120",
   hint: "The original number multiplied by 1.25 equals 150.",
   solution: "Let the number be x. x × 1.25 = 150 → x = 150 ÷ 1.25 = 120."
  },
  {
    question: "What is the sum of all prime numbers between 10 and 20?",
    answer: "60",
    hint: "Find the four prime numbers in that range and add them up.",
    solution: "The prime numbers between 10 and 20 are 11, 13, 17, and 19. 11 + 13 + 17 + 19 = 60."
  },
  {
    question: "What is the smallest whole number that when multiplied by 7 gives a product consisting entirely of 8's?",
    answer: "126984",
    hint: "Divide repeating sequences of 8s (88, 888, 8888...) by 7 until there is no remainder.",
    solution: "888,888 ÷ 7 = 126984, which yields a clean whole integer with no remainder."
  },
  {
    question: "How many months have 28 days?",
    answer: "12",
    hint: "Don't just think about February; think about the length of all months.",
    solution: "Every single one of the 12 months in a year has at least 28 days."
  },      
  {
    question: "3+4=21, 5+2=35, 4+6=40, what is 7+3?",
    answer: "70",
    hint: "Add the digits together, then multiply the sum by the first digit.",
    solution: "The pattern is (a + b) × a. For the final line: (7 + 3) × 7 = 10 × 7 = 70."
  },
  {
    question: "The sum of three consecutive odd numbers is 57. What is the largest of these numbers?",
    answer: "21",
    hint: "If the middle number is x, then the numbers are (x-2), x, and (x+2).",
    solution: "3x = 57 means the middle number x is 19. The three consecutive odd numbers are 17, 19, and 21. The largest is 21."
  },
  {
    question: "What is the smallest positive integer that has exactly 6 divisors?",
    answer: "12",
    hint: "List out the factors of small highly-divisible numbers like 6, 8, and 12.",
    solution: "The factors of 12 are 1, 2, 3, 4, 6, and 12, totaling exactly 6 divisors."
  },
  {
    question: "If a train travels 300 miles in 5 hours, how many miles will it travel in 12 hours at the same speed?",
    answer: "720",
    hint: "Find out how many miles the train covers in 1 single hour first.",
    solution: "Speed = 300 miles ÷ 5 hours = 60 mph. Distance in 12 hours = 60 mph × 12 hours = 720 miles."
  },
  {
    question: "1+1=3, 2+2=5, 3+3=?",
    answer: "7",
    hint: "The math logic adds an extra 1 to the real sum.",
    solution: "The formula is (a + b) + 1. Therefore, (3 + 3) + 1 = 7."
  },
  {
    question: "What is the sum of the digits of the smallest 3-digit palindrome?",
    answer: "2",
    hint: "The smallest 3-digit palindrome is 101.",
    solution: "The number 101 reads the same forward and backward. Summing its digits: 1 + 0 + 1 = 2."
  },
  {
    question: "What is the largest number you can write with three 1's?",
    answer: "111",
    hint: "Combine the digits without adding any mathematical operation symbols.",
    solution: "111 is much larger than alternative configurations like 11¹ or 1¹¹."
  },
  {
    question: "A number is doubled and then increased by 10. The result is 50. What is the original number?",
    answer: "20",
    hint: "Work backward: subtract 10 from 50, then divide the result by 2.",
    solution: "2x + 10 = 50 → 2x = 40 → x = 20."
  },
  {
    question: "A train 120 m long crosses a pole in 6 seconds. What is its speed?",
    answer: "20",
    hint: "Speed = Distance ÷ Time.",
    solution: "120 meters ÷ 6 seconds = 20 m/s."
  },
  {
    question: "I am a two-digit number. My digits multiply to 8 and add to 6. What am I?",
    answer: "24",
    hint: "Find two single-digit numbers that meet both requirements, then form the lowest number.",
    solution: "The digits 2 and 4 satisfy both constraints: 2 + 4 = 6 and 2 × 4 = 8, forming the number 24."
  },
  {
    question: "What is the product of the first five prime numbers?",
    answer: "2310",
    hint: "Multiply 2, 3, 5, 7, and 11 together.",
    solution: "2 × 3 × 5 × 7 × 11 = 2310."
  },
  {
    question: "How many times does the digit '7' appear from 1 to 100?",
    answer: "20",
    hint: "Count how many times it shows up in the units place and how many times it appears in the 70-79 range.",
    solution: "It appears 10 times in the units place (7, 17...97) and 10 times in the tens place (70, 71...79). Total is 20."
  },
  {
    question: "The sum of two numbers is 25 and their difference is 5. What is the larger number?",
    answer: "15",
    hint: "Add the sum and the difference together, then divide by 2.",
    solution: "Using equations x+y=25 and x-y=5: adding them gives 2x = 30, which means x = 15 (and y = 10)."
  },
  {
    question: "What is the only even prime number?",
    answer: "2",
    hint: "It is the very first prime number.",
    solution: "2 is only divisible by 1 and itself, making it prime, and it is the only even number with this trait."
  },
  {
    question: "If x + x = 10, then what is x × x?",
    answer: "25",
    hint: "Find the value of x first.",
    solution: "If 2x = 10, then x = 5. Therefore, x × x = 5 × 5 = 25."
  },
  {
    question: "A triangle has angles of 90° and 45°. What is the third angle?",
    answer: "45",
    hint: "The interior angles of any triangle must add up to 180°.",
    solution: "180° - 90° - 45° = 45°."
  },
  {
    question: "A bat and a ball cost ₹110 in total. The bat costs ₹100 more than the ball. What is the cost of the ball?",
    answer: "5",
    hint: "If the ball costs ₹5, the bat costs ₹105.",
    solution: "Let ball = x, bat = x + 100. x + (x + 100) = 110 → 2x = 10 → x = 5."
  },
  {
    question: "If 3! means 3×2×1, what is (4! - 3!) ÷ 3?",
    answer: "6",
    hint: "Calculate the exact value of 4! (24) and 3! (6) first.",
    solution: "4! = 24 and 3! = 6. Thus, (24 - 6) ÷ 3 = 18 ÷ 3 = 6."
  },
  {
    question: "If 3 cats catch 3 mice in 3 minutes, how many cats would catch 100 mice in 100 minutes?",
    answer: "3",
    hint: "Think about the timeline rate: how long does it take for 3 cats to clear groups of mice?",
    solution: "If 3 cats catch 3 mice in 3 minutes, it means that same team of 3 cats catches 1 mouse every single minute. In 100 minutes, that exact same team of 3 cats will catch 100 mice."
  },
  {
    question: "A father is 36 years old and his son is 6. In how many years will the father be 4 times older than the son?",
    answer: "4",
    hint: "Set up the algebraic equation: 36 + x = 4(6 + x).",
    solution: "36 + x = 24 + 4x → 12 = 3x → x = 4. In 4 years, the father will be 40 and the son will be 10."
  },
  {
    question: "In the Fibonacci sequence, what is the first 3-digit number?",
    answer: "144",
    hint: "The sequence goes: ...34, 55, 89...",
    solution: "Following 55 and 89, the next sum in the sequence is 55 + 89 = 144, which is the first 3-digit value."
  },
  {
    question: "What is half of two plus two?",
    answer: "3",
    hint: "Follow standard mathematical Order of Operations (BODMAS/PEMDAS). Division/halving comes before addition.",
    solution: "Half of two is 1. Then, evaluate 1 + 2 = 3."
  },
  {
    question: "What is the next number: 1, 1, 2, 3, 5, 8, 13, __?",
    answer: "21",
    hint: "Add the two preceding numbers together to get the next one.",
    solution: "This is the Fibonacci sequence: 8 + 13 = 21."
  },
  {
    question: "Which number is divisible by 3: 123, 124, or 125?",
    answer: "123",
    hint: "A number is divisible by 3 if the sum of its individual digits is divisible by 3.",
    solution: "1 + 2 + 3 = 6 (which is divisible by 3). 124 sums to 7, and 125 sums to 8."
  },
  {
    question: "What is 0.5 divided by 0.25?",
    answer: "2",
    hint: "Think about how many quarters (0.25) fit into a half dollar (0.50).",
    solution: "0.5 / 0.25 is mathematically equivalent to 1/2 ÷ 1/4 = 2."
  },
  {
    question: "A square has a side of 5 cm. What is its area?",
    answer: "25",
    hint: "Area of a square = side × side.",
    solution: "5 cm × 5 cm = 25 cm²."
  },
  {
    question: "Find a 2-digit number where the sum of digits is 9 and their product is 20.",
    answer: "45",
    hint: "The digits are 4 and 5.",
    solution: "4 + 5 = 9 and 4 × 5 = 20, which gives the number 45 (or 54, but 45 fits standard incremental indexing)."
  },
  {
    question: "If you buy a ₹100 item at 50% off and then apply 50% tax, how much do you pay?",
    answer: "75",
    hint: "Apply the discount first to find the sale value, then calculate the tax based on that new value.",
    solution: "₹100 with a 50% discount reduces the price to ₹50. Adding a 50% tax to ₹50 adds ₹25, resulting in a final total of ₹75."
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
  elements.audio.bgMusic.volume = 0.3;
  elements.audio.click.volume = 0.6;
  elements.audio.correct.volume = 0.5;
  elements.audio.wrong.volume = 0.5;
  elements.audio.levelComplete.volume = 0.6;
  elements.audio.hint.volume = 0.5;
  elements.audio.solution.volume = 0.5;
  elements.audio.screenTransition.volume = 0.4;
  elements.audio.buttonHover.volume = 0.2;

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

  if (localStorage.getItem("sfx") !== "off") {
    elements.toggles.sfx.checked = true;
  } else {
    elements.toggles.sfx.checked = false;
  }

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
  
  // Clean Native Container destruction mapping for Capacitor Framework Core
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
  } else if (navigator.app && navigator.app.exitApp) {
      navigator.app.exitApp();
  } else {
      window.close();
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
  elements.buttons.solution.disabled = !hintsUsed[level]; 
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

// Show Hint backed by Reward Ads and then show response
async function showHint() {
  playClick();
  
  if (elements.toggles.music.checked) {
    elements.audio.bgMusic.pause();
  }

  if (nativeAdMob) {
    try {
      // Corrected community plugin method configuration structure 
      await nativeAdMob.showRewardedAd();
      console.log("Ad completed, reward granted.");
    } catch (error) {
      console.error("Ad video playback issue, bypassing logic directly:", error);
    } finally {
      // Re-prepare cache slot ready for next requirement tracking cycle
      await nativeAdMob.prepareRewardedAd({
        adId: 'ca-app-pub-1825832964235064/8252422930',
        isTesting: false
      }).catch(console.error);
    }
  }

  if (elements.toggles.music.checked) {
    elements.audio.bgMusic.play().catch(console.error);
  }

  playHintSound();
  const r = riddles[currentLevel - 1];
  elements.gameElements.hintText.textContent = r.hint;
  elements.hintPopup.classList.add("active");
  hintsUsed[currentLevel] = (hintsUsed[currentLevel] || 0) + 1;
  localStorage.setItem("hintsUsed", JSON.stringify(hintsUsed));
  elements.buttons.solution.disabled = false; 
  renderLevels(); 
}

function hideHintPopup() {
  playClick();
  elements.hintPopup.classList.remove("active");
}

// Show Solution backed by Reward Ads and then show response
async function showSolution() {
  playClick();

  if (elements.toggles.music.checked) {
    elements.audio.bgMusic.pause();
  }

  if (nativeAdMob) {
    try {
      // Corrected community plugin method configuration structure 
      await nativeAdMob.showRewardedAd();
      console.log("Ad completed, solution unlocked.");
    } catch (error) {
      console.error("Ad playback issue, bypassing logic directly:", error);
    } finally {
      // Re-prepare cache slot ready for next requirement tracking cycle
      await nativeAdMob.prepareRewardedAd({
        adId: 'ca-app-pub-1825832964235064/8252422930',
        isTesting: false
      }).catch(console.error);
    }
  }

  if (elements.toggles.music.checked) {
    elements.audio.bgMusic.play().catch(console.error);
  }

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
  const useStars = Math.random() > 0.5;
  
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
