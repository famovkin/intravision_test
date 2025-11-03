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

const formatDateWithTime = (date: string): string => {
  // ДД месяц, чч:мм
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${day} ${month}, ${hours}:${minutes}`;
};

const addSpacesBetweenChars = (num: number, delimiterCount: number) => {
  const stringNum = String(num);
  let result = '';
  let count = 0;

  for (let i = stringNum.length - 1; i >= 0; i--) {
    result = stringNum[i] + result;
    count++;

    if (count === delimiterCount && i !== 0) {
      result = ' ' + result;
      count = 0;
    }
  }

  return result;
};

export { formatDateShort, formatDateWithTime, addSpacesBetweenChars };
