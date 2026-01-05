import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Middleware Setup
 */

// Helmet - Secure HTTP headers
app.use(helmet());

// CORS - Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body Parser - Parse JSON and URL-encoded request bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Compression - Compress response bodies
app.use(compression());

// Morgan - HTTP request logger
app.use(
  morgan(NODE_ENV === 'production' ? 'combined' : 'dev', {
    skip: (req: Request) => {
      // Skip logging for health check endpoints
      return req.path === '/health';
    },
  })
);

/**
 * Health Check Endpoint
 */
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * API Routes
 */

// Example: Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to IndexFlow API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Import and use route modules (uncomment as needed)
// import userRoutes from './routes/userRoutes';
// import projectRoutes from './routes/projectRoutes';
// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);

/**
 * 404 Not Found Handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

/**
 * Global Error Handler
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  const status = (err as any).status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
      ...(NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

/**
 * Server Startup
 */
const server = app.listen(PORT, () => {
  console.log(`
    ========================================
    🚀 IndexFlow API Server Started
    ========================================
    Environment: ${NODE_ENV}
    Port: ${PORT}
    URL: http://localhost:${PORT}
    ========================================
  `);
});

/**
 * Graceful Shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
