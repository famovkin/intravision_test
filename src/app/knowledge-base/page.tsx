import { Metadata } from 'next';

import Title from '@/components/Title/Title';

export const metadata: Metadata = {
  title: 'База знаний',
};

const KnowledgeBase = () => {
  return <Title text="База знаний" />;
};

export default KnowledgeBase;
