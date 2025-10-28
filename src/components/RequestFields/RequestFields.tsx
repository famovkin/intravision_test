import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { selectRequestById } from '@/lib/features/requests/requestsSlice';
import { useAppSelector } from '@/lib/hooks';
import InfoField from '../InfoField/InfoField';
import Tag from '../Tag/Tag';

import { formatDateShort } from '@/utils/utils';

import styles from './RequestFields.module.scss';

const RequestFields = () => {
  const pathname = usePathname();
  const requestId = pathname?.split('/').at(-1);
  const request = useAppSelector((state) =>
    selectRequestById(state, Number(requestId))
  );

  if (!request) {
    return (
      <div className={styles.contentWrapper}>
        <p>Загрузка</p>
      </div>
    );
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.statusWrapper}>
        <span
          style={{ background: request?.statusRgb }}
          className={styles.statusIndicator}
        />
        <span className={styles.status}>{request?.statusName}</span>
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
        text={request?.executorName}
        wrapperModificator={styles.commonInfoWrapper}
      />
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
