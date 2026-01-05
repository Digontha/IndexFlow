# IndexFlow Backend Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

IndexFlow Backend is a robust and scalable server-side application designed to manage indexing, search operations, and data management. Built with modern technologies, it provides RESTful APIs for seamless integration with frontend applications and third-party services.

### Technology Stack
- **Runtime**: Node.js / Python / Java (specify based on your stack)
- **Framework**: Express.js / Django / Spring Boot (specify based on your stack)
- **Database**: PostgreSQL / MongoDB / MySQL (specify based on your stack)
- **Caching**: Redis
- **Authentication**: JWT
- **API Documentation**: OpenAPI/Swagger

## Project Structure

```
backend/
├── src/
│   ├── api/
│   │   ├── controllers/          # Request handlers
│   │   ├── routes/               # API route definitions
│   │   ├── middleware/           # Custom middleware
│   │   └── validators/           # Input validation
│   ├── services/
│   │   ├── indexService.js       # Indexing logic
│   │   ├── searchService.js      # Search operations
│   │   ├── authService.js        # Authentication
│   │   └── dataService.js        # Data management
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Index.js              # Index model
│   │   ├── Document.js           # Document model
│   │   └── schemas.js            # Database schemas
│   ├── utils/
│   │   ├── logger.js             # Logging utility
│   │   ├── errorHandler.js       # Error handling
│   │   ├── validators.js         # Validation helpers
│   │   └── helpers.js            # Utility functions
│   ├── config/
│   │   ├── database.js           # Database configuration
│   │   ├── server.js             # Server configuration
│   │   └── constants.js          # Application constants
│   ├── migrations/               # Database migrations
│   ├── tests/
│   │   ├── unit/                 # Unit tests
│   │   ├── integration/          # Integration tests
│   │   └── fixtures/             # Test data
│   └── app.js                    # Application entry point
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies and scripts
├── README.md                     # This file
├── docker-compose.yml            # Docker configuration
└── Dockerfile                    # Docker image definition
```

## Features

### Core Features

#### 1. **Index Management**
- Create, read, update, and delete indexes
- Support for multiple index types and configurations
- Real-time index monitoring and statistics
- Batch index operations

#### 2. **Search Capabilities**
- Full-text search support
- Advanced filtering and sorting
- Pagination and result limiting
- Search suggestions and autocomplete
- Search analytics and tracking

#### 3. **Document Management**
- Upload and manage documents
- Bulk document operations
- Document versioning
- Metadata extraction and storage

#### 4. **Authentication & Authorization**
- JWT-based authentication
- Role-based access control (RBAC)
- API key management
- Multi-level user permissions

#### 5. **Data Management**
- Data import/export functionality
- Data validation and sanitization
- Backup and recovery operations
- Data retention policies

#### 6. **Performance & Caching**
- Redis-based caching layer
- Query result caching
- Automatic cache invalidation
- Performance monitoring

#### 7. **Monitoring & Logging**
- Comprehensive application logging
- Request/response logging
- Performance metrics tracking
- Error tracking and alerts

## Installation

### Prerequisites
- Node.js v16+ (or appropriate runtime for your stack)
- npm or yarn package manager
- PostgreSQL 12+ (or configured database)
- Redis 6+
- Git

### Steps

1. **Clone the Repository**
```bash
git clone https://github.com/Digontha/IndexFlow.git
cd IndexFlow/backend
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
nano .env  # or use your preferred editor
```

4. **Database Setup**
```bash
# Create database
npm run db:create

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

5. **Start the Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on the configured port (default: 3000) and display:
```
Server running on http://localhost:3000
Database connected successfully
```

### Using Docker

```bash
# Build the Docker image
docker build -t indexflow-backend .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f backend
```

## Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=indexflow
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=24h
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRY=7d

# API Configuration
API_VERSION=v1
API_RATE_LIMIT=100
API_TIMEOUT=30000

# Logging
LOG_LEVEL=info
LOG_DIR=./logs

# File Upload
MAX_FILE_SIZE=52428800  # 50MB in bytes
UPLOAD_DIR=./uploads

# CORS Configuration
CORS_ORIGIN=http://localhost:3001
CORS_METHODS=GET,POST,PUT,DELETE,PATCH
CORS_CREDENTIALS=true

# Email Configuration (if applicable)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password

# External Services
SEARCH_ENGINE_URL=http://elasticsearch:9200
STORAGE_BUCKET=indexflow-storage

# Security
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret
```

### Database Configuration

Update `src/config/database.js`:
```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: { min: 2, max: 10 },
    migrations: { directory: './migrations' },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 5, max: 20 },
    migrations: { directory: './migrations' },
  },
};
```

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "role": "user"
    }
  }
}
```

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully"
}
```

#### Refresh Token
```
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "new_token_here",
    "refreshToken": "new_refresh_token"
  }
}
```

### Index Endpoints

#### List Indexes
```
GET /indexes
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "index-1",
      "name": "products",
      "type": "document",
      "createdAt": "2026-01-05T10:57:05Z",
      "documentCount": 1250,
      "size": "2.5MB"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5
  }
}
```

#### Get Index Details
```
GET /indexes/:indexId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "index-1",
    "name": "products",
    "type": "document",
    "config": {...},
    "stats": {...}
  }
}
```

#### Create Index
```
POST /indexes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "products",
  "type": "document",
  "config": {
    "mappings": {...},
    "settings": {...}
  }
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "index-1",
    "name": "products",
    "createdAt": "2026-01-05T10:57:05Z"
  }
}
```

#### Update Index
```
PUT /indexes/:indexId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "products-updated",
  "config": {...}
}

Response: 200 OK
{
  "success": true,
  "message": "Index updated successfully"
}
```

#### Delete Index
```
DELETE /indexes/:indexId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Index deleted successfully"
}
```

### Search Endpoints

#### Execute Search
```
POST /search
Authorization: Bearer <token>
Content-Type: application/json

{
  "indexId": "index-1",
  "query": "laptop",
  "filters": {
    "category": "electronics",
    "price": {
      "min": 100,
      "max": 2000
    }
  },
  "sort": {
    "field": "relevance",
    "order": "desc"
  },
  "page": 1,
  "limit": 20
}

Response: 200 OK
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "doc-1",
        "title": "Gaming Laptop",
        "score": 0.95,
        "fields": {...}
      }
    ],
    "total": 42,
    "executionTime": "125ms"
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

#### Get Suggestions
```
POST /search/suggestions
Authorization: Bearer <token>
Content-Type: application/json

{
  "indexId": "index-1",
  "prefix": "lap",
  "field": "title",
  "limit": 5
}

Response: 200 OK
{
  "success": true,
  "data": [
    "laptop",
    "laptop bag",
    "laptop stand",
    "laptop cooling pad",
    "laptop backpack"
  ]
}
```

### Document Endpoints

#### Upload Document
```
POST /documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <binary file>
- indexId: index-1
- metadata: {"title": "Document Title"}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "doc-1",
    "indexId": "index-1",
    "filename": "document.pdf",
    "size": 1024000,
    "uploadedAt": "2026-01-05T10:57:05Z"
  }
}
```

#### List Documents
```
GET /documents?indexId=index-1&page=1&limit=10
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

#### Get Document Details
```
GET /documents/:documentId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "doc-1",
    "indexId": "index-1",
    "filename": "document.pdf",
    "metadata": {...}
  }
}
```

#### Delete Document
```
DELETE /documents/:documentId
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Document deleted successfully"
}
```

### User Endpoints

#### Get Current User
```
GET /users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "user-1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2025-12-01T10:57:05Z"
  }
}
```

#### Update User Profile
```
PUT /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "+1234567890"
}

Response: 200 OK
{
  "success": true,
  "message": "Profile updated successfully"
}
```

#### Change Password
```
POST /users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "currentPassword123",
  "newPassword": "newPassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Health Check

#### Server Health
```
GET /health
Authorization: Optional

Response: 200 OK
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2026-01-05T10:57:05Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "search_engine": "connected"
  }
}
```

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- src/tests/unit/services

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Code Style & Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format code
npm run format
```

### Development Tools

```bash
# Start development server with hot reload
npm run dev

# Debug mode
npm run debug

# Generate API documentation
npm run docs:generate

# Watch for file changes and run tests
npm run test:watch
```

### Creating Migrations

```bash
# Create new migration
npm run migrate:create create_indexes_table

# Run pending migrations
npm run migrate:latest

# Rollback last migration
npm run migrate:rollback
```

## Deployment

### Production Build

```bash
# Build optimized production version
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t indexflow-backend:latest .

# Push to registry
docker push your-registry/indexflow-backend:latest

# Deploy using Docker Compose
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment for Production

Update `.env` with production values:
```env
NODE_ENV=production
DB_SSL=true
LOG_LEVEL=error
API_RATE_LIMIT=1000
```

### Monitoring & Logging

```bash
# View application logs
tail -f logs/application.log

# View error logs
tail -f logs/error.log

# Monitor performance
npm run monitor
```

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Check DB credentials in `.env`
- Verify database exists: `createdb indexflow`

#### Redis Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**Solution:**
- Start Redis: `redis-server`
- Check Redis configuration in `.env`
- Verify Redis is accessible on configured port

#### JWT Token Issues
```
Error: Invalid token
```

**Solution:**
- Verify JWT_SECRET is set in `.env`
- Check token expiration: `JWT_EXPIRY`
- Use refresh endpoint to get new token

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
- Kill process on port: `lsof -ti:3000 | xargs kill -9`
- Use different port: `PORT=3001 npm start`

#### Out of Memory
```
Error: JavaScript heap out of memory
```

**Solution:**
- Increase Node memory: `NODE_OPTIONS=--max-old-space-size=4096 npm start`
- Optimize database queries
- Clear cache: `redis-cli FLUSHALL`

### Debug Mode

Enable detailed logging:
```bash
DEBUG=indexflow:* npm run dev
```

### Performance Issues

```bash
# Profile application
node --prof app.js

# Analyze profiling data
node --prof-process isolate-*.log > profile.txt

# Monitor with clinic.js
clinic doctor -- npm start
```

## Support & Contributing

For issues and contributions:
- GitHub Issues: https://github.com/Digontha/IndexFlow/issues
- Pull Requests: https://github.com/Digontha/IndexFlow/pulls
- Documentation: See main repository README

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Contact

For questions or support:
- Email: support@indexflow.dev
- GitHub: @Digontha
- Issues: https://github.com/Digontha/IndexFlow/issues

---

**Last Updated:** 2026-01-05
**Version:** 1.0.0
