import { FC } from 'react';
import classNames from 'classnames';

import styles from './CloseBtn.module.scss';

interface ICloseBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modificator?: string;
}

const CloseBtn: FC<ICloseBtn> = ({ modificator, ...props }) => {
  return (
    <button
      className={classNames(styles.closeBtn, {
        [modificator as string]: modificator,
      })}
      {...props}
    >
      <div className={classNames(styles.line, styles.lineOne)} />
      <div className={classNames(styles.line, styles.lineTwo)} />
    </button>
  );
};

export default CloseBtn;
