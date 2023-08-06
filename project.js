// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin the slot machine
// 5. Check if user won 
// 6. Give the user their winnings (if won)
// 7. Play again

// it creates a prompt that receives user's input
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
	"A" : 2,
	"B" : 4,
	"C" : 6,
	"D" : 8
}

// depending on the symbol, the bet is going to be multiplied by the value of the symbol
// for example, if the result is a line of A's, the bet is multiplied by 5
const SYMBOL_VALUES = {
	"A" : 5,
	"B" : 4,
	"C" : 3,
	"D" : 2
}



// STEP 1
const deposit = () => {
	while(true){
		// makes sure the amount is a float number
		const depositAmount = parseFloat(prompt("Enter a deposit amount: "));

		if(isNaN(depositAmount) || depositAmount <= 0){
			console.log("Invalid deposit amount. Try again.");
		} else{
			return depositAmount;
		}
	}
};


// STEP 2
const getNumberOfLines = () => {
	while(true){
		// makes sure the number of lines is an float number
		const lines = parseFloat(prompt("Enter a number of lines (1-3): "));

		if(isNaN(lines) || lines <= 0 || lines > 3){
			console.log("Invalid number of lines. Try again.");
		} else{
			return lines;
		}
	}
}


// STEP 3

// the bet amount depends on balance the player has
const getBet = (balance, lines) => {
	while(true){
		// makes sure the number of lines is an float number
		const bet = parseFloat(prompt("Enter the bet per line: "));

		// the bet also cannot be higher than the balance (the total they have right now)
		if(isNaN(bet) || bet <= 0 || bet > (balance / lines)){
			console.log("Invalid bet. Try again.");
		} else{
			return bet;
		}
	}
}

// STEP 4

// this function will "spin" the slot machine and return random lines
// if the line is full of A's, for example, the player wins and receives the bonus depending on the value of symbol
const spin = () => {

	const symbols = [];
	
	// this is going to loop through our SYMBOLS_COUNT key/value array
	for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
		
		for(let i = 0; i < count; i++){
			symbols.push(symbol);
		}

	}

	const reels = [[], [], []]

	for(let i = 0; i < COLUMNS; i++){
		
		// creating a copy of the original array, so i don't need to modify it
		const reelSymbols = [...symbols];

		for(let j = 0; j < ROWS; j++){

			// generating random symbol, adding it to the reels array and removing from the copy array
			const randomIndex = Math.floor(Math.random() * reelSymbols.length);
			const selectedSymbol = reelSymbols[randomIndex];
			reels[i].push(selectedSymbol);
			reelSymbols.splice(selectedSymbol, 1);
		}
	}

	return reels;
}


const transpose = (reels) => {
	const rows = [];

	for(let i = 0; i < ROWS; i++){
		rows.push([]);
		for(let j = 0; j < COLUMNS; j++){
			rows[i].push(reels[j][i]);
		}
	}

	return rows;
}

// printing the slot machine in a prettier way
const printSlotMachine = (rows) => {
	for(const row of rows){
		let rowString = "";

		for(const [i, symbol] of row.entries()){
			rowString += symbol;

			// ensures that the result is something like A | B | C, and not A | B | C |
			if(i != row.length -1){
				rowString += " | ";
			}
		}

		console.log(rowString);
	}
}


// STEP 5 and 6

const getWinnings = (rows, bet, lines) => {
	
	let winnings = 0;

	for(let row = 0; row < lines; row++){
		
		const symbols = rows[row];
		let allSame = true;

		for(const symbol of symbols){
			if(symbol != symbols[0]){
				allSame = false;
				break;
			}
		}
	}
}


let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printSlotMachine(rows);



