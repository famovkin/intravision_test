import styles from './page.module.css';

// const errorCallHandler = () => {
//   throw new Error();
// };

export default function Home() {
  return (
    <>
      <h1 className={styles.header}>Hello world!</h1>
      {/* <button onClick={errorCallHandler}>call</button> */}
    </>
  );
}
