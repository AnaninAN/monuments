import { LRUCache } from 'lru-cache';
import { ExtendedUser } from '@/next-auth';

const userCache = new LRUCache<string, Partial<ExtendedUser>>({
  max: 500,
  ttl: 1000 * 60 * 5,
});

export const getUserFromCache = (userId: string) => {
  return userCache.get(userId);
};

export const setUserInCache = (
  userId: string,
  userData: Partial<ExtendedUser>
) => {
  userCache.set(userId, userData);
};
