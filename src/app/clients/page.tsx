import { Metadata } from 'next';

import Title from '@/components/Title/Title';

export const metadata: Metadata = {
  title: 'Клиенты',
};

const Clients = () => {
  return <Title text="Клиенты" />;
};

export default Clients;
