import jwtDecode from 'jwt-decode';

// Decode the JWT token to extract payload
export const decode = (token) => {
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (err) {
    console.error('[JWT Decode]: ', err);
    throw new Error('Invalid token');
  }
};
