// Contains Player object definition and any related functions
// Scope:
//  - Define Player properties and methods
//  - Handle player-specific logic, such as initialising attributes based on parent choice




// Create Player object with initial variable values
const Player = {
    netWorth: 0,
    income: 0,
    savingsRate: 0.1,   // Default 10% savings rate
    expenseRate: 0.7,     // Default 70% of income goes to expenses
    taxRate: 0.25,         // Default 25% tax rate
    interestRate: 0.05,     // Default 5% annual interest rate
    yearsPlayed: 0,
    futureValueAnnuity: 0,
    // Other variables will need to be tracked as game scope grows
};

function initialisePlayer(parentChoice) {
    switch (parentChoice) {
        case 'DualIncome':
            Player.netWorth = 10000;
            Player.income = 80000;
            Player.savingsRate = 0.1;
            Player.taxRate = calculateCombinedTax(Player.income);
            break;
        case 'SingleIncome':
            Player.netWorth = 1000;
            Player.income = 50000;
            Player.savingsRate = 0.05;
            Player.taxRate = calculateCombinedTax(Player.income);
            break;
        default:
            console.log("Invalid parent choice");
    }
}