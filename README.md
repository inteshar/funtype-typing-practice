Number Typing Practice Tool
Description

This is a typing practice web app built using React.js and styled with Tailwind CSS. The tool helps users improve their typing speed and accuracy by typing randomly generated numbers within a set time limit. Players must type the displayed number before it changes, and the app tracks the score, streak, accuracy, and mistakes. Users can also adjust the time limit for each number to make the practice more challenging.
Features:

    Track correct and wrong entries.
    Calculate accuracy based on correct/incorrect inputs.
    Display current streak of consecutive correct inputs.
    Adjustable time limit for each number.
    Clear feedback (Correct/Incorrect) after each input.
    Responsive and easy-to-use UI.

Getting Started
Prerequisites

    Node.js: Ensure you have Node.js installed on your machine. You can download it from here.

Installation

    Clone the repository:

git clone https://github.com/yourusername/number-typing-practice.git

Navigate to the project directory:

cd number-typing-practice

Install the required dependencies:

    npm install

Running the App

To run the app locally, use the following command:

npm start

This will start the app and open it in your default web browser at http://localhost:3000.
Code Explanation
Key Components:

    State Management:
        score: Tracks the number of correct and wrong attempts.
        streak: Keeps count of consecutive correct entries.
        timeLimit: Defines the time window to type the number.
        isPlaying: Toggles the game state.
        showSettings: Controls the visibility of settings.
    Game Flow:
        The game generates random 4-digit numbers.
        Users must type the number before it changes, and their accuracy is calculated.
        The app gives feedback (Correct/Incorrect) after every input.
    Settings:
        Players can adjust the time limit for the number display (0.5s, 1s, 1.5s, 2s, or 3s).
