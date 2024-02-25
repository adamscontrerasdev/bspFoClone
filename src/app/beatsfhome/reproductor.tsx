import React, { useRef, useState, useEffect } from 'react';
import style from './beatsfhome.module.css';
import { ListOfBeatsInterface } from './beatslist';
import { FaPlay, FaPause } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { IoReturnDownBack } from "react-icons/io5";
import { removeMusic } from '../redux/slices/generealSlice';


interface BeatDetailProps {
    beat: ListOfBeatsInterface;
}

const Reproductor: React.FC<BeatDetailProps> = ({ beat }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const music = useSelector((state: any) => state.general.musicPlay);
    const [musicInPlay, setMusicInPlay] = useState({
        nombre: '',
        audio: '',
        key: '',
        pic: '',
        bpm: '',
        genero: '',
        id: '',
    });
    const dispatch = useDispatch();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fatherReprRef = useRef<HTMLDivElement | null>(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            setCurrentTime(0);
            if (!isPlaying) {
                // Si el audio no está reproduciéndose, comienza a reproducir después de reiniciar.
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const updateTimeHandler = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const seekHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    useEffect(() => {
        setMusicInPlay(music);
    }, [music]);

    useEffect(() => {
        setCurrentTime(0);
    }, [beat]);

    useEffect(() => {
        const timer = setInterval(() => {
            updateTimeHandler();
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const cerrar = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
        dispatch(removeMusic())
    };

    return (
        <>
            {musicInPlay.nombre && (
                <div className={style.fatherOfRep} ref={fatherReprRef}>
                    <audio
                        src={musicInPlay.audio ?? ''}
                        controls
                        ref={(node) => (audioRef.current = node)}
                        className={style.reproductor}
                        onTimeUpdate={updateTimeHandler}
                        hidden
                    ></audio>
                    <img src={musicInPlay.pic ?? ''} alt="Album Art" />
                    <span className={style.lineOfSep1}></span>
                    <div className={style.nameAndGenero}>
                        <h2>{musicInPlay.nombre ?? ''}</h2>
                        <p>{musicInPlay.genero ?? ''}</p>
                    </div>
                    <input
                        type="range"
                        value={currentTime}
                        max={audioRef.current ? audioRef.current.duration : 0}
                        onChange={seekHandler}
                        className={style.input}
                    />
                    <button onClick={handlePlayPause} className={style.buttonOfRep}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button onClick={handleRestart} className={style.buttonOfRepReiniciar}>
                    <IoReturnDownBack />
                    </button>
                    {/* Otros detalles del beat */}
                    <div className={style.cerrar} onClick={cerrar}>
                        <RxCross1 />
                    </div>
                </div>
            )}
        </>
    );
};
export default Reproductor;
