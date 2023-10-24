'use client';

import { useAuthGetUser } from '../hooks/authUser';

export default function Page() {
  const { data: authUserData } = useAuthGetUser();

  console.log(authUserData?.data.user);
  return <div>Home</div>;
}
