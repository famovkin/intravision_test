'use client';
import Link from 'next/link';
import { useEffect } from 'react';

import {
  fetchRequests,
  selectAllRequests,
  selectRequestsError,
  selectRequestsStatus,
} from '@/lib/features/requests/requestsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import styles from './RequestList.module.scss';

const RequestsList = () => {
  const dispatch = useAppDispatch();

  const requests = useAppSelector(selectAllRequests);
  const requestsStatus = useAppSelector(selectRequestsStatus);
  const requestsError = useAppSelector(selectRequestsError);

  useEffect(() => {
    if (requestsStatus === 'idle') {
      dispatch(fetchRequests());
    }
  }, [requestsStatus, dispatch]);

  let content;

  if (requestsStatus === 'loading') {
    // TODO: сделать спиннер
    content = <p>Загрузка</p>;
  } else if (requestsStatus === 'failed') {
    content = <p>{requestsError}</p>;
  } else if (requestsStatus === 'succeeded') {
    content = requests.map((request, index) => {
      console.log(request, index);
      return (
        <li key={request.id}>
          <Link href={`/requests/${request.id}`}>{request.name}</Link>
        </li>
      );
    });
  }

  return <ul className={styles.list}>{content}</ul>;
};

export default RequestsList;
