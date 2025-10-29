import { FC } from 'react';

import { RgbType } from '@/types/types';

import styles from './Status.module.scss';

interface IStatus {
  text: string;
  color?: RgbType;
}

const Status: FC<IStatus> = ({ text, color = '#002137' }) => {
  return (
    <div style={{ background: color }} className={styles.status}>
      <span className={styles.text}>{text.toLocaleLowerCase()}</span>
    </div>
  );
};

export default Status;
