import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import countriesRoutes from './routes/countries';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/countries', countriesRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
