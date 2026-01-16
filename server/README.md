# Backend Server

Backend API built with Node.js, Express, TypeScript, and Prisma.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file based on `.env.example` and configure your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/trabalho_final_gc?schema=public"
```

3. Run Prisma migrations:
```bash
npm run prisma:migrate
```

4. Seed the database with initial data:
```bash
npm run prisma:seed
```

5. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Products

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
  ```json
  {
    "name": "Product Name",
    "price": 49.99,
    "imageUrl": "/path/to/image.jpg",
    "categoryId": "category-id"
  }
  ```
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories

- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
  ```json
  {
    "name": "Category Name"
  }
  ```

### Health Check

- `GET /health` - Server health check
- `GET /api` - API information

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run typecheck` - Type check without building
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with initial data

