import Image from 'next/image';
import React, { FC } from 'react';

import { IComment } from '@/types/types';
import { formatDateWithTime } from '@/utils/utils';

import styles from './Comment.module.scss';

interface ICommentProps {
  comment: IComment;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  return (
    <li className={styles.commentWrapper}>
      <Image
        width={40}
        height={40}
        className={styles.avatar}
        src={comment.author.avatar}
        alt={comment.author.name}
      />
      <div className={styles.commentContent}>
        <p className={styles.author}>{comment.author.name}</p>
        <p className={styles.date}>
          {formatDateWithTime(comment.date)} прокомментировал
          {comment.author.gender === 'M' ? '' : 'a'}
        </p>
        <p className={styles.commentText}>{comment.text}</p>
      </div>
    </li>
  );
};

export default React.memo(Comment);
