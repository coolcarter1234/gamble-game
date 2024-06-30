let balance = 10;
let spins = 1;
let multiplier = 1;

const prizes = [
    { text: "You won 2 spins!", spins: 2, money: 0 },
    { text: "You lost 20 dollars!", spins: 0, money: -20 },
    { text: "You won 50 dollars!", spins: 0, money: 50 },
    { text: "You lost a spin!", spins: -1, money: 0 },
    { text: "You won 100 dollars!", spins: 0, money: 100 },
    { text: "You lost 50 dollars!", spins: 0, money: -50 },
    { text: "You won a spin!", spins: 1, money: 0 },
    { text: "You won 200 dollars!", spins: 0, money: 200 },
    { text: "You lost 100 dollars!", spins: 0, money: -100 },
];

function updateDisplay() {
    document.getElementById("balance").innerText = `Balance: $${balance}`;
    document.getElementById("spins").innerText = `Spins: ${spins}`;
    document.getElementById("spinButton").disabled = balance < 10 || spins <= 0;
    document.getElementById("buyMultiplier").disabled = balance < 50;
    if (balance >= 5000) {
        document.getElementById("message").innerText = "Congratulations! You've reached $5000!";
        document.getElementById("spinButton").disabled = true;
        document.getElementById("buyMultiplier").disabled = true;
    }
}

function spin() {
    if (balance < 10 || spins <= 0) {
        document.getElementById("message").innerText = "Not enough balance or spins!";
        return;
    }

    balance -= 10;
    spins--;

    const prize = prizes[Math.floor(Math.random() * prizes.length)];
    let moneyWon = prize.money;
    let spinsWon = prize.spins;

    // Apply multiplier effects
    if (multiplier > 1) {
        if (Math.random() < 0.5) {
            moneyWon /= 2;
            spinsWon /= 2;
        } else {
            moneyWon *= 2;
            spinsWon *= 2;
        }
        document.getElementById("message").innerText = prize.text + " (Multiplier Applied!)";
    } else {
        document.getElementById("message").innerText = prize.text;
    }

    balance += moneyWon;
    spins += spinsWon;

    multiplier = 1; // Reset multiplier after spin
    updateDisplay();
}

function buyMultiplier() {
    if (balance >= 50) {
        balance -= 50;
        multiplier = 2;
        updateDisplay();
        document.getElementById("message").innerText = "2x Multiplier purchased! It will apply to the next spin.";
    }
}

updateDisplay();
