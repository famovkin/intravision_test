import classNames from 'classnames';
import styles from './Loader.module.scss';
import { FC } from 'react';

interface ILoader {
  modificator?: string;
}

const Loader: FC<ILoader> = ({ modificator }) => {
  return (
    <div
      className={classNames(styles.loaderWrapper, {
        [modificator as string]: modificator,
      })}
    >
      <div className={classNames(styles.loader)} />
    </div>
  );
};

export default Loader;
