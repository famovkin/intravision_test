import classNames from 'classnames';
import { FC } from 'react';

import styles from './Button.module.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  modificator?: string;
  isEnable?: boolean;
}

const Button: FC<IButton> = ({ children, modificator, isEnable, ...props }) => {
  return (
    <button
      className={classNames(styles.btn, {
        [styles.disabled as string]: !isEnable,
        [modificator as string]: modificator,
      })}
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
