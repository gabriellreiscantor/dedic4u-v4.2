import { useEffect } from 'react';

const FormPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
