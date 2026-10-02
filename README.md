# MSTConnect PH Capstone 3

This project is a capstone web app collection built around a main landing page and three interactive mini-apps. It combines a simple Express API with front-end pages for product browsing, task management, and student record viewing.

## Overview

The app starts from the main landing page at `http://localhost:3000/`, which acts as a hub to access:

- Product Category
- Task Manager
- Student Record Viewer

## Included apps

### 1. Product Category
- Product catalog layout with a clean dashboard design
- Search by keyword
- Add new products
- Product cards with name, price, and category
- Local persistence using browser storage

### 2. Task Manager / To-Do App
- Add tasks with optional due dates
- Toggle task completion
- Filter by all, pending, and completed tasks
- Search tasks in real time
- Delete tasks and clear completed ones

### 3. Student Record Viewer
- Student dashboard with total count, average GPA, and top course
- Search by student name or course
- Sort by name, GPA, or year
- Card-based record list with academic details

## Full-stack support

The project also includes an Express.js API for product, authentication, and order management.

## Project structure

- `index.html` — capstone landing page
- `product-category.html` — product catalog app
- `task-manager.html` — to-do app
- `student-record.html` — student record app
- `server.js` — server entry point
- `src/` — routes, controllers, middleware, and stores
- `data/` — JSON-based persistence files

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open the app in your browser:

   - Home page: `http://localhost:3000/`
   - Product Category: `http://localhost:3000/product-category.html`
   - Task Manager: `http://localhost:3000/task-manager.html`
   - Student Record: `http://localhost:3000/student-record.html`

## API endpoints

### Public

- `GET /`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/search?keyword=keyboard`

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires token)

### Products

- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Orders

- `POST /api/orders` (requires token)
- `GET /api/orders/me` (requires token)
- `GET /api/orders/all` (admin only)
- `PATCH /api/orders/:id/status` (admin only)

## Default admin account

- Email: `admin@mstconnect.com`
- Password: `admin123`

## Data storage

The app stores data in:

- `data/products.json`
- `data/users.json`
- `data/orders.json`

## Notes

This capstone project demonstrates a multi-page front-end interface with supporting backend functionality. It is useful for school projects, learning full-stack development, and extending into a larger e-commerce or productivity app in the future.
