import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface UserResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const [url, setUrl] = useState<null | string>(null);
  useEffect(() => {
    setUrl('/api/users/me');
  }, []);
  const { data, error } = useSWR<UserResponse>(url);
  const router = useRouter();

  // useEffect(() => {
  //   if (data && !data.ok && router.pathname !== '/enter') {
  //     router.replace('/enter');
  //   }

  //   if (data && data.ok && router.pathname === '/enter') {
  //     router.replace('/profile');
  //   }
  // }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
