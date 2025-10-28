import { useCallback, useState } from 'react';

import useGetRequestData from '@/hooks/useGetRequestData';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import Textarea from '../Textarea/Textarea';

import { IAuthor, IComment } from '@/types/types';

import styles from './RequestContent.module.scss';

const defaultAuthor: IAuthor = {
  name: 'Иванов Александр',
  avatar: '/default-avatar.jpg',
  gender: 'M',
};

const RequestContent = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  // Тут локальное состояние, так как бэк не сохраняет и не отдает комментарии
  const request = useGetRequestData();

  const onSendCommentHandler = useCallback(() => {
    setCommentsList((prev) => [
      ...prev,
      {
        text: comment,
        author: defaultAuthor,
        date: new Date(),
      },
    ]);
    setComment('');
  }, [comment]);

  return (
    <div className={styles.contentWrapper}>
      <p className={styles.descriptionTitle}>Описание</p>
      <p className={styles.description}>{request?.description}</p>

      <Textarea
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Добавление комментариев"
        modificator={styles.commentInput}
      />

      <Button modificator={styles.btnSave} onClick={onSendCommentHandler}>
        Сохранить
      </Button>

      <ul className={styles.commentsList}>
        {commentsList.length > 0 &&
          commentsList.map((commentData, index) => (
            <Comment comment={commentData} key={index} />
          ))}
      </ul>
    </div>
  );
};

export default RequestContent;
