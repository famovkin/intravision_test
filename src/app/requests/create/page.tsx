'use client';
import { addNewRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import Button from '@/components/Button/Button';
import FetchStatus, {
  FetchStatusTypes,
} from '@/components/FetchStatus/FetchStatus';
import Modal from '@/components/Modal/Modal';
import Textarea from '@/components/Textarea/Textarea';

import { StatusesType } from '@/lib/types';
import { modalPath } from '../layout';

import styles from './create.module.scss';

const CreateRequestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<StatusesType>('idle');
  const canCreate = Boolean(title && description && status !== 'loading');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onCreateHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (canCreate) {
      try {
        setStatus('loading');
        const resultAction = await dispatch(
          addNewRequest({ name: title, description })
        );

        if (addNewRequest.fulfilled.match(resultAction)) {
          setTitle('');
          setDescription('');
          setStatus('succeeded');
          const newRequest = resultAction.payload;
          router.push(`/requests/${newRequest.id}`);
        } else {
          throw new Error('Ошибка добавления заявки');
        }
      } catch (err) {
        setStatus('failed');
        console.log('Ошибка создания:', err);
      }
    }
  };

  const onTitleInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value),
    []
  );

  const onDescriptionInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value),
    []
  );

  return (
    <Modal path={modalPath} title="Новая заявка">
      <form className={styles.form} onSubmit={onCreateHandler}>
        <>
          <Textarea
            name="title"
            label="Название"
            modificator={styles.title}
            value={title}
            onChange={onTitleInput}
          />
          <Textarea
            name="description"
            label="Описание"
            modificator={styles.description}
            value={description}
            onChange={onDescriptionInput}
          />

          {status === 'failed' && (
            <FetchStatus
              modificator={styles.status}
              type={FetchStatusTypes.Error}
            >
              Ошибка, попробуйте еще раз
            </FetchStatus>
          )}

          {status === 'loading' && (
            <FetchStatus modificator={styles.status}>Сохраняю...</FetchStatus>
          )}

          <Button
            isEnable={canCreate}
            disabled={!canCreate}
            modificator={styles.btn}
          >
            Сохранить
          </Button>
        </>
      </form>
    </Modal>
  );
};

export default CreateRequestForm;
