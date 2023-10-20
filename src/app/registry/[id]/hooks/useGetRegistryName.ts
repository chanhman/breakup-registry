import { usePathname } from 'next/navigation';

export function useGetRegistryName() {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/');
  const registryName = pathnameArray[pathnameArray.length - 1];
  return registryName;
}
