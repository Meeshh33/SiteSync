# Construction RFI & Change Order Management System

## Overview
A complete web application for managing Request for Information (RFI) and Change Orders in construction projects. Built with professional UI/UX design to solve real-world construction management challenges.

## Features

### ✅ Core Features
- **User Authentication**: Simple login/register system with role-based access
- **RFI Management**: Create, track, and manage RFIs with full history
- **Change Order Management**: Submit and approve change orders with cost/schedule impact
- **History Tracking**: Complete audit trail for all RFIs and Change Orders
- **Comments & Collaboration**: Team members can comment on items
- **Dashboard**: Overview with statistics and quick actions
- **Responsive Design**: Works on desktop, tablet, and mobile

### 👥 User Roles
- Project Manager
- Architect
- Contractor
- Client Representative
- Site Supervisor

### 📊 Status Tracking
**For RFIs**: Submitted → Under Review → Answered → Closed
**For Change Orders**: Pending → Under Review → Approved/Rejected → Implemented

---

## Project Structure

```
Construction-RFI-App/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── RFI.js           # RFI schema with history
│   │   └── ChangeOrder.js   # Change Order schema with history
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── rfiController.js
│   │   └── changeOrderController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── rfiRoutes.js
│   │   └── changeOrderRoutes.js
│   ├── middleware/
│   │   └── auth.js          # JWT authentication
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── CreateRFI.js
    │   │   ├── RFIDetails.js
    │   │   ├── CreateChangeOrder.js
    │   │   └── ChangeOrderDetails.js
    │   ├── services/
    │   │   └── api.js        # API client
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── Forms.css
    │   │   └── Details.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Edit `.env` file with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/construction-rfi
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB:**
- **Local**: `mongodb://localhost:27017/construction-rfi`
- **Cloud (MongoDB Atlas)**: `mongodb+srv://username:password@cluster.mongodb.net/construction-rfi?retryWrites=true&w=majority`

4. **Start the backend server:**
```bash
npm run dev
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory (in a new terminal):**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```
Application will open on `http://localhost:3000`

---

## Quick Start

1. **Open the application**: `http://localhost:3000`

2. **Register a new user**:
   - Click "Register"
   - Fill in your information
   - Select your role (e.g., Architect)
   - Click "Register"

3. **Login**: Use your credentials to log in

4. **Dashboard**: You'll see the main dashboard with:
   - Overview statistics
   - Create RFI button
   - Create Change Order button
   - Recent items

5. **Create an RFI**:
   - Click "+ New RFI"
   - Fill in project details
   - Submit

6. **Create a Change Order**:
   - Click "+ New Change Order"
   - Enter cost and schedule impact
   - Submit

7. **View Details**:
   - Click on any RFI or Change Order
   - View history, add comments
   - Update status

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### RFIs
- `POST /api/rfis` - Create RFI
- `GET /api/rfis` - Get all RFIs
- `GET /api/rfis/:id` - Get RFI details
- `PUT /api/rfis/:id/status` - Update RFI status
- `POST /api/rfis/:id/comments` - Add comment
- `GET /api/rfis/:id/history` - Get RFI history
- `DELETE /api/rfis/:id` - Delete RFI

### Change Orders
- `POST /api/change-orders` - Create Change Order
- `GET /api/change-orders` - Get all Change Orders
- `GET /api/change-orders/:id` - Get Change Order details
- `PUT /api/change-orders/:id/status` - Update status
- `POST /api/change-orders/:id/comments` - Add comment
- `GET /api/change-orders/:id/history` - Get history
- `DELETE /api/change-orders/:id` - Delete Change Order

### Users
- `GET /api/users/profile` - Get user profile
- `GET /api/users` - Get all users
- `PUT /api/users/profile` - Update profile

---

## Technology Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cors** - Cross-origin requests

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Responsive styling

---

## Features in Detail

### Complete History Tracking
Every RFI and Change Order maintains a complete history:
- Who made changes
- What was changed
- When it was changed
- Why it was changed (notes)

### Comment System
Team members can collaborate through comments:
- Add comments to RFIs and Change Orders
- See who commented and when
- Track discussion history

### Professional Dashboard
- View all active RFIs and Change Orders
- See pending items that need action
- Quick statistics overview
- Recent activity list

### Responsive Design
- Works perfectly on desktop
- Mobile-friendly interface
- Tablet optimized views

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure MongoDB is running
- Check if port 5000 is available

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check proxy setting in frontend `package.json`
- Clear browser cache

### Login issues
- Verify user was registered
- Check password is correct
- Clear localStorage if needed: `localStorage.clear()`

---

## Production Deployment

### Backend Deployment (Heroku Example)
```bash
# Install Heroku CLI, then:
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy using Vercel
vercel --prod
```

---

## Future Enhancements
- [ ] File upload and attachment storage
- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Budget tracking
- [ ] Timeline/Gantt chart integration
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Document management
- [ ] Integration with project management tools

---

## Support & Documentation

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors
4. Verify all services are running

---

## License
ISC License

---

## Version
1.0.0 - Initial Release

**Built for Construction Project Management Excellence** 🏗️
