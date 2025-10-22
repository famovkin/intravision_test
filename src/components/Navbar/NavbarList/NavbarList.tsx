'use client';
import { usePathname } from 'next/navigation';

import NavbarItem from '../NavbarItem/NavbarItem';

import NavbarListData from './data';

import styles from './NavbarList.module.scss';

const NavbarList = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.list}>
      {NavbarListData.map(({ img, title, url }) => {
        const isActive =
          pathname === url || (pathname.startsWith(url) && pathname !== '/');

        return (
          <NavbarItem
            key={title}
            img={img}
            title={title}
            url={url}
            isActive={isActive}
          />
        );
      })}
    </ul>
  );
};

export default NavbarList;
