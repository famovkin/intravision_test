import Image from 'next/image';

import NavbarList from './NavbarList/NavbarList';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Image
        className={styles.logo}
        src="/logo.png"
        width={52}
        height={44}
        alt="Галочка"
      />
      <NavbarList />
    </nav>
  );
};

export default Navbar;
