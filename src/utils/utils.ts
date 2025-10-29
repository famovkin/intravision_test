import { months } from './constants';

const formatDateShort = (dateString: string | undefined) => {
  // ДД.ММ.ГГГГ г.
  if (dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year} г.`;
  }
};

const formatDateWithTime = (date: Date): string => {
  // ДД месяц, чч:мм
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month}, ${hours}:${minutes}`;
};

export { formatDateShort, formatDateWithTime };
