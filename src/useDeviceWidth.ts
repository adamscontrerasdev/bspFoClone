// useDeviceWidth.ts
import { useEffect, useState } from 'react';

const useDeviceWidth = () => {
    const [deviceWidth, setDeviceWidth] = useState<number | null>(null);

    useEffect(() => {
        // Función para manejar el cambio de tamaño de la ventana
        const handleResize = () => {
            setDeviceWidth(window.innerWidth);
        };

        // Configurar el evento de cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Llamar a la función handleResize para obtener el ancho del dispositivo inicial
        handleResize();

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceWidth;
};

export default useDeviceWidth;
