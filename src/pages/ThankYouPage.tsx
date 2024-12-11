import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
        <span className="text-pink-500">Obrigado</span> pela Compra
        <span className="text-pink-500">!</span>
      </h2>
      <p className="text-2xl text-gray-200 mb-6">
        Sua página está sendo preparada com <span className="text-pink-500 font-semibold">muito carinho</span>.
        Verifique seu e-mail para mais detalhes e o link de acesso.
      </p>
      <p className="text-lg text-gray-400">
        Precisa de ajuda? <span className="text-pink-500 font-medium">Entre em contato</span> com nossa equipe de suporte. 💌
      </p>
    </div>
  );
};

export default ThankYouPage;
