'use client';
import Modal from '@/components/Modal/Modal';
import RequestContent from '@/components/RequestContent/RequestContent';
import RequestFields from '@/components/RequestFields/RequestFields';
import useGetRequestData from '@/hooks/useGetRequestData';

import { modalPath } from '../layout';

import styles from './requestIdPage.module.scss';

const EditForm = () => {
  const request = useGetRequestData();

  const Title = (
    <>
      <span className={styles.id}>{request?.id ? `№${request.id}` : ''}</span>
      <span className={styles.title}>{request?.name}</span>
    </>
  );

  return (
    <Modal path={modalPath} title={Title}>
      <div className={styles.wrapper}>
        {!request ? (
          <p>Загрузка модалки</p>
        ) : (
          <>
            <RequestContent />
            <RequestFields />
          </>
        )}
      </div>
    </Modal>
  );
};

export default EditForm;
