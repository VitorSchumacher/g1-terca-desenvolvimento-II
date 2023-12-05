# EnigmaCode AMF

This is quiz app built with React Native, Expo, and Firebase. 

## Getting Started

Follow the instructions below to get started with the EnigmaCode AMF app on your local machine.

### Prerequisites

To run this app, you will need to have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- Expo CLI

### Installation

1. Clone the repository to your local machine using the following command:

   ```shell
   git clone https://github.com/VitorSchumacher/g1-terca-desenvolvimento-II.git
   ```

2. Navigate to the project directory:

   ```shell
   cd g1-terca-desenvolvimento-II
   ```

3. Install the project dependencies:

   ```shell
   npm install
   ```

4. Set up Firebase:

   - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com).
   - Enable Firebase Authentication and Firestore for your project.
   - Copy the Firebase configuration and replace the placeholders in `/src/firebaseConnection.js` file with your own Firebase configuration.

5. Start the app:

   ```shell
   npm start
   ```

   This will start the Expo development server.

6. Open the app on your device:

   - Install the Expo app on your iOS or Android device.
   - Scan the QR code displayed in the Expo Developer Tools (or the console) with your device's camera.
   - The app will be installed and automatically opened on your device.
  

## Features

- **Register name and email**: Users can register their name and email to see their results in the scoreboard.
- **Answer a quiz**: Users can answer a quiz with different difficulty levels and number of questions.
