# Contributing to FinEdGame

This document outlines the process for contributing, including developing, testing, and deploying the project.

## Getting Started

### Clone the Repository

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/FinEdGame.git
   ```
2. Navigate into the project directory:
   ```bash
   cd FinEdGame
   ```

### Install Dependencies

If there are any dependencies, make sure to install them before starting development. For now, the project is a simple web application, so no known dependencies exist.

### Setting Up Local Development

1. **Develop on the `main` Branch**:
   - The `main` branch is the primary development branch where most changes should be made.
   - For significant changes or new features, create a feature branch off `main`.

2. **Create a Feature Branch**:
   - If you're working on a new feature or major change, create a new branch:
     ```bash
     git checkout -b feature-branch-name
     ```

3. **Test Locally**:
   - Use the Live Server extension in Visual Studio Code or similar tools to preview your changes locally.
   - Make sure to test your changes thoroughly before committing.

## Making Changes

1. **Make Commits**:
   - Commit your changes frequently with descriptive commit messages:
     ```bash
     git add .
     git commit -m "Add detailed description of the change"
     ```
   - Push your changes to GitHub:
     ```bash
     git push origin feature-branch-name
     ```

2. **Open a Pull Request**:
   - Once your feature branch is ready, open a pull request (PR) to merge your changes into `main`.
   - Clearly describe the changes and any potential impacts in the PR description.
   - Request a review from your collaborator.

## Merging and Deployment

1. **Merging to `main`**:
   - Once the pull request has been reviewed and approved, merge it into the `main` branch:
     ```bash
     git checkout main
     git merge feature-branch-name
     git push origin main
     ```

2. **Deploying to `gh-pages`**:
   - After confirming that `main` is stable and all tests pass, merge `main` into the `gh-pages` branch to deploy the latest version to GitHub Pages:
     ```bash
     git checkout gh-pages
     git merge main
     git push origin gh-pages
     ```

3. **Verify Deployment**:
   - After deployment, visit the GitHub Pages URL to ensure the changes are live and functioning correctly.

## Branching Strategy

- **`main`**: Primary development branch. All new features and bug fixes should be merged here after thorough testing.
- **`gh-pages`**: Deployment branch. Only stable and tested code from `main` should be merged here for deployment to GitHub Pages.
- **Feature Branches**: Use feature branches for new features or significant changes. Name them descriptively (e.g., `feature-new-interface`).

## Testing

- **Local Testing**: Always test your changes locally using Live Server or a similar tool before committing.
- **Final Verification**: After deploying to `gh-pages`, verify that the live site is working as expected.

## Issues and Bug Reports

- If you find any bugs or issues, please report them by creating an issue in the GitHub repository. Provide as much detail as possible to help us resolve the issue quickly.