'use client';
import { useState } from 'react';

const CreateRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <form>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </form>
  );
};

export default CreateRequestForm;
