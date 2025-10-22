import Image from 'next/image';
import NavbarItem from './NavbarItem/NavbarItem';

import NavbarList from './data';

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
      <ul className={styles.list}>
        {NavbarList.map(({ img, title, url }) => {
          return <NavbarItem key={title} img={img} title={title} url={url} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
