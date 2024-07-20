// pahle hmko randome Number chahiye 1 see 100 ke beech to (Math.random()*100 + 1) isko integer me kro taaki decimal me naa aa jaaye ise let me lenaa const nhi kyoun ki game phir se start krna hoga
let randomNumber = parseInt(Math.random() * 100 + 1);

// ab submit button  ko pehle pakro jiska id subt hai
const submit = document.querySelector("#subt");

// ab input ko pakarna hai jahan input daalenge jiska id guessField hai
const userInput = document.querySelector("#guessField");

// ab previous guess me jo span hai usko pakarna hai jiska class guesses hai isme ham sabhi guess kiye hue number ko show krenge
const guessSlot = document.querySelector(".guesses");

// is me batayenge ki kitna guess aur bach gyaa hai ab remaining guess me jo 10 hai jiska class lastResult hai isko pakarna hai ye starting me 10 rahega lekin dheere dheere ghatta jaayega jaise jaise number of guess badhenge
const remaining = document.querySelector(".lastResult");

// wo para select kr lete hai jiska class lowOrHi tha us para me ye show krwayenge ki appka value low hai yaa high hai
const lowOrHi = document.querySelector(".lowOrHi");

//game ko phir se shuru krne ke liye jab user ne sabhi 10 guess le liye yaa sahi guess kr liya to game ko phir se start krenge to usme 2 cheez phir se chahiye ek jo guess phir se krenge jiska class guesses (guessSlot) hai dusra remainig guess jiska class lastResult (remaining) hai
const startOver = document.querySelector(".resultParas");

// jab phir se start krna hai to ek paragraph create krna hai isko function  endGame() me use krenge taaki naya game end krke phir naye game shuru krne ke liye is paragraph ko use krenge (Start new Game)
const p = document.createElement("p");

// is array me wo sabhi guess ko store kr lenge jo user ne kiye taaki dobara wahi guess naa kr le
let prevGuess = [];
let numGuess = 1; // ye nuber of guess hai ki kitne attempt maar chuka hai

let playGame = true; //ye har game me hotaa hai jo allow krta hai game khelne ko

// <<<<<<< ---- ye sab cheez jo upar likhe wo basic tha ki usko kaise access aur store kare ab main logic likhenge----->>>>>

if (playGame) {
  // agar game true hai yaani if PlayGame = true; to ye sab kro
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value); // guess me hi hamara user input kaa value rhega
    console.log(guess); // ye sab function hone ke baad ab jo guess me hmko number milaa isko function validateGuess(guess) ke paas bhej do ab wo apna kaam kregaa jo us function kaa kaam hai
    validateGuess(guess); // is function ko call kiye taaki hamara guess kiya number ab validateGuess(guess) naam ke function par pahunch jaayega
  });
}

// neeche me jo parameter guess le rhe hai wo jo guess wahi hai uper waala jisme hm userinput ka value le rhe hai yaani ye waala const guess = parseInt(userInput.value);

function validateGuess(guess) {
  // ye jo fuction  validateGuess banaye hai jiska parameter guess hai jiska ye sab kaam rahegaa ki check kro jo guess milaa hai wo valid hai ki nhi hai aur bhi bahoot baat jo is function me likhe hai validation check krna bahoot jagah kaam aata hai espesially jb backend par kaam karoge
  if (isNaN(guess)) {
    alert("PLease enter a valid number");
  } else if (guess < 1) {
    alert("PLease enter a number more than 1");
  } else if (guess > 100) {
    alert("PLease enter a  number less than 100");
  } else {
    prevGuess.push(guess); // agar guess 1 se 100 ke beech me aaya to us guess ko array prevguess me push kr denge
    if (numGuess === 11) {
      // agar numGuess ( number of guess)  11 huaa to is teeno function ko call kr lenge displayGuess(guess);  displayMessage  aur endGame(); phir ye teeno funtion apna kaam krega agar numguess 11 huaa to
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      // agar numGuess 11 se km rhega to ye dono function call hogaa is dono function kaa kaam isse neeche me describe hai
      displayGuess(guess); // is function ko neeche me dekh lo ki ye kyaa kaam krta hai
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // ye jo function hai checkGuess jiska parameter guess hai uskaa ye sab kaam rhegaa ki agar sahi guess kiya to kya krega agar galat guess kiya to phir kyaa messege dikhega
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame(); // agar guess ye randomnumber ke barabar ho gyaa yaani sahi guess kr liyaa to ye messege dikha denge displayMessage(`You guessed it right`); phir end game function ko call kr lenge jiska kaam neeche me lika hai is function me function endGame()
  } else if (guess < randomNumber) {
    displayMessage(`Number is TOOO low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High`);
  }
}

function displayGuess(guess) {
  // ye jo displayGuess hai isse input feild ko clean krenge taaki phir se input de sake aur bhi bahoot kaam karenge jo function me neeche likhe hai
  userInput.value = ""; // isse input field clean ho jayega taaki phir se input de sake
  guessSlot.innerHTML += `${guess}, `; // isme jo jo guess krte jayenge wo yahan show hote jayegaa
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} `; // isme show hote rhegaa ki kitna attempt aur bach gyaa hai
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  //game ko end krna hai
  userInput.value = ""; // sabhi input hat jayenge
  userInput.setAttribute("disabled", ""); // input disabled ho jayenge
  p.classList.add("button"); // ye paragraph,  button ki tarah behave kregaa jb hm is para par click krenge to naya game shuru krenge jb hamara game end hogaa iska id newGame rakhenge taaki jb iske inner paragraph ko click krenge tab yah kuchh kre  isko function newGame() me likhenge ki jb ispar click krenge to kyaa hogaa iske liye addeventlistner click denge id newgame
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`; // game end hone par yahi paragraph show hogaa iskaa id  newGame hai aur is par click krenge to new game shuru hogaa ise  function newGame() me likhenge ki jb ispar click krenge to kyaa hogaa iske liye addeventlistner click denge
  startOver.appendChild(p); // us paragraph jiska variable p thaa usko append kr denge startOver me
  playGame = false; // isse game chalna bnd ho jayega jb upar ki condition mil jaaye aur true waali condition met naa hao
  newGame(); // jb game end ho jaaye to phir se game chaloo krne ke liye hm is function newGame(); ko call karenge phir ye function apna kaam krgaa iska kaam neeche me diyaa huaa hai ki iskaa kyaa kaam hai
}

function newGame() {
  const newGameButton = document.querySelector("#newGame"); // p.innerHtml me jo like hai Start new Game usi ko select kiye hai jiska id newGame hai isme ek button bhi add kiye the taaki ye button jaisa behave kre ab is par addeventlistner add krenge taaki click hone par kyaa krna hai
  newGameButton.addEventListener("click", function (e) {
    // click krne par fuction (e) hogaa jo upar me defined hai ki iskaa kyaa kaam hai if (playGame) waale portion ye function likhaa huaa hai
    randomNumber = parseInt(Math.random() * 100 + 1); // phir se naya number generate karenge
    prevGuess = []; // ye khaali kr diye taaki ab phir se jo naya game start huaa hai usme jo guess krenge usko store kar sake
    numGuess = 1; // shuruaat par aa gye hai
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute("disabled"); // jo end game me userinput ko disabled kiye the ab usko hataayenge taake ye phir se enable ho jaaye
    startOver.removeChild(p); // startover me jo chid diye the endgame me ab us chid ko hatayenge

    playGame = true;
  });
}
