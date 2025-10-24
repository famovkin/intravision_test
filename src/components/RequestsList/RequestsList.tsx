'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchRequests,
  selectAllRequests,
  selectRequestsError,
  selectRequestsStatus,
} from '@/lib/features/requests/requestsSlice';
import { AppDispatch } from '@/lib/store';

const RequestsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const requests = useSelector(selectAllRequests);
  const requestsStatus = useSelector(selectRequestsStatus);
  const requestsError = useSelector(selectRequestsError);

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
    content = requests.map((request) => (
      <li key={request.id}>
        <Link href={`/requests/${request.id}`}>{request.name}</Link>
      </li>
    ));
  }

  return <ul>{content}</ul>;
};

export default React.memo(RequestsList);
