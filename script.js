const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "💉";
let running = false;

const funFacts = [
`Although bacteria, specifically pathogens have been popularized for being harmful to the human immune system, 
there are a number of bacterial species that are good for our immune system and for the environment.`,

`Did you know that bacteria can communicate with each other? Not exactly by speaking but through electrical signals. 
This helps a colony of bacterial cells to communicate and work together.`,

`A single bacterial can reproduce and generate millions of copies of itself through binary fission. 
This can happen in about the same time it takes you to finish listening to your favorite song!`,

`A person with gene mutation ABCC11 are incapable of producing 
sweat and therefore, attracting bacteria to produce odor.`,

`Scientists are working to create strains of bacteria to clean up oil spills. Some bacterial 
cells can decompose oil into carbon dioxide and water.`,

`Breast-feeding mothers can transfer their gut bacteria to their child through breast milk.
Once the gut bacteria colonizes in the child's stomach, it can help to strengthen their 
immune system.`, 

`There are three main groups of bacteria. Cocci bacteria are round and can be found in clumps, pairs, or in long strands. 
Spiral bacteria resembles a twisty slide. Bacilli bacteria resemble a capsule.`,

`Some bacteria have chemicals that can generate light. This is called bioluminescence.`,

`Iron bacteria are formed when the oxygen from the air is exposed to iron-rich groundwater. Their livelihood
depends on oxidizing ferrous iron to ferric iron.`,

`Antibiotic resistance occurs when medication is not able to kill bacteria. The bacteria
continues to survive despite taking antibiotics which is a serious public health problem.`,

`Binary fission is the reproduction process for bacteria where the parent cell splits into two identical
parent cells.`
];

let factOutput = document.querySelector('.factOutput');
let fact = funFacts[Math.floor(Math.random() * funFacts.length)];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
};

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != '' || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    randomFact();
};

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
};

function changePlayer() {
    currentPlayer = (currentPlayer == "💉") ? "🧫" : "💉";
    statusText.textContent = `${currentPlayer}'s turn`
};

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == '' || cellB == '' || cellC == ''){
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;

    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{ 
        changePlayer();
    }
};

function restartGame() {
    currentPlayer = "💉";
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s Turn!`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
    randomFact();
};

function randomFact() {
    let ranQuote = funFacts[Math.floor(Math.random() * funFacts.length)];
    factOutput.innerHTML = ranQuote;
};





