'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import RequestContent from '@/components/RequestContent/RequestContent';
import RequestFields from '@/components/RequestFields/RequestFields';
import {
  fetchSingleRequest,
  selectSingleRequest,
  selectSingleRequestError,
  selectSingleRequestStatus,
} from '@/lib/features/singleRequest/singleRequestSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { modalPath } from '@/utils/constants';

import styles from './requestIdPage.module.scss';

const EditForm = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const requestId = pathname?.split('/').at(-1);

  useEffect(() => {
    if (requestId) {
      dispatch(fetchSingleRequest(requestId));
    }
  }, [dispatch, requestId]);

  const request = useAppSelector(selectSingleRequest);
  const error = useAppSelector(selectSingleRequestError);
  const loadingState = useAppSelector(selectSingleRequestStatus);

  const Title = (
    <>
      <span className={styles.id}>{request?.id ? `№${request.id}` : ''}</span>
      <span className={styles.title}>{request?.name}</span>
    </>
  );

  let content;

  if (loadingState === 'loading') {
    content = <Loader modificator={styles.loaderWrapper} />;
  } else if (loadingState === 'failed' || error) {
    content = <p className={styles.error}>{error}</p>;
  } else if (loadingState === 'succeeded') {
    content = (
      <>
        <RequestContent />
        <RequestFields />
      </>
    );
  }

  return (
    <Modal path={modalPath} title={Title}>
      <div className={styles.wrapper}>{content}</div>
    </Modal>
  );
};

export default EditForm;
