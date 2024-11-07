// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/posts'); // Replace '/your-page' with your desired route
  }, [router]);

  return null;
}