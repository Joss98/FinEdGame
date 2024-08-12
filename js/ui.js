// Contains user interface functions

function updateUI() {
    document.getElementById('net-worth').textContent = Player.netWorth;
    document.getElementById('income').textContent = Player.income;
    document.getElementById('savings-rate').textContent = (Player.savingsRate * 100).toFixed(2) + '%';
    document.getElementById('expense-rate').textContent = (Player.expenseRate * 100).toFixed(2) + '%';
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('player-age').textContent = Player.age;
}

function hideChoices() {
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('choice3').style.display = 'none';
    document.getElementById('event-description').textContent = 'No events triggered yet.';
}