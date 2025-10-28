import Link from 'next/link';
import React from 'react';

import Button from '@/components/Button/Button';
import RequestsList from '@/components/RequestsList/RequestsList';

export const modalPath = 'requests';

import styles from './request.module.scss';

const RequestsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className={styles.requestsWrapper}>
        <div className={styles.btnWrapper}>
          <Link href="/requests/create">
            <Button>Создать заявку</Button>
          </Link>
        </div>
        <RequestsList />
      </div>
      {children}
    </section>
  );
};

export default RequestsLayout;
