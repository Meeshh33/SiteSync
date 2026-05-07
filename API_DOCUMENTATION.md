# API Documentation

## Overview
This document describes all available API endpoints for the Construction RFI & Change Order Management System.

---

## Base URL
```
http://localhost:5000/api
```

---

## Authentication

### Headers Required (except for auth endpoints)
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

### Get Token
Register or login to receive JWT token, then include in all subsequent requests.

---

## Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Architect",
  "companyName": "ABC Construction",
  "phone": "555-1234"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Architect"
  }
}
```

---

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Same as Register

---

## RFI Endpoints

### Create RFI
```
POST /rfis
```

**Required Headers:** Authorization

**Request Body:**
```json
{
  "projectName": "Downtown Office Building",
  "subject": "Wall Thickness Clarification",
  "description": "Need clarification on the thickness of exterior walls in Section A",
  "priority": "High",
  "dueDate": "2026-05-15",
  "assignedTo": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "message": "RFI created successfully",
  "rfi": {
    "_id": "507f1f77bcf86cd799439013",
    "rfiNumber": "RFI-00001",
    "projectName": "Downtown Office Building",
    "subject": "Wall Thickness Clarification",
    "description": "Need clarification on the thickness of exterior walls in Section A",
    "status": "Submitted",
    "priority": "High",
    "createdAt": "2026-05-07T10:30:00.000Z",
    "history": [
      {
        "action": "Created",
        "newStatus": "Submitted",
        "notes": "RFI created",
        "timestamp": "2026-05-07T10:30:00.000Z"
      }
    ]
  }
}
```

---

### Get All RFIs
```
GET /rfis
```

**Required Headers:** Authorization

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "rfiNumber": "RFI-00001",
    "projectName": "Downtown Office Building",
    "subject": "Wall Thickness Clarification",
    "status": "Submitted",
    "priority": "High",
    "createdAt": "2026-05-07T10:30:00.000Z"
  }
]
```

---

### Get RFI by ID
```
GET /rfis/:id
```

**Required Headers:** Authorization

**URL Parameters:**
- `id` - RFI MongoDB ID

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "rfiNumber": "RFI-00001",
  "projectName": "Downtown Office Building",
  "subject": "Wall Thickness Clarification",
  "description": "Need clarification...",
  "status": "Submitted",
  "priority": "High",
  "answer": null,
  "comments": [],
  "history": [],
  "createdAt": "2026-05-07T10:30:00.000Z"
}
```

---

### Update RFI Status
```
PUT /rfis/:id/status
```

**Required Headers:** Authorization

**URL Parameters:**
- `id` - RFI MongoDB ID

**Request Body:**
```json
{
  "status": "Answered",
  "answer": "Wall thickness is 12 inches for exterior walls"
}
```

**Response:** Updated RFI object

---

### Add RFI Comment
```
POST /rfis/:id/comments
```

**Required Headers:** Authorization

**URL Parameters:**
- `id` - RFI MongoDB ID

**Request Body:**
```json
{
  "text": "This clarification is needed urgently for the foundation team"
}
```

**Response:** Updated RFI object with new comment

---

### Get RFI History
```
GET /rfis/:id/history
```

**Required Headers:** Authorization

**Response:**
```json
[
  {
    "action": "Created",
    "newStatus": "Submitted",
    "notes": "RFI created",
    "timestamp": "2026-05-07T10:30:00.000Z"
  },
  {
    "action": "Status Updated",
    "previousStatus": "Submitted",
    "newStatus": "Under Review",
    "notes": "Status changed from Submitted to Under Review",
    "timestamp": "2026-05-07T11:00:00.000Z"
  }
]
```

---

### Delete RFI
```
DELETE /rfis/:id
```

**Required Headers:** Authorization

**Response:**
```json
{
  "message": "RFI deleted successfully"
}
```

---

## Change Order Endpoints

### Create Change Order
```
POST /change-orders
```

**Required Headers:** Authorization

**Request Body:**
```json
{
  "projectName": "Downtown Office Building",
  "title": "Additional Foundation Work",
  "description": "Need to reinforce foundation due to soil condition findings",
  "costImpact": 50000,
  "scheduleImpact": "Delay",
  "delayDays": 5,
  "reason": "Unexpected soil conditions found during excavation"
}
```

**Response:**
```json
{
  "message": "Change Order created successfully",
  "changeOrder": {
    "_id": "507f1f77bcf86cd799439014",
    "coNumber": "CO-00001",
    "projectName": "Downtown Office Building",
    "title": "Additional Foundation Work",
    "status": "Pending",
    "costImpact": 50000,
    "scheduleImpact": "Delay",
    "createdAt": "2026-05-07T10:30:00.000Z"
  }
}
```

---

### Get All Change Orders
```
GET /change-orders
```

**Required Headers:** Authorization

**Response:** Array of Change Order objects

---

### Get Change Order by ID
```
GET /change-orders/:id
```

**Required Headers:** Authorization

**Response:** Single Change Order object with full details

---

### Update Change Order Status
```
PUT /change-orders/:id/status
```

**Required Headers:** Authorization

**Request Body:**
```json
{
  "status": "Approved",
  "approvalNotes": "Approved by project manager. Budget increased."
}
```

**Response:** Updated Change Order object

---

### Add Change Order Comment
```
POST /change-orders/:id/comments
```

**Required Headers:** Authorization

**Request Body:**
```json
{
  "text": "The contractor needs to provide detailed timeline for this work"
}
```

**Response:** Updated Change Order object

---

### Get Change Order History
```
GET /change-orders/:id/history
```

**Required Headers:** Authorization

**Response:** Array of history entries

---

### Delete Change Order
```
DELETE /change-orders/:id
```

**Required Headers:** Authorization

**Response:**
```json
{
  "message": "Change Order deleted successfully"
}
```

---

## User Endpoints

### Get User Profile
```
GET /users/profile
```

**Required Headers:** Authorization

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Architect",
  "companyName": "ABC Construction",
  "phone": "555-1234",
  "createdAt": "2026-05-07T10:30:00.000Z"
}
```

---

### Get All Users
```
GET /users
```

**Required Headers:** Authorization

**Response:** Array of user objects

---

### Update User Profile
```
PUT /users/profile
```

**Required Headers:** Authorization

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "phone": "555-5678",
  "companyName": "XYZ Construction"
}
```

**Response:** Updated user object

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No token or invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

---

## Error Response Example

```json
{
  "message": "Error message describing what went wrong",
  "error": "Detailed error information"
}
```

---

## Example cURL Requests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create RFI
```bash
curl -X POST http://localhost:5000/api/rfis \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectName":"Project A","subject":"Clarification","description":"Need info","priority":"High"}'
```

### Get All RFIs
```bash
curl -X GET http://localhost:5000/api/rfis \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting
Currently no rate limiting. Production deployment should implement rate limiting for security.

---

## Pagination
Currently returns all results. Future versions will include pagination parameters.

---

## Testing the API

### Using Postman
1. Download Postman from postman.com
2. Create collection "Construction RFI"
3. Add requests for each endpoint
4. Set token in Authorization tab for authenticated requests
5. Test each endpoint

### Using VS Code REST Client
Create file `test.rest`:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Then click "Send Request" above the request.

---

**For more information, see README.md and QUICK_START.md**
