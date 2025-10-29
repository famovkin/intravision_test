import { selectRequestById } from '@/lib/features/requests/requestsSlice';
import { useAppSelector } from '@/lib/hooks';
import { usePathname } from 'next/navigation';

const useGetRequestData = () => {
  const pathname = usePathname();
  const requestId = pathname?.split('/').at(-1);

  const request = useAppSelector((state) =>
    selectRequestById(state, Number(requestId))
  );

  return { request, error: request === undefined ? 'Заявка не найдена' : null };
};

export default useGetRequestData;
