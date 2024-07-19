import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userSignupSchema,
  userSigninSchema,
} from '../validation/auth-validation.js';
import { userSignupController } from '../controllers/auth-controller.js';
import { validateBody } from '../utils/validateBody.js';
const authRouter = Router();

authRouter.post(
  '/auth/register',
  await validateBody(userSignupSchema),
  ctrlWrapper(userSignupController),
);

export default authRouter;
