import React from "react";

const FormPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Formulário</h1>
      <iframe
        src="https://tally.so/embed/mVo5o6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        width="100%"
        height="1000"
        frameBorder="0"
        title="Formulário"
      ></iframe>
    </div>
  );
};

export default FormPage;
