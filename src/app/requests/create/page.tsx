'use client';
import { addNewRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const CreateRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  const onAddHandler = async () => {
    const resultAction = await dispatch(addNewRequest());
    if (addNewRequest.fulfilled.match(resultAction)) {
      const newRequest = resultAction.payload;
      router.push(`/requests/${newRequest.id}`);
    } else {
      throw new Error('Ошибка добавления заявки');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" onClick={onAddHandler}>
        Создать заявку
      </button>
    </form>
  );
};

export default CreateRequestForm;
