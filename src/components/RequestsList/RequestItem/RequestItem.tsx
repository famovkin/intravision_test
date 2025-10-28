import Link from 'next/link';
import React, { FC } from 'react';

import Status from '@/components/Status/Status';
import { IRequest } from '@/lib/features/requests/requestsSlice';
import RequestId from '../RequestId/RequestId';

import styles from './RequestItem.module.scss';

const RequestItem: FC<IRequest> = ({
  id,
  name,
  statusName,
  executorName,
  priorityId,
  statusRgb,
  priorityName,
}) => {
  return (
    <li>
      <Link className={styles.item} href={`/requests/${id}`}>
        <div className={styles.idWrapper}>
          <RequestId id={id} priorityId={priorityId} priority={priorityName} />
        </div>
        <div className={styles.titleWrapper}>
          <p>{name}</p>
        </div>
        <div className={styles.statusWrapper}>
          <Status text={statusName} color={statusRgb} />
        </div>
        <div className={styles.executorWrapper}>
          <p className={styles.executor}>{executorName}</p>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(RequestItem);
