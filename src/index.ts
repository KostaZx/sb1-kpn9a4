import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config';
import { storeRouter } from './routes/store';
import { basketRouter } from './routes/basket';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Test route
app.get('/', (_req, res) => {
  res.json({
    message: 'Tebex Headless API Store',
    endpoints: {
      store: '/api/store',
      basket: '/api/basket'
    },
    docs: {
      categories: '/api/store/categories',
      packages: '/api/store/packages',
      webstore: '/api/store/webstore'
    }
  });
});

// Routes
app.use('/api/store', storeRouter);
app.use('/api/basket', basketRouter);

// Error handling
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});