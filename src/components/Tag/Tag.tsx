import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './Tag.module.scss';

interface ITag {
  children: React.ReactNode;
  modificator?: string;
}

const Tag: FC<ITag> = ({ children, modificator }) => {
  return (
    <span
      className={classNames(styles.tag, {
        [modificator as string]: modificator,
      })}
    >
      {children}
    </span>
  );
};

export default React.memo(Tag);
