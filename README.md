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
- ExchangeRate API - Used for real-time currency conversion (https://www.exchangerate-api.com/)
- Recharts - Data visualization library for creating charts and graphs
- TailwindCSS - Utility-first CSS framework for styling
- React Query - Data fetching and state management
- bcrypt - Password hashing library
- JSONWebToken - Authentication token generation and verification

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

   - In the client directory, create a `.env` file:
   ```env
   VITE_EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
   ```

5. **Initialize the database**
   ```