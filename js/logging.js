// Contains logging functions to track player decisions over the course of gameplay
// Scope:
//  - Anything to do with keeping track of player decisions

const gameLog = [];

function logEvent(year, eventName, description, player) {
    const logEntry = {
        year: year,
        event: eventName,
        description: description,
        netWorth: player.netWorth,
        income: player.income,
        savingsRate: player.savingsRate,
        expenseRate: player.expenseRate,
        taxRate: player.taxRate,
        interestRate: player.interestRate,
        futureValueAnnuity: player.futureValueAnnuity
    };
    gameLog.push(logEntry);
}

function getGameLog() {
    return gameLog;
}

function clearGameLog() {
    gameLog.length = 0; // Resets the game log
}