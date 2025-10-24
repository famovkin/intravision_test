'use client';
import { useAppStore } from '@/lib/hooks';
import { useEffect } from 'react';

import { fetchExecutors } from '@/lib/features/executors/executorsSlice';
import { fetchStatuses } from '@/lib/features/statuses/statusesSlice';
import { fetchPriorities } from '@/lib/features/priorities/prioritiesSlice';

import styles from './page.module.css';

// const errorCallHandler = () => {
//   throw new Error();
// };

export default function Home() {
  const store = useAppStore();
  useEffect(() => {
    store.dispatch(fetchExecutors());
    store.dispatch(fetchStatuses());
    store.dispatch(fetchPriorities());
  }, [store]);

  return (
    <>
      <h1 className={styles.header}>Hello world!</h1>
      {/* <button onClick={errorCallHandler}>call</button> */}
    </>
  );
}
