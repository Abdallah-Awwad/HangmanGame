let keywords = {
	Countries: ["Egypt", "Iraq", "Syria", "Saudi Arabia", "Palestine", "Lebnan"],
	Actors: ["Ahmed Zaki", "Adel Imam", "Omar Sharif", "Faten Hamama", "Ahmed El Sakka", "Soad Hosny", "Hussein Fahmy"],
	Singers: ["Amr Diab", "Umm Kalthum", "Sherine", "Tamer Hosny", "Mohamed Mounir"],
	Dishes: ["Koshary", "Fool", "Falafel", "Hawawshi", "Shawerma", "Kofta", "Kebda"],
}
// Generating The alphabet letters 
let alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
alphabetLettersArray = alphabetLetters.toLowerCase().split("");
// initialing the mistakes counter
let mistakesCounter = 0;
// initialing the correct guess counter
let correctLetters = 0;

function gameOver (gameStatus) {
	if (gameStatus == 1) {
		// freeze the buttons
		let freeze = document.querySelector(".alphabet");
		freeze.classList.add("clicked");
		// freeze the whole screen
		let freezeScreen = document.querySelector(".ending-screen");
		freezeScreen.style.display = "initial";
		// Game result 
		let gameResult = document.querySelector(".ending-screen .game-status");
		gameResult.innerHTML=(`Congratulations! You won with  ${mistakesCounter} mistakes`);
		let winAudio = new Audio('audio/tada-fanfare-a-6313.mp3');
		winAudio.play();
	} 
	else { 
		// freeze the buttons
		let freeze = document.querySelector(".alphabet");
		freeze.classList.add("clicked");
		// freeze the whole screen
		let freezeScreen = document.querySelector(".ending-screen");
		freezeScreen.style.display = "initial";
		// Game result 
		let gameResult = document.querySelector(".ending-screen .game-status");
		gameResult.innerHTML=(`Game is over! try again! the word was ${randomValue}`);
		let loseAudio = new Audio('audio/aaahhhhhh-125821.mp3');
		loseAudio.play();
	}
}
// Making box for each alphabet letter in the html
let alphabetdiv = document.querySelector(".alphabet");
alphabetLettersArray.forEach ((letter) => {
	let span = document.createElement("span");
	span.innerHTML=(letter);
	alphabetdiv.appendChild(span);
	
	// on click behavior function
	span.onclick = function() {
	// when clicking the letter add .clicked class for the css to blur it
		span.classList.add("clicked");
		// Check if the letter exist in the random value word
		if (randomValue.toLowerCase().indexOf(span.innerHTML) > -1) { 
		// if exists show it
			for (i = 0; i < randomValue.length; i++) {
				if (randomValue[i].toLowerCase() === span.innerHTML) {
					let x = document.querySelectorAll(".guess span");
					x[i].style.color = "var(--orange-color)";
					let correctAudio = new Audio('audio/correct-6033.mp3');
					correctAudio.volume = 0.3;
					correctAudio.play();
					correctLetters += 1;
				}
				// if the player guessed all the letters => game win
				if (correctLetters === randomValue.length) {
					gameOver(1);
					break;
				}
			}
		} 
		// if it doesn't exist ... mistakes +1
		else {
			mistakesCounter += 1;
			// every mistake .. show part of the hang and then end the game
			if (mistakesCounter <= 9) {
				let mistake1 = document.querySelector(`.mistake-${mistakesCounter}`);
				mistake1.style.display="initial";
			} 
			// Make mistake audio
			let mistakeAudio = new Audio('audio/wrong-answer-129254.mp3');
			mistakeAudio.volume = 0.1;
			mistakeAudio.play();
			// Show end Screen
			if (mistakesCounter == 9) gameOver(0);
		}
	};
});
	
// Choosing random category from the array 
function getRandomProperty(keywords) {
	let randomItem = Object.keys(keywords);
	return randomItem[Math.floor(Math.random() * randomItem.length)];
}
let randomCategory = getRandomProperty(keywords);
// Choose random value from the array
let randomValue = keywords[randomCategory][Math.floor(Math.random() * keywords[randomCategory].length)];

// add the Category to the game info
let categorySpan = document.querySelector(".game-info .category span");
	categorySpan.innerHTML=randomCategory;

// Create spans for each letter in the random value word and adding the letter inside each one
let guessSection = document.querySelector(".guess");
for (i = 0; i < randomValue.length; i++ ) {
	let letterSpan = document.createElement("span");
	letterSpan.innerHTML=(randomValue[i]); // adding the letter to the span (but not secured)
	guessSection.appendChild(letterSpan);
	// Detecting if the character space
	if (randomValue.charAt(i) === " ") {
	// if the randomValue contain a space add it to correct guesses
		letterSpan.classList.add("space");
		correctLetters += 1;
	}
}

// if u wanna improve the code do the following: 
// 1- hide the word from the inspect element (cause you can see the randomValue letters' spans). 
// 2- make the drawing responsive.
// 3- make the whole page responsive.
// 4- add the mistakes counter to the user. 
// 5- do "play again" button. 
// 6- add sound effects. [ done ]
// 7- give animations before showing the .ending-screen.
// 8- tell the player the word if he couldn't guess it. [ done ]
// 9- Add image to the word that the player were guessing in the end screen.
// 10- rephrase the mistake-? condition .. and use something else insted of the switch (not necessary tho).
// 11- words with two spaces doesn't show win game. [ done ]
// 12- Add games won counter and game lose counter while playing (Point 5 needed). 