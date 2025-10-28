import Link from 'next/link';

import Button from '../Button/Button';

import styles from './RequestsHeader.module.scss';

const RequestsHeader = () => {
  return (
    <div className={styles.btnWrapper}>
      <Link href="/requests/create">
        <Button>Создать заявку</Button>
      </Link>
    </div>
  );
};

export default RequestsHeader;
