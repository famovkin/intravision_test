'use client';
import { usePathname } from 'next/navigation';

import Modal from '@/components/Modal/Modal';
import RequestContent from '@/components/RequestContent/RequestContent';
import RequestFields from '@/components/RequestFields/RequestFields';
import {
  editRequest,
  selectRequestById,
} from '@/lib/features/requests/requestsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { modalPath } from '../layout';

import styles from './requestIdPage.module.scss';

const EditForm = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const requestId = pathname?.split('/').at(-1);

  const request = useAppSelector((state) =>
    selectRequestById(state, Number(requestId))
  );

  console.log('>>>', request);

  const onEdit = () => {
    dispatch(editRequest());
  };

  const Title = (
    <>
      <span className={styles.id}>{request?.id ? `№${request.id}` : ''}</span>
      <span className={styles.title}>{request?.name}</span>
    </>
  );

  return (
    <Modal path={modalPath} title={Title}>
      <div className={styles.wrapper}>
        <RequestContent />
        <RequestFields />
      </div>
    </Modal>
  );
};

export default EditForm;
