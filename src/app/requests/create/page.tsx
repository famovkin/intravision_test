'use client';
import { addNewRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import Textarea from '@/components/Textarea/Textarea';

import { modalPath } from '../layout';

import styles from './create.module.scss';

const CreateRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Добавить статус
  const canCreate = Boolean(title && description);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onCreateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(
      addNewRequest({ name: title, description })
    );

    if (addNewRequest.fulfilled.match(resultAction)) {
      const newRequest = resultAction.payload;
      router.push(`/requests/${newRequest.id}`);
    } else {
      // TODO: Обработать
      throw new Error('Ошибка добавления заявки');
    }
  };

  return (
    <Modal path={modalPath} title="Новая заявка">
      <form className={styles.form} onSubmit={onCreateHandler}>
        <Textarea
          name="title"
          label="Название"
          modificator={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          name="description"
          label="Описание"
          modificator={styles.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* TODO: Блокировать при создании */}
        <Button
          isEnable={canCreate}
          disabled={!canCreate}
          modificator={styles.btn}
        >
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};

export default CreateRequestForm;
