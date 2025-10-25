import Link from 'next/link';
import { FC } from 'react';

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
        <RequestId id={id} priorityId={priorityId} priority={priorityName} />
        <div className={styles.title}>
          <p>{name}</p>
        </div>
        <div className={styles.statusWrapper}>
          <Status text={statusName} color={statusRgb} />
        </div>
        <p className={styles.executor}>{executorName}</p>
      </Link>
    </li>
  );
};

export default RequestItem;
