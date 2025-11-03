import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import Textarea from '../Textarea/Textarea';

import {
  editRequest,
  resetChanges,
  selectRequestChanges,
  selectSingleRequest,
  selectSingleRequestEditError,
} from '@/lib/features/singleRequest/singleRequestSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import styles from './RequestContent.module.scss';

const RequestContent = () => {
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const request = useAppSelector(selectSingleRequest);
  const requestChanges = useAppSelector(selectRequestChanges);
  const editError = useAppSelector(selectSingleRequestEditError);

  const commentsList = request?.lifetimeItems;
  // const notEmptyCommentsList = commentsList?.filter(
  //   (commentItem) => commentItem.comment !== null
  // );

  const notEmptyCommentsList = useMemo(
    () => commentsList?.filter((commentItem) => commentItem.comment !== null),
    [commentsList]
  );
  const canSave = Boolean(comment) || Object.keys(requestChanges).length > 0;

  const onSendCommentHandler = () => {
    if (!request) return;

    dispatch(
      editRequest({
        executorId: request.executorId,
        statusId: request.statusId,
        id: request.id,
        comment,
        ...requestChanges,
      })
    );

    setComment('');
    dispatch(resetChanges());
  };

  const onInputHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
  }, []);

  return (
    <div className={styles.contentWrapper}>
      <p className={styles.descriptionTitle}>Описание</p>
      <p className={styles.description}>{request?.description}</p>

      <Textarea
        name="comment"
        value={comment}
        onChange={onInputHandler}
        placeholder="Добавление комментариев"
        modificator={styles.commentInput}
      />

      {editError && <p className={styles.error}>{editError}</p>}

      <Button
        modificator={styles.btnSave}
        onClick={onSendCommentHandler}
        isEnable={canSave}
      >
        Сохранить
      </Button>

      <ul className={styles.commentsList}>
        {notEmptyCommentsList &&
          notEmptyCommentsList?.length > 0 &&
          notEmptyCommentsList.map((commentData, index) => (
            <Comment comment={commentData} key={index} />
          ))}
      </ul>
    </div>
  );
};

export default RequestContent;
