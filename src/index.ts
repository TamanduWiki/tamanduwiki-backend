import express from 'express';

import { mainRoutes } from './routes';

const app = express();

app.use(express.json());

app.use(mainRoutes);

// server
app.listen(3333, () => console.log('Server listening on port 3333.'));
