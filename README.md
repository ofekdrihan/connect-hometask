# connect-hometask

**RESTful API for managing items and categories**  
Built with **Node.js**, **Express**, and **MongoDB** (using **Mongoose**).

---

## Table of Contents
- [Overview](#overview)  
- [Project Structure](#project-structure)  
- [Setup & Running](#setup--running)  
- [API Endpoints](#api-endpoints)  
- [Examples](#examples)  
- [Future Improvements](#future-improvements)  
- [License](#license)

---

## Overview

A straightforward and maintainable REST API that supports CRUD operations and search for **items** and **categories**. It follows a clean directory structure—controllers, models, routes, and middleware—for ease of development and clarity.

---

## Project Structure

connect-hometask/
├── config/ # DB connection, environment config
├── controllers/ # Route handlers (CRUD logic)
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── middlewares/ # Middleware (e.g., API key validation, errors)
├── seed/ # Optional seed data scripts
├── app.js # Express app entry point
├── .env.sample # Sample environment variables file
├── package.json # Dependencies and scripts
└── .gitignore # Files to ignore in Git

---

## Setup & Running

1. Clone the repo:
   ```bash
   git clone https://github.com/ofekdrihan/connect-hometask.git
   cd connect-hometask

2. Install dependencies:
   npm install

3. Create a .env file based on .env.sample:
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/connect_api
   API_KEY=your_api_key_here

4. (Optional) Seed database:
   node seed/seed.js

5. Start the server:
   npm run # With nodemon for development

API Endpoints:

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| POST   | `/categories`                 | Create a new category               |
| GET    | `/categories/:id`             | Get category by ID (with items)     |
| POST   | `/items`                      | Create a new item                   |
| GET    | `/items`                      | List all items                      |
| GET    | `/items/:id`                  | Get item by ID                      |
| GET    | `/items/search?query=...`     | Search items by name or description |

All requests require the x-api-key header with a valid API key.

Examples:
Get all items:
GET http://localhost:3000/items
Headers:
  x-api-key: your_api_key_here

Search items:
GET http://localhost:3000/items/search?query=gym
Headers:
  x-api-key: your_api_key_here
