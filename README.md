This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# 🍽️ Pemony - Chat & Recipe App

Pemony is a **Next.js** application that combines **AI-powered chat** with a **recipe management system**. Users can chat with an AI assistant, save generated recipes, and manage their personal recipe collection.

## 🌟 Features

**Next.js (App Router)** – Modern React framework for a seamless experience.  
**TypeScript** – Ensures type safety across the application.  
**Tailwind CSS & Material UI** – Provides a stylish, responsive UI.  
**NextAuth.js** – Secure authentication for user accounts.  
**Prisma + Neon PostgreSQL** – Efficient database interactions.  
**Server Actions & API Routes** – Optimized backend logic.  
**Rate Limiting** – Prevents excessive API requests.  
**Dark Mode Support** – User-friendly UI customization.

## Performance Optimizations
Rate limiting: Applied via next-rate-limit in lib/rateLimit.ts.
Server Actions: Used where possible for improved performance.
SWR & Pagination: Efficient data fetching for recipes.

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/pemony/pemony-frontend.git
cd pemony-frontend
pnpm install

## Set Up Environment Variables
DATABASE_URL="your-neon-postgres-url"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
UPSTASH_REDIS_URL="your-upstash-redis-url"
UPSTASH_REDIS_TOKEN="your-upstash-redis-token"

## Initialize the Database
pnpm prisma format  // updates the prisma schema
pnpm prisma migrate dev --name init_schema  // or update a field with 'pnpm prisma migrate dev --name update_user_password' for example, and then Restart TypeScript Server (Press Cmd + Shift + P (Mac) or Ctrl + Shift + P (Windows/Linux)).
pnpm prisma generate  

## Run the Development Server
pnpm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints
## Chat API
GET	/api/chatsessions       Fetch user's chat sessions
POST	/api/chatsessions   Create a new chat session
GET	/api/messages	        Fetch chat messages
POST	/api/messages	    Send a message to AI

## Recipe API
GET	/api/recipes	        Fetch recipes (supports filtering & pagination)
POST	/api/recipes	    Save a new recipe
DELETE	/api/recipes/:id    Delete a recipe