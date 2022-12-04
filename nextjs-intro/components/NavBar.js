import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href='/'>
        <span className={router.pathname === '/' ? 'active' : ''}>Home</span>
      </Link>
      <Link href='/about'>
        <span className={router.pathname === '/about' ? 'active' : ''}>
          About
        </span>
      </Link>
      <style jsx>{`
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}
