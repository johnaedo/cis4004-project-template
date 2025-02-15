# 💰 Budget Planner Application

A modern web application for managing personal finances, built with React, Node.js, Express.js, and MySQL.

## Technical Stack

![Screenshot 2025-02-15 at 2 12 52 AM](https://github.com/user-attachments/assets/132de664-3e6f-4ccb-973f-2baa8d335052)

### Frontend
- Framework: React.js with Vite
  - Runs on port 5173 (Vite's default port)
  - Uses React Router for client-side routing
  - Styled with Tailwind CSS
  - State management with React Query

### Backend
- HTTP Server: Node.js
- Framework: Express.js
  - Runs on port 3002
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
   PORT=3002
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
   The server will start on http://localhost:3002

2. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev:client
   ```
   The application will open in your browser at http://localhost:5173

## 🎯 Features

- 👤 User authentication (register/login)
- 💹 Budget tracking and management
- 📊 Transaction history
- 🏷️ Custom budget categories
- 📱 Responsive design

## 🔧 Troubleshooting

1. **Port already in use**
   ```bash
   # Kill the process using port 3002
   lsof -i :3002
   kill -9 [PID]
   ```

2. **MySQL Connection Issues**
   - Ensure MySQL service is running
   - Verify database name and credentials in `.env`
   - Check if database exists: `mysql -u root -e "SHOW DATABASES;"`

3. **Node.js Version Mismatch**
   - Use `nvm` (Node Version Manager) to switch to the correct version:
   ```bash
   nvm install 18
   nvm use 18
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

---
Happy budgeting! 🎉 
