// Contains Player object definition and any related functions
// Scope:
//  - Define Player properties and methods
//  - Handle player-specific logic, such as initialising attributes based on parent choice




// Create Player object with initial variable values
const Player = {
    netWorth: 0,
    income: 0,
    savingsRate: 0,   // Consider a default 10% savings rate
    expenseRate: 0,     // Consider a default 70% of income goes to expenses
    taxRate: 0,         // Consider a default 25% tax rate
    interestRate: 0,     // Consider a default 5% annual interest rate
    yearsPlayed: 0,
    age: 18,
    futureValueAnnuity: 0,
    isStudent: false,
    educationLevel: "",
    educationDebt: 0,
    hasStudentLoans: false,
    isGraduate: false,
    hasCorporateJob: false,
    hasSmallBusiness: false,
    hasPublicSectorJob: false,
    isWorking: false,
    isMarried: false,
    dualIncome: false,
    startupInvestment: false,
    hasHome: false,
    homeDebt: 0,
    hasChildren: false,
    windfallDecision: "",
    renovationDecision: "",
    divorceDecision: "",
    childrenCollegeDecision: "",
    emptyNestDecision: "",
    earlyRetirementDecision: "",
    finalRetirementDecision: "",
    parentsAge: 0,
    childrenAge: 0,
};

// The idea here was to have the player choose a difficulty level by selecting a parent. This is scrapped for now.
/* function initialisePlayer(parentChoice) {
    switch (parentChoice) {
        case 'DualIncome':
            Player.netWorth = 10000;
            Player.income = 80000;
            Player.savingsRate = 0.1;
            Player.taxRate = calculateCombinedTax(Player.income);
            break;
        case 'SingleIncome':
            Player.netWorth = 1000;
            Player.income = 50000;
            Player.savingsRate = 0.05;
            Player.taxRate = calculateCombinedTax(Player.income);
            break;
        default:
            console.log("Invalid parent choice");
    }
} */