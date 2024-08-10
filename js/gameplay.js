// Contains core game mechanics and controls game progress over time
// Scope:
//  - Implement time progression and event triggering at regular time intervals
//  - Manage end-game sequence




// Trigger events based on the current game year and player's status

function triggerMilestoneEvent(player, currentYear) {
    milestoneEvents.forEach(event => {
        if (event.year === currentYear && event.prerequisites(player)) {
            let choice = prompt(`${event.description}\nChoices: ${Object.keys(event.choices).join(', ')}`);
            if (event.choices[choice]) {
                event.choices[choice](player);
                logEvent(currentYear, event.name, `Player chose: ${choice}`, player);
            } else {
                console.log("Invalid choice.");
            }
        }
    });
}

// Simulate the passing of years in the game

for (let gameYear = 0; gameYear <= 45; gameYear++) {
    player.age = gameYear + 18; // Mapping game year to player age
    triggerMilestoneEvent(player, gameYear);
    player.yearsPlayed += 1;
}

// Should consider moving this function to logging.js ?

function logEvent(year, eventName, message, player) {
    console.log(`Year ${year}: ${eventName} - ${message}`);
    console.log(`Player's Status: Net Worth: ${player.netWorth}, Income: ${player.income}, Savings Rate: ${player.savingsRate}, Expense Rate: ${player.expenseRate}`);
}