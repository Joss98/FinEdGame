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

// Start the game
initialiseGame();