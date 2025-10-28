import classNames from 'classnames';

import itemStyles from '../RequestItem/RequestItem.module.scss';
import styles from './RequestListHeader.module.scss';

const RequestsListHeader = () => {
  return (
    <li className={styles.header}>
      <p className={classNames(itemStyles.idWrapper, styles.headerItem)}>ID</p>
      <p className={classNames(itemStyles.titleWrapper, styles.headerItem)}>
        Название
      </p>
      <p className={classNames(itemStyles.statusWrapper, styles.headerItem)}>
        Статус
      </p>
      <p className={classNames(itemStyles.executorWrapper, styles.headerItem)}>
        Исполнитель
      </p>
    </li>
  );
};

export default RequestsListHeader;
