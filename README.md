# Number Typing Practice Tool

## Description

This is a **typing practice web app** built using **React.js** and styled with **Tailwind CSS**. The tool helps users improve their typing speed and accuracy by typing randomly generated numbers within a set time limit. Players must type the displayed number before it changes, and the app tracks:

- **Score** (Correct / Wrong Entries)
- **Streak** (Consecutive Correct Inputs)
- **Accuracy**
- **Mistakes**

Users can also adjust the time limit for each number to make the practice more challenging.

---

## Features

- **Track Correct and Wrong Entries**
- **Calculate Accuracy** based on correct/incorrect inputs
- **Display Streak** of consecutive correct entries
- **Adjustable Time Limit** for each number
- **Clear Feedback** (Correct/Incorrect) after each input
- **Responsive UI** that works well on all screen sizes
- **Easy-to-Use Interface** for effortless practice

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/number-typing-practice-tool.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd number-typing-practice
    ```

3. **Install the required dependencies**:

    ```bash
    npm install
    ```

### Running the App

To run the app locally, use the following command:

```bash
npm start

## Running the App

This will start the app and open it in your default web browser at [http://localhost:3000](http://localhost:3000).

---

## Code Explanation

### Key Components

- **State Management**:
  - `score`: Tracks the number of correct and wrong attempts.
  - `streak`: Keeps count of consecutive correct entries.
  - `timeLimit`: Defines the time window to type the number.
  - `isPlaying`: Toggles the game state (active/inactive).
  - `showSettings`: Controls the visibility of the settings menu.

- **Game Flow**:
  - The game generates random 4-digit numbers.
  - Users must type the number before it changes.
  - The app calculates the accuracy based on correct/incorrect inputs.
  - Feedback ("Correct!" or "Incorrect!") is shown after each input.

- **Settings**:
  - Players can adjust the time limit for the number display (options: 0.5s, 1s, 1.5s, 2s, or 3s).
