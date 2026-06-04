// Global tracking properties using modern Capacitor community standards
let isInterstitialAdCached = false;
const BANNER_AD_ID = 'ca-app-pub-1825832964235064/5196004433'; //[cite: 10]
const INTERSTITIAL_AD_ID = 'ca-app-pub-1825832964235064/9070147755'; //[cite: 10]

let AdMob = null; //[cite: 10]
let bannerInitialized = false; //[cite: 10]
let bannerRetryTimer = null; //[cite: 10]
let bannerRetryDelay = 5000; //[cite: 10]

// Product ID that MUST match exactly what you type into Google Play Console
const REMOVE_ADS_SKU = 'com.ayush.mathsriddle.remove_ads'; 

// Global tracking variable for Premium Upgrade Status
let adsRemoved = localStorage.getItem('ads_removed') === 'true'; //[cite: 10]

async function showPermanentBanner() { //[cite: 10]
    // STOP right here if premium status is active!
    if (adsRemoved) { //[cite: 10]
        console.log("Premium user detected. Blocked banner construction."); //[cite: 10]
        return; //[cite: 10]
    }
    if (!AdMob) return; //[cite: 10]
    if (bannerInitialized) return; //[cite: 10]

    if (bannerRetryTimer) { clearTimeout(bannerRetryTimer); bannerRetryTimer = null; } //[cite: 10]

    try {
        await AdMob.showBanner({ //[cite: 10]
            adId: BANNER_AD_ID, //[cite: 10]
            position: 'BOTTOM_CENTER', //[cite: 10]
            margin: 0, //[cite: 10]
            adSize: 'BANNER', // Keeps a standardized, tight 50px height footprint //[cite: 10]
            isTesting: false //[cite: 10]
        });
        bannerInitialized = true; //[cite: 10]
        bannerRetryDelay = 5000; //[cite: 10]
        console.log("Permanent bottom anchor banner attached."); //[cite: 10]
    } catch (e) {
        console.warn("Permanent banner loading delayed:", e); //[cite: 10]
        scheduleBannerRetry(); //[cite: 10]
    }
}

function scheduleBannerRetry() { //[cite: 10]
    if (adsRemoved) return; // Prevent retry loops if premium is unlocked mid-load //[cite: 10]
    if (bannerRetryTimer) clearTimeout(bannerRetryTimer); //[cite: 10]
    bannerRetryTimer = setTimeout(() => { //[cite: 10]
        bannerRetryDelay = Math.min(bannerRetryDelay * 2, 60000); //[cite: 10]
        showPermanentBanner(); //[cite: 10]
    }, bannerRetryDelay); //[cite: 10]
}

// Initialize Native Framework Handlers immediately upon Device Readiness
document.addEventListener('deviceready', async () => { //[cite: 10]
    
    // Check and restore existing Google Play purchases instantly upon app load
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.InAppPurchases) {
        try {
            const { InAppPurchases } = window.Capacitor.Plugins;
            const history = await InAppPurchases.getPurchaseHistory();
            const ownsPremium = history.some(p => p.productId === REMOVE_ADS_SKU);
            
            if (ownsPremium) {
                localStorage.setItem('ads_removed', 'true');
                applyNoAdsStatus();
            }
        } catch (iapInitError) {
            console.error("Google Play billing synchronization delayed:", iapInitError);
        }
    }

    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) { //[cite: 10]
        try {
            AdMob = window.Capacitor.Plugins.AdMob; //[cite: 10]

            // Register Banner lifecycle tracking protocols
            AdMob.addListener('bannerAdLoaded', () => { //[cite: 10]
                bannerInitialized = true; //[cite: 10]
                bannerRetryDelay = 5000; //[cite: 10]
                console.log("Banner layer loaded."); //[cite: 10]
            });

            AdMob.addListener('bannerAdFailedToLoad', (info) => { //[cite: 10]
                bannerInitialized = false; //[cite: 10]
                console.warn("Banner lifecycle load error:", info?.message); //[cite: 10]
                scheduleBannerRetry(); //[cite: 10]
            });

            // Modern Interstitial Ad Listeners
            AdMob.addListener('interstitialAdLoaded', () => { //[cite: 10]
                isInterstitialAdCached = true; //[cite: 10]
                console.log("Interstitial ad successfully cached."); //[cite: 10]
            });

            AdMob.addListener('interstitialAdFailedToLoad', (error) => { //[cite: 10]
                isInterstitialAdCached = false; //[cite: 10]
                console.warn("Interstitial ad failed to load:", error); //[cite: 10]
                // Try preloading again later if ads are not removed
                if (!adsRemoved) { //[cite: 10]
                    setTimeout(preloadNextInterstitial, 15000); //[cite: 10]
                }
            });

            AdMob.addListener('interstitialAdDismissed', () => { //[cite: 10]
                isInterstitialAdCached = false; //[cite: 10]
                console.log("Interstitial ad closed by user."); //[cite: 10]
                
                // Audio recovery listener to bring back music smoothly after an ad ends
                if (elements.toggles.music.checked) { //[cite: 10]
                    elements.audio.bgMusic.play().catch(e => console.log("Audio recovery failed:", e)); //[cite: 10]
                }
                
                if (!adsRemoved) preloadNextInterstitial(); // Cache the next one immediately //[cite: 10]
            });

            await AdMob.initialize({ requestTrackingAuthorization: true }); //[cite: 10]
            console.log("AdMob native bridge ready."); //[cite: 10]

            // Launch permanently locked assets only if they don't own premium upgrade
            if (!adsRemoved) { //[cite: 10]
                showPermanentBanner(); //[cite: 10]
                preloadNextInterstitial(); //[cite: 10]
            }

        } catch (adInitError) {
            console.error("AdMob initialization halted:", adInitError); //[cite: 10]
        }
    }
});

// Sync permanent layout constraints across operating system environment interruptions
document.addEventListener('resume', () => { //[cite: 10]
    if (!adsRemoved && !bannerInitialized) { //[cite: 10]
        bannerRetryDelay = 5000; //[cite: 10]
        showPermanentBanner(); //[cite: 10]
    }
});

document.addEventListener('visibilitychange', () => { //[cite: 10]
    if (document.visibilityState === 'visible' && !adsRemoved && !bannerInitialized) { //[cite: 10]
        showPermanentBanner(); //[cite: 10]
    }
});

// Preload next Interstitial Ad using modern API syntax
async function preloadNextInterstitial() { //[cite: 10]
    if (adsRemoved) return; // Do not call network if premium upgrade is active //[cite: 10]
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) { //[cite: 10]
        try {
            await window.Capacitor.Plugins.AdMob.prepareInterstitial({ //[cite: 10]
                adId: INTERSTITIAL_AD_ID, //[cite: 10]
                isTesting: false //[cite: 10]
            });
        } catch (e) {
            console.warn("Interstitial ad preload failed:", e); //[cite: 10]
        }
    }
}

// Handler executed natively when user selects "Remove Ads" option inside the UI
async function purchaseRemoveAds() {
    // If running inside standard browser preview environment, bypass and auto-simulate
    if (!window.Capacitor || !window.Capacitor.Plugins.InAppPurchases) {
        console.log("Web testing sandbox: Simulating purchase for Google SKU -> " + REMOVE_ADS_SKU);
        localStorage.setItem('ads_removed', 'true');
        applyNoAdsStatus();
        alert("Sandbox Simulation: Thank You! Ads have been permanently removed.");
        return;
    }

    try {
        const { InAppPurchases } = window.Capacitor.Plugins;
        
        // 1. Fetch live product structural information from Google Servers
        const products = await InAppPurchases.getProducts({ ids: [REMOVE_ADS_SKU] });
        
        if (products && products.length > 0) {
            // 2. Open up native checkout sheet interface overlaid above game
            const purchaseResult = await InAppPurchases.purchase({ id: REMOVE_ADS_SKU });
            
            // 3. Status Code 0 explicitly reflects a successful, fully authorized checkout verification sequence
            if (purchaseResult && purchaseResult.purchaseState === 0) {
                localStorage.setItem('ads_removed', 'true');
                applyNoAdsStatus();
                alert("Thank You! Ads have been permanently removed.");
            }
        } else {
            alert("Billing item profile currently offline. Please try again later.");
        }
    } catch (purchaseException) {
        console.error("Google Play transaction sequence stopped: ", purchaseException);
        alert("Transaction declined or canceled.");
    }
}

// Modifies layout dimensions & clears remaining network handlers instantly
function applyNoAdsStatus() { //
    adsRemoved = true; //
    
    // Clear any pending banner retry timers to conserve battery/network thread
    if (bannerRetryTimer) { //
        clearTimeout(bannerRetryTimer); //
        bannerRetryTimer = null; //
    } //

    // Hide the premium wrapper since it's now unlocked
    const removeAdsWrapper = document.getElementById('remove-ads-wrapper'); //
    if (removeAdsWrapper) { //
      removeAdsWrapper.style.display = 'none'; //
    } //
    
    // Pull screen downward cleanly into space vacated by the ad view footprint
    const mainContainer = document.querySelector('.container'); //
    if (mainContainer) { //
      mainContainer.style.marginBottom = '0px'; //
    } //
    
    // Destroy/Hide native banner container wrapper if it resides in DOM
    if (AdMob && bannerInitialized) { //
        AdMob.hideBanner().catch(e => console.log("Ad removal layout sweep: ", e)); //
        bannerInitialized = false; //
    } //
    const adBannerElement = document.getElementById('ad-banner-container'); //
    if (adBannerElement) { //
      adBannerElement.style.display = 'none'; //
    } //
}

const riddles = [ //[cite: 10]
  { 
    question: "I am a 2-digit number. When reversed, I become 27 more than my original value. My digits add up to 9. What number am I?", 
    answer: "36", 
    hint: "The tens digit is 3.", 
    solution: "Original number is 36. Reversed it becomes 63. 63 is exactly 27 more than 36 (36 + 27 = 63), and 3 + 6 = 9." 
  }, //[cite: 10]
  {
    question: "If 1=5, 2=10, 3=15, 4=20, what does 5 equal?",
    answer: "1",
    hint: "Look closely at the very first equation.",
    solution: "Since the first equation explicitly states that 1 = 5, then 5 must equal 1."
  }, //[cite: 10]
  {
    question: "2+2=6, 3+3=12, 4+4=?",
    answer: "20",
    hint: "Multiply the number by the next consecutive integer.",
    solution: "The pattern is n + n = n × (n + 1). So, 2×3=6, 3×4=12, and 4×5=20."
  }, //[cite: 10]
  { 
    question: "If you divide 30 by half and then add 10, what do you get?", 
    answer: "70", 
    hint: "Dividing by half (0.5) is the same as multiplying by 2.", 
    solution: "30 ÷ 0.5 = 60. Then, 60 + 10 = 70." 
  }, //[cite: 10]
  { 
    question: "What is the smallest 3-digit Armstrong number (a number that equals the sum of its own digits each raised to the power of the number of digits)?", 
    answer: "153", 
    hint: "Try checking the cubes of 1, 5, and 3.", 
    solution: "1³ + 5³ + 3³ = 1 + 125 + 27 = 153." 
  }, //[cite: 10]
  {
    question: "3, 5, 7, 9, 11 — which number doesn't belong?",
    answer: "9",
    hint: "All numbers in the list are prime numbers except one.",
    solution: "9 is a composite number (3×3), whereas 3, 5, 7, and 11 are all prime numbers."
  }, //[cite: 10]
  {
    question: "If 1=11, 2=22, 3=33, what does 4 equal?",
    answer: "44",
    hint: "Look at how the digits repeat.",
    solution: "The pattern repeats the given number twice, so 4 becomes 44."
  }, //[cite: 10]
  {
    question: "What is the smallest positive integer that is divisible by both 6 and 8?",
    answer: "24",
    hint: "Find the Least Common Multiple (LCM) of 6 and 8.",
    solution: "Multiples of 6: 6, 12, 18, 24... Multiples of 8: 8, 16, 24... The smallest shared multiple is 24."
  }, //[cite: 10]
  {
    question: "What is the next number: 1, 4, 9, 16, 25, __?",
    answer: "36",
    hint: "Think about perfect squares.",
    solution: "The sequence is made of perfect squares: 1², 2², 3², 4², 5². The next is 6² = 36."
  }, //[cite: 10]
  { 
    question: "What comes next in this sequence: 1, 11, 21, 1211, 111221, ...?", 
    answer: "312211", 
    hint: "Read the previous number out loud by counting its digits (e.g., 'one 1', 'two 1s').", 
    solution: "This is the Look-and-Say sequence. The last term '111221' is read as 'three 1s, two 2s, one 1', resulting in 312211." 
  }, //[cite: 10]
  {
    question: "How many times can you subtract 5 from 25?",
    answer: "1",
    hint: "Think about what the total becomes after you subtract the first 5.",
    solution: "After the first subtraction, 25 becomes 20. The next time you subtract 5, you are subtracting it from 20, not 25."
  }, //[cite: 10]
  {
    question: "What is the only number that has the same number of letters as its value?",
    answer: "4",
    hint: "Spell out small numbers in your head and count their letters.",
    solution: "The word 'FOUR' is spelled with exactly 4 letters."
  }, //[cite: 10]
  {
    question: "If 2+3=10, 7+2=63, 6+5=66, what is 8+4?",
    answer: "96",
    hint: "Multiply the sum of the numbers by the first number.",
    solution: "The pattern is (a + b) × a. So, (8 + 4) × 8 = 12 × 8 = 96."
  }, //[cite: 10]
  {
    question: "If three hens lay three eggs in three days, how many eggs will six hens lay in six days?",
    answer: "12",
    hint: "Determine how many eggs a single hen lays in 3 days first.",
    solution: "3 hens lay 3 eggs in 3 days means 1 hen lays 1 egg every 3 days. Therefore, 6 hens will lay 6 eggs in 3 days, and double that amount (12 eggs) in 6 days."
  }, //[cite: 10]
  {
    question: "What is the area of a rectangle with length 7 cm and width 4 cm?",
    answer: "28",
    hint: "Area = length × width.",
    solution: "7 cm × 4 cm = 28 cm²."
  }, //[cite: 10]
  {
    question: "6-2=16, 5-3=25, 9-2=?",
    answer: "49",
    hint: "Square the result after subtracting the numbers backward, or square their absolute difference.",
    solution: "(6 - 2)² = 4² = 16. Following this rule, (9 - 2)² = 7² = 49."
  }, //[cite: 10]
  {
   question: "What is the next number in this sequence: 1, 8, 27, 64, ...?",
   answer: "125",
   hint: "Look at the cubes of consecutive integers (n³).",
   solution: "1³=1, 2³=8, 3³=27, 4³=64. The next consecutive integer cube is 5³ = 125."
  }, //[cite: 10]
  {
    question: "If you multiply all numbers on a telephone keypad (0-9), what do you get?",
    answer: "0",
    hint: "Remember that a telephone keypad includes the number 0.",
    solution: "Any product multiplied by 0 will always result in 0."
  }, //[cite: 10]
  {
   question: "A number when increased by 25% becomes 150. What is the original number?",
   answer: "120",
   hint: "The original number multiplied by 1.25 equals 150.",
   solution: "Let the number be x. x × 1.25 = 150 → x = 150 ÷ 1.25 = 120."
  }, //[cite: 10]
  {
    question: "What is the sum of all prime numbers between 10 and 20?",
    answer: "60",
    hint: "Find the four prime numbers in that range and add them up.",
    solution: "The prime numbers between 10 and 20 are 11, 13, 17, and 19. 11 + 13 + 17 + 19 = 60."
  }, //[cite: 10]
  {
    question: "What is the smallest whole number that when multiplied by 7 gives a product consisting entirely of 8's?",
    answer: "126984",
    hint: "Divide repeating sequences of 8s (88, 888, 8888...) by 7 until there is no remainder.",
    solution: "888,888 ÷ 7 = 126984, which yields a clean whole integer with no remainder."
  }, //[cite: 10]
  {
    question: "How many months have 28 days?",
    answer: "12",
    hint: "Don't just think about February; think about the length of all months.",
    solution: "Every single one of the 12 months in a year has at least 28 days."
  }, //[cite: 10]
  {
    question: "3+4=21, 5+2=35, 4+6=40, what is 7+3?",
    answer: "70",
    hint: "Add the digits together, then multiply the sum by the first digit.",
    solution: "The pattern is (a + b) × a. For the final line: (7 + 3) × 7 = 10 × 7 = 70."
  }, //[cite: 10]
  {
    question: "The sum of three consecutive odd numbers is 57. What is the largest of these numbers?",
    answer: "21",
    hint: "If the middle number is x, then the numbers are (x-2), x, and (x+2).",
    solution: "3x = 57 means the middle number x is 19. The three consecutive odd numbers are 17, 19, and 21. The largest is 21."
  }, //[cite: 10]
  {
    question: "What is the smallest positive integer that has exactly 6 divisors?",
    answer: "12",
    hint: "List out the factors of small highly-divisible numbers like 6, 8, and 12.",
    solution: "The factors of 12 are 1, 2, 3, 4, 6, and 12, totaling exactly 6 divisors."
  }, //[cite: 10]
  {
    question: "If a train travels 300 miles in 5 hours, how many miles will it travel in 12 hours at the same speed?",
    answer: "720",
    hint: "Find out how many miles the train covers in 1 single hour first.",
    solution: "Speed = 300 miles ÷ 5 hours = 60 mph. Distance in 12 hours = 60 mph × 12 hours = 720 miles."
  }, //[cite: 10]
  {
    question: "1+1=3, 2+2=5, 3+3=?",
    answer: "7",
    hint: "The math logic adds an extra 1 to the real sum.",
    solution: "The formula is (a + b) + 1. Therefore, (3 + 3) + 1 = 7."
  }, //[cite: 10]
  {
    question: "What is the sum of the digits of the smallest 3-digit palindrome?",
    answer: "2",
    hint: "The smallest 3-digit palindrome is 101.",
    solution: "The number 101 reads the same forward and backward. Summing its digits: 1 + 0 + 1 = 2."
  }, //[cite: 10]
  {
    question: "What is the largest number you can write with three 1's?",
    answer: "111",
    hint: "Combine the digits without adding any mathematical operation symbols.",
    solution: "111 is much larger than alternative configurations like 11¹ or 1¹¹."
  }, //[cite: 10]
  {
    question: "A number is doubled and then increased by 10. The result is 50. What is the original number?",
    answer: "20",
    hint: "Work backward: subtract 10 from 50, then divide the result by 2.",
    solution: "2x + 10 = 50 → 2x = 40 → x = 20."
  }, //[cite: 10]
  {
    question: "A train 120 m long crosses a pole in 6 seconds. What is its speed?",
    answer: "20",
    hint: "Speed = Distance ÷ Time.",
    solution: "120 meters ÷ 6 seconds = 20 m/s."
  }, //[cite: 10]
  {
    question: "I am a two-digit number. My digits multiply to 8 and add to 6. What am I?",
    answer: "24",
    hint: "Find two single-digit numbers that meet both requirements, then form the lowest number.",
    solution: "The digits 2 and 4 satisfy both constraints: 2 + 4 = 6 and 2 × 4 = 8, forming the number 24."
  }, //[cite: 10]
  {
    question: "What is the product of the first five prime numbers?",
    answer: "2310",
    hint: "Multiply 2, 3, 5, 7, and 11 together.",
    solution: "2 × 3 × 5 × 7 × 11 = 2310."
  }, //[cite: 10]
  {
    question: "How many times does the digit '7' appear from 1 to 100?",
    answer: "20",
    hint: "Count how many times it shows up in the units place and how many times it appears in the 70-79 range.",
    solution: "It appears 10 times in the units place (7, 17...97) and 10 times in the tens place (70, 71...79). Total is 20."
  }, //[cite: 10]
  {
    question: "The sum of two numbers is 25 and their difference is 5. What is the larger number?",
    answer: "15",
    hint: "Add the sum and the difference together, then divide by 2.",
    solution: "Using equations x+y=25 and x-y=5: adding them gives 2x = 30, which means x = 15 (and y = 10)."
  }, //[cite: 10]
  {
    question: "What is the only even prime number?",
    answer: "2",
    hint: "It is the very first prime number.",
    solution: "2 is only divisible by 1 and itself, making it prime, and it is the only even number with this trait."
  }, //[cite: 10]
  {
    question: "If x + x = 10, then what is x × x?",
    answer: "25",
    hint: "Find the value of x first.",
    solution: "If 2x = 10, then x = 5. Therefore, x × x = 5 × 5 = 25."
  }, //[cite: 10]
  {
    question: "A triangle has angles of 90° and 45°. What is the third angle?",
    answer: "45",
    hint: "The interior angles of any triangle must add up to 180°.",
    solution: "180° - 90° - 45° = 45°."
  }, //[cite: 10]
  {
    question: "A bat and a ball cost ₹110 in total. The bat costs ₹100 more than the ball. What is the cost of the ball?",
    answer: "5",
    hint: "If the ball costs ₹5, the bat costs ₹105.",
    solution: "Let ball = x, bat = x + 100. x + (x + 100) = 110 → 2x = 10 → x = 5."
  }, //[cite: 10]
  {
    question: "If 3! means 3×2×1, what is (4! - 3!) ÷ 3?",
    answer: "6",
    hint: "Calculate the exact value of 4! (24) and 3! (6) first.",
    solution: "4! = 24 and 3! = 6. Thus, (24 - 6) ÷ 3 = 18 ÷ 3 = 6."
  }, //[cite: 10]
  {
    question: "If 3 cats catch 3 mice in 3 minutes, how many cats would catch 100 mice in 100 minutes?",
    answer: "3",
    hint: "Think about the timeline rate: how long does it take for 3 cats to clear groups of mice?",
    solution: "If 3 cats catch 3 mice in 3 minutes, it means that same team of 3 cats catches 1 mouse every single minute. In 100 minutes, that exact same team of 3 cats will catch 100 mice."
  }, //[cite: 10]
  {
    question: "A father is 36 years old and his son is 6. In how many years will the father be 4 times older than the son?",
    answer: "4",
    hint: "Set up the algebraic equation: 36 + x = 4(6 + x).",
    solution: "36 + x = 24 + 4x → 12 = 3x → x = 4. In 4 years, the father will be 40 and the son will be 10."
  }, //[cite: 10]
  {
    question: "In the Fibonacci sequence, what is the first 3-digit number?",
    answer: "144",
    hint: "The sequence goes: ...34, 55, 89...",
    solution: "Following 55 and 89, the next sum in the sequence is 55 + 89 = 144, which is the first 3-digit value."
  }, //[cite: 10]
  {
    question: "What is half of two plus two?",
    answer: "3",
    hint: "Follow standard mathematical Order of Operations (BODMAS/PEMDAS). Division/halving comes before addition.",
    solution: "Half of two is 1. Then, evaluate 1 + 2 = 3."
  }, //[cite: 10]
  {
    question: "What is the next number: 1, 1, 2, 3, 5, 8, 13, __?",
    answer: "21",
    hint: "Add the two preceding numbers together to get the next one.",
    solution: "This is the Fibonacci sequence: 8 + 13 = 21."
  }, //[cite: 10]
  {
    question: "Which number is divisible by 3: 123, 124, or 125?",
    answer: "123",
    hint: "A number is divisible by 3 if the sum of its individual digits is divisible by 3.",
    solution: "1 + 2 + 3 = 6 (which is divisible by 3). 124 sums to 7, and 125 sums to 8."
  }, //[cite: 10]
  {
    question: "What is 0.5 divided by 0.25?",
    answer: "2",
    hint: "Think about how many quarters (0.25) fit into a half dollar (0.50).",
    solution: "0.5 / 0.25 is mathematically equivalent to 1/2 ÷ 1/4 = 2."
  }, //[cite: 10]
  {
    question: "A square has a side of 5 cm. What is its area?",
    answer: "25",
    hint: "Area of a square = side × side.",
    solution: "5 cm × 5 cm = 25 cm²."
  }, //[cite: 10]
  {
    question: "Find a 2-digit number where the sum of digits is 9 and their product is 20.",
    answer: "45",
    hint: "The digits are 4 and 5.",
    solution: "4 + 5 = 9 and 4 × 5 = 20, which gives the number 45 (or 54, but 45 fits standard incremental indexing)."
  }, //[cite: 10]
  {
    question: "If you buy a ₹100 item at 50% off and then apply 50% tax, how much do you pay?",
    answer: "75",
    hint: "Apply the discount first to find the sale value, then calculate the tax based on that new value.",
    solution: "₹100 with a 50% discount reduces the price to ₹50. Adding a 50% tax to ₹50 adds ₹25, resulting in a final total of ₹75."
  } //[cite: 10]
];

let currentLevel = parseInt(localStorage.getItem("currentLevel") || "1"); //[cite: 10]
let solved = JSON.parse(localStorage.getItem("solvedLevels") || "[]"); //[cite: 10]
let hintsUsed = JSON.parse(localStorage.getItem("hintsUsed") || "{}"); //[cite: 10]
let userAnswer = ""; //[cite: 10]
let isProcessingInput = false; //[cite: 10]
let timerInterval = null; //[cite: 10]
let levelStartTime = 0; //[cite: 10]

const elements = { //[cite: 10]
  screens: { //[cite: 10]
    home: document.getElementById("homeScreen"), //[cite: 10]
    settings: document.getElementById("settingsScreen"), //[cite: 10]
    levels: document.getElementById("levelsScreen"), //[cite: 10]
    riddle: document.getElementById("riddleScreen") //[cite: 10]
  }, //[cite: 10]
  buttons: { //[cite: 10]
    play: document.getElementById("playBtn"), //[cite: 10]
    levels: document.getElementById("levelsBtn"), //[cite: 10]
    settings: document.getElementById("settingsBtn"), //[cite: 10]
    quit: document.getElementById("quitBtn"), //[cite: 10]
    backFromSettings: document.getElementById("backFromSettingsBtn"), //[cite: 10]
    backFromLevels: document.getElementById("backFromLevelsBtn"), //[cite: 10]
    backFromGame: document.getElementById("backFromGameBtn"), //[cite: 10]
    clear: document.getElementById("clearBtn"), //[cite: 10]
    submit: document.getElementById("submitBtn"), //[cite: 10]
    hint: document.getElementById("hintBtn"), //[cite: 10]
    solution: document.getElementById("solutionBtn"), //[cite: 10]
    confirmQuit: document.getElementById("confirmQuitBtn"), //[cite: 10]
    cancelQuit: document.getElementById("cancelQuitBtn"), //[cite: 10]
    closeHint: document.getElementById("closeHintBtn"), //[cite: 10]
    closeSolution: document.getElementById("closeSolutionBtn") //[cite: 10]
  }, //[cite: 10]
  gameElements: { //[cite: 10]
    levelTitle: document.getElementById("levelTitle"), //[cite: 10]
    questionText: document.getElementById("questionText"), //[cite: 10]
    answerBox: document.getElementById("answerBox"), //[cite: 10]
    resultMsg: document.getElementById("resultMsg"), //[cite: 10]
    levelButtons: document.getElementById("levelButtons"), //[cite: 10]
    hintText: document.getElementById("hintText"), //[cite: 10]
    solutionText: document.getElementById("solutionText"), //[cite: 10]
    progressBar: document.getElementById("progressBar"), //[cite: 10]
    levelTimer: document.getElementById("levelTimer"), //[cite: 10]
    achievementsList: document.getElementById("achievementsList") //[cite: 10]
  }, //[cite: 10]
  audio: { //[cite: 10]
    bgMusic: document.getElementById("bgMusic"), //[cite: 10]
    click: document.getElementById("clickSound"), //[cite: 10]
    correct: document.getElementById("correctSound"), //[cite: 10]
    wrong: document.getElementById("wrongSound"), //[cite: 10]
    levelComplete: document.getElementById("levelCompleteSound"), //[cite: 10]
    hint: document.getElementById("hintSound"), //[cite: 10]
    solution: document.getElementById("solutionSound"), //[cite: 10]
    screenTransition: document.getElementById("screenTransitionSound"), //[cite: 10]
    buttonHover: document.getElementById("buttonHoverSound") //[cite: 10]
  }, //[cite: 10]
  toggles: { //[cite: 10]
    music: document.getElementById("musicToggle"), //[cite: 10]
    sfx: document.getElementById("sfxToggle"), //[cite: 10]
    theme: document.getElementById("themeToggle") //[cite: 10]
  }, //[cite: 10]
  splash: document.getElementById("splash"), //[cite: 10]
  confettiCanvas: document.getElementById("confetti-canvas"), //[cite: 10]
  particleCanvas: document.getElementById("particle-canvas"), //[cite: 10]
  quitModal: document.getElementById("quitModal"), //[cite: 10]
  hintPopup: document.getElementById("hintPopup"), //[cite: 10]
  solutionPopup: document.getElementById("solutionPopup") //[cite: 10]
}; //[cite: 10]

function initGame() { //[cite: 10]
  elements.audio.bgMusic.volume = 0.3; //[cite: 10]
  elements.audio.click.volume = 0.6; //[cite: 10]
  elements.audio.correct.volume = 0.5; //[cite: 10]
  elements.audio.wrong.volume = 0.5; //[cite: 10]
  elements.audio.levelComplete.volume = 0.6; //[cite: 10]
  elements.audio.hint.volume = 0.5; //[cite: 10]
  elements.audio.solution.volume = 0.5; //[cite: 10]
  elements.audio.screenTransition.volume = 0.4; //[cite: 10]
  elements.audio.buttonHover.volume = 0.2; //[cite: 10]

  const musicPref = localStorage.getItem("music"); //[cite: 10]
  if (musicPref !== "off") { //[cite: 10]
    elements.toggles.music.checked = true; //[cite: 10]
    
    const startMusicOnInteraction = () => { //[cite: 10]
      elements.audio.bgMusic.play().catch(console.error); //[cite: 10]
    }; //[cite: 10]
    elements.audio.bgMusic.play().catch(() => { //[cite: 10]
      document.addEventListener('click', startMusicOnInteraction, { once: true }); //[cite: 10]
      document.addEventListener('touchstart', startMusicOnInteraction, { once: true }); //[cite: 10]
    }); //[cite: 10]
  } else { //[cite: 10]
    elements.toggles.music.checked = false; //[cite: 10]
  } //[cite: 10]

  if (localStorage.getItem("sfx") !== "off") { //[cite: 10]
    elements.toggles.sfx.checked = true; //[cite: 10]
  } else { //[cite: 10]
    elements.toggles.sfx.checked = false; //[cite: 10]
  } //[cite: 10]

  if (localStorage.getItem("theme") === "light") { //[cite: 10]
    elements.toggles.theme.checked = true; //[cite: 10]
    document.body.classList.add("light-theme"); //[cite: 10]
  } else { //[cite: 10]
    elements.toggles.theme.checked = false; //[cite: 10]
  } //[cite: 10]

  setupEventListeners(); //[cite: 10]
  renderLevels(); //[cite: 10]
  updateAchievements(); //[cite: 10]
  initParticles(); //[cite: 10]

  setTimeout(() => { //[cite: 10]
    elements.splash.style.display = "none"; //[cite: 10]
  }, 2000); //[cite: 10]
} //[cite: 10]

function setupEventListeners() { //[cite: 10]
  function once(fn, delay = 400) { //[cite: 10]
    let blocked = false; //[cite: 10]
    return function (...args) { //[cite: 10]
      if (blocked) return; //[cite: 10]
      blocked = true; //[cite: 10]
      fn.apply(this, args); //[cite: 10]
      setTimeout(() => { blocked = false; }, delay); //[cite: 10]
    }; //[cite: 10]
  } //[cite: 10]

  elements.buttons.play.addEventListener("click", once(startGame)); //[cite: 10]
  elements.buttons.levels.addEventListener("click", once(() => showScreen("levelsScreen"))); //[cite: 10]
  elements.buttons.settings.addEventListener("click", once(() => showScreen("settingsScreen"))); //[cite: 10]
  elements.buttons.quit.addEventListener("click", once(showQuitModal)); //[cite: 10]
  elements.buttons.backFromSettings.addEventListener("click", once(() => showScreen("homeScreen"))); //[cite: 10]
  elements.buttons.backFromLevels.addEventListener("click", once(() => showScreen("homeScreen"))); //[cite: 10]
  elements.buttons.backFromGame.addEventListener("click", once(() => showScreen("homeScreen"))); //[cite: 10]
  elements.buttons.clear.addEventListener("click", once(clearAnswer, 200)); //[cite: 10]
  elements.buttons.submit.addEventListener("click", once(submitAnswer, 600)); //[cite: 10]
  elements.buttons.hint.addEventListener("click", once(showHint)); //[cite: 10]
  elements.buttons.solution.addEventListener("click", once(showSolution)); //[cite: 10]
  elements.buttons.confirmQuit.addEventListener("click", once(confirmQuit)); //[cite: 10]
  elements.buttons.cancelQuit.addEventListener("click", once(hideQuitModal)); //[cite: 10]
  elements.buttons.closeHint.addEventListener("click", once(hideHintPopup)); //[cite: 10]
  elements.buttons.closeSolution.addEventListener("click", once(hideSolutionPopup)); //[cite: 10]

  document.querySelector(".keypad").addEventListener("click", (e) => { //[cite: 10]
    if (isProcessingInput) return; //[cite: 10]
    isProcessingInput = true; //[cite: 10]
    const button = e.target.closest("button"); //[cite: 10]
    if (button && button.dataset.number) { //[cite: 10]
      press(button.dataset.number); //[cite: 10]
    } //[cite: 10]
    setTimeout(() => { isProcessingInput = false; }, 100); //[cite: 10]
  }); //[cite: 10]

  document.querySelector(".keypad").addEventListener("touchstart", (e) => { //[cite: 10]
    e.preventDefault(); //[cite: 10]
    if (isProcessingInput) return; //[cite: 10]
    isProcessingInput = true; //[cite: 10]
    const button = e.target.closest("button"); //[cite: 10]
    if (button) { //[cite: 10]
      if (button.dataset.number) { //[cite: 10]
        press(button.dataset.number); //[cite: 10]
      } //[cite: 10]
      button.classList.add("active"); //[cite: 10]
    } //[cite: 10]
    setTimeout(() => { isProcessingInput = false; }, 150); //[cite: 10]
  }); //[cite: 10]

  document.querySelector(".keypad").addEventListener("touchend", (e) => { //[cite: 10]
    const button = e.target.closest("button"); //[cite: 10]
    if (button) { //[cite: 10]
      button.classList.remove("active"); //[cite: 10]
    } //[cite: 10]
  }, { passive: true }); //[cite: 10]

  document.querySelectorAll(".btn, .level-btn").forEach(btn => { //[cite: 10]
    btn.addEventListener("mouseenter", () => playSound(elements.audio.buttonHover)); //[cite: 10]
    btn.addEventListener("touchstart", () => { //[cite: 10]
      playSound(elements.audio.buttonHover); //[cite: 10]
    }, { passive: true }); //[cite: 10]
  }); //[cite: 10]

  elements.toggles.music.addEventListener("change", toggleMusic); //[cite: 10]
  elements.toggles.sfx.addEventListener("change", toggleSFX); //[cite: 10]
  elements.toggles.theme.addEventListener("change", toggleTheme); //[cite: 10]
  
  window.addEventListener("popstate", handleBackButton); //[cite: 10]
} //[cite: 10]

function showQuitModal() { //[cite: 10]
  playClick(); //[cite: 10]
  elements.quitModal.classList.add("active"); //[cite: 10]
} //[cite: 10]

function hideQuitModal() { //[cite: 10]
  playClick(); //[cite: 10]
  elements.quitModal.classList.remove("active"); //[cite: 10]
} //[cite: 10]

function confirmQuit() { //[cite: 10]
  playClick(); //[cite: 10]
  elements.quitModal.classList.remove("active"); //[cite: 10]
  
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) { //[cite: 10]
    window.Capacitor.Plugins.App.exitApp(); //[cite: 10]
  } else { //[cite: 10]
    const closed = window.close(); //[cite: 10]
    if (closed === undefined) { //[cite: 10]
      showScreen("homeScreen"); //[cite: 10]
    } //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function handleBackButton() { //[cite: 10]
  if (elements.screens.home.classList.contains("active")) { //[cite: 10]
    showQuitModal(); //[cite: 10]
  } else { //[cite: 10]
    showScreen("homeScreen"); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function toggleMusic() { //[cite: 10]
  if (elements.toggles.music.checked) { //[cite: 10]
    elements.audio.bgMusic.play().catch(e => console.log("Music play error:", e)); //[cite: 10]
    localStorage.setItem("music", "on"); //[cite: 10]
  } else { //[cite: 10]
    elements.audio.bgMusic.pause(); //[cite: 10]
    localStorage.setItem("music", "off"); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function toggleSFX() { //[cite: 10]
  if (elements.toggles.sfx.checked) { //[cite: 10]
    localStorage.setItem("sfx", "on"); //[cite: 10]
  } else { //[cite: 10]
    localStorage.setItem("sfx", "off"); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function toggleTheme() { //[cite: 10]
  if (elements.toggles.theme.checked) { //[cite: 10]
    document.body.classList.add("light-theme"); //[cite: 10]
    localStorage.setItem("theme", "light"); //[cite: 10]
  } else { //[cite: 10]
    document.body.classList.remove("light-theme"); //[cite: 10]
    localStorage.setItem("theme", "dark"); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function playSound(sound) { //[cite: 10]
  if (elements.toggles.sfx.checked && sound) { //[cite: 10]
    sound.currentTime = 0; //[cite: 10]
    sound.play().catch(e => console.log("Sound error:", e)); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function playClick() { playSound(elements.audio.click); } //[cite: 10]
function playCorrectSound() { playSound(elements.audio.correct); } //[cite: 10]
function playWrongSound() { playSound(elements.audio.wrong); } //[cite: 10]
function playLevelCompleteSound() { playSound(elements.audio.levelComplete); } //[cite: 10]
function playHintSound() { playSound(elements.audio.hint); } //[cite: 10]
function playSolutionSound() { playSound(elements.audio.solution); } //[cite: 10]
function playScreenTransitionSound() { playSound(elements.audio.screenTransition); } //[cite: 10]

// View switching router context to maintain permanent canvas visibility
function showScreen(id) { //[cite: 10]
  playScreenTransitionSound(); //[cite: 10]
  history.pushState({screen: id}, "", "#"+id); //[cite: 10]
  Object.values(elements.screens).forEach(s => s.classList.remove("active")); //[cite: 10]
  elements.screens[id.replace("Screen", "")].classList.add("active"); //[cite: 10]
  playClick(); //[cite: 10]
  
  if (id === "levelsScreen") { //[cite: 10]
    animateLevelButtons(); //[cite: 10]
  } //[cite: 10]

  // Forces active ad instances to remain layout-anchored instead of breaking during native container transitions
  if (!adsRemoved) { //[cite: 10]
    if (bannerInitialized && AdMob) { //[cite: 10]
      AdMob.resumeBanner().catch(e => console.log("Banner state resume handled:", e)); //[cite: 10]
    } else { //[cite: 10]
      showPermanentBanner(); //[cite: 10]
    } //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

function startGame() { loadLevel(currentLevel); } //[cite: 10]

function renderLevels() { //[cite: 10]
  const grid = elements.gameElements.levelButtons; //[cite: 10]
  grid.innerHTML = ""; //[cite: 10]
  riddles.forEach((_, i) => { //[cite: 10]
    const level = i + 1; //[cite: 10]
    const btn = document.createElement("button"); //[cite: 10]
    btn.textContent = level; //[cite: 10]
    btn.classList.add("level-btn"); //[cite: 10]
    
    btn.disabled = !(solved.includes(level) || level === currentLevel || (level === currentLevel + 1 && solved.includes(currentLevel))); //[cite: 10]
    
    if (solved.includes(level)) { //[cite: 10]
      btn.classList.add("completed"); //[cite: 10]
      const hints = hintsUsed[level] || 0; //[cite: 10]
      btn.innerHTML = `${level} <span class="check">✔</span><span class="hint-count">${hints ? `💡${hints}` : ''}</span>`; //[cite: 10]
    } else if (level === currentLevel) { //[cite: 10]
      btn.classList.add("current"); //[cite: 10]
    } //[cite: 10]
    
    btn.addEventListener("click", () => { //[cite: 10]
      if (!btn.disabled) { //[cite: 10]
        loadLevel(level); //[cite: 10]
      } //[cite: 10]
    }); //[cite: 10]
    grid.appendChild(btn); //[cite: 10]
  }); //[cite: 10]
} //[cite: 10]

function animateLevelButtons() { //[cite: 10]
  const buttons = document.querySelectorAll(".level-btn"); //[cite: 10]
  buttons.forEach((btn, index) => { //[cite: 10]
    btn.style.animation = `bounceIn 0.5s ease ${index * 0.05}s forwards`; //[cite: 10]
    btn.style.opacity = "0"; //[cite: 10]
  }); //[cite: 10]
} //[cite: 10]

function updateProgressBar() { //[cite: 10]
  const progress = (solved.length / riddles.length) * 100; //[cite: 10]
  elements.gameElements.progressBar.style.width = `${progress}%`; //[cite: 10]
} //[cite: 10]

function startTimer() { //[cite: 10]
  if (timerInterval) clearInterval(timerInterval); //[cite: 10]
  levelStartTime = Date.now(); //[cite: 10]
  timerInterval = setInterval(() => { //[cite: 10]
    const elapsed = Math.floor((Date.now() - levelStartTime) / 1000); //[cite: 10]
    elements.gameElements.levelTimer.textContent = `Time: ${elapsed}s`; //[cite: 10]
  }, 1000); //[cite: 10]
} //[cite: 10]

function stopTimer() { //[cite: 10]
  if (timerInterval) { //[cite: 10]
    clearInterval(timerInterval); //[cite: 10]
    timerInterval = null; //[cite: 10]
  } //[cite: 10]
  return Math.floor((Date.now() - levelStartTime) / 1000); //[cite: 10]
} //[cite: 10]

function loadLevel(level) { //[cite: 10]
  clearConfetti(); //[cite: 10]
  const r = riddles[level - 1]; //[cite: 10]
  currentLevel = level; //[cite: 10]
  userAnswer = ""; //[cite: 10]
  elements.gameElements.levelTitle.textContent = `Level ${ level }`; //[cite: 10]
  elements.gameElements.questionText.textContent = r.question; //[cite: 10]
  elements.gameElements.answerBox.textContent = ""; //[cite: 10]
  elements.gameElements.resultMsg.textContent = ""; //[cite: 10]
  elements.gameElements.resultMsg.className = "result"; //[cite: 10]
  elements.buttons.solution.disabled = !hintsUsed[level]; //[cite: 10]
  updateProgressBar(); //[cite: 10]
  startTimer(); //[cite: 10]
  showScreen("riddleScreen"); //[cite: 10]
} //[cite: 10]

function press(n) { //[cite: 10]
  playClick(); //[cite: 10]
  userAnswer += n; //[cite: 10]
  elements.gameElements.answerBox.textContent = userAnswer; //[cite: 10]
  elements.gameElements.resultMsg.textContent = ""; //[cite: 10]
} //[cite: 10]

function clearAnswer() { //[cite: 10]
  playClick(); //[cite: 10]
  userAnswer = ""; //[cite: 10]
  elements.gameElements.answerBox.textContent = ""; //[cite: 10]
  elements.gameElements.resultMsg.textContent = ""; //[cite: 10]
} //[cite: 10]

function updateAchievements() { //[cite: 10]
  const achievements = [ //[cite: 10]
    { name: "Novice", count: 10, emoji: "🏅" }, //[cite: 10]
    { name: "Master", count: 25, emoji: "🥇" }, //[cite: 10]
    { name: "Genius", count: 50, emoji: "🧠" } //[cite: 10]
  ]; //[cite: 10]
  const list = elements.gameElements.achievementsList; //[cite: 10]
  list.innerHTML = ""; //[cite: 10]
  achievements.forEach(ach => { //[cite: 10]
    const li = document.createElement("li"); //[cite: 10]
    li.textContent = `${ach.emoji} ${ach.name}: Complete ${ach.count} levels`; //[cite: 10]
    if (solved.length >= ach.count) { //[cite: 10]
      li.classList.add("achieved"); //[cite: 10]
    } //[cite: 10]
    list.appendChild(li); //[cite: 10]
  }); //[cite: 10]
} //[cite: 10]

function submitAnswer() { //[cite: 10]
  const r = riddles[currentLevel - 1]; //[cite: 10]
  const msg = elements.gameElements.resultMsg; //[cite: 10]
  
  if (userAnswer === r.answer) { //[cite: 10]
    const timeTaken = stopTimer(); //[cite: 10]
    msg.textContent = timeTaken < 30 ? "🎉 Brilliant! Solved in " + timeTaken + "s!" : "🎉 Correct!"; //[cite: 10]
    msg.className = "result"; //[cite: 10]
    playCorrectSound(); //[cite: 10]
    
    fireConfetti(async () => { //[cite: 10]
      if (!solved.includes(currentLevel)) { //[cite: 10]
        solved.push(currentLevel); //[cite: 10]
        localStorage.setItem("solvedLevels", JSON.stringify(solved)); //[cite: 10]
        updateAchievements(); //[cite: 10]
      } //[cite: 10]

      // Interstitial Ad Trigger: ONLY fires if ads are not removed
      if (!adsRemoved && window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob && isInterstitialAdCached) { //[cite: 10]
        const musicWasPlaying = elements.toggles.music.checked && !elements.audio.bgMusic.paused; //[cite: 10]
        if (musicWasPlaying) elements.audio.bgMusic.pause(); //[cite: 10]

        try {
          await window.Capacitor.Plugins.AdMob.showInterstitial(); //[cite: 10]
        } catch (adError) {
          console.error("AdMob show error:", adError); //[cite: 10]
        }
      }

      currentLevel++; //[cite: 10]
      localStorage.setItem("currentLevel", currentLevel); //[cite: 10]
      playLevelCompleteSound(); //[cite: 10]
      renderLevels(); //[cite: 10]
      setTimeout(() => { //[cite: 10]
        if (currentLevel <= riddles.length) { //[cite: 10]
          loadLevel(currentLevel); //[cite: 10]
        } else { //[cite: 10]
          alert("🎊 All levels completed!"); //[cite: 10]
          showScreen('homeScreen'); //[cite: 10]
        } //[cite: 10]
      }, 1000); //[cite: 10]
    }); //[cite: 10]
  } else { //[cite: 10]
    msg.textContent = "❌ Try again"; //[cite: 10]
    msg.className = "result error"; //[cite: 10]
    playWrongSound(); //[cite: 10]
    userAnswer = ""; //[cite: 10]
    elements.gameElements.answerBox.textContent = ""; //[cite: 10]
    setTimeout(() => { //[cite: 10]
      elements.gameElements.resultMsg.textContent = ""; //[cite: 10]
      elements.gameElements.resultMsg.className = "result"; //[cite: 10]
    }, 1500); //[cite: 10]
  } //[cite: 10]
} //[cite: 10]

// Core Display Logic for Hints
function revealHint() { //[cite: 10]
  const musicPref = elements.toggles.music.checked; //[cite: 10]
  if (musicPref && elements.audio.bgMusic.paused) { //[cite: 10]
    elements.audio.bgMusic.play().catch(console.error); //[cite: 10]
  } //[cite: 10]
  playHintSound(); //[cite: 10]
  const r = riddles[currentLevel - 1]; //[cite: 10]
  elements.gameElements.hintText.textContent = r.hint; //[cite: 10]
  elements.hintPopup.classList.add("active"); //[cite: 10]
  hintsUsed[currentLevel] = (hintsUsed[currentLevel] || 0) + 1; //[cite: 10]
  localStorage.setItem("hintsUsed", JSON.stringify(hintsUsed)); //[cite: 10]
  elements.buttons.solution.disabled = false; //[cite: 10]
  renderLevels(); //[cite: 10]
} //[cite: 10]

// Core Display Logic for Solutions
function revealSolution() { //[cite: 10]
  const musicPref = elements.toggles.music.checked; //[cite: 10]
  if (musicPref && elements.audio.bgMusic.paused) { //[cite: 10]
    elements.audio.bgMusic.play().catch(console.error); //[cite: 10]
  } //[cite: 10]
  playSolutionSound(); //[cite: 10]
  const r = riddles[currentLevel - 1]; //[cite: 10]
  elements.gameElements.solutionText.textContent = r.solution; //[cite: 10]
  elements.solutionPopup.classList.add("active"); //[cite: 10]
} //[cite: 10]

async function showHint() { //[cite: 10]
  playClick(); //[cite: 10]
  revealHint();  //[cite: 10]
} //[cite: 10]

async function showSolution() { //[cite: 10]
  playClick(); //[cite: 10]
  revealSolution(); //[cite: 10]
} //[cite: 10]

function hideHintPopup() { //[cite: 10]
  playClick(); //[cite: 10]
  elements.hintPopup.classList.remove("active"); //[cite: 10]
} //[cite: 10]

function hideSolutionPopup() { //[cite: 10]
  playClick(); //[cite: 10]
  elements.solutionPopup.classList.remove("active"); //[cite: 10]
} //[cite: 10]

function fireConfetti(callback) { //[cite: 10]
  const canvas = elements.confettiCanvas; //[cite: 10]
  const ctx = canvas.getContext("2d"); //[cite: 10]
  canvas.width = window.innerWidth; //[cite: 10]
  canvas.height = window.innerHeight; //[cite: 10]
  
  const particles = []; //[cite: 10]
  const colors = ['#6200EA', '#03DAC6', '#CF6679', '#FFD600', '#00B0FF']; //[cite: 10]
  const useStars = Math.random() > 0.5; //[cite: 10]
  
  for (let i = 0; i < 100; i++) { //[cite: 10]
    particles.push({ //[cite: 10]
      x: Math.random() * canvas.width, //[cite: 10]
      y: Math.random() * canvas.height - canvas.height, //[cite: 10]
      size: Math.random() * 10 + 5, //[cite: 10]
      color: colors[Math.floor(Math.random() * colors.length)], //[cite: 10]
      speed: Math.random() * 4 + 3, //[cite: 10]
      angle: Math.random() * Math.PI * 2, //[cite: 10]
      rotation: Math.random() * 360, //[cite: 10]
      rotationSpeed: Math.random() * 12 - 6 //[cite: 10]
    }); //[cite: 10]
  } //[cite: 10]
  
  let frame = 0; //[cite: 10]
  const anim = () => { //[cite: 10]
    ctx.clearRect(0, 0, canvas.width, canvas.height); //[cite: 10]
    particles.forEach(p => { //[cite: 10]
      ctx.save(); //[cite: 10]
      ctx.translate(p.x, p.y); //[cite: 10]
      ctx.rotate(p.rotation * Math.PI / 180); //[cite: 10]
      ctx.fillStyle = p.color; //[cite: 10]
      ctx.beginPath(); //[cite: 10]
      if (useStars) { //[cite: 10]
        const spikes = 5; //[cite: 10]
        const outerRadius = p.size / 2; //[cite: 10]
        const innerRadius = p.size / 4; //[cite: 10]
        for (let i = 0; i < spikes * 2; i++) { //[cite: 10]
          const radius = i % 2 === 0 ? outerRadius : innerRadius; //[cite: 10]
          const angle = (i * Math.PI) / spikes; //[cite: 10]
          ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius); //[cite: 10]
        } //[cite: 10]
        ctx.closePath(); //[cite: 10]
      } else { //[cite: 10]
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); //[cite: 10]
      } //[cite: 10]
      ctx.fill(); //[cite: 10]
      ctx.restore(); //[cite: 10]
      
      p.y += p.speed; //[cite: 10]
      p.rotation += p.rotationSpeed; //[cite: 10]
      if (p.y > canvas.height + p.size) { //[cite: 10]
        p.y = -p.size; //[cite: 10]
        p.x = Math.random() * canvas.width; //[cite: 10]
      } //[cite: 10]
    }); //[cite: 10]
    frame++; //[cite: 10]
    if (frame < 120) { //[cite: 10]
      requestAnimationFrame(anim); //[cite: 10]
    } else { //[cite: 10]
      clearConfetti(); //[cite: 10]
      if (callback) callback(); //[cite: 10]
    } //[cite: 10]
  }; //[cite: 10]
  anim(); //[cite: 10]
} //[cite: 10]

function clearConfetti() { //[cite: 10]
  const ctx = elements.confettiCanvas.getContext("2d"); //[cite: 10]
  ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height); //[cite: 10]
} //[cite: 10]

function initParticles() { //[cite: 10]
  const canvas = elements.particleCanvas; //[cite: 10]
  const ctx = canvas.getContext("2d"); //[cite: 10]
  canvas.width = window.innerWidth; //[cite: 10]
  canvas.height = window.innerHeight; //[cite: 10]
  
  const particles = []; //[cite: 10]
  for (let i = 0; i < 50; i++) { //[cite: 10]
    particles.push({ //[cite: 10]
      x: Math.random() * canvas.width, //[cite: 10]
      y: Math.random() * canvas.height, //[cite: 10]
      size: Math.random() * 3 + 1, //[cite: 10]
      speedX: Math.random() * 0.5 - 0.25, //[cite: 10]
      speedY: Math.random() * 0.5 - 0.25, //[cite: 10]
      opacity: Math.random() * 0.3 + 0.1 //[cite: 10]
    }); //[cite: 10]
  } //[cite: 10]
  
  function animateParticles() { //[cite: 10]
    ctx.clearRect(0, 0, canvas.width, canvas.height); //[cite: 10]
    particles.forEach(p => { //[cite: 10]
      ctx.beginPath(); //[cite: 10]
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); //[cite: 10]
      ctx.fillStyle = `rgba(179, 136, 255, ${p.opacity})`; //[cite: 10]
      ctx.fill(); //[cite: 10]
      p.x += p.speedX; //[cite: 10]
      p.y += p.speedY; //[cite: 10]
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1; //[cite: 10]
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1; //[cite: 10]
    }); //[cite: 10]
    requestAnimationFrame(animateParticles); //[cite: 10]
  } //[cite: 10]
  animateParticles(); //[cite: 10]
} //[cite: 10]

document.addEventListener("DOMContentLoaded", initGame); //[cite: 10]
