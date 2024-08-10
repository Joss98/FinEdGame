// Contains Player object definition and any related functions
// Scope:
//  - Define Player properties and methods
//  - Handle player-specific logic, such as initialising attributes based on parent choice




// Create Player object with initial variable values
const Player = {
    netWorth: 0,
    income: 0,
    savingsRate: 0,
    expenseRate: 0,
    taxRate: 0,
    interestRate: 0,
    yearsPlayed: 0,
    futureValueAnnuity: 0,
    // Other variables will need to be tracked as game scope grows
};

function initialisePlayer(parentChoice) {
    switch (parentChoice) {
        case 'DualIncome':
            Player.netWorth = 10000;
            Player.savingsRate = 0.1;
            break;
        case 'SingeIncome':
            Player.netWorth = 1000;
            Player.savingsRate = 0.05;
            break;
        default:
            console.log("Invalid parent choice");
    }
}