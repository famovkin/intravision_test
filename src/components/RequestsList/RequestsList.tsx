import React from 'react';
import Link from 'next/link';

const RequestsList = () => {
  return (
    <ul>
      <li key="1">
        <Link href="/requests/1">1 Заявка</Link>
      </li>
      <li key="2">
        <Link href="/requests/2">2 Заявка</Link>
      </li>
      <li key="3">
        <Link href="/requests/3">3 Заявка</Link>
      </li>
    </ul>
  );
};

export default React.memo(RequestsList);
