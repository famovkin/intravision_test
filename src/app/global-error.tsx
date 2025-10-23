'use client';

const GlobalError = () => {
  return (
    <html>
      <body>
        <h1>global-error</h1>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </body>
    </html>
  );
};

export default GlobalError;
