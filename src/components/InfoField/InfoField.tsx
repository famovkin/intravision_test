import classNames from 'classnames';
import React, { FC } from 'react';

import styles from './InfoField.module.scss';

interface IInfoFieldWithText {
  title: string;
  text: string;
  children?: never;
  wrapperModificator?: string;
}

interface IInfoFieldWithChildren {
  title: string;
  text?: never;
  children: React.ReactNode;
  wrapperModificator?: string;
}

type IInfoField = IInfoFieldWithText | IInfoFieldWithChildren;

const InfoField: FC<IInfoField> = ({
  children,
  title,
  text,
  wrapperModificator,
}) => {
  return (
    <div
      className={classNames({
        [wrapperModificator as string]: wrapperModificator,
      })}
    >
      <p className={styles.infoItemTitle}>{title}</p>
      {children ? children : <p className={styles.infoItemText}>{text}</p>}
    </div>
  );
};

export default React.memo(InfoField);
