# 💰 Budget Planner Application

A modern web application for managing personal finances, built with React, Node.js, Express.js, and MySQL.

## Technical Stack

![Screenshot 2025-02-15 at 2 12 52 AM](https://github.com/user-attachments/assets/132de664-3e6f-4ccb-973f-2baa8d335052)

### Frontend
- Framework: React.js with Vite
  - Runs on port 3000 in development
  - Uses React Router for client-side routing
  - Styled with Tailwind CSS
  - State management with React Query

### Backend
- HTTP Server: Node.js
- Framework: Express.js
  - Runs on port 3001
  - RESTful API endpoints
  - Manages database connections
  - CORS enabled for development/production

### Database
- MySQL
  - Stores user data, transactions, budgets, and categories
  - Uses connection pooling for efficient database access
  - Structured with foreign key relationships

### External APIs/Services
- None currently

### Authentication
- JWT (JSON Web Token) based authentication
  - 24-hour token expiration
  - Secure password hashing with bcrypt
  - Protected routes with middleware

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

1. Node.js (v18 or higher) - [Download here](https://nodejs.org/)
2. MySQL (v8 or higher) - [Download here](https://dev.mysql.com/downloads/)
3. Git - [Download here](https://git-scm.com/downloads)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd budget-planner
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Set up MySQL**
   - Start MySQL service:
     - On macOS: `brew services start mysql`
     - On Windows: Start MySQL from Services
     - On Linux: `sudo systemctl start mysql`
   
   - Create a new database:
   ```bash
   mysql -u root
   CREATE DATABASE budget_planner;
   exit;
   ```

4. **Configure environment variables**
   - In the server directory, create a `.env` file:
   ```env
   NODE_ENV=development
   PORT=3001
   JWT_SECRET=your_jwt_secret_here
   DB_HOST=localhost
   DB_USER=root
   DB_NAME=budget_planner
   # DB_PASSWORD= (leave empty if no password set)
   ```

5. **Initialize the database**
   ```bash
   # From the server directory
   node config/reset.js
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   # From the root directory
   npm run dev:server
   ```
   The server will start on http://localhost:3001

2. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev:client
   ```
   The application will open in your browser at http://localhost:3000

## 🎯 Features

- 👤 User authentication (register/login)
- 💹 Budget tracking and management
- 📊 Transaction history
- 🏷️ Custom budget categories
- 📱 Responsive design
- 💰 Savings goals tracking
- 💲 Currency converter
- 🧮 Tax estimator

## 🔧 Troubleshooting

1. **Port already in use**
   ```bash
   # Check which process is using the port
   lsof -i :3000-3001
   
   # Kill the process using the specific port
   kill -9 [PID]
   ```

2. **MySQL Connection Issues**
   - Ensure MySQL service is running
   - Verify database name and credentials in `.env`
   - Check if database exists: `mysql -u root -e "SHOW DATABASES;"`

3. **JWT Verification Error**
   - If you encounter 500 errors with categories and budgets not loading, you may have an expired JWT token
   - Try logging out and logging back in to refresh your token
   - Check server logs for "JWT verification error" messages

4. **Node.js Version Mismatch**
   - Use `nvm` (Node Version Manager) to switch to the correct version:
   ```bash
   nvm install 18
   nvm use 18
   ```

5. **Missing Dependencies**
   - If you encounter errors about missing modules, run:
   ```bash
   npm install recharts
   ```

## 📁 Project Structure

```
budget-planner/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/      # Context providers
│   │   └── api/          # API integration
│   └── package.json
├── server/                # Backend Node.js application
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/         # Configuration files including reset.js
│   └── package.json
└── package.json
```

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Create a pull request with a clear description

## 🤖 AI Usage Citation

### Claude.ai (Claude 3.7 Sonnet & Claude 3.5 Sonnet)

AI was extensively used in this project:

- **Frontend Development**: All React components in the `client/src/components/` directory were created and structured with AI assistance.

- **Backend Structure**: AI provided templates and structure for the backend Express.js server, including controllers, routes, and middleware.

- **Troubleshooting**: AI assisted with debugging issues, particularly authentication problems and component logic.

- **Integration**: AI helped with integrating third-party libraries such as recharts for data visualization.

The foundation of both the frontend and backend architecture was significantly influenced by AI-generated code, which was then customized and extended to meet the specific requirements of the application.

---
Happy budgeting! 🎉 
