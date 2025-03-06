# Client Directory Walk-through
The client directory contains our React frontend application. Here's how it's organized:

## Core Structure:
`src/` This is where all our frontend code lives.
- `main.jsx` The entry point of our React application that sets up React Query and renders the App component.
- `App.jsx` The main component that handles routing and authentication state.
- `index.css` & `App.css`: Global styling files, with `App.css` containing application-wide styles.

## Key Directories:
`src/components/` Reusable UI components.
- Contains modular components like forms, buttons, navigation elements, and other UI pieces.
- These components are designed to be reusable across different pages.
`src/pages/` Page-level components.
- Each file represents a different page\/route in our application.
- Pages combine multiple components to create complete views.
`src/context/` React context providers.
- Manages global state that needs to be accessed by multiple components.
- Likely includes authentication context for user login state.
`src/api/` API integration.
- Contains functions that make HTTP requests to our backend.
- Organizes API calls by feature (users, transactions, budgets, etc.).
`src/utils/` Utility functions.
- Helper functions and common logic used throughout the application.
- May include date formatting, validation, calculations, etc.
`src/assets/` Static assets.
- Images, icons, and other static files used in the UI.

## Configuration Files
- `vite.config.js` Configuration for the Vite build tool.
- `tailwind.config.js` Tailwind CSS configuration.
- `postcss.config.js` PostCSS configuration for processing CSS.
- `eslint.config.js` ESLint rules for code quality.

# Server Directory Walk-through
The server directory contains our Node.js\/Express backend application. Here's how it's
organized:
## Core Structure
- `server.js`: The main entry point that sets up the Express server, middleware, and routes.
- Configures CORS, JSON parsing, and other server settings.
- Connects to the database.
- Registers all API routes.
## Key Directories
- `controllers/`: Business logic.
	- Each controller contains functions that process requests, interact with the database, and send responses.
	- `users.js`: Handles user-related operations like registration, login, and profile management.
- `routes/`: API endpoint definitions.
	- Each file defines the HTTP endpoints and connects them to the appropriate controller functions.
	- `users.js`: User-related routes (login, register, profile).
	- `budgets.js`: Budget management routes.
	- `transactions.js`: Transaction tracking routes.
	- `categories.js`: Category management routes.
- `middleware/`: Custom middleware.
	- Likely contains authentication middleware to protect routes.
	- May include error handling, logging, or request validation.
	- `config/`: Configuration files.
	- `database.js`: Database connection setup.
	- `reset.js`: Script to reset and initialize the database with tables.
	- `check-env.js`: Validates environment variables.
	- `dotenv.js`: Loads environment variables.
## Configuration Files
- `.env`: Environment variables for database credentials, JWT secret, etc.
- `.env.example`: Template for creating the `.env` file.
- `.gitignore`: Specifies files to exclude from version control.

# How Data Flows Through the Application
1. **User Interaction:** User interacts with a component in the React frontend.
2. **API Call:** Frontend makes an API call to the backend using functions from the `api/` directory.
3. **Route Handling:** Express routes in the server receive the request.
4. **Middleware Processing:** Request passes through middleware (authentication, validation).
5. **Controller Logic:** Controller functions process the request and interact with the database.
6. **Database Operation:** Data is retrieved or modified in the MySQL database.
7. **Response:** Controller sends a response back to the frontend.
8. **State Update:** Frontend updates its state with React Query and re-renders components.

# Key Features and Their Implementation
## User Authentication
- Frontend: Login\/Register forms, authentication context for state.
- Backend: JWT token generation, password hashing with bcrypt.
- Database: Users table storing credentials and profile information.
## Budget Management
- Frontend: Budget creation\/editing forms, budget display components.
- Backend: CRUD operations in `budgets` routes and controllers.
- Database: Budgets table linked to users.
## Transaction Tracking
- Frontend: Transaction entry forms, history displays, filtering.
- Backend: Transaction processing in `routes/transactions.js`.
- Database: Transactions table with foreign keys to users and categories.
## Category Management
- Frontend: Category creation\/editing components.
- Backend: Category operations in `routes/categories.js`.
- Database: Categories table with user associations.

# Database Structure
The database is structured with several related tables:
1. **Users**: Stores user accounts and authentication information.
2. **Budgets**: Contains budget plans linked to users.
3. **Transactions**: Records financial transactions with category and user associations.
4. **Categories**: Defines transaction categories customized by users.