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

// Start the game
initialiseGame();