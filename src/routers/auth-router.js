import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userSignupSchema,
  userSigninSchema,
} from '../validation/auth-validation.js';
import {
  userSignupController,
  userSigninController,
  refreshController,
  logoutController,
} from '../controllers/auth-controller.js';
import { validateBody } from '../utils/validateBody.js';
const authRouter = Router();

authRouter.post(
  '/register',
  await validateBody(userSignupSchema),
  ctrlWrapper(userSignupController),
);

authRouter.post(
  '/login',
  await validateBody(userSigninSchema),
  ctrlWrapper(userSigninController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));
export default authRouter;
