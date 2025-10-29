'use client';

const GlobalError = () => {
  return (
    <html>
      <body>
        <h1>Произошла ошибка</h1>
        <button onClick={() => window.location.reload()}>
          Перезагрузить страницу
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
