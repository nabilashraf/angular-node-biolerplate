import express from 'express';

const userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.json({ message: 'Users Api', status: 200, data: [] });
});

export {userRouter};
