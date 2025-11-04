# Frontend Article Management

A React-based frontend application for managing articles. Features include **add, edit, delete (trash), preview published articles**, pagination, and notifications.

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [API Integration](#api-integration)  
- [Available Scripts](#available-scripts)  

---

## Features

- **Add Article** with status: `publish` or `draft`.  
- **Edit Article** with status management.  
- **Trash Article** with confirmation modal.  
- **Preview Published Articles** with pagination.  
- **View All Articles** filtered by status: `publish`, `draft`, `thrash`.  
- **Notifications** using `react-toastify`.  
- **Pagination** support for article lists.  

---

## Tech Stack

- React 19+  
- React Router DOM  
- Axios (for API calls)  
- TailwindCSS (for styling)  
- React Toastify (for notifications)  

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/rafaadila10/article-frontend.git
cd article-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

---

## Usage

- **Add Article**: Navigate to `/add`, fill the form, and click `Publish` or `Draft`.  
- **Edit Article**: Navigate to `/edit/:id`, update fields, and submit.  
- **Trash Article**: In "All Posts" table, click `Trash` → confirm modal → article moved to trash.  
- **Preview Articles**: Navigate to `/preview` to see all published articles with pagination.  
- **Pagination**: Use the Previous/Next buttons at the bottom of lists to navigate pages.  

---

## Folder Structure

```
article-frontend/
│
├─ src/
│  ├─ api/             # Axios API calls
│  ├─ components/      # Reusable components (ArticleTable, Buttons)
│  ├─ pages/           # React pages (AddArticle, EditArticle, AllPosts, PreviewArticles)
│  ├─ App.jsx          # Main app with routes
│  └─ index.jsx        # Entry point
│
├─ public/
├─ package.json
└─ tailwind.config.js
```

---

## API Integration

- **Get all articles**: `GET /articles?limit=10&offset=0`  
- **Get article by ID**: `GET /articles/:id`  
- **Create article**: `POST /articles`  
- **Update article**: `PUT /articles/:id`  
- **Delete article**: `DELETE /articles/:id`  

> Axios is used to handle all HTTP requests. Adjust the `API_URL` in `/src/api/articleService.js` to match your backend endpoint.  

---

## Available Scripts

```bash
npm start        # Start dev server
npm run build    # Build production version
npm run lint     # Run ESLint
```

---

## Notes

- Ensure the **backend API** is running and accessible before using the frontend.  
- The frontend expects the API to support **pagination** via `limit` and `offset` query parameters.  
- Notification toasts require `<ToastContainer />` included in your root layout or pages.

