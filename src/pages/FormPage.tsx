import React from 'react';

const FormPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#111827', // Cor de fundo
        padding: '20px',
      }}
    >
      <iframe
        data-tally-src="https://tally.so/r/mVo5o6?transparentBackground=1"
        style={{
          border: 'none', // Remove a borda
          width: '100%',
          maxWidth: '600px', // Limita a largura para centralizar
          height: 700, // Define a altura como número
        }}
        marginHeight={0} // Corrigido para tipo number
        marginWidth={0} // Corrigido para tipo number
        title="Formulário Tally"
      ></iframe>
    </div>
  );
};

export default FormPage;
