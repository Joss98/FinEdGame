// Contains logic for life events, including event generation and impact on the Player object.
// Scope:
//  - Define structure of life events
//  - Implement functions to trigger and process events




// Contextual milestone events
const milestoneEvents = [
    {
        name: "Choosing Post-Secondary Education",
        year: 0,  // Game Year 0 corresponds to Player Age 18
        description: "You must decide on your educational path.",
        choices: {
            "Attend University (undergraduate and graduate school)": function(player) {
                player.netWorth -= 30000; // Example tuition cost
                player.incomePotential += 50000; // Increase future income potential
            },
            "Attend CEGEP alone": function(player) {
                player.netWorth -= 10000; // Lower tuition cost
                player.incomePotential += 25000; // Moderate increase in future income potential
            },
            "Start Working Full-Time": function(player) {
                player.income += 25000; // Immediate income from full-time job
            }
        },
        prerequisites: function(player) {
            return true; // Applies to all players
        }
    },
    {
        name: "Student Loan Decision",
        year: 1,  // Game Year 1 corresponds to Player Age 19
        description: "You need to decide how to finance your education.",
        choices: {
            "Take Out Student Loans": function(player) {
                player.netWorth -= 20000; // Loan debt
                player.incomePotential += 50000; // Increase future income potential
            },
            "Pay as You Go": function(player) {
                player.netWorth -= 5000; // Slower increase due to part-time work
            }
        },
        prerequisites: function(player) {
            return player.isStudent; // Only if player is a student
        }
    },
    {
        name: "First Full-Time Job",
        year: 4,  // Game Year 4 corresponds to Player Age 22
        description: "You're entering the workforce full-time. How will you start your career?",
        choices: {
            "Corporate Job": function(player) {
                player.income += 50000;
                player.expenseRate += 0.1; // Lifestyle inflation
            },
            "Small Business": function(player) {
                player.income += 30000; // Variable income
                player.netWorth += Math.random() * 20000 - 10000; // Potential for gain or loss
            },
            "Non-Profit or Public Sector": function(player) {
                player.income += 35000;
                player.savingsRate += 0.05; // Higher savings rate due to stable expenses
            }
        },
        prerequisites: function(player) {
            return player.isGraduate || player.isWorking; // Applies to those who completed education or started working
        }
    },
    {
        name: "Marriage or Partnership",
        year: 7,  // Game Year 7 corresponds to Player Age 25
        description: "You have the opportunity to marry or enter a long-term partnership. How do you proceed?",
        choices: {
            "Get Married": function(player) {
                player.netWorth += 20000; // Dual incomes
                player.expenseRate += 0.2; // Family expenses
                player.isMarried = true;
            },
            "Stay Single": function(player) {
                // No changes
            }
        },
        prerequisites: function(player) {
            return !player.isMarried; // Only if the player is not already married
        }
    },
    {
        name: "Investment Opportunity",
        year: 10,  // Game Year 10 corresponds to Player Age 28
        description: "You have an opportunity to invest in a promising venture. Do you take the risk?",
        choices: {
            "Invest": function(player) {
                let investmentOutcome = Math.random(); // Random outcome
                if (investmentOutcome > 0.5) {
                    player.netWorth += 20000; // Successful investment
                } else {
                    player.netWorth -= 10000; // Failed investment
                }
            },
            "Play it Safe": function(player) {
                // No changes
            }
        },
        prerequisites: function(player) {
            return player.netWorth > 30000; // Only if the player has sufficient savings
        }
    },
    {
        name: "Home Purchase Decision",
        year: 11,  // Game Year 11 corresponds to Player Age 29
        description: "You're considering buying your first home. Do you go for it?",
        choices: {
            "Buy a Home": function(player) {
                player.netWorth -= 50000; // Down payment
                player.expenseRate += 0.2; // Mortgage expenses
                player.hasHome = true;
            },
            "Continue Renting": function(player) {
                // No changes
            }
        },
        prerequisites: function(player) {
            return !player.hasHome && player.netWorth > 30000; // Only if the player doesn't already own a home
        }
    },
    {
        name: "Career Advancement",
        year: 12,  // Game Year 12 corresponds to Player Age 30
        description: "You have the chance to advance in your career, but it may require additional effort or relocation.",
        choices: {
            "Pursue Promotion": function(player) {
                player.income += 10000; // Increase income
                player.expenseRate += 0.1; // Relocation costs
            },
            "Stay in Current Role": function(player) {
                player.income += 5000; // Moderate increase in income
            }
        },
        prerequisites: function(player) {
            return player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "Starting a Business",
        year: 14,  // Game Year 14 corresponds to Player Age 32
        description: "You have an opportunity to start your own business. Will you take the risk?",
        choices: {
            "Start Business": function(player) {
                player.netWorth -= 30000; // Startup costs
                let businessOutcome = Math.random(); // Random outcome
                if (businessOutcome > 0.5) {
                    player.income += 40000; // Successful business
                } else {
                    player.income -= 10000; // Failed business
                }
            },
            "Stay Employed": function(player) {
                // No changes
            }
        },
        prerequisites: function(player) {
            return player.netWorth > 50000; // Only if the player has sufficient savings
        }
    },
    {
        name: "Unexpected Windfall",
        year: 17,  // Game Year 17 corresponds to Player Age 35
        description: "You receive an unexpected windfall (e.g., inheritance, lottery win). How do you manage it?",
        choices: {
            "Invest the Windfall": function(player) {
                player.netWorth += 50000; // Increase net worth
                player.interestRate += 0.02; // Increase in interest rate from investments
            },
            "Spend the Windfall": function(player) {
                player.expenseRate += 0.2; // Increase in spending
                player.happiness += 10; // Temporary increase in happiness (if you track happiness)
            }
        },
        prerequisites: function(player) {
            return true; // Applies to all players
        }
    },
    {
        name: "Home Renovation",
        year: 19,  // Game Year 19 corresponds to Player Age 37
        description: "Your home is in need of renovation. Do you invest in it?",
        choices: {
            "Full Renovation": function(player) {
                player.netWorth -= 30000; // Cost of renovation
                player.homeValue += 50000; // Increase in home value
            },
            "Minor Repairs": function(player) {
                player.netWorth -= 10000; // Lower cost
                player.homeValue += 20000; // Smaller increase in home value
            }
        },
        prerequisites: function(player) {
            return player.hasHome; // Only if the player owns a home
        }
    },
    {
        name: "Mid-Career Assessment",
        year: 22,  // Game Year 22 corresponds to Player Age 40
        description: "You've reached the midpoint of your career. How do you plan to move forward?",
        choices: {
            "Pursue New Opportunities": function(player) {
                player.income += 15000; // Increase income
                player.expenseRate += 0.1; // Potentially higher costs with new opportunities
            },
            "Continue in Current Role": function(player) {
                player.income += 7000; // Moderate income increase
            }
        },
        prerequisites: function(player) {
            return player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "Divorce or Separation",
        year: 24,  // Game Year 24 corresponds to Player Age 42
        description: "Your relationship is strained. Do you pursue a divorce or work things out?",
        choices: {
            "Divorce": function(player) {
                player.netWorth -= 40000; // Asset division and legal fees
                player.expenseRate += 0.2; // Increase in expenses due to separation
                player.isMarried = false;
            },
            "Stay Together": function(player) {
                player.savingsRate += 0.05; // Increase in savings rate if relationship improves
            }
        },
        prerequisites: function(player) {
            return player.isMarried; // Only if the player is married
        }
    },
    {
        name: "Supporting Aging Parents",
        year: 27,  // Game Year 27 corresponds to Player Age 45
        description: "Your aging parents need financial support. How do you respond?",
        choices: {
            "Provide Support": function(player) {
                player.netWorth -= 20000; // Cost of support
                player.expenseRate += 0.1; // Increase in expenses
            },
            "Seek External Help": function(player) {
                player.netWorth -= 10000; // Cost of external help
            }
        },
        prerequisites: function(player) {
            return player.parentsAge >= 75; // Only if the player's parents are elderly
        }
    },
    {
        name: "College Education for Children",
        year: 30,  // Game Year 30 corresponds to Player Age 48
        description: "Your children are ready for college. Will you contribute to their education costs?",
        choices: {
            "Pay for Education": function(player) {
                player.netWorth -= 50000; // Cost of college education
                player.savingsRate += 0.05; // Increase in savings rate if children later contribute to household
            },
            "Encourage Student Loans": function(player) {
                // No immediate impact on net worth
                // Possible future impact on income if children are burdened with debt
            }
        },
        prerequisites: function(player) {
            return player.hasChildren; // Only if the player has children
        }
    },
    {
        name: "Retirement Planning",
        year: 32,  // Game Year 32 corresponds to Player Age 50
        description: "It's time to start thinking seriously about retirement. How will you plan for it?",
        choices: {
            "Aggressive Saving": function(player) {
                player.savingsRate += 0.15; // Significant increase in savings rate
                player.expenseRate -= 0.1; // Decrease in expenses to save more
            },
            "Maintain Current Lifestyle": function(player) {
                // Stable savings rate and expense rate
            }
        },
        prerequisites: function(player) {
            return player.age >= 50; // Only if the player is 50 years old or older
        }
    },
    {
        name: "Empty Nest Syndrome",
        year: 35,  // Game Year 35 corresponds to Player Age 53
        description: "Your children have left home. How do you adapt?",
        choices: {
            "Downsize Home": function(player) {
                player.netWorth += 30000; // Increase in net worth if selling property
                player.expenseRate -= 0.15; // Decrease in expenses due to downsizing
            },
            "Maintain Current Lifestyle": function(player) {
                // Stable expense rate, no change in net worth
            }
        },
        prerequisites: function(player) {
            return player.hasChildren && player.childrenAge >= 18; // Only if the player's children are adults
        }
    },
    {
        name: "Early Retirement Consideration",
        year: 37,  // Game Year 37 corresponds to Player Age 55
        description: "You're considering early retirement. Do you retire now or continue working?",
        choices: {
            "Retire Now": function(player) {
                player.income = 0; // Stop earning income
                player.savingsRate += 0.1; // Increase in savings rate due to reduced expenses
                player.netWorth -= 20000; // Potential drawdown on net worth
            },
            "Continue Working": function(player) {
                player.income += 10000; // Increase in income
                player.netWorth += 5000; // Increase in net worth
            }
        },
        prerequisites: function(player) {
            return player.age >= 55; // Only if the player is 55 years old or older
        }
    },
    {
        name: "Final Retirement Decision",
        year: 45,  // Game Year 45 corresponds to Player Age 63
        description: "It's time to make your final retirement decision.",
        choices: {
            "Retire": function(player) {
                player.income = 0; // Stop earning income
                player.expenseRate -= 0.2; // Decrease in expenses during retirement
                player.netWorth -= 30000; // Potential drawdown on net worth
            },
            "Work Part-Time": function(player) {
                player.income -= 20000; // Moderate decrease in income
                player.savingsRate += 0.05; // Increase in savings rate
            }
        },
        prerequisites: function(player) {
            return player.age >= 63; // Only if the player is 63 years old or older
        }
    }
];

const disruptiveEvents = [
    // Positive Disruptive Events
    {
        name: "Unexpected Inheritance",
        description: "You have received an unexpected inheritance.",
        impact: function(player) {
            player.netWorth += 50000; // Example increase in net worth
            player.interestRate += 0.02; // Potential increase in interest rate if invested
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Stock Market Boom",
        description: "The stock market is booming! Your investments have paid off.",
        impact: function(player) {
            player.netWorth += 40000; // Increase in net worth from investments
            player.interestRate += 0.01; // Increase in interest rate
            player.expenseRate += 0.05; // Possible lifestyle inflation
        },
        prerequisites: function(player) {
            return player.netWorth > 50000; // Only if the player has investments
        }
    },
    {
        name: "Career Windfall",
        description: "You receive a lucrative job offer or promotion.",
        impact: function(player) {
            player.income += 20000; // Significant increase in income
            player.savingsRate += 0.1; // Increase in savings rate
        },
        prerequisites: function(player) {
            return player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "High-Yield Investment",
        description: "One of your investments has yielded high returns.",
        impact: function(player) {
            player.netWorth += 30000; // Increase in net worth from successful investment
            player.interestRate += 0.02; // Increase in interest rate
        },
        prerequisites: function(player) {
            return player.netWorth > 50000; // Only if the player has sufficient savings or investments
        }
    },
    {
        name: "Debt Forgiveness",
        description: "You receive debt forgiveness or loan repayment assistance.",
        impact: function(player) {
            player.expenseRate -= 0.1; // Decrease in expenses due to reduced debt
            player.netWorth += 20000; // Increase in net worth due to reduced liabilities
        },
        prerequisites: function(player) {
            return player.netWorth < 50000; // Only if the player has debt or low net worth
        }
    },
    {
        name: "Discovery of a Passion or Skill",
        description: "You discover a new passion or skill that you can monetize.",
        impact: function(player) {
            player.income += 10000; // Increase in income if monetized
            player.happiness += 10; // Increase in happiness (if tracked)
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    // Negative Disruptive Events
    {
        name: "Economic Recession",
        description: "The economy is in a recession. Your income and investments are affected.",
        impact: function(player) {
            player.income -= 10000; // Decrease in income
            player.netWorth -= 20000; // Decrease in net worth due to investment losses
            player.expenseRate += 0.05; // Increase in expenses due to inflation
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Market Crash",
        description: "The stock market has crashed, and your investments have taken a hit.",
        impact: function(player) {
            player.netWorth -= 30000; // Significant decrease in net worth
            player.interestRate -= 0.02; // Potential decrease in interest rate
        },
        prerequisites: function(player) {
            return player.netWorth > 50000; // Only if the player has significant investments
        }
    },
    {
        name: "Job Loss",
        description: "You have unexpectedly lost your job.",
        impact: function(player) {
            player.income = 0; // Immediate loss of income
            player.expenseRate += 0.1; // Increase in expenses due to job search or lack of income
            player.savingsRate -= 0.05; // Decrease in savings rate
        },
        prerequisites: function(player) {
            return player.income > 0; // Only if the player is employed
        }
    },
    {
        name: "Natural Disaster",
        description: "A natural disaster has struck, causing damage to your property.",
        impact: function(player) {
            player.netWorth -= 20000; // Decrease in net worth due to property damage
            player.expenseRate += 0.05; // Increase in expenses for repairs
            player.homeValue -= 10000; // Decrease in home value (if tracked)
        },
        prerequisites: function(player) {
            return player.hasHome; // Only if the player owns a home
        }
    },
    {
        name: "Unexpected Legal Issue",
        description: "You are facing an unexpected legal issue that requires financial attention.",
        impact: function(player) {
            player.netWorth -= 15000; // Decrease in net worth due to legal fees
            player.expenseRate += 0.05; // Increase in expenses due to ongoing legal costs
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Family Emergency",
        description: "A family emergency requires you to provide financial support.",
        impact: function(player) {
            player.netWorth -= 10000; // Decrease in net worth due to financial support
            player.expenseRate += 0.05; // Increase in expenses
            player.yearsPlayed += 1; // Delay in progress (if applicable)
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Unexpected Birth of a Child",
        description: "You unexpectedly have a child, leading to increased expenses.",
        impact: function(player) {
            player.expenseRate += 0.2; // Significant increase in expenses due to child-related costs
            player.savingsRate -= 0.05; // Decrease in savings rate
            player.hasChildren = true; // The player now has children
        },
        prerequisites: function(player) {
            return !player.hasChildren; // Only if the player does not already have children
        }
    },
    {
        name: "Identity Theft or Fraud",
        description: "You have been a victim of identity theft or fraud, impacting your finances.",
        impact: function(player) {
            player.netWorth -= 15000; // Decrease in net worth due to fraud recovery costs
            player.expenseRate += 0.05; // Increase in expenses due to recovery efforts
            player.interestRate -= 0.01; // Potential decrease in interest rate if credit is impacted
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    // Mixed Disruptive Events (Positive or Negative Depending on Choices)
    {
        name: "Unexpected Relocation",
        description: "You have the opportunity to relocate, which may affect your finances.",
        impact: function(player) {
            let relocationOutcome = Math.random(); // Random outcome
            if (relocationOutcome > 0.5) {
                player.income += 15000; // Increase in income if it's a job promotion
                player.expenseRate += 0.1; // Increase in expenses due to moving costs
            } else {
                player.netWorth -= 10000; // Decrease in net worth due to moving costs
            }
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Inheritance with Conditions",
        description: "You have received an inheritance, but there are conditions attached.",
        impact: function(player) {
            player.netWorth += 50000; // Increase in net worth due to inheritance
            let conditionOutcome = Math.random(); // Random outcome
            if (conditionOutcome > 0.5) {
                player.expenseRate += 0.1; // Increase in expenses due to conditions (e.g., starting a business)
                player.savingsRate -= 0.05; // Decrease in savings rate
            } else {
                player.income += 10000; // Increase in income if the condition leads to business success
            }
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    },
    {
        name: "Career Change Due to Automation/Industry Change",
        description: "Your industry is changing due to automation, forcing a career change.",
        impact: function(player) {
            player.income -= 10000; // Initial decrease in income
            let retrainOutcome = Math.random(); // Random outcome
            if (retrainOutcome > 0.5) {
                player.income += 20000; // Increase in income after retraining or moving to a high-demand field
                player.expenseRate += 0.1; // Increase in expenses due to retraining costs
            } else {
                player.income += 5000; // Smaller increase in income
            }
        },
        prerequisites: function(player) {
            return true; // Random chance for any player
        }
    }
];

