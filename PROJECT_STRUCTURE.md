# Project Structure Overview

## 📁 Complete Directory Layout

```
Construction-RFI-App/
│
├── 📄 README.md                  # Main documentation (START HERE!)
├── 📄 QUICK_START.md             # 5-minute quick setup guide
├── 📄 MONGODB_SETUP.md           # Database configuration guide
├── 📄 API_DOCUMENTATION.md       # Complete API reference
├── 📄 PROJECT_RESEARCH_PLAN.md   # Your research/academic plan
├── 📄 .gitignore                 # Git ignore rules
│
├── 📁 backend/                   # Node.js/Express Server
│   │
│   ├── 📁 models/                # Database Schemas
│   │   ├── User.js               # User model with authentication
│   │   ├── RFI.js                # RFI schema with history tracking
│   │   └── ChangeOrder.js        # Change Order schema
│   │
│   ├── 📁 controllers/           # Business Logic
│   │   ├── authController.js     # Login/Register logic
│   │   ├── rfiController.js      # RFI CRUD operations
│   │   ├── changeOrderController.js
│   │   └── userController.js     # User profile management
│   │
│   ├── 📁 routes/                # API Routes
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── rfiRoutes.js          # /api/rfis
│   │   ├── changeOrderRoutes.js  # /api/change-orders
│   │   └── userRoutes.js         # /api/users
│   │
│   ├── 📁 middleware/            # Custom Middleware
│   │   └── auth.js               # JWT token verification
│   │
│   ├── 📄 server.js              # Express server entry point
│   ├── 📄 .env                   # Environment variables
│   ├── 📄 package.json           # Dependencies list
│   └── 📄 node_modules/          # Installed packages (auto-generated)
│
└── 📁 frontend/                  # React Web Application
    │
    ├── 📁 public/                # Static files
    │   ├── index.html            # Main HTML file
    │   └── favicon.ico           # Website icon
    │
    ├── 📁 src/                   # React source code
    │   │
    │   ├── 📁 components/        # Reusable Components
    │   │   └── PrivateRoute.js   # Protected routes
    │   │
    │   ├── 📁 context/           # State Management
    │   │   └── AuthContext.js    # User authentication context
    │   │
    │   ├── 📁 pages/             # Page Components
    │   │   ├── Login.js          # Login/Register page
    │   │   ├── Dashboard.js      # Main dashboard
    │   │   ├── CreateRFI.js      # Create RFI form
    │   │   ├── RFIDetails.js     # View RFI details & history
    │   │   ├── CreateChangeOrder.js
    │   │   └── ChangeOrderDetails.js
    │   │
    │   ├── 📁 services/          # API Client
    │   │   └── api.js            # Axios HTTP client & endpoints
    │   │
    │   ├── 📁 styles/            # CSS Styles
    │   │   ├── index.css         # Global styles
    │   │   ├── Auth.css          # Login/Register styling
    │   │   ├── Dashboard.css     # Dashboard styling
    │   │   ├── Forms.css         # Form styling
    │   │   └── Details.css       # Details page styling
    │   │
    │   ├── 📄 App.js             # Main app component & router
    │   └── 📄 index.js           # React entry point
    │
    ├── 📄 package.json           # Frontend dependencies
    ├── 📄 node_modules/          # Installed packages (auto-generated)
    └── 📄 .gitignore             # What to exclude from git
```

---

## 🔧 Key Files Explained

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Express server setup, port configuration, route initialization |
| `models/User.js` | User database schema, password hashing, authentication methods |
| `models/RFI.js` | RFI schema with auto-incrementing ID, history, comments |
| `models/ChangeOrder.js` | Change Order schema with approval workflow, history |
| `controllers/authController.js` | User registration, login, JWT token generation |
| `controllers/rfiController.js` | All RFI operations (create, read, update, delete, history) |
| `middleware/auth.js` | JWT token verification for protected routes |
| `.env` | Database URL, JWT secret, server port configuration |

### Frontend Files

| File | Purpose |
|------|---------|
| `App.js` | Main component, router configuration, route definitions |
| `context/AuthContext.js` | Global authentication state management |
| `pages/Login.js` | Registration & login interface |
| `pages/Dashboard.js` | Main dashboard with statistics & overview |
| `pages/CreateRFI.js` | RFI submission form |
| `pages/RFIDetails.js` | RFI view, edit, comment, history |
| `services/api.js` | Axios configuration, all API endpoints |
| `styles/*.css` | Professional responsive styling |

---

## 📊 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (Project Manager, Architect, etc.),
  companyName: String,
  phone: String,
  createdAt: Date
}
```

### RFI Model
```javascript
{
  _id: ObjectId,
  rfiNumber: String (auto: RFI-00001),
  projectName: String,
  subject: String,
  description: String,
  status: String (Submitted, Under Review, Answered, Closed),
  priority: String (Low, Medium, High, Critical),
  answer: String,
  submittedBy: ObjectId (User),
  assignedTo: ObjectId (User),
  comments: Array [{ user, userName, text, timestamp }],
  history: Array [{ changedBy, action, previousStatus, newStatus, timestamp, notes }],
  createdAt: Date,
  updatedAt: Date
}
```

### Change Order Model
```javascript
{
  _id: ObjectId,
  coNumber: String (auto: CO-00001),
  projectName: String,
  title: String,
  description: String,
  status: String (Pending, Under Review, Approved, Rejected, Implemented),
  costImpact: Number,
  scheduleImpact: String (No Impact, Accelerate, Delay),
  delayDays: Number,
  reason: String,
  submittedBy: ObjectId (User),
  approvedBy: ObjectId (User),
  approvalNotes: String,
  comments: Array,
  history: Array,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Request/Response Flow

### Login Flow
```
1. User enters email & password in Login.js
   ↓
2. Sends POST /api/auth/login to backend
   ↓
3. authController verifies credentials & generates JWT token
   ↓
4. Token saved in localStorage by frontend
   ↓
5. User redirected to Dashboard
   ↓
6. All subsequent requests include token in Authorization header
```

### Create RFI Flow
```
1. User fills form in CreateRFI.js
   ↓
2. Submits POST /api/rfis with RFI data & JWT token
   ↓
3. auth.js middleware verifies token
   ↓
4. rfiController.createRFI processes request
   ↓
5. RFI.js model saves to MongoDB
   ↓
6. History entry automatically created
   ↓
7. RFI returned and user redirected to Dashboard
```

---

## 🎯 API Endpoints Summary

### Authentication (Public)
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login

### RFI Management (Protected)
- `POST /api/rfis` - Create RFI
- `GET /api/rfis` - List all RFIs
- `GET /api/rfis/:id` - Get RFI details
- `PUT /api/rfis/:id/status` - Update status
- `POST /api/rfis/:id/comments` - Add comment
- `GET /api/rfis/:id/history` - View history
- `DELETE /api/rfis/:id` - Delete RFI

### Change Order Management (Protected)
- `POST /api/change-orders` - Create CO
- `GET /api/change-orders` - List all COs
- `GET /api/change-orders/:id` - Get CO details
- `PUT /api/change-orders/:id/status` - Update status
- `POST /api/change-orders/:id/comments` - Add comment
- `GET /api/change-orders/:id/history` - View history
- `DELETE /api/change-orders/:id` - Delete CO

### User Management (Protected)
- `GET /api/users/profile` - Get current user
- `GET /api/users` - List all users
- `PUT /api/users/profile` - Update profile

---

## 🚀 Deployment Ready

### Frontend Deployment
- Build: `npm run build` → Creates optimized build in `frontend/build/`
- Deploy to: Vercel, Netlify, GitHub Pages, AWS S3, Azure

### Backend Deployment
- Deploy to: Heroku, Railway, Render, AWS EC2, DigitalOcean

### Database
- MongoDB Atlas (Cloud) - No infrastructure needed
- Or your own MongoDB instance

---

## 📝 Configuration Files

### `.env` (Backend)
Contains sensitive configuration:
- `MONGODB_URI` - Database connection string
- `JWT_SECRET` - Secret key for token signing
- `PORT` - Server port number
- `NODE_ENV` - Environment (development/production)

### `package.json` (Both)
Lists all npm dependencies needed for the project

---

## 🔐 Security Features

1. **Password Hashing** - bcryptjs salts & hashes passwords
2. **JWT Authentication** - Token-based authentication
3. **Protected Routes** - Frontend PrivateRoute component
4. **Backend Middleware** - auth.js verifies token on each request
5. **CORS** - Cross-origin requests restricted to localhost

---

## 📱 Responsive Design

All pages use CSS Grid and Flexbox:
- **Desktop**: Full layout with sidebars
- **Tablet**: Adjusted grid layout
- **Mobile**: Single column, optimized touch targets

---

## 🎓 For Your Research Project

This application demonstrates:
1. **Real-world problem solving** - RFI & CO management
2. **Professional architecture** - MVC pattern, separation of concerns
3. **Modern technologies** - React, Node.js, MongoDB
4. **Security best practices** - Password hashing, JWT tokens
5. **Database design** - Normalized schemas, relationships
6. **API design** - RESTful principles
7. **UI/UX** - Responsive, professional interface
8. **Scalability** - Can handle thousands of items

---

## 📚 Next Steps

1. Review README.md for comprehensive overview
2. Follow QUICK_START.md to run the application
3. Explore API_DOCUMENTATION.md for all endpoints
4. Review code in backend/controllers for business logic
5. Check frontend/src/pages for UI implementation

---

**This is a production-ready architecture suitable for real construction projects!** 🏗️
