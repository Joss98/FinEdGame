// Contains logic for life events, including event generation and impact on the Player object.
// Scope:
//  - Define structure of life events
//  - Implement functions to trigger and process events




// Contextual milestone events
const milestoneEvents = [
    {
        name: "Choosing Post-Secondary Education",
        year: 1,  // Game Year 1 corresponds to Player Age 19
        description: "You must decide on your educational path.",
        choices: {
            "Attend University (undergraduate and graduate school)": function() {
                Player.isStudent = true;
                Player.educationLevel = "university";
            },
            "Attend CEGEP alone": function() {
                Player.isStudent = true;
                Player.educationLevel = "cegep";
            },
            "Attend Vocational Training": function() {
                Player.isStudent; // Immediate income from vocational training
                Player.isWorking = true;
            }
        },
        prerequisites: function() {
            return true; // Applies to all players
        }
    },
    {
        name: "Student Loan Decision",
        year: 2,  // Game Year 2 corresponds to Player Age 20
        description: "You need to decide how to finance your education.",
        choices: {
            "Take Out Student Loans": function() {
                Player.hasStudentLoans = true;
                Player.educationDebt += 20000; // Student debt
                Player.isGraduate = true;
            },
            "Pay as You Go": function() {
                Player.hasStudentLoans = false;
                Player.educationDebt = 5000; // Smaller amount of student debt
            }
        },
        prerequisites: function() {
            return Player.isStudent; // Only if player is a student
        }
    },
    {
        name: "First Full-Time Job",
        year: 4,  // Game Year 4 corresponds to Player Age 22
        description: "You're entering the workforce full-time. How will you start your career?",
        choices: {
            "Corporate Job": function() {
                Player.hasCorporateJob = true;
                Player.isWorking = true;
            },
            "Small Business": function() {
                Player.hasSmallBusiness = true;
                Player.isWorking = true;
            },
            "Non-Profit or Public Sector": function() {
                Player.hasPublicSectorJob = true;
                Player.isWorking = true;
            }
        },
        prerequisites: function() {
            return Player.isGraduate || Player.isWorking; // Applies to those who completed education or started working
        }
    },
    {
        name: "Marriage or Partnership",
        year: 7,  // Game Year 7 corresponds to Player Age 25
        description: "You have the opportunity to marry or enter a long-term partnership. How do you proceed?",
        choices: {
            "Get Married": function() {
                Player.isMarried = true;
                Player.dualIncome = true;
            },
            "Stay Single": function() {
                Player.isMarried = false;
                Player.dualIncome = false;
            }
        },
        prerequisites: function() {
            return !Player.isMarried; // Only if the player is not already married
        }
    },
    {
        name: "Children or Childfree",
        year: 8,  // Game Year 8 corresponds to Player Age 26
        description: "Do you have children or remain childfree?",
        choices: {
            "Have Children": function() {
                Player.hasChildren = true;
            },
            "Remain Childfree": function() {
                Player.hasChildren = false;
            }
        },
        prerequisites: function() {
            return !Player.hasChildren; // Only if the player does not already have children
        }
    },
    {
        name: "Investment Opportunity",
        year: 10,  // Game Year 10 corresponds to Player Age 28
        description: "An old friend presents you with an investment opportunity in their startup. Do you take the risk?",
        choices: {
            "Invest": function() {
                Player.startupInvestment = true;
            },
            "Play it Safe": function() {
                Player.startupInvestment = false;
            }
        },
        prerequisites: function() {
            return Player.netWorth > 30000; // Only if the player has sufficient savings
        }
    },
    {
        name: "Home Purchase Decision",
        year: 11,  // Game Year 11 corresponds to Player Age 29
        description: "You're considering buying your first home. Do you go for it?",
        choices: {
            "Buy a Home": function() {
                Player.hasHome = true;
                Player.homeDebt = 50000;
            },
            "Continue Renting": function() {
                Player.hasHome = false;
            }
        },
        prerequisites: function() {
            return !Player.hasHome; // Only if the player doesn't already own a home and has sufficient savings
        }
    },
    {
        name: "Career Advancement",
        year: 12,  // Game Year 12 corresponds to Player Age 30
        description: "You have the chance to advance in your career, but it may require additional effort or relocation.",
        choices: {
            "Pursue Promotion": function() {
                Player.income += 10000;
            },
            "Stay in Current Role": function() {
                Player.income += 5000;
            }
        },
        prerequisites: function() {
            return Player.isWorking; // Only if the player is employed
        }
    },
    {
        name: "Starting a Business",
        year: 14,  // Game Year 14 corresponds to Player Age 32
        description: "You have an opportunity to start your own business. Will you take the risk?",
        choices: {
            "Start Business": function() {
                Player.hasSmallBusiness = true;
            },
            "Stay Employed": function() {
                // No changes
            }
        },
        prerequisites: function() {
            return Player.netWorth > 50000 && !Player.hasSmallBusiness; // Only if the player has sufficient savings and doesn't already have a small business
        }
    },
    {
        name: "Unexpected Windfall",
        year: 17,  // Game Year 17 corresponds to Player Age 35
        description: "You receive an unexpected windfall (e.g., inheritance, lottery win). How do you manage it?",
        choices: {
            "Invest the Windfall": function() {
                Player.windfallDecision = "invest";
            },
            "Spend the Windfall": function() {
                Player.windfallDecision = "spend";
            }
        },
        prerequisites: function() {
            return true; // Applies to all players
        }
    },
    {
        name: "Home Renovation",
        year: 19,  // Game Year 19 corresponds to Player Age 37
        description: "Your home is in need of renovation. Do you invest in it?",
        choices: {
            "Full Renovation": function() {
                Player.renovationDecision = "full reno";
            },
            "Minor Repairs": function() {
                Player.renovationDecision = "minor repairs";
            }
        },
        prerequisites: function() {
            return Player.hasHome; // Only if the player owns a home
        }
    },
    {
        name: "Mid-Career Assessment",
        year: 22,  // Game Year 22 corresponds to Player Age 40
        description: "You've reached the midpoint of your career. How do you plan to move forward?",
        choices: {
            "Pursue New Opportunities": function() {
                Player.income += 15000; // Increase income
            },
            "Continue in Current Role": function() {
                Player.income += 7000; // Moderate income increase
            }
        },
        prerequisites: function() {
            return Player.isWorking; // Only if the player is employed
        }
    },
    {
        name: "Divorce or Separation",
        year: 24,  // Game Year 24 corresponds to Player Age 42
        description: "Your relationship is strained. Your spouse has cheated on you. Do you pursue a divorce or work things out?",
        choices: {
            "Divorce": function() {
                Player.divorceDecision = "divorce";
                Player.isMarried = false;
            },
            "Stay Together": function() {
                Player.divorceDecision = "stay married";
                Player.isMarried = true;
            }
        },
        prerequisites: function() {
            return Player.isMarried; // Only if the player is married
        }
    },
    {
        name: "Supporting Ageing Parents",
        year: 27,  // Game Year 27 corresponds to Player Age 45
        description: "Your ageing parents need financial support. What do you do?",
        choices: {
            "Provide Financial Support": function() {
                Player.parentDecision = "support";
            },
            "Ignore Them": function() {
                Player.parentDecision = "ignore";
            }
        },
        prerequisites: function() {
            return Player.parentsAge >= 65; // Only if the player's parents are elderly
        }
    },
    {
        name: "College Education for Children",
        year: 30,  // Game Year 30 corresponds to Player Age 48
        description: "Your children are ready for college. Will you contribute to their education costs?",
        choices: {
            "Pay for Education": function() {
                Player.childrenCollegeDecision = "pay for children's college education";
            },
            "Encourage Student Loans": function() {
                Player.childrenCollegeDecision = "children take out student loans";
            }
        },
        prerequisites: function() {
            return Player.hasChildren; // Only if the player has children
        }
    },
    {
        name: "Retirement Planning",
        year: 32,  // Game Year 32 corresponds to Player Age 50
        description: "How will you plan for your retirement?",
        choices: {
            "Increase Savings Rate": function() {
                Player.initialRetirementPlan = "increase saving";
            },
            "Maintain Current Lifestyle": function() {
                Player.initialRetirementPlan = "maintain current lifestyle";
            }
        },
        prerequisites: function() {
            return Player.age >= 50 && Player.isWorking; // Only if the player is 50 years old or older and still working
        }
    },
    {
        name: "Empty Nest Syndrome",
        year: 35,  // Game Year 35 corresponds to Player Age 53
        description: "Your children have left home. How do you adapt?",
        choices: {
            "Downsize Home": function() {
                Player.emptyNestDecision = "downsize";
            },
            "Maintain Current Lifestyle": function() {
                Player.emptyNestDecision = "maintain current lifestyle";
            }
        },
        prerequisites: function() {
            return Player.hasChildren && Player.childrenAge >= 18; // Only if the player's children are adults
        }
    },
    {
        name: "Early Retirement Consideration",
        year: 37,  // Game Year 37 corresponds to Player Age 55
        description: "You're considering early retirement. Do you retire now or continue working?",
        choices: {
            "Retire Now": function() {
                Player.earlyRetirementDecision = "retire early at age 55";
                Player.isRetired =true;
            },
            "Continue Working": function() {
                Player.earlyRetirementDecision = "continue working";
            }
        },
        prerequisites: function() {
            return Player.age >= 55; // Only if the player is 55 years old or older
        }
    },
    {
        name: "Final Retirement Decision",
        year: 45,  // Game Year 45 corresponds to Player Age 63
        description: "It's time to make your final retirement decision.",
        choices: {
            "Retire and Stop Working": function() {
                Player.finalRetirementDecision = "retire and stop working";
            },
            "Retire and Work Part-Time": function() {
                Player.finalRetirementDecision = "retire and work part time"
            }
        },
        prerequisites: function() {
            return Player.age >= 63 && !Player.isRetired; // Only if the player is 63 years old or older and not already retired
        }
    }
];

// TODO: disruptiveEvents need a lot of fine tuning for game balance purposes. Do not use in main gameplay loop until reworked and tested with players.
/* const disruptiveEvents = [
    // Positive Disruptive Events
    {
        name: "Unexpected Inheritance",
        description: "You have received an unexpected inheritance.",
        impact: function() {
            Player.netWorth += 50000; // Example increase in net worth
            Player.interestRate += 0.02; // Potential increase in interest rate if invested
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Stock Market Boom",
        description: "The stock market is booming! Your investments have paid off.",
        impact: function() {
            Player.netWorth += 40000; // Increase in net worth from investments
            Player.interestRate += 0.01; // Increase in interest rate
            Player.expenseRate += 0.05; // Possible lifestyle inflation
        },
        prerequisites: function() {
            return Player.netWorth > 50000; // Only if the player has investments
        }
    },
    {
        name: "Career Windfall",
        description: "You receive a lucrative job offer or promotion.",
        impact: function() {
            Player.income += 20000; // Significant increase in income
            Player.savingsRate += 0.1; // Increase in savings rate
        },
        prerequisites: function() {
            return Player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "High-Yield Investment",
        description: "One of your investments has yielded high returns.",
        impact: function() {
            Player.netWorth += 30000; // Increase in net worth from successful investment
            Player.interestRate += 0.02; // Increase in interest rate
        },
        prerequisites: function() {
            return Player.netWorth > 50000; // Only if the player has sufficient savings or investments
        }
    },
    {
        name: "Debt Forgiveness",
        description: "You receive debt forgiveness or loan repayment assistance.",
        impact: function() {
            Player.expenseRate -= 0.1; // Decrease in expenses due to reduced debt
            Player.netWorth += 20000; // Increase in net worth due to reduced liabilities
        },
        prerequisites: function() {
            return Player.netWorth < 50000; // Only if the player has debt or low net worth
        }
    },
    {
        name: "Discovery of a Passion or Skill",
        description: "You discover a new passion or skill that you can monetize.",
        impact: function() {
            Player.income += 10000; // Increase in income if monetized
            Player.happiness += 10; // Increase in happiness (if tracked)
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    // Negative Disruptive Events
    {
        name: "Economic Recession",
        description: "The economy is in a recession. Your income and investments are affected.",
        impact: function() {
            Player.income -= 10000; // Decrease in income
            Player.netWorth -= 20000; // Decrease in net worth due to investment losses
            Player.expenseRate += 0.05; // Increase in expenses due to inflation
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Market Crash",
        description: "The stock market has crashed, and your investments have taken a hit.",
        impact: function() {
            Player.netWorth -= 30000; // Significant decrease in net worth
            Player.interestRate -= 0.02; // Potential decrease in interest rate
        },
        prerequisites: function() {
            return Player.netWorth > 50000; // Only if the player has significant investments
        }
    },
    {
        name: "Job Loss",
        description: "You have unexpectedly lost your job.",
        impact: function() {
            Player.income = 0; // Immediate loss of income
            Player.expenseRate += 0.1; // Increase in expenses due to job search or lack of income
            Player.savingsRate -= 0.05; // Decrease in savings rate
        },
        prerequisites: function() {
            return Player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "Natural Disaster",
        description: "A natural disaster has struck, causing damage to your property.",
        impact: function() {
            Player.netWorth -= 20000; // Decrease in net worth due to property damage
            Player.expenseRate += 0.05; // Increase in expenses for repairs
            Player.homeValue -= 10000; // Decrease in home value (if tracked)
        },
        prerequisites: function() {
            return Player.hasHome; // Only if the player owns a home
        }
    },
    {
        name: "Unexpected Legal Issue",
        description: "You are facing an unexpected legal issue that requires financial attention.",
        impact: function() {
            Player.netWorth -= 15000; // Decrease in net worth due to legal fees
            Player.expenseRate += 0.05; // Increase in expenses due to ongoing legal costs
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Family Emergency",
        description: "A family emergency requires you to provide financial support.",
        impact: function() {
            Player.netWorth -= 10000; // Decrease in net worth due to financial support
            Player.expenseRate += 0.05; // Increase in expenses
            Player.yearsPlayed += 1; // Delay in progress (if applicable)
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Unexpected Birth of a Child",
        description: "You unexpectedly have a child, leading to increased expenses.",
        impact: function() {
            Player.expenseRate += 0.2; // Significant increase in expenses due to child-related costs
            Player.savingsRate -= 0.05; // Decrease in savings rate
            Player.hasChildren = true; // The player now has children
        },
        prerequisites: function() {
            return !Player.hasChildren; // Only if the player does not already have children
        }
    },
    {
        name: "Identity Theft or Fraud",
        description: "You have been a victim of identity theft or fraud, impacting your finances.",
        impact: function() {
            Player.netWorth -= 15000; // Decrease in net worth due to fraud recovery costs
            Player.expenseRate += 0.05; // Increase in expenses due to recovery efforts
            Player.interestRate -= 0.01; // Potential decrease in interest rate if credit is impacted
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    // Mixed Disruptive Events (Positive or Negative Depending on Choices)
    {
        name: "Unexpected Relocation",
        description: "You have the opportunity to relocate, which may affect your finances.",
        impact: function() {
            let relocationOutcome = Math.random(); // Random outcome
            if (relocationOutcome > 0.5) {
                Player.income += 15000; // Increase in income if it's a job promotion
                Player.expenseRate += 0.1; // Increase in expenses due to moving costs
            } else {
                Player.netWorth -= 10000; // Decrease in net worth due to moving costs
            }
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Inheritance with Conditions",
        description: "You have received an inheritance, but there are conditions attached.",
        impact: function() {
            Player.netWorth += 50000; // Increase in net worth due to inheritance
            let conditionOutcome = Math.random(); // Random outcome
            if (conditionOutcome > 0.5) {
                Player.expenseRate += 0.1; // Increase in expenses due to conditions (e.g., starting a business)
                Player.savingsRate -= 0.05; // Decrease in savings rate
            } else {
                Player.income += 10000; // Increase in income if the condition leads to business success
            }
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    },
    {
        name: "Career Change Due to Automation/Industry Change",
        description: "Your industry is changing due to automation, forcing a career change.",
        impact: function() {
            Player.income -= 10000; // Initial decrease in income
            let retrainOutcome = Math.random(); // Random outcome
            if (retrainOutcome > 0.5) {
                Player.income += 20000; // Increase in income after retraining or moving to a high-demand field
                Player.expenseRate += 0.1; // Increase in expenses due to retraining costs
            } else {
                Player.income += 5000; // Smaller increase in income
            }
        },
        prerequisites: function() {
            return true; // Random chance for any player
        }
    }
]; */

