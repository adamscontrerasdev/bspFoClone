
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './style.module.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { removeMusic } from '../redux/slices/generealSlice';
const Header: React.FC = () => {

    const router = usePathname();
    const [buscar, setBuscar] = useState(false);
    const beatRef = useRef<HTMLAnchorElement | null>(null);
    const sampleRef = useRef<HTMLAnchorElement | null>(null);
    const music = useSelector((state: any) => state.general.musicPlay);
    const dispatch = useDispatch();
    const ubi = usePathname()

    useEffect(() => {
        router != "/" ? setBuscar(true) : setBuscar(false);
        router == "/beats" ? beatRef.current?.classList.add('style_borroso__p0bLb') : beatRef.current?.classList.remove('style_borroso__p0bLb');
        router == "/samples-pack" ? sampleRef.current?.classList.add('style_borroso__p0bLb') : sampleRef.current?.classList.remove('style_borroso__p0bLb');

    }, [router]);


    const cerrar = (ubiAhora:string) => {
        if (ubiAhora !== ubi) {
            dispatch(removeMusic());
        }
    };

    return (
        <div className={styles.father}>
            <Link href='/' className={styles.logo} onClick={()=>cerrar("/")}><h1>BSP</h1></Link>
            {buscar && <input className={styles.buscador} placeholder='Buscar' type="text" />}
            <div className={styles.options}>
                <Link href="/beats" className={`${styles.beats}`} ref={beatRef} onClick={()=>cerrar("/beats")}><h4>Beats</h4></Link>
                <Link href="/samples_packs" className={styles.samples_packs} ref={sampleRef} onClick={()=>cerrar("/sample")}><h4>samples packs</h4></Link>
                <MdOutlineShoppingCart className={styles.car} />
            </div>
        </div>
    );
}

export default Header;




