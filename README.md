# Chefitup - CSCI3308 Project

## Contributors
- Charan
- Bianca
- Kaile
- Zach

## Introduction
**Chefitup** is a culinary application that effortlessly connects users with a vast array of recipes tailored to their preferences. Just by inputting minimal information, users can explore a plethora of recipes suited to their current culinary desires.

## Technology Stack
- **Front-End**: EJS (Embedded JavaScript Templating)
- **Back-End**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication and Security**: Bcrypt for password hashing
- **Other Libraries and Middleware**: Axios for HTTP requests
- **Containerization**: Docker to ensure consistent environments

## Prerequisites
- A computer with internet connectivity
- Docker installed for containerization
- Application codebase downloaded to the computer

## Local Setup and Running the Application
1. **Initial Setup**:
   - Ensure Docker is installed on your system.
   - Clone or download the application repository to your local machine.

2. **Running the Application**:
   - Open a terminal and navigate to the project directory.
   - Run the Docker commands to build and start the containers:
     ```
     docker-compose build
     docker-compose up
     ```
   - Once the containers are running, the application will be accessible through a web browser.

3. **Accessing the Application**:
   - Open your web browser and navigate to `http://localhost:3000/` to interact with the application.

## Testing
- Tests are automatically executed when you run the Docker commands.
- Ensure all tests pass for optimal functionality.

## Deployed Application
Access the live application here: [Chefitup Live](http://recitation-11-team-04.eastus.cloudapp.azure.com:3000/)

## Usage
1. **Account Registration**: Sign up for a new account and log in.
2. **Recipe Search**: On the homepage, use the filters to search for recipes.
3. **Explore Recipes**: Browse through the filtered results and find a recipe that appeals to you.
