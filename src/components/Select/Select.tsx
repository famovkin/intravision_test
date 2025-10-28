import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Select.module.scss';

type Option = { name: string; id: number };

interface ICustomSelect<T> {
  options: T[];
  activeOption: number;
  fieldName: string;
  onChange?: (selected: { [key: string]: number }) => void;
  modificator?: string;
}

const Select = <T extends Option>({
  options,
  activeOption,
  onChange,
  fieldName,
  modificator,
}: ICustomSelect<T>) => {
  const initState = () => options.find((option) => option.id === activeOption);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    initState
  );
  const [showOptions, setShowOptions] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setShowOptions(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [showOptions]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onChange?.({ [fieldName]: option.id });
  };

  const onBoxClickHandler = () => setShowOptions(!showOptions);

  return (
    <div
      className={classNames(styles.selectWrapper, {
        [modificator as string]: modificator,
      })}
      ref={rootRef}
    >
      <div className={styles.selectBox} onClick={onBoxClickHandler}>
        {selectedOption?.name || 'Выберите опцию'}
      </div>
      {showOptions && (
        <div className={styles.options}>
          {options
            .filter((option) => option.id !== selectedOption?.id)
            .map((option) => (
              <div
                className={styles.optionItem}
                key={option.name}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Select);
