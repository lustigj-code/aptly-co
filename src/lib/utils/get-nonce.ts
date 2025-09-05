import { headers } from 'next/headers';

export function getNonce() {
  const headersList = headers();
  return headersList.get('x-nonce') || '';
}