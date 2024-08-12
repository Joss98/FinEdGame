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
                    updateUI();
                };
            }
        }
    });
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