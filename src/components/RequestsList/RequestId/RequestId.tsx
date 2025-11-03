import { FC, useMemo } from 'react';

import { selectPriorities } from '@/lib/features/priorities/prioritiesSlice';
import { useAppSelector } from '@/lib/hooks';
import { PrioritiesName } from '@/types/types';

import { addSpacesBetweenChars } from '@/utils/utils';

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

    return currentPriority?.rgb || '#525460';
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
      {addSpacesBetweenChars(id, 3)}
    </p>
  );
};

export default RequestId;
