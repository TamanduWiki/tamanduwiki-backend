import express from 'express';
import cors from 'cors';

import { mainRoutes } from '@/routes';

const app = express();

const PORT = process.env.PORT || 3333;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

app.use(cors({ origin: FRONTEND_ORIGIN }));

app.use(express.json());

app.use(mainRoutes);

// server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
