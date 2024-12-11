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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <iframe
        data-tally-src="https://tally.so/embed/mVo5o6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="1335"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="POR FAVOR, CONFIRME SEUS DADOS NOVAMENTE POR SEGURANÇA."
      />
    </div>
  );
};

export default FormPage;
