import React from 'react';

const ThankYouPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Obrigado pela Compra
                <span className="text-pink-500">!</span>
            </h2>
            <p className="text-xl text-gray-300 mb-4">
                Sua página está sendo preparada com muito carinho. Verifique seu e-mail para mais detalhes e o link para acessar sua página personalizada.
            </p>
            <p className="text-lg text-gray-400">
                Precisa de ajuda? Entre em contato com nossa equipe de suporte. 💌
            </p>
        </div>
    );
};

export default ThankYouPage;
