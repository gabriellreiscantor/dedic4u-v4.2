import React from 'react';

const FormPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#111827', // Fundo escuro
        padding: '20px',
      }}
    >
      <iframe
        data-tally-src="https://tally.so/r/mVo5o6?transparentBackground=1"
        style={{
          border: 'none', // Remove bordas do iframe
          width: '100%',
          maxWidth: '600px',
          height: 700, // Altura ajustada
        }}
        marginHeight={0} // Corrigido para tipo number
        marginWidth={0} // Corrigido para tipo number
        title="Formulário Tally"
      ></iframe>
    </div>
  );
};

export default FormPage;
