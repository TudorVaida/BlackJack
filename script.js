"use strict";

const potAmount = document.querySelector(`.pot--amount`);
const scoreDealer = document.getElementById(`score--dealer`);
const scorePlayer = document.getElementById(`score--player`);

const numePlayer = document.querySelector(`.nume--player`);
const numeDealer = document.querySelector(`.nume--dealer`);

const cartiDealer = document.querySelector(`.carti--dealer`);
const cartiPlayer = document.querySelector(`.carti--player`);

const betAmount = document.querySelector(`.bet--amount`);
const creditAmount = document.querySelector(`.credit--amount`);
const inputBet = document.querySelector(`.input--bet`);

const btnExit = document.querySelector(`.btnExit`);
const btnStart = document.querySelector(`.btnStart`);
const btnStand = document.querySelector(`.btnStand`);
const btnSplit = document.querySelector(`.btnSplit`);
const btnDouble = document.querySelector(`.btnDouble`);
const btnHit = document.querySelector(`.btnHit`);
const btnClear = document.querySelector(`.btnClear`);
const btnBet = document.querySelector(`.btnBet`);
const btnDeal = document.querySelector(`.btnDeal`);
const btnNewGame = document.querySelector(`.btnNewGame`);
const btnRules = document.querySelector(`.btnRules`);
const btnCloseModalWin = document.querySelector(`.close-modal-win`);
const btnCloseModalRules = document.querySelector(`.close-modal-rules`);
const btnContainerPlay = document.querySelector(`.btnContainer--play`);
const btnContainerBet = document.querySelector(`.btnContainer--bet`);
const modalRules = document.querySelector(`.modal--rules`);
const modalWin = document.querySelector(`.modal--win`);
const overlay = document.querySelector(`.overlay`);

let deck;
let indicatorJoc;
//////////////////////// FUNCTIONS ///////////////////////////
const player1 = {
	valCarti: [],
};
const dealer = {
	valCarti: [],
};
const createDeck = function () {
	class carte {
		constructor(culoare, numar, valoare) {
			this.culoare = culoare;
			this.numar = numar;
			this.valoare = valoare;
		}
	}
	class pachet {
		constructor(carti) {
			this.carti = carti;
		}
	}
	const deck = new pachet([]);
	const culori = [`spades`, `hearts`, `clubs`, `diamonds`];
	const numere = [2, 3, 4, 5, 6, 7, 8, 9, 10, `jack`, `queen`, `king`, `ace`];
	const valoare = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

	for (let i = 0; i < 13; i++) {
		for (let y = 0; y < 4; y++) {
			deck.carti.push(new carte(culori[y], numere[i], valoare[i]));
		}
	}
	return deck;
};
const newGame = function () {
	btnContainerPlay.classList.add(`hidden`);
	btnContainerBet.classList.remove(`hidden`);
	betAmount.textContent = `0`;
	potAmount.textContent = `0`;
	scoreDealer.textContent = `0`;
	scorePlayer.textContent = `0`;
	const carte = document.querySelectorAll(`.carte`);
	carte.forEach((elem) => elem.classList.add(`hidden`));
	const finalMassage = document.querySelectorAll(`.final-massage`);
	finalMassage.forEach((elem) => elem.classList.add(`hidden`));
	indicatorJoc = true;
	deck = createDeck();
};
const startGame = function () {
	btnContainerPlay.classList.add(`hidden`);
	btnContainerBet.classList.add(`hidden`);
	btnStart.classList.remove(`hidden`);
	scoreDealer.classList.add(`hidden`);
	scorePlayer.classList.add(`hidden`);
	numePlayer.classList.add(`hidden`);
	numeDealer.classList.add(`hidden`);
	betAmount.classList.add(`hidden`);
	betAmount.textContent = `0`;
	potAmount.textContent = `0`;
	scoreDealer.textContent = `0`;
	scorePlayer.textContent = `0`;
	creditAmount.textContent = `500`;
	const carte = document.querySelectorAll(`.carte`);
	carte.forEach((elem) => elem.classList.add(`hidden`));
	const finalMassage = document.querySelectorAll(`.final-massage`);
	finalMassage.forEach((elem) => elem.classList.add(`hidden`));
	indicatorJoc = true;
	deck = createDeck();
};
startGame();
const endGame = function (player, multi) {
	if (player === `Player`) {
		document.querySelector(
			`.modal--win`
		).innerHTML += `<div class="final-massage">${player} wins!</div>
		<div class="final-massage">You win ${
			Number(betAmount.textContent) * multi
		} $</div>`;
	} else {
		document.querySelector(
			`.modal--win`
		).innerHTML += `<div class="final-massage">${player} wins!</div>
		`;
	}

	overlay.classList.remove(`hidden`);
	modalWin.classList.remove(`hidden`);
	indicatorJoc = false;
};
const random = function (arr) {
	return arr[Math.floor(Math.random() * deck.carti.length)];
};
const giveCard = function (player) {
	const card = random(deck.carti);
	// console.log(card);
	document.querySelector(`.carti--${player}`).innerHTML +=
		"<img src=images/" +
		`${card.numar}_of_${card.culoare}.png` +
		" " +
		"class='carte'/>";
	player === `player`
		? (scorePlayer.textContent = Number(scorePlayer.textContent) + card.valoare)
		: (scoreDealer.textContent =
				Number(scoreDealer.textContent) + card.valoare);
	player1.valCarti.push(card.valoare);
	deck.carti.splice(
		deck.carti.findIndex((elem) => elem === card),
		1
	);
};
/////////////////////// EVENTS ///////////////////////////////
btnStart.addEventListener(`click`, function () {
	btnStart.classList.add(`hidden`);
	btnContainerBet.classList.remove(`hidden`);
	scoreDealer.classList.remove(`hidden`);
	scorePlayer.classList.remove(`hidden`);
	numePlayer.classList.remove(`hidden`);
	numeDealer.classList.remove(`hidden`);
	betAmount.classList.remove(`hidden`);
	betAmount.textContent = `0`;
	potAmount.textContent = `0`;
	scoreDealer.textContent = `0`;
	scorePlayer.textContent = `0`;
});
btnBet.addEventListener(`click`, function () {
	if (Number(inputBet.value) <= Number(creditAmount.textContent)) {
		betAmount.textContent =
			Number(betAmount.textContent) + Number(inputBet.value);
		creditAmount.textContent =
			Number(creditAmount.textContent) - Number(inputBet.value);
		inputBet.value = ` `;
	} else {
		inputBet.value = ` `;
		alert(`Not enought money!`);
	}
});
btnClear.addEventListener(`click`, function () {
	creditAmount.textContent =
		Number(creditAmount.textContent) + Number(betAmount.textContent);
	inputBet.value = ` `;
	betAmount.textContent = `0`;
});
btnDeal.addEventListener(`click`, function () {
	btnContainerPlay.classList.remove(`hidden`);
	btnContainerBet.classList.add(`hidden`);
	potAmount.textContent = betAmount.textContent;
	giveCard(`player`);
	giveCard(`player`);
	giveCard(`dealer`);
});
btnHit.addEventListener(`click`, function () {
	if (Number(scorePlayer.textContent) < 21 && indicatorJoc) {
		giveCard(`player`);
	}
	if (Number(scorePlayer.textContent) > 21 && indicatorJoc) {
		giveCard(`dealer`);
		endGame(`Dealer`);
	}
});
btnStand.addEventListener(`click`, function () {
	if (indicatorJoc) {
		while (
			Number(scoreDealer.textContent) < 21 &&
			Number(scoreDealer.textContent) < 17
		) {
			giveCard(`dealer`);
		}
		if (
			Number(scoreDealer.textContent) <= 21 &&
			Number(scoreDealer.textContent) > Number(scorePlayer.textContent)
		) {
			endGame(`Dealer`);
		} else if (
			Number(scorePlayer.textContent) <= 21 &&
			Number(scoreDealer.textContent) !== Number(scorePlayer.textContent)
		) {
			if (
				player1.valCarti.length === 2 &&
				player1.valCarti.reduce((acc, elem) => acc + elem) === 21
			) {
				creditAmount.textContent =
					Number(creditAmount.textContent) +
					Number(betAmount.textContent) * 2.5;
				endGame(`Player`, 2.5);
			} else {
				creditAmount.textContent =
					Number(creditAmount.textContent) + Number(betAmount.textContent) * 2;
				endGame(`Player`, 2);
			}
		} else if (
			Number(scorePlayer.textContent) <= 21 &&
			Number(scorePlayer.textContent) > Number(scoreDealer.textContent)
		) {
			if (
				player1.valCarti.length === 2 &&
				player1.valCarti.reduce((acc, elem) => acc + elem) === 21
			) {
				creditAmount.textContent =
					Number(creditAmount.textContent) +
					Number(betAmount.textContent) * 2.5;
				endGame(`Player`, 2.5);
			} else {
				creditAmount.textContent =
					Number(creditAmount.textContent) + Number(betAmount.textContent) * 2;
				endGame(`Player`, 2);
			}
		} else {
			endGame(`Everybody`, 1);
			creditAmount.textContent =
				Number(creditAmount.textContent) + Number(betAmount.textContent);
		}
	}
});

btnRules.addEventListener(`click`, function () {
	overlay.classList.remove(`hidden`);
	modalRules.classList.remove(`hidden`);
});
btnNewGame.addEventListener(`click`, function () {
	newGame();
	overlay.classList.add(`hidden`);
	modalRules.classList.add(`hidden`);
	modalWin.classList.add(`hidden`);
	console.log(`button pushed`);
});
btnCloseModalRules.addEventListener(`click`, function () {
	overlay.classList.add(`hidden`);
	modalRules.classList.add(`hidden`);
	console.log(`button pushed`);
});
btnCloseModalWin.addEventListener(`click`, function () {
	overlay.classList.add(`hidden`);
	modalWin.classList.add(`hidden`);
	console.log(`button pushed`);
});

overlay.addEventListener(`click`, function () {
	overlay.classList.add(`hidden`);
	modalRules.classList.add(`hidden`);
	modalWin.classList.add(`hidden`);
});
btnExit.addEventListener(`click`, function () {
	startGame();
});
