import Link from 'next/link';
import React from 'react';

import RequestsList from '@/components/RequestsList/RequestsList';

export const modalPath = 'requests';

import styles from './request.module.scss';

const RequestsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className={styles.requestsContainer}>
        <Link className={styles.link} href="/requests/create">
          Создать заявку
        </Link>
        <RequestsList />
      </div>
      {children}
    </section>
  );
};

export default RequestsLayout;
