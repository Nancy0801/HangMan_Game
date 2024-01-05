const keyboardButton = document.querySelector(".keyboard");
const hangmanImg = document.querySelector(".hangman img");
let currentWord , correctWord = [];
let wrongGuess =0;
let maxWrong =6;
const guessText = document.querySelector(".guess-text b");
const model = document.querySelector(".model");
const wordDisplay = document.querySelector(".letter-box");

//making a function containing words

const wordlist = [
    {
        word:"elephant",
        hint: "The largest land animal with a long trunk."
    },
    {
        word:"galaxy",
        hint: " A vast system of stars, gas, and dust held together by gravity"
    },
    {
        word:"pizza",
        hint: "A popular Italian dish often topped with cheese and tomato sauce."
    },
    {
        word:"sunflower",
        hint: "A tall plant with a large, yellow flower that turns towards the sun."
    },
    {
        word:"oxygen",
        hint: "A chemical element essential for life, often represented by the symbol O."
    },
    {
        word:"bicycle",
        hint: "A two-wheeled vehicle powered by pedals"
    },
    {
        word:"mountain",
        hint: "A large landform that rises prominently above its surroundings"
    },
    {
        word:"library",
        hint: " A place that houses a collection of books and other resources"
    },
    {
        word:"book",
        hint: "Contains pages with written or printed content"
    },
    {
        word:"banana",
        hint: "A yellow fruit with a peel"
    }
];


//selecting random word from wordlist
const getRandom = ()=> {
    const randomIndex = Math.floor(Math.random() * wordlist.length);
    const {word,hint } = wordlist[randomIndex];
    console.log(word);
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
};

const initWord = (letter , clickedLetter) => {
    // console.log(letter,clickedLetter);
    if(currentWord.includes(clickedLetter)){
        // console.log(clickedLetter, "exits");
        [...currentWord].forEach((Currletter , index) => {
            if(Currletter === clickedLetter){
                correctWord.push(Currletter);
                wordDisplay.querySelectorAll("li")[index].innerText = Currletter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed"); 
            }
        });
    }
    else{
        // console.log(clickedLetter , "not exits");
        wrongGuess++;
        hangmanImg.src = `img/hangman-${wrongGuess}.svg`;
    }
    guessText.innerText = `${wrongGuess} / ${maxWrong}` ;

    if(wrongGuess === maxWrong){
        console.log("Game over! try again");
        model.classList.toggle("hidden");
        document.querySelector(".content img").src = `img/lost.gif`;
        document.querySelector(".content h1").innerText = "Game Over!";
        document.querySelector(".content h3").innerText = "The Correct Word is: " + currentWord;
    }
    if(currentWord.split('').every(letter => correctWord.includes(letter))){
        console.log("victory!! you guessed correct word");
        model.classList.toggle("hidden");
        document.querySelector(".content img").src = `img/victory.gif`;
        document.querySelector(".content h1").innerText = "YEY, Victory!";
        document.querySelector(".content h3").innerText = "You guessed correct word!";
    }
};

//playAgain Function
function playAgain(){
    model.classList.toggle("hidden");
    getRandom();
    wrongGuess =0;
    guessText.innerText = `${wrongGuess} / ${maxWrong}` ;
    hangmanImg.src = `img/hangman-${wrongGuess}.svg`;
}

//dynamic keyboard
for(let i = 97;i<=122;i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardButton.appendChild(button);
    button.addEventListener("click", e => initWord(e.target , String.fromCharCode(i)));
}

getRandom();