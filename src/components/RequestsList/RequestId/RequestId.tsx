import {
  PrioritiesName,
  selectPriorities,
} from '@/lib/features/priorities/prioritiesSlice';
import { useAppSelector } from '@/lib/hooks';
import { FC, useMemo } from 'react';

import styles from './RequestId.module.scss';

interface IRequestId {
  id: number;
  priorityId: number;
  priority: PrioritiesName;
}

const RequestId: FC<IRequestId> = ({ id, priorityId, priority }) => {
  const priorities = useAppSelector(selectPriorities);

  const badgeColor = useMemo(() => {
    const currentPriority = priorities.find(
      (priority) => priority.id === priorityId
    );

    return currentPriority?.rgb || 'red';
  }, [priorityId, priorities]);

  const normalizedColor = badgeColor.startsWith('#')
    ? badgeColor
    : `#${badgeColor}`;

  return (
    <p
      className={styles.id}
      style={{ ['--badge-color' as string]: normalizedColor }}
      title={priority}
    >
      {id}
    </p>
  );
};

export default RequestId;
