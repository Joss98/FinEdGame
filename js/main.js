// Entry point for the game logic. Will initialise the game, manage overall game flow, and link together all modules (player, financial functions, events).
// Scope:
//  - Initialise game by calling functions from other files
//  - Manage game's main loop and progression



initialisePlayer('DualIncome');

console.log("Initialised Player Object:", Player);

const combinedTax = calculateCombinedTax(Player.income);
console.log("Combined tax on Player's Income:", combinedTax);

const portfolioGrowth = calculateInvestmentPortfolioGrowth(45, Player.income, 0.03, Player.savingsRate, Player.interestRate, 0.01);
console.log("Investment Portfolio Value after 45 years:", portfolioGrowth);