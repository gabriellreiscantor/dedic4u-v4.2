import React from "react";

const FormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <iframe
        src="https://tally.so/embed/mVo5o6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        style={{
          width: "100%",
          height: "1000px", // Ajuste de altura como string válida
          border: "none", // Remoção de frameBorder como atributo
          margin: "0", // Substituição de marginHeight e marginWidth
        }}
        title="Formulário"
      />
    </div>
  );
};

export default FormPage;
