'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/assets/img/logo.png';
import loadingScreen from '@/public/assets/img/loadingScreen.gif';


export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="startContainer">
      <div className="title">
        <img src={logo.src} alt="Logo" />
      </div>
    </div>
  );
}
