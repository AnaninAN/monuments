import { jwtDecode } from 'jwt-decode';

interface SessionToken {
  exp: number;
  iat: number;
  sub: string;
  name: string;
  email: string;
  role: string;
  isTwoFactorEnabled: boolean;
}

export class SessionManager {
  private static readonly REFRESH_THRESHOLD = 5 * 60 * 1000;

  static shouldRefreshToken(token: string): boolean {
    try {
      const decoded = jwtDecode<SessionToken>(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();

      return expirationTime - currentTime < this.REFRESH_THRESHOLD;
    } catch {
      return true;
    }
  }
}
