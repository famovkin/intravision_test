import Image from 'next/image';

import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchField}>
        <input className={styles.input} type="search" area-label="Поиск" />
        <button className={styles.btn}>
          <Image
            className={styles.icon}
            src="/icon-loope.png"
            width={19}
            height={19}
            alt="Лупа"
            aria-label="Искать"
          />
        </button>
      </div>
    </div>
  );
};

export default Search;
