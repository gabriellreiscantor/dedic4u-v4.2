import React, { useEffect } from "react";

const FormPage: React.FC = () => {
  useEffect(() => {
    // Script para carregar o Tally automaticamente
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Remover o script quando o componente for desmontado
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-pink-500">
          POR FAVOR, CONFIRME SEUS DADOS NOVAMENTE POR SEGURANÇA.
        </h1>
        {/* Formulário */}
        <iframe
          data-tally-src="https://tally.so/embed/mVo5o6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Confirme Seus Dados"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default FormPage;
