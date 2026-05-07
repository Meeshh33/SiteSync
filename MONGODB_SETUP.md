# MongoDB Setup Guide

## Option 1: Local MongoDB Installation (Windows)

### Step 1: Download MongoDB
1. Visit https://www.mongodb.com/try/download/community
2. Select your operating system
3. Download the installer

### Step 2: Install MongoDB
1. Run the installer
2. Click "Complete" for full installation
3. Uncheck "Install MongoDB Compass" (optional)
4. Choose "Run the MongoDB service as a Windows Service"
5. Complete installation

### Step 3: Verify Installation
1. Open Command Prompt
2. Type: `mongod --version`
3. You should see the version number

### Step 4: Connect to MongoDB
In a new terminal:
```bash
mongosh
```

You should see: `test>`

---

## Option 2: MongoDB Atlas (Cloud) - RECOMMENDED

### Step 1: Create Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Confirm email

### Step 2: Create Cluster
1. Click "Create" button
2. Select "Free" tier
3. Choose your region closest to you
4. Click "Create Deployment"

### Step 3: Create Database User
1. Click "Database Access"
2. Click "Add New Database User"
3. Username: `admin`
4. Password: Create a strong password
5. Choose "Database User" role
6. Click "Add User"

### Step 4: Get Connection String
1. Click "Database"
2. Click "Connect"
3. Click "Drivers"
4. Select "Node.js"
5. Copy the connection string

### Step 5: Update .env
Edit `backend/.env`:
```
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/construction-rfi?retryWrites=true&w=majority
```

Replace:
- `admin` - your username
- `YOUR_PASSWORD` - your password

---

## Testing Your Connection

### Create Test Document
```javascript
// In mongosh or your app
db.test.insertOne({ name: "Construction App" })
db.test.find()
```

---

## Useful MongoDB Commands

```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use database
use construction-rfi

# Show collections
show collections

# Find all RFIs
db.rfis.find()

# Find all Change Orders
db.changeorders.find()

# Find all users
db.users.find()

# Count documents
db.rfis.countDocuments()

# Delete all documents (⚠️ use carefully!)
db.rfis.deleteMany({})
```

---

## Troubleshooting

### MongoDB won't start
- Check if port 27017 is available
- Try restarting MongoDB service
- Reinstall if needed

### Can't connect to Atlas
- Check internet connection
- Verify IP address is whitelisted (Atlas settings)
- Check username and password
- Ensure cluster is running

### Connection string error
- Copy string carefully from Atlas
- Replace `<password>` with actual password
- Remove special characters or encode them (% → %25)

---

## Atlas Network Access

To allow any IP address:
1. Go to MongoDB Atlas Dashboard
2. Click "Network Access"
3. Click "Add IP Address"
4. Enter: `0.0.0.0/0` (allows all)
5. Click "Confirm"

⚠️ Only for development! Restrict for production.

---

**Recommendation**: Use MongoDB Atlas for easy cloud deployment and no local setup required!
