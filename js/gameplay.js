// Contains core game mechanics and controls game progress over time
// Scope:
//  - Implement time progression and event triggering at regular time intervals
//  - Manage end-game sequence




// Trigger milestone events based on the current game year and player's status

function triggerMilestoneEvent(currentYear) {
    console.log(`Checking events for year: ${currentYear}`);
    milestoneEvents.forEach(event => {
        console.log(`Checking event: ${event.name}`);
        if (event.year === currentYear && event.prerequisites(Player)) {
            console.log(`Triggering event: ${event.name}`);
            document.getElementById('event-description').textContent = event.description;

            // Disable nextYearButton until player makes a choice
            document.getElementById('nextYearButton').disabled = true;

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

                    // Enable nextYearButton again after a choice is made
                    document.getElementById('nextYearButton').disabled = false;

                    updateUI();
                    eventTriggered = true;
                };
            }
        }
    });
    eventTriggeredLastYear = eventTriggered;
}

function nextYear() {
if (currentYear < 45) { // Only increment if the year is less than 45
    currentYear += 1;
    Player.age = currentYear + 18;
    Player.parentsAge = currentYear + 46;
    if (Player.hasChildren) {
        Player.childrenAge++;
    }
    triggerMilestoneEvent(currentYear);
    if (eventTriggeredLastYear) {
        showBudgetUI();
    } else {
        hideBudgetUI();
    }
    
    updateUI();
    } else {
        // Disable the nextYear button if the game has reached the final year
        document.getElementById('nextYearButton').disabled = true;
        console.log('The game has reached the final year. No further progress can be made.');
    }
}

// trigger disruptive events randomly
/* function triggerDisruptiveEvent() {
    const eventChance = Math.random();
    if (eventChance < 0.3) { // 30% chance to trigger a disruptive event
        const eventIndex = Math.floor(Math.random() * disruptiveEvents.length);
        const disruptiveEvent = disruptiveEvents[eventIndex];
        if (disruptiveEvent.prerequisites(Player)) {
            disruptiveEvent.impact(Player);
            logEvent(Player.yearsPlayed, disruptiveEvent.name, "A disruptive event occurred: " + disruptiveEvent.description, Player);
        }
    }
} */

// Simulate passing years and potentially triggering disruptive events

for (let gameYear = 0; gameYear <= 45; gameYear++) {
    Player.age = gameYear + 18; // Map game year to player age
    // triggerDisruptiveEvent();
    Player.yearsPlayed += 1;
}