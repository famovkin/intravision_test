import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseBtn from '../CloseBtn/CloseBtn';

import styles from './Modal.module.scss';

interface IModal {
  children: React.ReactNode;
  path: string;
  title?: React.ReactNode;
}

const Modal: FC<IModal> = ({ children, path, title }) => {
  const [isDocumentMounted, setIsDocumentMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsDocumentMounted(true), []);
  const pathname = usePathname();
  const router = useRouter();

  const isModalOpen =
    pathname?.startsWith(`/${path}/`) && pathname !== `/${path}`;

  const closeHandler = useCallback(
    () => router.push(`/${path}`),
    [path, router]
  );

  const container = typeof document !== 'undefined' ? document.body : null;

  if (!container || !isDocumentMounted) return null;

  if (isModalOpen) {
    return createPortal(
      <section className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <CloseBtn onClick={closeHandler} />
        </div>
        <div className={styles.content}>{children}</div>
      </section>,
      container
    );
  }

  return null;
};

export default React.memo(Modal);
