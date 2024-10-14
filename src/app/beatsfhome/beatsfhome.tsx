import { useEffect, useRef, useState } from "react";
import styles from "./beatsfhome.module.css";
// import ListOfBeats from "./beatslist";
import { CiMenuBurger } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { MusicItem, playMusic } from './../redux/slices/generealSlice'
import { FaPause, FaPlay } from "react-icons/fa";
import { AiOutlineSlack } from "react-icons/ai";
import useDeviceWidth from './../../useDeviceWidth';
import Lista from "./beatslist";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";









function BeatfHome() {
    const dispatch = useDispatch()
    /*----------------------------------------*/
    const [randomMusic, setRandomMusic] = useState<MusicItem>();
    const [isPlaying, setIsPlaying] = useState(false);
    /*--------------------------------------------------*/
    const ListaDeBeats = useSelector((state: any) => state.general.allMusic);
    /*--------------------------------------------------------------------------*/
    const beatOfAll = useRef<HTMLDivElement | null>(null);
    /*--------------------------------------------------------------------------*/
    const deviceWidth = useDeviceWidth();
    /*--------------------------------- */
    const currentBeatOfAll = beatOfAll.current;

    const ObjetoAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * ListaDeBeats.length);
        setRandomMusic(ListaDeBeats[indiceAleatorio])
    }


    function showBeatOfAll() {


        if (currentBeatOfAll && deviceWidth && deviceWidth > 850) {
            if (currentBeatOfAll.style.transform !== 'translate(-378px)') {
                currentBeatOfAll.style.transform = 'translate(-378px)';
            } else if (currentBeatOfAll.style.transform === 'translate(-378px)') {
                currentBeatOfAll.style.transform = 'translate(0)';
            }
        } else if (currentBeatOfAll) {
            if (currentBeatOfAll.style.transform !== 'translate(-50vw)') {
                currentBeatOfAll.style.transform = 'translate(-50vw)';
            } else if (currentBeatOfAll.style.transform === 'translate(-50vw)') {
                currentBeatOfAll.style.transform = 'translate(0)';
            }
        }
    }

    const cargarBeatInGlobal = () => {
        dispatch(playMusic(randomMusic?.id));
    }



    useEffect(() => {
        ObjetoAleatorio()
    }, [ListaDeBeats]);

    useEffect(() => {
        currentBeatOfAll ? currentBeatOfAll.style.transform = 'translate(0)' : console.log();
        ;
    }, [deviceWidth]);


    return (
        <div className={styles.bgDinamyc}>
            <img src="./Assets Bsp/LineaBeat1.png" alt="" className={styles.line} />
            <h2 className={styles.titleOfBeats}>Beats</h2>
            <div className={styles.principalContent}>
                <Lista></Lista>
            </div>
            <div className={styles.base}>
                <div className={styles.WeBeatsFAll} ref={beatOfAll}>
                    <h2>Seleccion rapida</h2>
                    {randomMusic && <img src={`/api/proxy?url=${randomMusic?.pic}`} alt="" />}
                    <div className={styles.titleAndSub}>
                        <h2>{randomMusic?.nombre}</h2>
                        <h4>{randomMusic?.genero}</h4>
                    </div>
                    <div className={styles.Re}>
                        <h5>Regenerar</h5>
                        <button className={styles.buttonOfRegeneration} onClick={ObjetoAleatorio}><GiPerspectiveDiceSixFacesRandom className={styles.dado}/>
                        </button>
                    </div>

                    <button className={`${styles.buttonOfRep} ${styles.bajar}`} onClick={cargarBeatInGlobal}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <div className={styles.linesOfMenuMusic} onClick={showBeatOfAll}>
                        <CiMenuBurger />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeatfHome;
