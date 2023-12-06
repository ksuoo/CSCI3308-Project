# Chef It Up - CSCI3308 Project

## Description
**Chef It Up** is a culinary application that effortlessly connects users with a vast array of recipes tailored to their preferences. Just by inputting minimal information, users can explore a plethora of recipes suited to their current culinary desires.

## Contributors
- Kaile Suoo
- Charan Sai Kakula
- Bianca Gautam
- Zach Erdley

## Technology Stack
- **Front-End**: EJS (Embedded JavaScript Templating)
- **Back-End**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication and Security**: Bcrypt for password hashing
- **Other Libraries and Middleware**: Axios for HTTP requests
- **Containerization**: Docker to ensure consistent environments

## Prerequisites
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
- Test cases for register, login, and filtering recipes can be found in server.spec.js
- Register: Enter a username and password, if the username has already been taken, the application will send an error message and ask you to input a new one
- Login: Sign in with the account that was just created. If the account is not found, the website will redirect you to the register page to create one
- Discover: Enter filters to search for recipes. If there are no recipes that match your search, and error message will pop up.

## Deployed Application
Access the live application here: [Chef It Up Live](http://recitation-11-team-04.eastus.cloudapp.azure.com:3000/)

## Usage
1. **Account Registration**: Sign up for a new account and log in.
2. **Recipe Search**: On the homepage, use the filters to search for recipes.
3. **Explore Recipes**: Browse through the filtered results and find a recipe that appeals to you.
