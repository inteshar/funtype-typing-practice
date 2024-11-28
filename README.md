# FunType - Typing Practice Tool

## Description

**FunType** is a **typing practice web app** built using **React.js** and styled with **Tailwind CSS**. This tool helps users enhance their typing speed and accuracy by practicing typing randomly generated **numbers** and **words** within a set time limit. Users must type the displayed item before it changes, and the app tracks:

- **Score** (Correct / Wrong Entries)
- **Streak** (Consecutive Correct Inputs)
- **Accuracy**
- **Mistakes**

Users can also adjust the time limit for each number or word to increase the challenge and improve their typing skills.

---

## Features

- **Track Correct and Incorrect Entries** for both number and word modes
- **Calculate Accuracy** based on the number of correct and incorrect inputs
- **Display Streak** of consecutive correct entries to encourage performance
- **Adjustable Time Limit** for number and word typing modes (options include 0.5s, 1s, 1.5s, 2s, or 3s)
- **Clear Feedback** (Correct/Incorrect) displayed after each entry
- **Responsive UI** that works well on all screen sizes (mobile, tablet, desktop)
- **Easy-to-Use Interface** designed for effortless typing practice
- **Two Modes**: Number Typing and Word Typing to practice different typing challenges

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/inteshar/funtype-typing-practice.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd funtype-typing-practice
   ```

3. **Install the required dependencies**:

   ```bash
   npm install
   ```

### Running the App

To run the app locally, use the following command:

```bash
npm start
```

## Running the App

This will start the app and open it in your default web browser at [http://localhost:3000](http://localhost:3000).

---

## Code Explanation

### Key Components

- **State Management**:

  - `score`: Tracks the number of correct and incorrect attempts.
  - `streak`: Keeps count of consecutive correct entries.
  - `timeLimit`: Defines the time window to type each number or word.
  - `isPlaying`: Toggles the game state (active/inactive).
  - `showSettings`: Controls the visibility of the settings menu.
  - `mode`: Switches between **Word Typing** and **Number Typing** modes.

- **Game Flow**:

  - The game generates either random **numbers** or **words** for users to type.
  - Users must type the displayed number or word before it changes.
  - The app calculates **accuracy** based on the correct and incorrect entries.
  - Feedback ("**Correct!**" or "**Incorrect!**") is shown after each input.
  - Users can switch between modes at any time.

- **Settings**:
  - Players can adjust the **time limit** for the number or word display (options: 0.5s, 1s, 1.5s, 2s, or 3s).
  - The app also provides settings to switch between **Number Typing** and **Word Typing** modes.

## Contributing

We welcome contributions to make FunType even better! If you'd like to contribute, feel free to fork the repo and submit a pull request.
