'use client';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import RequestContent from '@/components/RequestContent/RequestContent';
import RequestFields from '@/components/RequestFields/RequestFields';
import useGetRequestData from '@/hooks/useGetRequestData';
import {
  selectRequestsError,
  selectRequestsStatus,
} from '@/lib/features/requests/requestsSlice';
import { useAppSelector } from '@/lib/hooks';

import { modalPath } from '@/utils/constants';

import styles from './requestIdPage.module.scss';

const EditForm = () => {
  const { request, error } = useGetRequestData();
  const requestsStatus = useAppSelector(selectRequestsStatus);
  const requestsError = useAppSelector(selectRequestsError);

  const Title = (
    <>
      <span className={styles.id}>{request?.id ? `№${request.id}` : ''}</span>
      <span className={styles.title}>{request?.name}</span>
    </>
  );

  let content;

  if (requestsStatus === 'loading') {
    content = <Loader modificator={styles.loaderWrapper} />;
  } else if (requestsStatus === 'failed' || error) {
    content = (
      <p className={styles.error}>{requestsError || 'Заявка не найдена'}</p>
    );
  } else if (requestsStatus === 'succeeded') {
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
