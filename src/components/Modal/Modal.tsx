'use client';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface IModal {
  children: React.ReactNode;
  path: string;
  title?: string;
}

const Modal: FC<IModal> = ({ children, path, title }) => {
  const [isDocumentMounted, setIsDocumentMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsDocumentMounted(true), []);
  const pathname = usePathname();
  const router = useRouter();

  const isModalOpen =
    pathname?.startsWith(`/${path}/`) && pathname !== `/${path}`;

  const closeHandler = () => router.push(`/${path}`);

  const container = typeof document !== 'undefined' ? document.body : null;

  if (!container || !isDocumentMounted) return null;

  if (isModalOpen) {
    return createPortal(
      <section className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {/* Вынести в компонент */}
          <button className={styles.closeBtn} onClick={closeHandler}>
            <div className={classNames(styles.line, styles.lineOne)} />
            <div className={classNames(styles.line, styles.lineTwo)} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </section>,
      container
    );
  }

  return null;
};

export default Modal;
