import createHttpError from 'http-errors';
import { registerUser, findUser } from '../services/auth-services.js';
import { setupCookies } from '../utils/setupCookies.js';
import {
  createSession,
  deleteSession,
  findSession,
} from '../services/session-services.js';
import { compareHash } from '../utils/hash.js';
export const userSignupController = async (req, res) => {
  const { email } = req.body;
  const existingUser = await findUser({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }
  const user = await registerUser(req.body);
  const data = {
    name: user.name,
    email: user.email,
  };
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

export const userSigninController = async (req, res) => {
  // const user = await loginUser(req.body);
  const { email, password } = req.body;
  const existingUser = await findUser({ email });
  if (!existingUser) {
    throw createHttpError(404, 'Email not found');
  }
  const passwordValidity = await compareHash(password, existingUser.password);
  if (!passwordValidity) {
    throw createHttpError(401, 'Password is invalid');
  }
  const {
    accessToken,
    refreshToken,
    _id: sessionId,
    refreshTokenValidUntil,
  } = await createSession(existingUser._id);
  setupCookies(res, { refreshToken, refreshTokenValidUntil, sessionId });
  // res.cookie('refreshToken', refreshToken, {
  //   httpOnly: true,
  //   expired: refreshTokenValidUntil,
  // });
  // res.cookie('sessionId', _id, {
  //   httpOnly: true,
  // });
  res.json({
    status: 200,
    message: 'User successfully signed in',
    data: {
      accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const { refreshToken: currentRefreshToken, sessionId: currentSessionId } =
    req.cookies;
  // console.log(currentRefreshToken, currentSessionId);
  const currentSession = await findSession({
    refreshToken: currentRefreshToken,
    _id: currentSessionId,
  });
  // console.log(currentSession);
  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }

  const refreshTokenAExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (refreshTokenAExpired) {
    throw createHttpError(401, 'Session expired');
  }
  const { accessToken, refreshToken, refreshTokenValidUntil, _id } =
    await createSession(currentSession.userId);
  setupCookies(res, { refreshToken, refreshTokenValidUntil, sessionId: _id });

  res.status(200).json({
    status: 200,
    message: 'Session refreshed',
    data: {
      accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }
  await deleteSession({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};
