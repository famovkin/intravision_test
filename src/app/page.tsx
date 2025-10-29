import Title from '@/components/Title/Title';

// Для тестирование глобальной ошибки
// const errorCallHandler = () => {
//   throw new Error();
// };

export default function Home() {
  return (
    <>
      <Title text="Главная страница" />
      {/* <button onClick={errorCallHandler}>call</button> */}
    </>
  );
}
