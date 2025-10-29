import { Metadata } from 'next';

import Title from '@/components/Title/Title';

export const metadata: Metadata = {
  title: 'Сотрудники',
};

const Staff = () => {
  return <Title text="Сотрудники" />;
};

export default Staff;
