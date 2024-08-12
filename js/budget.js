// Contains all logic related to handling the budget UI







// Define budget categories

const budgetCategories = {
    housing: 0,
    education: 0,
    family: 0,
    transportation: 0,
    discretionary: 0,
    savings: 0,
    homeDebtRepayment: 0
}

// Budget logic

let totalAllocation = 0;

function updateBudget(value, category) {
    budgetCategories[category] = parseFloat(value);
    document.getElementById(`${category}-percent`).textContent = `${value}%`;

    totalAllocation = Object.values(budgetCategories).reduce((a, b) => a + b, 0);

    if (totalAllocation > 100) {
        alert("Total allocation exceeds 100%; adjust your budget.");
        budgetCategories[category] = 100 - (totalAllocation - value);
        document.getElementById(`${category}`).value = budgetCategories[category];
        document.getElementById(`${category}-percent`).textContent = `${budgetCategories[category]}%`;
        totalAllocation = 100;
    }
}

function submitBudget() {
    if (totalAllocation < 100) {
        alert("Total allocation is less than 100%. Please allocate your entire budget.");
        return;
    }

    Player.savingsRate = budgetCategories.savings / 100;
    Player.expenseRate = (budgetCategories.housing + budgetCategories.education + budgetCategories.family + budgetCategories.transportation + budgetCategories.discretionary + budgetCategories.homeDebtRepayment) / 100;

    Player.netWorth += (Player.income * Player.savingsRate) - (Player.income * Player.expenseRate);

    Player.educationDebt -= (Player.income * (budgetCategories.education / 100));
    Player.homeDebt -= (Player.income * (budgetCategories.homeDebtRepayment / 100));

    updateUI();
}

function showBudgetUI() {
    document.getElementById('budget-ui').style.display = 'block';
}

function hideBudgetUI() {
    document.getElementById('budget-ui').style.display = 'none';
}