import { FC } from 'react';

import styles from './Title.module.scss';

interface ITitle {
  text: string;
}

const Title: FC<ITitle> = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};

export default Title;
