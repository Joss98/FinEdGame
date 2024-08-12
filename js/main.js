// Entry point for the game logic. Will initialise the game, manage overall game flow, and link together all modules (player, financial functions, events).
// Scope:
//  - Initialise game by calling functions from other files
//  - Manage game's main loop and progression




// Initialise game

function initialiseGame() {
    currentYear = 0;
    Player.age = 18;
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
    if (Player.hasChildren) {
        Player.childrenAge++
    }
    triggerMilestoneEvent(currentYear);
    // triggerDisruptiveEvent(Player);
    showBudgetUI();
    updateUI();
}

console.log(typeof currentYear); // should output "number"
function triggerMilestoneEvent(currentYear) {
    console.log(`Checking events for year: ${currentYear}`);
    milestoneEvents.forEach(event => {
        console.log(`Checking event: ${event.name}`);
        if (event.year === currentYear && event.prerequisites(Player)) {
            console.log(`Triggering event: ${event.name}`);
            document.getElementById('event-description').textContent = event.description;

            // Setup choice buttons
            const choices = Object.keys(event.choices);
            for (let i = 0; i < choices.length; i++) {
                const button = document.getElementById(`choice${i+1}`);
                button.textContent = choices[i];
                button.style.display = 'inline';
                button.onclick = () => {
                    event.choices[choices[i]](Player);
                    logEvent(currentYear, event.name, `Player chose: ${choices[i]}`, Player);
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