// components/Ruleta.tsx

import React, { useRef } from 'react';
import styles from './style.module.css'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo de estilos

const Ruleta: React.FC = () => {


    const rule = useRef<HTMLImageElement>(null)
    const sexo = () => {
        rule.current?.classList.add('style_girar__6dPiy');
        setTimeout(() => {
            rule.current?.classList.remove('style_girar__6dPiy');
        }, 2000);
    }
    return (
        <>
            <div className={styles.bgDynamic}>
                <div className={styles.ruleta_container}>
                    <img src='\Assets Bsp\Rulay.png' alt="" className={`${styles.ruleta} `} ref={rule} />
                    <button onClick={sexo} className={styles.botonDeLaRuleta}>
                        Tap
                    </button>
                    <div className={styles.aviso}>
                        <h2>Debes iniciar sesion...</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ruleta;


/*${styles.girar}*/