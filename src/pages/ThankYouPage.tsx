import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-center px-6">
      {/* Título */}
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6" style={{ color: "#ff4e6d" }}>
        Obrigado pela <span className="text-white">Compra!</span>
      </h1>
      
      {/* Subtítulo */}
      <p className="text-2xl md:text-3xl mb-4" style={{ color: "#ffffff" }}>
        Sua página está sendo criada com <span className="font-semibold">todo carinho</span> para você!
      </p>
      
      {/* Linha Divisória Decorativa */}
      <div className="w-2/3 h-1 bg-pink-500 my-8 rounded-full"></div>
      
      {/* Mensagem Final */}
      <p className="text-lg md:text-xl text-gray-400">
        Você já pode fechar esta página e retornar ao site principal. 💖
      </p>
    </div>
  );
};

export default ThankYouPage;
