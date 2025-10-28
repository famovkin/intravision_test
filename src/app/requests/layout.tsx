import React from 'react';

import RequestsList from '@/components/RequestsList/RequestsList';
import RequestsHeader from '@/components/RequestsHeader/RequestsHeader';

export const modalPath = 'requests';

import styles from './request.module.scss';

const RequestsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className={styles.requestsWrapper}>
        <RequestsHeader />
        <RequestsList />
      </div>
      {children}
    </section>
  );
};

export default RequestsLayout;
