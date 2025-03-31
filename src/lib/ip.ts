import { headers } from 'next/headers';

export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) return realIp;
  if (cfConnectingIp) return cfConnectingIp;

  return 'unknown';
}
