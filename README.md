# Budget Planner Application

A personal budget planning application built with React and Node.js.

## Setup Instructions

### Prerequisites
- Node.js (v18.x)
- npm (v9.x)
- MySQL (v8.x)

### Database Setup
1. Install MySQL on your system
2. Create a new database:
```sql
CREATE DATABASE budget_planner;
```

### Project Setup
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cd server
cp .env.example .env
```
Then edit `.env` with your MySQL credentials

4. Initialize the database:
```bash
node config/reset.js
```

### Running the Application
1. Start the backend server:
```bash
npm run dev:server
```

2. In a new terminal, start the frontend:
```bash
npm run dev:client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Development

- Frontend code is in the `client` directory
- Backend code is in the `server` directory
- Database configuration is in `server/config`

## Contributing
1. Create your feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request 