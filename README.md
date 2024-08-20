# Accounts Playable

"Accounts Playable" is an educational game designed to introduce young adults to foundational personal finance concepts through engaging and interactive gameplay. The name is a play on "accounts payable," reflecting the game's focus on financial literacy.

## Vision

In "Accounts Playable," players navigate life decisions over a simulated 45-year period, making choices that impact their financial outcomes. Each decision alters the player's available income pool, which must then be allocated across typical budget categories, including savings and investments.

Throughout the game, players must manage their budget to handle unexpected financial challenges and maximize their final net worth. The game continually calculates and updates the player's net worth in the background. Each decision and net worth update is logged in a semantically intelligible format for every game year.

At the end of the game, these logs are sent to a large language model (LLM) that acts as a virtual financial advisor. The LLM analyzes the player's decisions and provides qualitative feedback, along with a final net worth "score." Players are encouraged to replay the game and try to beat their previous high score. 

The game also features data visualizations that demonstrate the effects of compound interest, reinforcing key financial concepts. A help button is always available, offering explanations of unfamiliar concepts on the screen. The qualitative feedback provided by the LLM serves as both a summary and a teaching moment.

## Deployment

"Accounts Playable" is currently deployed on GitHub Pages. You can explore the game in its current form [here](https://joss98.github.io/FinEdGame/). Please note that the game is still in the proof-of-concept stage. It was developed during a compressed summer semester and is not fully functional.

## Project Structure

- **index.html**: The main HTML file that structures the game interface.
- **css/**: Directory containing CSS files for styling the game's user interface.
- **js/**: Directory containing JavaScript files that drive the game's logic and interactivity.
- **assets/**: Directory for storing game assets, such as images and sounds.
- **docs/**: Directory for project documentation, including guides and notes.

## Roadmap
- **Create MVP**: Create a minimum viable product that demonstrates the core gameplay loop.
- **Gameplay Enhancements**: Implement additional life events and decision pathways.
- **User Interface**: Improve responsiveness and add more retro-themed visual elements.
- **Data Visualization**: Integrate comprehensive graphs and charts for post-game analysis to enrich the end game.
- **Virtual Financial Advisor**: Integrate a virtual financial advisor for qualitative feedback to enrich the end game.
- **Multiplayer Mode**: Explore the possibility of a competitive mode where players can compare their financial outcomes.


## How to Contribute

Interested in contributing? Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to get started.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- **The 2024 Summer Class of ETEC 637**: For providing insightful ideas and comprehensive feedback during the development of this game.
- **Inspiration**: The game concept is inspired by classic games like Oregon Trail and various financial literacy programs.
- **Contributors**: Thank you to all contributors who helped make this project possible.
