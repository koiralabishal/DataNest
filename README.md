# DataNest - MERN Stack Dashboard Application

## Overview

**DataNest** is a modern, full-stack CRUD dashboard application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to manage items with rich metadata, file uploads, and provides a visually attractive dashboard UI with analytics and activity feeds. The project is split into two main parts: a backend API and a frontend React application.

---

## MERN Principle

**MERN** stands for:
- **MongoDB**: NoSQL database for storing application data as documents.
- **Express.js**: Web application framework for Node.js, used to build the backend API.
- **React.js**: Frontend JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime environment for running server-side code.

The MERN stack enables end-to-end development using JavaScript/JSX for both client and server, providing a seamless and efficient workflow for modern web applications.

---

## MVC Principle

**MVC (Model-View-Controller)** is a software architectural pattern that separates an application into three main logical components:
- **Model**: Manages the data and business logic (e.g., Mongoose models in the backend, such as `Item.js`).
- **View**: Handles the display and user interface (e.g., React components in the frontend, such as `ItemList.jsx`, `ItemForm.jsx`).
- **Controller**: Processes user input, interacts with the model, and returns the output (e.g., Express route handlers in `itemRoutes.js`).

In DataNest:
- The **backend** follows MVC by separating Mongoose models (Model), Express route handlers (Controller), and the API responses (View for API consumers).
- The **frontend** acts as the View layer for the user, rendering data and handling user interactions via React components.

This separation improves maintainability, scalability, and clarity of the codebase.

---

## Features

- **CRUD Operations**: Create, Read, Update, Delete items.
- **Rich Item Fields**: Title, description, priority, category, status, due date, notes, assigned to, project, budget, location, quantity, warranty info, image upload.
- **Image Upload**: Images are uploaded to Cloudinary and displayed in the UI.
- **Dashboard UI**: Sidebar navigation, topbar, stat cards, pie chart, and recent activity feed.
- **Analytics**: Pie chart for item status, overdue item count (pending only), and other statistics.
- **Recent Activity**: Feed of the 5 most recent items.
- **Responsive Design**: Works on desktop and mobile.
- **Modal Dialogs**: For editing and deleting items.
- **List/Detail View**: Switch between item list and detailed view.
- **.gitignore**: Properly configured for both frontend and backend.

---

## Architecture

```
+-------------------+        REST API        +-------------------+
|    React Frontend | <-------------------> |   Express Backend |
|  (datanest-frontend)                      | (datanest-backend)|
+-------------------+                       +-------------------+
         |                                         |
         |                                         |
         v                                         v
   User's Browser                          MongoDB Database
                                            (Cloud)
         |
         v
   Cloudinary (for image uploads)
```

---

## Project Structure

```
DataNest/
  datanest-backend/
    .gitignore
    config/
      cloudinary.js
      db.js
    middleware/
      upload.js
    models/
      Item.js
    routes/
      itemRoutes.js
    server.js
    package.json
    .env.example
  datanest-frontend/
    .gitignore
    public/
      favicon.png
    src/
      assets/
        datanestlogo.png
        data-storage.jpg
      components/
        ItemForm.jsx
        ItemList.jsx
        ItemDetail.jsx
        DeleteDialog.jsx
        EditDialog.jsx
      App.jsx
      App.css
      index.css
      main.jsx
    package.json
    README.md
  README.md (this file)
```

---

## Backend Setup (datanest-backend)

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB Atlas or local MongoDB instance
- Cloudinary account (for image uploads)

### Installation & Running
1. `cd datanest-backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your MongoDB and Cloudinary credentials:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   # or
   node server.js
   ```
5. The API will be available at `http://localhost:5000/api/items`

### Key Backend Files
- `server.js`: Main Express server setup
- `config/db.js`: MongoDB connection logic
- `config/cloudinary.js`: Cloudinary configuration
- `middleware/upload.js`: Multer middleware for file uploads
- `models/Item.js`: Mongoose schema for items
- `routes/itemRoutes.js`: REST API endpoints for CRUD operations

---

## Frontend Setup (datanest-frontend)

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Backend API running (see above)

### Installation & Running
1. `cd datanest-frontend`
2. `npm install`
3. `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Key Frontend Files
- `src/App.jsx`: Main app logic and dashboard layout
- `src/components/`: All UI components (ItemForm, ItemList, ItemDetail, dialogs)
- `src/assets/`: Images and logo
- `src/App.css`: Custom styles

---

## Environment Variables

### Backend (`datanest-backend/.env`)
- `MONGO_URI`: MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Cloudinary credentials
- `PORT`: Port for backend server (default: 5000)

### Frontend
- No special environment variables are needed. The API URL is set to `http://localhost:5000/api/items` in `src/App.jsx`. Change if your backend runs elsewhere.

---

## Usage Notes
- The backend must be running for the frontend to function.
- For image upload, Cloudinary credentials must be set in the backend.
- The dashboard is fully responsive and works on all modern browsers.
- Overdue items in the dashboard are only counted for items with status 'Pending' and either a due date in the past or created after the due date.
- If there is no data, the dashboard will show clear warning messages in the analytics sections.

---

## License
MIT
