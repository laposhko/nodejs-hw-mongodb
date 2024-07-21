export const setupCookies = (
  res,
  { refreshToken, refreshTokenValidUntil, sessionId },
) => {
  console.log(sessionId);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expired: refreshTokenValidUntil,
  });
  res.cookie('sessionId', sessionId, {
    httpOnly: true,
  });
};
