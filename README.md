# DataNest Frontend

DataNest is a modern, full-stack CRUD dashboard application built with the MERN stack (MongoDB, Express, React, Node.js). This is the **frontend** (React) part of the project.

## Features
- Attractive dashboard UI with sidebar navigation and topbar
- Add, view, update, and delete items with rich fields (title, description, priority, category, status, due date, notes, assigned to, project, budget, location, quantity, warranty info, image upload)
- Pie chart and statistics for item status
- Recent activity feed
- Responsive and modern design
- Image upload with Cloudinary integration
- Modal dialogs for editing and deleting
- List/detail view switching

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- Backend API running (see `/datanest-backend`)

### Installation
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment Variables
- No special environment variables are needed for the frontend. Ensure the backend API is running at `http://localhost:5000` (or update the `API_URL` in `src/App.jsx` if needed).

## Project Structure
- `src/` - React source code
  - `components/` - Reusable UI components (ItemList, ItemForm, ItemDetail, dialogs)
  - `assets/` - Images and logo
  - `App.jsx` - Main app logic and dashboard layout
  - `App.css` - Custom styles

## Notes
- For image upload, ensure your backend is configured with Cloudinary and Multer.
- The dashboard is fully responsive and works on desktop and mobile.
- If you encounter CORS issues, check your backend CORS configuration.

## License
MIT
