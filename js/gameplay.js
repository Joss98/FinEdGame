// Contains core game mechanics and controls game progress over time
// Scope:
//  - Implement time progression and event triggering at regular time intervals
//  - Manage end-game sequence




// Trigger milestone events based on the current game year and player's status

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

// trigger disruptive events randomly
function triggerDisruptiveEvent(player) {
    const eventChance = Math.random();
    if (eventChance < 0.3) { // 30% chance to trigger a disruptive event
        const eventIndex = Math.floor(Math.random() * disruptiveEvents.length);
        const disruptiveEvent = disruptiveEvents[eventIndex];
        if (disruptiveEvent.prerequisites(player)) {
            disruptiveEvent.impact(player);
            logEvent(player.yearsPlayed, disruptiveEvent.name, "A disruptive event occurred: " + disruptiveEvent.description, player);
        }
    }
}

// Simulate passing years and potentially triggering disruptive events

for (let gameYear = 0; gameYear <= 45; gameYear++) {
    player.age = gameYear + 18; // Map game year to player age
    triggerDisruptiveEvent(player);
    player.yearsPlayed += 1;
}

// Should consider moving this function to logging.js ?

function logEvent(year, eventName, message, player) {
    console.log(`Year ${year}: ${eventName} - ${message}`);
    console.log(`Player's Status: Net Worth: ${player.netWorth}, Income: ${player.income}, Savings Rate: ${player.savingsRate}, Expense Rate: ${player.expenseRate}`);
}