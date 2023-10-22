import { usePathname } from 'next/navigation';

export function useGetRegistryKey() {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/');
  const registryKey = pathnameArray[pathnameArray.length - 1];
  return registryKey;
}
