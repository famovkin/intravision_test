import Modal from '@/components/Modal/Modal';
import Link from 'next/link';
import React from 'react';
import RequestsList from '@/components/RequestsList/RequestsList';

const path = 'requests';

const RequestsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex' }} id={path}>
      <Link href="/requests/create">Создать заявку</Link>
      <aside
        style={{
          width: '300px',
          borderRight: '1px solid #ccc',
          height: 'calc(100vh - 66px)',
          overflowY: 'auto',
        }}
      >
        <RequestsList />
      </aside>
      <Modal path={path}>{children}</Modal>
    </div>
  );
};

export default RequestsLayout;
