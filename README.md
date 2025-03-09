# Project - MarketVerse

**MarketVerse** is a dynamic e-commerce platform built with Next.js, where users can seamlessly buy and sell products. Whether you want to shop for quality goods or become a seller to showcase your products, MarketVerse provides a smooth and intuitive experience. With secure transactions, user-friendly navigation, and a robust marketplace, MarketVerse empowers individuals to connect, trade, and grow their businesses effortlessly.

> [!WARNING] 
> This project is created for **learning purposes** to explore and implement various web development and DevOps technologies.

# Table of Contents

- [Project - MarketVerse](#project---marketverse)
- [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend \& API](#backend--api)
    - [Development \& Build Tools](#development--build-tools)
  - [DevOps \& Deployment](#devops--deployment)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Future Plans](#future-plans)
  - [How To Setup This Project](#how-to-setup-this-project)
    - [Local Development Setup](#local-development-setup)
      - [1. Clone the Repository](#1-clone-the-repository)
      - [2. Install Dependencies](#2-install-dependencies)
      - [3. Set Up Environment Variables](#3-set-up-environment-variables)
      - [4. Generate and Push Schema to Database](#4-generate-and-push-schema-to-database)
      - [5. Run the Development Server](#5-run-the-development-server)
      - [6. Access the Application](#6-access-the-application)
    - [Docker Development Setup](#docker-development-setup)
      - [1. Clone the Repository](#1-clone-the-repository-1)
      - [2. Build the Docker Image](#2-build-the-docker-image)
      - [3. Create Docker Network](#3-create-docker-network)
      - [4. Set Up PostgreSQL Database](#4-set-up-postgresql-database)
      - [5. Initialize Database Schema](#5-initialize-database-schema)
      - [6. Run the Container](#6-run-the-container)
      - [Using Docker Compose](#using-docker-compose)
  - [Author](#author)

## Prerequisites

Before running MarketVerse, ensure you have the following installed:

- **Node.js** (>= 18.0.0) → [Download Here](https://nodejs.org/)
- **Docker** & **Docker Compose** → [Install Guide](https://docs.docker.com/get-docker/)
- **PostgreSQL** (>= 14) → [Setup Guide](https://www.postgresql.org/download/)
- **Cloudinary Account** → [Sign Up](https://cloudinary.com/) (For image uploads)
- **Clerk Account** → [Sign Up](https://clerk.dev/) (For authentication)

## Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Animations:** [Typed.js](https://mattboldt.com/demos/typed-js/)
- **Data Fetching & State Management:** [TanStack Query](https://tanstack.com/query/latest)

### Backend & API
- **Database ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Storage:** [Cloudinary](https://cloudinary.com/)
- **Authentication:** [Clerk](https://clerk.dev/)
- **Email Service:** [Nodemailer](https://nodemailer.com/)

### Development & Build Tools
- **Code Quality:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **Bundling & Transpilation:** TSX, PostCSS

## DevOps & Deployment
- **Containerization & Orchestration:**
  - [Docker](https://www.docker.com/)
  - [Kubernetes (K8s)](https://kubernetes.io/)
  - [Minikube](https://minikube.sigs.k8s.io/docs/)

- **Infrastructure as Code (IaC):**
  - [Terraform](https://www.terraform.io/)
  - [Ansible](https://www.ansible.com/)

- **CI/CD Pipeline & Automation:**
  - [Jenkins](https://www.jenkins.io/)
  - Shell Scripting
  - Linux (Ubuntu/Debian)

- **Monitoring & Logging:**
  - [Grafana](https://grafana.com/)
  - [Prometheus](https://prometheus.io/)

- **Cloud & Hosting:**
  - [AWS EC2](https://aws.amazon.com/ec2/)
  - [Helm](https://helm.sh/) (for Kubernetes package management)
  - [Vercel](https://vercel.com/) (Frontend hosting)

## Features

- 🛍️ Buy & sell products effortlessly
- 🔒 Secure authentication with **Clerk**
- 📸 Image management using **Cloudinary**
- 📩 Email notifications with **Nodemailer**
- 📦 PostgreSQL with **Drizzle ORM** for efficient data handling
- 🌗 Dark Mode support with **Next-Themes**
- ⚡ Lightning-fast UI with **React, Tailwind CSS & Shadcn UI**
- 🛠️ Fully containerized and orchestrated using **Docker & Kubernetes**

## Project Structure

```
src
├── app
│   ├── api
│   │   ├── (buyer)
│   │   │   └── user
│   │   │       ├── add-user
│   │   │       ├── address-user
│   │   │       │   ├── default
│   │   │       │   └── [email]
│   │   │       ├── get-user
│   │   │       ├── payment
│   │   │       │   ├── unlink
│   │   │       │   │   └── [username]
│   │   │       │   └── [email]
│   │   │       ├── update-user
│   │   │       └── upload-image
│   │   ├── (seller)
│   │   │   ├── add-product
│   │   │   ├── check
│   │   │   ├── delete
│   │   │   ├── delete-products
│   │   │   │   └── [id]
│   │   │   ├── details
│   │   │   ├── get-products
│   │   │   ├── login
│   │   │   ├── order
│   │   │   │   ├── accept-orders
│   │   │   │   │   └── [orderId]
│   │   │   │   ├── decline-orders
│   │   │   │   │   └── [orderId]
│   │   │   │   ├── delivered-orders
│   │   │   │   │   └── [orderId]
│   │   │   │   ├── get-approve-orders
│   │   │   │   │   └── [email]
│   │   │   │   ├── get-decline-orders
│   │   │   │   │   └── [email]
│   │   │   │   ├── get-delivered-orders
│   │   │   │   │   └── [email]
│   │   │   │   └── get-orders
│   │   │   │       └── [email]
│   │   │   ├── payment
│   │   │   │   ├── unlink
│   │   │   │   │   └── [username]
│   │   │   │   └── [email]
│   │   │   ├── update
│   │   │   └── upload
│   │   ├── cron
│   │   │   └── newsletter
│   │   ├── newsletter
│   │   └── products
│   │       ├── cart
│   │       │   ├── add
│   │       │   ├── fetch
│   │       │   └── remove
│   │       ├── fetch
│   │       ├── order
│   │       │   ├── auto-cancel
│   │       │   ├── cancel
│   │       │   │   └── [orderId]
│   │       │   └── [email]
│   │       ├── review
│   │       │   └── [no]
│   │       ├── wishlist
│   │       │   ├── add
│   │       │   ├── fetch
│   │       │   └── remove
│   │       └── [no]
│   ├── common
│   │   ├── address
│   │   ├── cart
│   │   ├── orders
│   │   ├── payment
│   │   ├── profile
│   │   └── wishlist
│   ├── dashboard
│   │   ├── list
│   │   ├── order
│   │   │   ├── accept
│   │   │   ├── complete
│   │   │   ├── decline
│   │   │   └── pending
│   │   ├── payment
│   │   ├── profile
│   │   └── view
│   └── products
│       ├── buynow
│       │   └── [id]
│       ├── explore
│       └── [no]
├── components
│   ├── custom
│   │   ├── products
│   │   └── skeleton
│   ├── theme
│   └── ui
├── db
├── hooks
├── lib
├── service
│   ├── buyer-detail
│   ├── product-detail
│   └── seller-detail
├── types
│   ├── api
│   ├── products
│   └── schema
├── utils
└── validation
    └── schema 
```

Each folder serves a specific purpose:
- **app/api** → Handles all API endpoints
- **components/** → Reusable UI components
- **service/** → Business logic for buyers, products, and sellers
- **db/** → Database-related files
- **utils/** → Helper functions
- **validation/** → Schema validation

This structured approach ensures scalability and ease of maintenance.

## Future Plans

> [!IMPORTANT]
> These technologies are planned for future implementation.

- [x] Docker
- [ ] Kubernetes (Minikube)
- [ ] Jenkins
- [ ] Shell Scripting
- [ ] Linux
- [ ] Helm
- [ ] AWS EC2
- [ ] Terraform
- [ ] Ansible
- [ ] Grafana
- [ ] Prometheus
- [ ] GraphQL (Planned)
- [ ] Redis (Planned)

## How To Setup This Project 

### Local Development Setup

Follow these steps to set up the project on your local machine:

#### 1. Clone the Repository

```bash
# Clone the project repository
git clone https://github.com/Anonymous-2009/marketverse.git
cd marketverse

# For a specific branch
git clone -b main https://github.com/Anonymous-2009/marketverse.git
cd marketverse
```

#### 2. Install Dependencies

```bash
npm install # for npm 
# or
bun install # for bun 
# or
yarn install # for yarn 
# or
pnpm install # for pnpm 
```

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```bash
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database configuration (PostgreSQL)
DATABASE_URL=

# Cloudinary configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Nodemailer configuration
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

#### 4. Generate and Push Schema to Database

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

#### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### 6. Access the Application

> [!NOTE] 
> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Development Setup

#### 1. Clone the Repository

```bash
# Clone the project repository
git clone https://github.com/Anonymous-2009/marketverse.git
cd marketverse

# For a specific branch
git clone -b main https://github.com/Anonymous-2009/marketverse.git
cd marketverse
```

#### 2. Build the Docker Image

```bash
docker build --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here -t marketverse:latest .
``` 

#### 3. Create Docker Network

Create a Docker network to enable communication between containers:

```bash
docker network create marketverse-network -d bridge
```

#### 4. Set Up PostgreSQL Database

```bash
# Create a volume for persistent data
docker volume create marketverse-data

# Run PostgreSQL container
docker run -d \
  --name marketverse-database \
  --network marketverse-network \
  -p 5400:5432 \
  -e POSTGRES_USER=something \
  -e POSTGRES_PASSWORD=something \
  -e POSTGRES_DB=marketverse \
  -v marketverse-data:/var/lib/postgresql/data \
  postgres
```

#### 5. Initialize Database Schema

*For Linux :* Connect to the database container and run the following commands:

```bash
pnpm exec drizzle-kit generate
pnpm exec drizzle-kit push
```

#### 6. Run the Container 

```bash
docker run --name marketverse --network marketverse-network -d \
-p 3000:3000 \
-e CLERK_SECRET_KEY=your_clerk_secret \
-e DATABASE_URL=postgresql://something:something@marketverse-database:5432/marketverse \
-e NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name \
-e CLOUDINARY_API_KEY=your_cloudinary_key \
-e CLOUDINARY_API_SECRET=your_cloudinary_secret \
-e SMTP_HOST=your_smtp_host \
-e SMTP_PORT=your_smtp_port \
-e SMTP_USER=your_smtp_user \
-e SMTP_PASSWORD=your_smtp_password \
-e SMTP_FROM=your_smtp_from \
marketverse:latest
```

#### Using Docker Compose

Create a `.env` file in the root directory and add your environment variables for Docker Compose:

```env
DATABASE_URL="postgresql://something:something@marketverse-database:5432/marketverse"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

Then run:

```bash
docker-compose up --build -d 
```

> [!NOTE] 
> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

**Anonymous**  
📧 Email: [anonymous292009@gmail.com](mailto:anonymous292009@gmail.com)  
🔗 GitHub: [https://github.com/Anonymous-2009](https://github.com/Anonymous-2009)