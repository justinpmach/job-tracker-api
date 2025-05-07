# Job Application Tracker

A simple full-stack application to track your job applications,

## 🚀 Features

- **User Authentication**: Sign up / log in with JWT-based auth.
- **CRUD Operations**: Create, view, update, and delete job applications.
- **Status Tracking**: `applied`, `interviewing`, `offer`, `rejected`.
- **Filtering & Sorting**: By company, status, and application date.
- **Notes**: Add text notes to each application.
- **Tags** (future): Label applications (e.g., frontend, remote).
- **Email Reminders** (future): Notify on stagnant applications.

## 🛠️ Tech Stack
- **Language & Runtime**: TypeScript, Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Cache / Queue**: Redis (optional)
- **Testing**: Jest, Supertest
- **Deployment**: Render / Railway
- **CI/CD**: Github Actions

## 📋 Prerequisites
- Node.js v16+ and npm/yarn
- PostgreSQL database
- (Optional) Redis server

## 🔧 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/justinpmach/job-tracker-api.git
   cd job-tracker-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or yarn
   ```
3. **Configure environment**
  - Copy .env.example to .env
  - Fill in the variables (database URL, JWT secret, Redis URL, etc.)
4. **Database Migrations & Prisma Client**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. **Start the development server**
   ```bash
   npm run dev
   # or yarn dev
   ```

## 🧪 Running Tests
   ```bash
   npm run test
   # or yarn test
   ```

## 🚢 Deployment
- Ensure your production .env has NODE_ENV=production and secure secrets.
- Push to your Git provider and connect via Render or Railway.
- Add build commands: npm run build and start: npm start.