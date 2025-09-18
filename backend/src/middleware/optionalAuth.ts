// backend/src/middleware/optionalAuth.ts

export const optionalAuth = async (request: any, reply: any) => {
  try {
    if (request.headers.authorization) {
      await request.jwtVerify();
    }
  } catch (err) {
    // Ignoruj błędy - użytkownik nie jest zalogowany
    request.user = null;
  }
};
