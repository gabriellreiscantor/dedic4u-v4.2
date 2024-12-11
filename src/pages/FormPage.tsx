import { useEffect } from 'react';

const FormPage: React.FC = () => {
  useEffect(() => {
    // Remove "Feito com Tally" de forma contínua
    const removeTallyBranding = () => {
      const branding = document.querySelector('[title="Feito com Tally"]');
      if (branding) {
        branding.remove();
      }
    };

    const interval = setInterval(() => {
      removeTallyBranding();
    }, 100); // Tenta remover a cada 100ms até encontrar

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <iframe
        data-tally-src="https://tally.so/r/mVo5o6?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Formulário de Confirmação"
      ></iframe>
    </div>
  );
};

export default FormPage;
