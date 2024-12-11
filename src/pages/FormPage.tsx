import React from "react";

const FormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <iframe
        src="https://tally.so/embed/mVo5o6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height={1000} // Valor numérico
        frameBorder={0} // Valor numérico
        marginHeight={0} // Valor numérico
        marginWidth={0} // Valor numérico
        title="Formulário"
      />
    </div>
  );
};

export default FormPage;
