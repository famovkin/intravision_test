import classNames from 'classnames';
import { FC } from 'react';

import styles from './FetchStatus.module.scss';

export enum FetchStatusTypes {
  Error = 'ERROR',
  Success = 'SUCCESS',
}

interface IFetchStatus {
  children: React.ReactNode;
  modificator?: string;
  type?: FetchStatusTypes;
}

const FetchStatus: FC<IFetchStatus> = ({ children, modificator, type }) => {
  return (
    <p
      className={classNames(styles.status, {
        [modificator as string]: modificator,
        [styles.error as string]: type === FetchStatusTypes.Error,
      })}
    >
      {children}
    </p>
  );
};

export default FetchStatus;
