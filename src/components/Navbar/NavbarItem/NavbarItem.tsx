'use client';

import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import styles from './NavbarItem.module.scss';

interface INavbarItem {
  img: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  title: string;
  url: string;
}

const NavbarItem: FC<INavbarItem> = ({ img, title, url }) => {
  const pathname = usePathname();
  const isActive =
    pathname === url || (pathname.startsWith(url) && pathname !== '/');

  const { src, width, height, alt } = img;

  return (
    <Link
      className={classnames(styles.navItem, {
        [styles.active]: isActive,
      })}
      href={url}
    >
      <Image
        className={styles.icon}
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
      <li key={title} className={styles.title}>
        {title}
      </li>
    </Link>
  );
};

export default NavbarItem;
