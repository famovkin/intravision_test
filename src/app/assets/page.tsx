import { Metadata } from 'next';

import Title from '@/components/Title/Title';

export const metadata: Metadata = {
  title: 'Активы',
};

const Assets = () => {
  return <Title text="Активы" />;
};

export default Assets;
