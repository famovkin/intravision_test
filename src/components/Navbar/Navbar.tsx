import Image from 'next/image';
import Link from 'next/link';

import NavbarList from './NavbarList/NavbarList';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          className={styles.logo}
          src="/logo.png"
          width={52}
          height={44}
          alt="Галочка"
        />
      </Link>
      <NavbarList />
    </nav>
  );
};

export default Navbar;
