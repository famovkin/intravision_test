import { useState } from 'react';

import Button from '../Button/Button';
import Textarea from '../Textarea/Textarea';

import styles from './RequestContent.module.scss';

const RequestContent = () => {
  const [comment, setComment] = useState('');

  return (
    <div className={styles.content}>
      <p className={styles.descriptionTitle}>Описание</p>

      <p className={styles.description}>
        Длительное время занимает сохранение продажи (вне зависимости от кол-ва
        добавленных товаров). Проверить, почему занимает столько времени. Это
        третья строка Это третья строкаЭто третья строкаЭто третья строкаЭто
        третья строкаЭто третья строкаЭто третья строкаЭто третья строкаЭто
        третья строкаЭто третья строкаЭто третья строка третья строка тья строка
        тья строка конец!
      </p>

      <Textarea
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Добавление комментариев"
        modificator={styles.commentInput}
      />

      <Button modificator={styles.btnSave}>Сохранить</Button>
      <div className={styles.commentWrapper}>
        <div className={styles.avatar} />

        <div>
          <p className={styles.author}>Иванов Александр</p>
          <p className={styles.date}>12 августа, 10:00 прокомментировал</p>
          <p className={styles.comment}>
            Длительное время занимает сохранение продажи (вне зависимости от
            кол-ва добавленных товаров). Проверить, почему занимает столько
            времени. Это третья строка Это третья строкаЭто третья строкаЭто
            третья строкаЭто третья строкаЭто третья строкаЭто третья строкаЭто
            третья строкаЭто третья строкаЭто третья строкаЭто третья строка
            третья строка тья строка тья строка конец!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestContent;
