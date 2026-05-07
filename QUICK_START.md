# Quick Start Guide

## 📋 Prerequisites
- Node.js installed (download from nodejs.org)
- MongoDB installed or MongoDB Atlas account
- A text editor or VS Code

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Backend

```bash
# Open terminal/cmd and navigate to backend folder
cd backend

# Install dependencies
npm install

# Start backend server
npm run dev
```

✅ You should see: "Server running on port 5000"

### Step 2: Install Frontend (New Terminal Window)

```bash
# In a new terminal, navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend application
npm start
```

✅ Your browser will automatically open the app at http://localhost:3000

---

## 🎯 First Steps in the App

1. **Register**
   - Click "Register" tab
   - Fill in your details
   - Select your role (e.g., "Architect")
   - Click "Register"

2. **Login**
   - Enter your email and password
   - Click "Login"

3. **Dashboard**
   - See your project statistics
   - Create a new RFI or Change Order
   - View recent items

4. **Create RFI**
   - Click "+ New RFI"
   - Fill in the form
   - Submit

5. **View Details**
   - Click on any RFI/Change Order
   - Add comments
   - Update status
   - View history

---

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
1. Download MongoDB Community from mongodb.com
2. Install and run MongoDB
3. Use connection string: `mongodb://localhost:27017/construction-rfi`

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update in `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/construction-rfi?retryWrites=true&w=majority
```

### Change JWT Secret (Production)
Edit `backend/.env`:
```
JWT_SECRET=your_strong_secret_key_here
```

---

## 📖 Testing Scenarios

### Scenario 1: Create and Track RFI
1. Login as Architect
2. Create RFI: "Clarification on wall details"
3. Change status to "Under Review"
4. Add comment: "Waiting for structural team"
5. View History tab

### Scenario 2: Create Change Order
1. Login as Project Manager
2. Create Change Order: "Additional concrete for foundation"
3. Set cost impact: $5000
4. Set schedule impact: "Delay - 3 days"
5. Add approval comment
6. Approve the change order

### Scenario 3: Collaboration
1. Create an RFI
2. Logout and login as different user
3. View the RFI
4. Add a comment
5. Logout and check history as original user

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to MongoDB" | Make sure MongoDB is running or check Atlas connection string |
| "Port 5000 already in use" | Change PORT in .env or kill process using port 5000 |
| "Frontend can't reach backend" | Ensure backend is running on port 5000; check console errors |
| "Can't login" | Check email/password; try registering new user |
| "Page won't load" | Clear browser cache (Ctrl+Shift+Delete); refresh page |

---

## 📱 Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Test API**: http://localhost:5000 (should show welcome message)

---

## 🎓 Understanding the Architecture

```
User Browser (React Frontend)
         ↓
    Router & Pages
         ↓
  API Service (Axios)
         ↓
Node.js Backend (Express)
         ↓
   API Routes
         ↓
   Controllers
         ↓
   MongoDB Database
```

---

## 📝 Test Users (Create Your Own)

Register with any email and password:
- **Email**: test@example.com
- **Password**: password123
- **Role**: Choose from dropdown

Multiple users can work on same projects!

---

## 🚀 What's Next?

After running the app:
1. Create several RFIs and Change Orders
2. Test different user roles
3. Add comments and track history
4. Explore the dashboard
5. Review the code structure

---

## 📚 Key Features to Explore

- ✅ Login/Register with role selection
- ✅ Create RFI with priority levels
- ✅ Create Change Order with cost/schedule impact
- ✅ Full history tracking
- ✅ Comments and collaboration
- ✅ Status management
- ✅ Dashboard overview
- ✅ Responsive mobile design

---

## 🆘 Need Help?

1. Check MongoDB is running
2. Check both servers are started
3. Open browser console (F12) for errors
4. Check terminal output for error messages
5. Try clearing browser cache

---

**Ready to go!** Your application is now running. 🎉

Start by registering and creating your first RFI!
