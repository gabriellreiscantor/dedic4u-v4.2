import React from 'react';

const FormPage = () => {
    return (
        <div style={{ margin: 0, height: '100vh', overflow: 'hidden' }}>
            <iframe
                data-tally-src="https://tally.so/r/mVo5o6?transparentBackground=1"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="POR FAVOR, CONFIRME SEUS DADOS NOVAMENTE POR SEGURANÇA."
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    border: 0,
                }}
            ></iframe>
        </div>
    );
};

export default FormPage;
