'use client';

import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

const ErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <>
      <h1>Что-то пошло не так: {error.message}</h1>
      <button onClick={reload}>Попробовать еще раз</button>
    </>
  );
};

export default ErrorBoundary;
