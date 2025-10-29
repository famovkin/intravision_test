import { Metadata } from 'next';

import Title from '@/components/Title/Title';

export const metadata: Metadata = {
  title: 'Настройки',
};

const Settings = () => {
  return <Title text="Настройки" />;
};

export default Settings;
