import Image from 'next/image';
import React, { FC } from 'react';

import { ITaskLifetimeItem } from '@/types/types';
import { formatDateWithTime } from '@/utils/utils';

import styles from './Comment.module.scss';

interface ICommentProps {
  comment: ITaskLifetimeItem;
}

const Comment: FC<ICommentProps> = ({ comment }) => {
  return (
    <li className={styles.commentWrapper}>
      <Image
        width={40}
        height={40}
        className={styles.avatar}
        src="/default-avatar.jpg"
        alt={comment.userName}
      />
      <div className={styles.commentContent}>
        <p className={styles.author}>{comment.userName}</p>
        <p className={styles.date}>
          {formatDateWithTime(comment.createdAt)} прокомментировал
        </p>
        <p className={styles.commentText}>{comment.comment}</p>
      </div>
    </li>
  );
};

export default React.memo(Comment);
