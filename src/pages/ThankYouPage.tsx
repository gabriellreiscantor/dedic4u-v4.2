import React from 'react';

const ThankYouPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-green-600">Obrigado pela Compra! 🎉</h1>
            <p className="mt-4 text-lg text-gray-700 text-center">
                Sua compra foi realizada com sucesso. Verifique seu e-mail para mais informações.
            </p>
        </div>
    );
};

export default ThankYouPage;
