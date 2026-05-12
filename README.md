# FreshMart - Grocery Delivery Platform

A modern, production-ready grocery delivery platform built with React, Express, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Modern Login/Signup system with persistent sessions.
- **Wishlist & Cart**: Full functionality with real-time updates and localStorage persistence.
- **Global Search**: Filter products by name, category, or keywords instantly.
- **UX Enhancements**: Smooth scrolling, page-top loading, and glassmorphism UI.
- **Responsive Design**: Optimized for all devices with premium aesthetics.

## 📁 Project Structure

```text
FreshMart/
├── frontend/        # React application (Vite)
├── backend/         # Express server
└── package.json     # Monorepo management scripts
```

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm run install-all
   ```

2. **Run the application**:
   - Both Frontend & Backend: `npm run dev`
   - Just Backend: `npm run dev-backend`

## 🚢 Deployment

### Important: Root Directory
When deploying to platforms like **Render**, **Vercel**, or **Netlify**, ensure you are deploying from the **repository root**, not from the `backend` or `frontend` folders.

#### Common Error: `cd frontend` failed
If you see an error like `Cannot find path.../backend/frontend`, it means your deployment service is starting in the `backend` folder instead of the root. 

**Fix**: Set the **Root Directory** to `.` (the root of the project) in your deployment settings.

### Deployment Commands

- **Build Command**: `npm run build-frontend`
- **Start Command**: `npm run start-backend`

## 📄 License

This project is licensed under the MIT License.
