import style from './beatsfhome.module.css';
import axios from 'axios';
import Reproductor from './reproductor';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState, useEffect, } from 'react';
import { playMusic } from '../redux/slices/generealSlice';


export interface ListOfBeatsInterface {
    id: string;
    fields: {
        audio: { stringValue: string };
        nombre: { stringValue: string };
        pic: { stringValue: string };
        bpm: { stringValue: string };
        key: { stringValue: string };
        genero: { stringValue: string };
        id: { stringValue: string };
    };
}


const Lista: React.FC = () => {
    const dispatch = useDispatch()
    const [beatSeleccionado, setBeatSeleccionado] = useState<ListOfBeatsInterface | null>(null);
    const ListaDeBeats = useSelector((state: any) => state.general.allMusic);
    
    
    const reproducirBeat = (id: string) => {
        console.log(id);
        
        dispatch(playMusic(id));
    };




    return (
        <div className={style.fatherOfList}>
            {ListaDeBeats.length > 0 && ListaDeBeats?.map((beat: any) => (
                <div key={beat.id} className={style.cardOfBeat} onClick={() => reproducirBeat(beat.id)}>
                    <img src={beat.pic} alt={beat.pic} />
                    <span className={style.lineOfSep1}></span>
                    <h2 className={style.name}>{beat.nombre}</h2>
                    <span className={style.lineOfSep2}></span>
                    <h2 className={style.genero}>{beat.genero}</h2>
                    <span className={style.lineOfSep3}></span>
                    <div className={style.bpm}><h2>{beat.bpm}</h2></div>
                </div>
            ))}
        </div>
    );
}

export default Lista;
