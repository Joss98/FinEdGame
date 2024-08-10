// Contains all financial functions, such as those for annuities, taxes, and interest.
// Scope:
//  - House refactored investmentGrowthCalculator.py code from an old personal project
//  - Provide utility functions that can be reused across the game




// Calculate the future value of an annuity
function calculateFutureValueAnnuity(P, r, n) {
    return P * (((1 + r) ** n - 1) / r);
}

// Calculate Canadian federal tax based on income

function calculateFederalTax(income) {
    const initialBrackets = [53359, 106717, 165430, 228449];
    const initialRates = [0.15, 0.205, 0.26, 0.29, 0.33];

    let tax = o;
    if (income <= initialBrackets[0]) {
        tax = income * initialRates[0];
    } else if (income <= initialBrackets[1]) {
        tax = initialBrackets[0] * initialRates[0] + (income - initialBrackets[0]) * initialRates[1];
    } else if (income <= initialBrackets[2]) {
        tax = initialBrackets[0] * initialRates[0] + (initialBrackets[1] - initialBrackets[0]) * initialRates[1] + (income - initialBrackets[1]) * initialRates[2];
    } else if (income <= initialBrackets[3]) {
        tax = initialBrackets[0] * initialRates[0] + (initialBrackets[1] - initialBrackets[0]) * initialRates[1] + (initialBrackets[2] - initialBrackets[1]) * initialRates[2] + (income - initialBrackets[2]) * initialRates[3];
    } else {
        tax = initialBrackets[0] * initialRates[0] + (initialBrackets[1] - initialBrackets[0]) * initialRates[1] + (initialBrackets[2] - initialBrackets[1]) * initialRates[2] + (initialBrackets[3] - initialBrackets[2]) * initialRates[3] + (income - initialBrackets[3]) * initialRates[4];
    }

    return tax;
}

// Calculate Quebec provincial tax based on income

function calculateProvincialTax(income) {
    const initialBrackets = [51780, 103545, 126000];
    const initialRates = [0.14, 0.19, 0.24, 0.2575];

    let tax = 0;
    if (income <= initialBrackets[0]) {
        tax = income * initialRates[0];
    } else if (income <= initialBrackets[1]) {
        tax = initialBrackets[0] * initialRates[0] + (income - initialBrackets[0]) * initialRates[1];
    } else if (income <= initialBrackets[2]) {
        tax = initialBrackets[0] * initialRates[0] + (initialBrackets[1] - initialBrackets[0]) * initialRates[1] + (income - initialBrackets[1]) * initialRates[2];
    } else {
        tax = initialBrackets[0] * initialRates[0] + (initialBrackets[1] - initialBrackets[0]) * initialRates[1] + (initialBrackets[2] - initialBrackets[1]) * initialRates[2] + (income - initialBrackets[2]) * initialRates[3];
    }

    return tax;
}

// Calculate combined federal and provincial tax
function calculateCombinedTax(income) {
    const federalTax = calculateFederalTax(income);
    const provincialTax = calculateProvincialTax(income);
    return federalTax + provincialTax;
}

/* function updatePlayerNetWorth() {
    const savings = Player.income * Player.savingsRate;
    const tax = calculate
} */