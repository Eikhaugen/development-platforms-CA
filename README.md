# Development Platforms Course Assignment - Social Media Platform

This repository contains the course assignment for the Development Platforms course.

## Table of Contents:
- [Description](#description)
  - [Features](#features)
  - [Built With](#built-with)
- [Endpoints](#endpoints)
- [Installing](#installing)
  - [Running](#running)
- [Contact](#contact)

## Description

This project is a social media application built as part of the Development Platforms course assignment. The application consists of a backend API with Firestore as the database and a client-side frontend for interacting with the API. It supports user authentication, post management, and commenting functionality.

### Features:
- **User Authentication**:
  - Register new users with Firebase Authentication.
  - Login for existing users.
- **Post Management**:
  - Create new posts, including image uploads to Firebase Storage.
  - Delete posts (only the creator can delete them).
  - View a single post by ID, including comments.
- **Comment Management**:
  - Comment on a post.
  - View all comments for a specific post.
- **Profile Management**:
  - Update user bio, avatar, and banner image.
  - View the user's profile, including their posts.

### Built With:
- **Frontend**:
  - HTML
  - JavaScript
  - Vite
  - TailwindCSS
- **Backend**:
  - Node.js with Express
  - Firebase (Authentication, Firestore, Storage)

---

## Endpoints

### **User Endpoints**
| Method | Endpoint            | Description                         | Authenticated |
|--------|---------------------|-------------------------------------|---------------|
| POST   | `/users`            | Register a new user                | No            |
| GET    | `/users`            | Get all users                      | No            |
| GET    | `/users/:uid`       | Get a specific user's profile       | No            |
| PUT    | `/users/:uid`       | Update a user's profile            | Yes           |

### **Post Endpoints**
| Method | Endpoint            | Description                         | Authenticated |
|--------|---------------------|-------------------------------------|---------------|
| POST   | `/posts`            | Create a new post                  | Yes           |
| GET    | `/posts`            | Get all posts                      | No            |
| GET    | `/posts/:postId`    | Get a specific post by ID          | No            |
| GET    | `/posts?userId=`    | Get posts by a specific user ID     | No            |
| DELETE | `/posts/:postId`    | Delete a post                      | Yes           |

### **Comment Endpoints**
| Method | Endpoint                     | Description                         | Authenticated |
|--------|------------------------------|-------------------------------------|---------------|
| POST   | `/posts/:postId/comments`    | Add a comment to a specific post    | Yes           |
| GET    | `/posts/:postId/comments`    | Get all comments for a specific post | No            |

---

## Installing

This project is divided into two main folders:
- **Backend**: Contains the Express server and Firebase configuration.
- **Frontend**: Contains the Vite-based client-side application.

### Backend Installation
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Start the Express server:
    ```bash
    node index.js
    ```

4. The server will run on http://localhost:5000 by default (or another port defined in your environment variables).

### Frontend Installation
1. Navigate to the frontend directory
    ```bash
    cd frontend
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Start the Vite development server:
    ```bash
    npm run dev
    ```
4. The application will be available at http://localhost:3000 by default.

### Note:
- Ensure that both the backend and frontend servers are running for the application to function properly.
- The backend API is deployed on Render, and the frontend is deployed on Netlify for production environments.
- The .env files should be configured in both the backend and frontend folders for environment-specific settings.
- You will need to sign up on firebase, set up a database and add your serviceAccountKey.json to the backend root folder.
- You have to set up firebaseConfig in .env in frontend root folder, to use firebase auth, firestore and firebase storage.
