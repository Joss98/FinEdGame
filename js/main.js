// Entry point for the game logic. Will initialise the game, manage overall game flow, and link together all modules (player, financial functions, events).
// Scope:
//  - Initialise game by calling functions from other files
//  - Manage game's main loop and progression




// Initialise game
let currentYear = 0;

function initialiseGame() {
    initialisePlayer('SingleIncome'); // Change the parent choice as needed
    updateUI();
}

function updateUI() {
    document.getElementById('net-worth').textContent = Player.netWorth;
    document.getElementById('income').textContent = Player.income;
    document.getElementById('savings-rate').textContent = (Player.savingsRate * 100).toFixed(2) + '%';
    document.getElementById('expense-rate').textContent = (Player.expenseRate * 100).toFixed(2) + '%';
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('player-age').textContent = Player.age;
}

function nextYear() {
    currentYear += 1;
    Player.age = currentYear + 18;
    Player.parentsAge = currentYear + 46;
    if (Player.hasChildren === true) {
        Player.childrenAge++
    }
    triggerMilestoneEvent(player, currentYear);
    // triggerDisruptiveEvent(player);
    updateUI();
}

function triggerMilestoneEvent(player, currentYear) {
    milestoneEvents.forEach(event => {
        if (event.year === currentYear && event.prerequisites(player)) {
            document.getElementById('event-description').textContent = event.description;

            // Setup choice buttons
            const choices = Object.keys(event.choices);
            for (let i = 0; i < choices.length; i++) {
                const button = document.getElementById(`choice${i+1}`);
                button.textContent = choices[i];
                button.style.display = 'inline';
                button.onclick = () => {
                    event.choices[choices[i]](player);
                    logEvent(currentYear, event.name, `Player chose: ${choices[i]}`, player);
                    hideChoices();
                    updateUI();
                };
            }
        }
    });
}

function hideChoices() {
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('choice3').style.display = 'none';
    document.getElementById('event-description').textContent = 'No events triggered yet.';
}

// Start the game
initialiseGame();