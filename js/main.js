// Entry point for the game logic. Will initialise the game, manage overall game flow, and link together all modules (player, financial functions, events).
// Scope:
//  - Initialise game by calling functions from other files
//  - Manage game's main loop and progression




// Initialise game
let player;
let currentYear = 0;

function initialiseGame() {
    player = {
        netWorth: 0,
        income: 0,
        incomePotential: 0,
        savingsRate: 0.1,   // Default 10% savings rate
        expenseRate: 0.7,     // Default 70% of income goes to expenses
        taxRate: 0.25,         // Default 25% tax rate
        interestRate: 0.05,     // Default 5% annual interest rate
        yearsPlayed: 0,
        age: 18,
        futureValueAnnuity: 0,
        isStudent: false,
        hasStudentLoans: false,
        isGraduate: false,
        hasCorporateJob: false,
        hasSmallBusiness: false,
        hasPublicSectorJob: false,
        isWorking: false,
        isMarried: false,
        hasHome: false,
        hasChildren: false,
        parentsAge: 0,
        childrenAge: 0,
    };
    initialisePlayer('SingleIncome'); // Change the parent choice as needed
    updateUI();
}

function updateUI() {
    document.getElementById('net-worth').textContent = player.netWorth;
    document.getElementById('income').textContent = player.income;
    document.getElementById('savings-rate').textContent = (player.savingsRate * 100).toFixed(2) + '%';
    document.getElementById('expense-rate').textContent = (player.expenseRate * 100).toFixed(2) + '%';
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('player-age').textContent = player.age;
}

function nextYear() {
    currentYear += 1;
    player.age = currentYear + 18;
    player.parentsAge = currentYear + 46;
    if (player.hasChildren === true) {
        player.childrenAge++
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