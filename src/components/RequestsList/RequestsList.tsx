'use client';
import { useEffect } from 'react';

import { fetchExecutors } from '@/lib/features/executors/executorsSlice';
import { fetchPriorities } from '@/lib/features/priorities/prioritiesSlice';
import {
  fetchRequests,
  selectAllRequests,
  selectRequestsError,
  selectRequestsStatus,
} from '@/lib/features/requests/requestsSlice';
import { fetchStatuses } from '@/lib/features/statuses/statusesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import RequestItem from './RequestItem/RequestItem';
import RequestsListHeader from './RequestsListHeader/RequestsListHeader';

import styles from './RequestList.module.scss';

const RequestsList = () => {
  const dispatch = useAppDispatch();

  const requests = useAppSelector(selectAllRequests);
  const requestsStatus = useAppSelector(selectRequestsStatus);
  const requestsError = useAppSelector(selectRequestsError);

  useEffect(() => {
    dispatch(fetchExecutors());
    dispatch(fetchStatuses());
    dispatch(fetchPriorities());
  }, [dispatch]);

  useEffect(() => {
    if (requestsStatus === 'idle') {
      dispatch(fetchRequests());
    }
  }, [requestsStatus, dispatch]);

  let content;

  if (requestsStatus === 'loading') {
    // TODO: сделать спиннер
    content = <p>Загрузка листа</p>;
  } else if (requestsStatus === 'failed') {
    content = <p>{requestsError}</p>;
  } else if (requestsStatus === 'succeeded') {
    content = requests.map((request) => (
      <RequestItem key={request.id} {...request} />
    ));
  }

  return (
    <ul className={styles.list}>
      <RequestsListHeader />
      {content}
    </ul>
  );
};

export default RequestsList;
