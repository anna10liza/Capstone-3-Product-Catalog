# Capstone 3 E-Commerce API

A simple full-stack-ready e-commerce API built with Express.js. This project includes product management, user authentication, and order processing with local JSON persistence.

## Features

- Product CRUD operations
- Product search endpoint
- User registration and login
- JWT-based authentication
- Order creation
- Admin-only order access and status update
- Local JSON file storage for persistence

## Setup

1. Install dependencies:
   npm install
2. Copy the sample env file if needed:
   copy .env.example .env
3. Start the server:
   npm start
4. Open the API in Postman or your browser:
   http://localhost:3000

## Default admin account

- Email: admin@mstconnect.com
- Password: admin123

## API endpoints

### Public

- GET /
- GET /api/products
- GET /api/products/:id
- GET /api/search?keyword=keyboard

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (requires token)

### Products

- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

### Orders

- POST /api/orders (requires token)
- GET /api/orders/me (requires token)
- GET /api/orders/all (admin only)
- PATCH /api/orders/:id/status (admin only)

## Sample request examples

### Register user

```json
{
  "name": "Test Buyer",
  "email": "testbuyer@example.com",
  "password": "pass123"
}
```

### Login user

```json
{
  "email": "admin@mstconnect.com",
  "password": "admin123"
}
```

### Create order

```json
{
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 2 }
  ]
}
```

## Data storage

This project stores data in:

- data/products.json
- data/users.json
- data/orders.json

The data persists across server restarts unless those files are deleted or modified.

## Notes

This is a good capstone backend foundation and can be extended with MongoDB, validation middleware, image uploads, or a frontend client.
