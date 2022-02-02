"use strict";

const wordContainer = document.querySelector('.word-container')
const wonContainer = document.querySelector('.won-container')
const notificationBox = document.querySelector('.notification')
const wrongLettersContainer = document.querySelector('.wrong-letters-container');
const btnReplay = document.querySelector('.btn-replay')
const finalMsg = document.querySelector('.final-msg')
const figure = document.querySelectorAll('.figure')

const words = ['mayank', 'sahil', 'rohit', 'henansh', 'vinod', 'giraffe']

let randomWord = words[Math.floor(Math.random() * words.length)]

let correctLetters = ['a', 'i'];
let wrongLetters = [];


// display correct word

function displayWord() {
	const html = `
		${randomWord.split('').map(l => 
			`<span class="letter">${correctLetters.includes(l) ? l : ''}</span>`
		).join('')}
	`
	wordContainer.innerHTML = html;

	const wordText = wordContainer.innerText.replace(/\n/g,'');

	if(wordText === randomWord) {
		wonContainer.classList.remove('hidden')

		finalMsg.innerHTML = `
			<p>CONGRATULATIONS !! YOU WIN .</p>
		`
	}
}

// display wrong letters 
function RenderWrongLetters() {
	if(wrongLetters.length > 0){
		const html = `
			 <p>wrong</p>
			<span>${wrongLetters.map(i => i)}</span> 
		`
		wrongLettersContainer.innerHTML = html
	
		figure.forEach((f,i) => { 
			wrongLetters.length > i ? f.classList.remove('hidden') : ''
		})
		if(figure.length === wrongLetters.length) {
			wonContainer.classList.remove('hidden')
	
			finalMsg.innerHTML = `
				<p>YOU LOSE !!</p>	`
		}}
}

//popup notification
function notification() {
	notificationBox.classList.add('show');

	setTimeout(() => notificationBox.classList.remove('show'), 2000);
}

// check correct letters includes that letter ot not
function checkLetters(letter) {
	correctLetters.includes(letter) ? notification() : correctLetters.push(letter);
	displayWord();
}
// check wrong letters includes that letter ot not
function checkWrongLetters(letter) {
	wrongLetters.includes(letter) ? notification() : wrongLetters.push(letter);
	RenderWrongLetters();
}


// keydown 
window.addEventListener('keydown', e  => {
	if(e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;
		randomWord.includes(letter) ? checkLetters(letter) : checkWrongLetters(letter);
	}
})

//replay
btnReplay.addEventListener('click', () => {
	randomWord = words[Math.floor(Math.random() * words.length)]
	correctLetters = [];
	wrongLetters = [];
	wonContainer.classList.add('hidden');
	wrongLettersContainer.innerHTML = '';
	figure.forEach(f => f.classList.add('hidden'));
	displayWord();
})

// guess box 


displayWord()