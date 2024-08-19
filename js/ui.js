// Contains user interface functions







// Main UI

function updateUI() {
    document.getElementById('net-worth').textContent = Player.netWorth;
    document.getElementById('income').textContent = Player.income;
    document.getElementById('savings-rate').textContent = (Player.savingsRate * 100).toFixed(2) + '%';
    document.getElementById('expense-rate').textContent = (Player.expenseRate * 100).toFixed(2) + '%';
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('player-age').textContent = Player.age;
}

function updateBudgetAttributesUI() {
    document.getElementById('housing-allocation').textContent = budgetCategories.housing;
    document.getElementById('education-allocation').textContent = budgetCategories.education;
    document.getElementById('family-allocation').textContent = budgetCategories.family;
    document.getElementById('transportation-allocation').textContent = budgetCategories.transportation;
    document.getElementById('discretionary-allocation').textContent = budgetCategories.discretionary;
    document.getElementById('savings-allocation').textContent = budgetCategories.savings;
    document.getElementById('homeDebtRepayment-allocation').textContent = budgetCategories.homeDebtRepayment;
}

function toggleBudgetUI() {
    let budgetUI = document.getElementById('budget-ui');
    let toggleButton = document.getElementById('toggle-budget-button');
    
    if (budgetUI.style.display === 'none' || budgetUI.style.display === '') {
        budgetUI.style.display = 'block';
        toggleButton.textContent = 'Hide Budget';
    } else {
        budgetUI.style.display = 'none';
        toggleButton.textContent = 'Show Budget';
    }
}

function hideChoices() {
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('choice3').style.display = 'none';
    document.getElementById('event-description').textContent = 'No events triggered yet.';
}

// Add interactivity to UI

window.onload = function() {
    let bootScreen = document.getElementById('boot-screen');
    let startScreen = document.getElementById('start-screen');
    
    // Play Windows 98 startup sound
    let startupSound = new Audio('assets/sounds/Windows 98 Startup Sound.mp3');
    startupSound.play();

    // Hide boot screen after animation completes
    setTimeout(function() {
        bootScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }, 5000);
};

function closeWindow(id) {
    let element = document.getElementById(id);
    element.classList.add('window-close');
    setTimeout(() => {
        element.style.display = 'none';
    }, 500); // Match the animation duration
}

function showBSOD() {
    document.getElementById('bsod-screen').style.display = 'block';
    document.body.onkeydown = function() {
        document.getElementById('bsod-screen').style.display = 'none';
    };
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('milestone-event-screen').style.display = 'block';
}

function submitBudget() {
    document.getElementById('budget-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
}

// Budget UI show/hide

function showBudgetUI() {
    document.getElementById('budget-ui').style.display = 'block';
}

function hideBudgetUI() {
    document.getElementById('budget-ui').style.display = 'none';
}