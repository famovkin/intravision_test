import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

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
  isActive: boolean;
}

const NavbarItem: FC<INavbarItem> = ({ img, title, url, isActive }) => {
  const { src, width, height, alt } = img;

  return (
    <li key={title}>
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
        <p className={styles.title}>{title}</p>
      </Link>
    </li>
  );
};

export default React.memo(NavbarItem);
