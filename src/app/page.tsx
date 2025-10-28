import styles from './page.module.css';

// Для тестирование глобальной ошибки
// const errorCallHandler = () => {
//   throw new Error();
// };

export default function Home() {
  return (
    <>
      <h1 className={styles.header}>Главная страница</h1>
      {/* <button onClick={errorCallHandler}>call</button> */}
    </>
  );
}
