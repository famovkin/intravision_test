import { FC } from 'react';
import classNames from 'classnames';
import styles from './Textarea.module.scss';

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  modificator?: string;
}

const Textarea: FC<ITextarea> = ({ name, label, modificator, ...props }) => {
  return (
    <div
      className={classNames(styles.textareaWrapper, {
        [modificator as string]: modificator,
      })}
    >
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea className={styles.textarea} name={name} {...props} />
    </div>
  );
};

export default Textarea;
