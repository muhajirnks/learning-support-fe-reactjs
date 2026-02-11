# 🚀 React TypeScript Starter Template

> Modern React application built with TypeScript and powerful UI libraries

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.x-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [License](#-license)

---

## 🎯 About

**React TypeScript Starter Template** is a modern, ready-to-use boilerplate for quickly starting web application development. This template combines the best technologies in the React ecosystem to provide an optimal development experience.

### Why use this template?

- ⏱️ **Save Time** - Initial setup is complete, so focus on features immediately
- 🏗️ **Best Practices** - Folder structure and configuration follow industry standards
- 🔧 **Fully Configured** - Prettier and TypeScript are preconfigured
- 🎨 **Styling Flexibility** - MUI for ready-to-use components, Tailwind for custom styling
- 📦 **Production Ready** - Docker support and optimized for deployment

---

## 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| **React 19** | JavaScript library for building user interfaces |
| **TypeScript** | JavaScript superset with static typing |
| **Material UI (MUI)** | Component library with Material Design design |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** | Lightweight state management |
| **Formik** | Form handling dan validation |
| **Yup** | Schema validation |
| **React Icons** | Popular icon library |
| **Docker** | Containerization for easy deployment |

---

## ✨ Features

- 🎨 **Modern UI** - Combination of MUI and Tailwind for a consistent look
- 📱 **Responsive Design** - Optimal on all screen sizes
- 🔒 **Type Safety** - Full TypeScript support
- 📝 **Form Validation** - Robust form validation with Formik & Yup
- ⚡ **Fast State Management** - Light state management with Zustand
- 🎯 **Clean Architecture** - Organized folder structure

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (v22 atau lebih baru)
- npm or yarn or pnpm

### Installation

1. **Clone repository**

```bash
git clone git@github.com:xnine-id/react-template.git <project-name>
cd <project-name>
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

4. **Run development server**

```bash
npm run dev
```

5. **Open browser**

Open [http://localhost:5173](http://localhost:5173) to view the application.

---

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
│   ├── forms/        # Form-related components
│   └── layout/       # Layout components
├── configs/          # Routes, MUI, and sidebar menu configuration
├── hooks/            # Custom React hooks
├── layouts/          # Layout Components
├── lib/              # External library configuration & instances
├── middleware/       # Wrapper components for route protection (auth, roles, etc.)
├── pages/            # Page components
├── services/         # API services
├── store/            # Zustand store
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── validations/      # Yup validation schemas
└── main.tsx          # Entry point
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/amuhajirs">amuhajirs</a>
</p>
