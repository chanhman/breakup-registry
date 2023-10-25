'use client';

import { useAuthGetUser } from '../hooks/authUser';

export default function Page() {
  const { data: authUserData } = useAuthGetUser();

  return <div>User home</div>;
}
