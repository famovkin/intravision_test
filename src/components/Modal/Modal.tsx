import React, { FC, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

import styles from './Modal.module.scss';

interface IModal {
  children: React.ReactNode;
  path: string;
}

const Modal: FC<IModal> = ({ children, path }) => {
  const [isDocumentMounted, setIsDocumentMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsDocumentMounted(true), []);
  const pathname = usePathname();
  const router = useRouter();

  const isModalOpen =
    pathname?.startsWith(`/${path}/`) && pathname !== `/${path}`;

  const closeHandler = () => router.push(`/${path}`);

  const container =
    typeof document !== 'undefined' ? document.getElementById(path) : null;

  if (!container || !isDocumentMounted) return null;

  if (isModalOpen) {
    return createPortal(
      <div className={styles.modal}>
        <button onClick={closeHandler}>Закрыть</button>
        {children}
      </div>,
      container
    );
  }

  return null;
};

export default Modal;
