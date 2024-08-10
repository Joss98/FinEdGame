// Contains all financial functions, such as those for annuities, taxes, and interest.
// Scope:
//  - House refactored investmentGrowthCalculator.py code from an old personal project
//  - Provide utility functions that can be reused across the game




// Calculate the future value of an annuity
function calculateFutureValueAnnuity(P, r, n) {
    return P * (((1 + r) ** n - 1) / r);
}