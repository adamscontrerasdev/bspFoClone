// Loader.tsx
import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una demora de 2 segundos

            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula una demora de 2 segundos

            setIsLoading2(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simula una demora de 2 segundos
            setIsLoading3(false);
        };
        fetchData();
    }, []);
    return (
        <div className={`${styles.loaderContainer} ${!isLoading2 && styles.eliminar} `}>
            <div className={`${styles.up} ${!isLoading && styles.sube}`}></div>
            <div className={`${styles.loader} ${!isLoading3 && styles.borrar} `}></div>
            <div className={`${styles.down} ${!isLoading && styles.baja}`}></div>
        </div>
    );
};

export default Loader;
