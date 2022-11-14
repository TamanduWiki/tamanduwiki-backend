import express from 'express';

import { mainRoutes } from '@/routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(mainRoutes);

// server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
