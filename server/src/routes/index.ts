import express from 'express';

const apiRouter = express.Router();
import {userRouter} from './users';

apiRouter.use('/users',  userRouter );

export default apiRouter;
