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

function hideChoices() {
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('choice3').style.display = 'none';
    document.getElementById('event-description').textContent = 'No events triggered yet.';
}

// Budget UI

function showBudgetUI() {
    document.getElementById('budget-ui').style.display = 'block';
}

function hideBudgetUI() {
    document.getElementById('budget-ui').style.display = 'none';
}