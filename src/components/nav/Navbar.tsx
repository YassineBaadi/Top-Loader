'use client';

import Link from 'next/link';
import './navbar.css';
import Logo from './../../../public/assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartShopping, faGear } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="navbarContainer">
      <div className="logo">
        <img src={Logo.src} alt="Logo" style={{ width: 200, height: 180 }} />
      </div>

      <div className="navbarSettings">
        <ul className="containerList">
          <li>
            <Link href="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/collection" className={isActive('/collection') ? 'active' : ''}>
              Collection
            </Link>
          </li>
          <li>
            <Link href="/shop" className={isActive('/shop') ? 'active' : ''}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/attrapez-les-tous" className={isActive('/attrapez-les-tous') ? 'active' : ''}>
              Attrapez les tous
            </Link>
          </li>
          <li>
            <Link href="/account">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <FontAwesomeIcon icon={faGear} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
