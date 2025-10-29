import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import {
  selectAllExecutors,
  selectExecutorsError,
} from '@/lib/features/executors/executorsSlice';
import {
  editRequest,
  selectRequestById,
  selectRequestEditError,
} from '@/lib/features/requests/requestsSlice';
import {
  selectAllStatuses,
  selectStatusesError,
} from '@/lib/features/statuses/statusesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import InfoField from '../InfoField/InfoField';
import Select from '../Select/Select';
import Tag from '../Tag/Tag';

import { formatDateShort } from '@/utils/utils';

import styles from './RequestFields.module.scss';

const RequestFields = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const requestId = pathname?.split('/').at(-1);
  const request = useAppSelector((state) =>
    selectRequestById(state, Number(requestId))
  );

  const statuses = useAppSelector(selectAllStatuses);
  const executors = useAppSelector(selectAllExecutors);
  const editError = useAppSelector(selectRequestEditError);
  const statusesError = useAppSelector(selectStatusesError);
  const executorsError = useAppSelector(selectExecutorsError);

  const onEdit = useCallback(
    (editFields: { [key: string]: number }) => {
      if (request) {
        const updatedFieldWithRequestId = {
          executorId: request.executorId,
          statusId: request.statusId,
          id: request.id,
          ...editFields,
        };

        dispatch(editRequest(updatedFieldWithRequestId));
      }
    },
    [dispatch, request]
  );

  if (!request) return null;

  return (
    <div className={styles.contentWrapper}>
      {editError && <p className={styles.error}>{editError}</p>}
      <div className={styles.statusWrapper}>
        <span
          style={{ background: request?.statusRgb }}
          className={styles.statusIndicator}
        />
        <div className={styles.status}>
          <Select
            options={statuses}
            activeOption={request.statusId}
            onChange={onEdit}
            fieldName="statusId"
            error={statusesError}
          />
        </div>
      </div>
      <InfoField
        title="Заявитель"
        text={request?.initiatorName}
        wrapperModificator={styles.initiatorWrapper}
      />
      <InfoField
        title="Создана"
        text="Анна Маркова"
        wrapperModificator={styles.commonInfoWrapper}
      />
      <InfoField
        title="Исполнитель"
        wrapperModificator={styles.commonInfoWrapper}
      >
        <Select
          options={executors}
          activeOption={request.executorId}
          onChange={onEdit}
          fieldName="executorId"
          error={executorsError}
        />
      </InfoField>
      <InfoField
        title="Приоритет"
        text={request?.priorityName}
        wrapperModificator={styles.commonInfoWrapper}
      />

      {request?.resolutionDatePlan && (
        <InfoField title="Срок" wrapperModificator={styles.commonInfoWrapper}>
          <div className={styles.infoDate}>
            <Image src="/calendar.png" width={18} height={15} alt="Календарь" />
            <p className={styles.infoItemText}>
              {formatDateShort(request?.resolutionDatePlan)}
            </p>
          </div>
        </InfoField>
      )}

      {request?.tags.length > 0 && (
        <>
          <p className={styles.infoItemTitle}>Теги</p>
          <ul className={styles.tagsList}>
            {request?.tags.map((tag, index) => (
              <Tag key={index}>{tag.name}</Tag>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RequestFields;
