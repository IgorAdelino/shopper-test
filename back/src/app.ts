import express from 'express';
import { router } from './routes';
import cors from 'cors';

export const app = express();
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(router);


