import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userSignupSchema,
  userSigninSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth-validation.js';
import {
  userSignupController,
  userSigninController,
  refreshController,
  logoutController,
  requestResetEmailController,
  resetPasswordController,
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

authRouter.post(
  '/send-reset-email',
  await validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  await validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default authRouter;
