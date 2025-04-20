# 🛍️ E-Commerce Project

## 🚀 Overview
This is a fully functional **E-Commerce Website** built using **Next.js (TypeScript)**. It includes features like product listings, a shopping cart, authentication, and dark mode support.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication:** Firebase/Auth or NextAuth.js
- **API:** RTK Query / Axios
- **Icons & Animations:** React Icons, Framer Motion
- **Styling:** Tailwind CSS, ShadCN UI

## 📂 Project Structure
```
📦 e-commerce-project
 ┣ 📂 components
 ┃ ┣ 📜 Navbar.tsx
 ┃ ┣ 📜 Footer.tsx
 ┃ ┣ 📜 ProductCard.tsx
 ┃ ┣ 📜 Cart.tsx
 ┃ ┣ 📜 ThemeToggle.tsx
 ┣ 📂 pages
 ┃ ┣ 📜 index.tsx  (Home Page)
 ┃ ┣ 📜 cart.tsx   (Shopping Cart)
 ┃ ┣ 📜 product/[id].tsx  (Product Details)
 ┃ ┣ 📜 login.tsx  (User Authentication)
 ┣ 📂 styles
 ┃ ┣ 📜 globals.css
 ┣ 📂 utils
 ┃ ┣ 📜 fetchProducts.ts
 ┃ ┣ 📜 formatPrice.ts
 ┣ 📂 hooks
 ┃ ┣ 📜 useDarkMode.ts
 ┣ 📂 public
 ┃ ┣ 🖼️ images (Product Images)
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 tailwind.config.js
 ┣ 📜 next.config.js
 ┣ 📜 tsconfig.json
 ┣ 📜 README.md
```

## 🌟 Features
✅ **Product Listings & Details**  
✅ **Add to Cart & Checkout**  
✅ **User Authentication (Login/Signup)**  
✅ **Dark & Light Theme Support**  
✅ **Responsive UI with Tailwind CSS**  
✅ **Optimized SEO & Performance**  

## 🏗️ Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/e-commerce-project.git
   cd e-commerce-project
   ```

2. **Install Dependencies**
   ```bash
   npm install  # or yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev  # or yarn dev
   ```

4. **Open in Browser**  
   - Go to `http://localhost:3000/`

## 📸 Screenshots
| Light Mode 🌞  | Dark Mode 🌙  |
|---------------|--------------|
| ![Light Mode](public/screenshots/light-mode.png) | ![Dark Mode](public/screenshots/dark-mode.png) |

## 🚀 Deployment
Easily deploy on **Vercel**  
```bash
vercel
```

## 📌 License
This project is **MIT Licensed**.

---
💡 **Enjoy building your Next.js E-Commerce store! 🛍️🔥**