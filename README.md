# 🚀 ProductPilot &nbsp;![Next.js](https://img.shields.io/badge/Next.js-000?style=flat&logo=nextdotjs) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb) ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A29E4?style=flat&logo=tailwindcss) ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> 🛒 **A modern, full-stack product management app with authentication, beautiful UI, and seamless UX.**

---

## ✨ Features

- ⚡️ **Next.js App Router & API routes**
- 🔐 **NextAuth.js authentication (Google & credentials)**
- 🍃 **MongoDB/Mongoose product storage**
- 🎨 **DaisyUI + Tailwind CSS for modern UI**
- 🔔 **Toast notifications (react-hot-toast)**
- ⏳ **Loading spinners for async actions**
- 📱 **Responsive & accessible design**

---

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Product_Pilot.git
   cd Product_Pilot
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your MongoDB URI and NextAuth secrets/providers.
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🗺️ Route Summary

| 🔗 Route                 | 🔒 Access    | 📄 Description                                                 |
| ------------------------ | ------------ | -------------------------------------------------------------- |
| `/`                      | 🌐 Public    | Landing page with Navbar, Hero, Product Highlights, and Footer |
| `/login`                 | 🌐 Public    | Login page (Google & credentials, redirects to `/products`)    |
| `/signup`                | 🌐 Public    | Register a new account                                         |
| `/products`              | 🌐 Public    | Product list with search, filter, and details button           |
| `/products/[id]`         | 🌐 Public    | Product details page with full info and image gallery          |
| `/dashboard/add-product` | 🔑 Protected | Add product form (requires login, stores to database)          |

---

## 💡 Why ProductPilot?

- 🧑‍💻 **Developer-friendly**: Clean code, modular structure, easy to extend
- 🖥️ **Modern UI**: DaisyUI + Tailwind for a beautiful, accessible experience
- 🔄 **Full CRUD**: Add, view, and manage products with ease
- 🌍 **Open Source**: MIT licensed, ready for your next project