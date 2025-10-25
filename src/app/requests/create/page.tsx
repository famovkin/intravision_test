'use client';
import { addNewRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import Modal from '@/components/Modal/Modal';

import { modalPath } from '../layout';

import styles from './create.module.scss';

const CreateRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Добавить статус

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  const onAddHandler = async () => {
    const resultAction = await dispatch(
      addNewRequest({ name: title, description })
    );

    if (addNewRequest.fulfilled.match(resultAction)) {
      const newRequest = resultAction.payload;
      router.push(`/requests/${newRequest.id}`);
    } else {
      // Обработать
      throw new Error('Ошибка добавления заявки');
    }
  };

  return (
    <Modal path={modalPath} title="Новая заявка">
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* TODO: вынести в компонент */}
        <div
          className={classNames(styles.inputWrapper, {
            [styles.inputTitle as string]: true,
          })}
        >
          <label className={styles.label} htmlFor="title">
            Название
          </label>
          <textarea
            className={styles.input}
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* TODO: вынести в компонент */}
        <div
          className={classNames(styles.inputWrapper, {
            [styles.inputDescription as string]: true,
          })}
        >
          <label className={styles.label} htmlFor="description">
            Описание
          </label>
          <textarea
            className={styles.input}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* TODO: вынести в компонент */}
        <button
          className={classNames(styles.btn, {
            [styles.btnModificator as string]: true,
          })}
          type="submit"
          onClick={onAddHandler}
        >
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default CreateRequestForm;
