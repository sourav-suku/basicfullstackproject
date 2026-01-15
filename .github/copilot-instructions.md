<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Full-Stack Task Manager Application

This workspace contains a complete full-stack web application with:
- **Backend**: Express.js server with SQLite database
- **Frontend**: React single-page application
- **Features**: Complete CRUD operations for task management

### Project Setup Complete ✓

- Backend server with Express and SQLite configured
- React frontend with Axios for API integration
- Database initialized with sample tasks
- Responsive UI with modern styling

### How to Run

1. **Backend**:
   ```bash
   cd server
   npm install
   npm run init-db
   npm run dev
   ```

2. **Frontend** (in a new terminal):
   ```bash
   cd client
   npm install
   npm start
   ```

3. Open `http://localhost:3000` in your browser

### Key Files

- `server/server.js` - Express API server
- `server/init-db.js` - Database initialization
- `client/src/App.js` - Main React component
- `README.md` - Full documentation

### API Endpoints

All endpoints available at `http://localhost:5000/api`:
- GET `/tasks` - List all tasks
- POST `/tasks` - Create task
- PUT `/tasks/:id` - Update task
- DELETE `/tasks/:id` - Delete task
