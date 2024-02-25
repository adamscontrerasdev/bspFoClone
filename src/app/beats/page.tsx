"use client"
import React, { useEffect, useRef, useState } from 'react';
import Loader from '../Loader';
import Header from '../header/header';
import style from '../beats/beats.module.css'
import Lista from '../beatsfhome/beatslist';
import ListOfBeats from "../beatsfhome/beatslist";
import Reproductor from '../beatsfhome/reproductor';
import { useDispatch, useSelector } from 'react-redux';
import { MusicItem, addMusic, playMusic } from '../redux/slices/generealSlice';
import styleFoList from '../beatsfhome/beatsfhome.module.css'
import { ListaParaNewListOfBeats, useGetBeatsQuery, useGetInitialBeatsQuery } from '../redux/service/music';
const apiUrl = 'https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/beats?key=AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw';
import styless from "../beatsfhome/beatsfhome.module.css";
import { Button, Card, CircularProgress, NextUIProvider } from '@nextui-org/react';
import { Skeleton } from "@nextui-org/react";



const Beats: React.FC = () => {
    const [menor, setMenor] = useState<boolean | null>(false);
    /*------------------------------------*/
    const music = useSelector((state: any) => state.general.musicPlay);
    /*------------------------------------*/
    const ListaDeBeats = useSelector((state: any) => state.general.allMusic);
    /*------------------------------------*/
    const dispatch = useDispatch()
    /*------------------------------------*/
    const [filtroGenero, setFiltroGenero] = useState<string>("vacio");
    /*------------------------------------*/
    const [filtroBpm, setFiltroBpm] = useState<number | null>(null);
    /*------------------------------------*/
    const [filtroKey, setFiltroKey] = useState<string | null>(null);
    /*------------------------------------*/
    const [filtroEscala, setFiltroEscala] = useState<string | null>("vacio");
    /*------------------------------------*/
    const [loadedData, setLoadedData] = useState<ListaParaNewListOfBeats>(null);
    /*------------------------------------*/
    const { data, error, isLoading } = useGetInitialBeatsQuery(null, {});
    /*------------------------------------*/
    const [resultadoFiltrado, setResultadoFiltrado] = useState<any>(loadedData);
    /*------------------------------------*/
    const [filtrosAplicados, setFiltrosAplicados] = useState<boolean>(false)
    /*------------------------------------*/
    const cajaDeFiltros = useRef<HTMLDivElement | null>(null);
    /*------------------------------------*/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData: any = Array.isArray(loadedData?.documents) ? loadedData?.documents.slice(startIndex, endIndex) || [] : [];
    const totalPages = Math.ceil((loadedData?.documents?.length || 0) / itemsPerPage);


    const paginationButtons = Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button key={page} onClick={() => handlePageChange(page)} className={style.buttonOfPages}>{page}</Button>
    ));

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const reproducirBeat = (id: string) => {
        let idFuncional: string;
        if (id) {
            idFuncional = id.split("/").pop() ?? "";
        } else {
            idFuncional = "";
        }
        dispatch(playMusic(idFuncional));
    };
    useEffect(() => {
        if (data && 'documents' in data) {
            const documentsArray = data
            setLoadedData(documentsArray);
        } else {
            setLoadedData(null);
        }
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const musicData = data.documents.map((doc: any) => {
                    const fields = doc.fields;
                    if (
                        'audio' in fields &&
                        'nombre' in fields &&
                        'pic' in fields &&
                        'bpm' in fields &&
                        'key' in fields &&
                        'genero' in fields
                    ) {
                        const transformedFields: MusicItem = {
                            audio: fields.audio.stringValue || '',
                            nombre: fields.nombre.stringValue || '',
                            pic: fields.pic.stringValue || '',
                            bpm: fields.bpm.stringValue || '',
                            key: fields.key.stringValue || '',
                            genero: fields.genero.stringValue || '',
                            id: doc.name.split("/").pop() || ''
                        };
                        return transformedFields;
                    } else {
                        console.error('Estructura de datos incorrecta:', fields);
                        return null;
                    }
                });
                const validMusicData = musicData.filter((item: MusicItem) => item !== null);
                dispatch(addMusic(validMusicData));
            })
            .catch((error) => console.error(error));
    }, [data]);


    const existeFiltro = () => {
        let filtrosActivos = false;

        if (filtroGenero !== "vacio" && filtroGenero !== null && filtroGenero !== undefined) {
            filtrosActivos = true;
        }

        if (filtroEscala === "mayor" || filtroEscala === "menor") {
            filtrosActivos = true;
        }

        setFiltrosAplicados(filtrosActivos);

        if (filtrosActivos) {
            cajaDeFiltros.current.classList.add("beats_crecer__SzNUw");
        } else {
            cajaDeFiltros.current.classList.remove("beats_crecer__SzNUw");
        }
    };

    useEffect(() => {
        let filteredData: any = data;
        /*Filtro genero*/


        if (filtroGenero && filtroGenero !== "todos") {
            filteredData = data?.documents.filter((beat) => beat.fields.genero.stringValue === filtroGenero.toLowerCase()) || [];
        }

        if (filtroGenero && filtroGenero === "vacio" || filtroGenero === "todos") {
            filteredData = data?.documents
        }
        /*-------------------------------------------------------------------*/
        if (filtroEscala != "todos" || filtroEscala != null || filtroEscala != undefined) {
            if (filtroEscala === "menor") {
                filteredData = (filteredData?.documents || []).filter((beat) => beat.fields.key.stringValue.includes("m"))
            }
            if (filtroEscala === "mayor") {
                filteredData = (filteredData?.documents || []).filter((beat) => !beat.fields.key.stringValue.includes("m"))
            }
        }
        setLoadedData({ ...loadedData, documents: filteredData });

        existeFiltro();
        console.log(filtrosAplicados);
        console.log(typeof (filtroEscala));
        console.log(filtroGenero);






    }, [filtroGenero, filtroEscala, filtrosAplicados]);


    const limpiar = (quien: string) => {
        if (quien === "Genero") {
            setFiltroGenero("vacio")
        } else if (quien === "Escala") {
            setFiltroEscala("vacio")
        }
    }



    return (
        <>
            <Loader />
            <Header></Header>
            <div className={style.bgDynamic}>
                <div className={style.beatContainer}>
                    <div className={`${style.filters}`} ref={cajaDeFiltros}>
                        <div className={style.genero}>
                            <label htmlFor="genero">Género</label>
                            <select id="genero"
                                className={style.select_genero}
                                name="genero"
                                onChange={(e) => setFiltroGenero(e.target.value)}
                            >
                                <option value="todos">todos</option>
                                <option value="reggaeton">Reggaetón</option>
                                <option value="balada">Balada</option>
                                <option value="trap">Trap</option>
                            </select>
                        </div>
                        <div className={style.bpm}>
                            <label htmlFor="bpm">Bpm</label>
                            <input type="number" name="bpm" id="bpm" className={style.bpm_number} placeholder='90' />
                        </div>
                        <div className={style.Key}>
                            {!menor && (<>
                                <label htmlFor="key">Key</label>
                                <select id="key" className={style.select_genero} name="key">
                                    <option value="todos">todos</option>
                                    <option value="C">C</option>
                                    <option value="C#">C#</option>
                                    <option value="D">D</option>
                                    <option value="D#">D#</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="F#">F#</option>
                                    <option value="G">G</option>
                                    <option value="G#">G#</option>
                                    <option value="A">A</option>
                                    <option value="A#">A#</option>
                                    <option value="B">B</option>
                                </select>
                            </>)}
                            {/* ---------------------------- */}
                            {menor && (
                                <>
                                    <label htmlFor="key">Key</label>
                                    <select id="key" className={style.select_genero} name="key">
                                        <option value="todos">todos</option>
                                        <option value="Am">Am</option>
                                        <option value="A#m">A#m</option>
                                        <option value="Bm">Bm</option>
                                        <option value="Cm">Cm</option>
                                        <option value="C#m">C#m</option>
                                        <option value="Dm">Dm</option>
                                        <option value="D#m">D#m</option>
                                        <option value="Em">Em</option>
                                        <option value="Fm">Fm</option>
                                        <option value="F#m">F#m</option>
                                        <option value="Gm">Gm</option>
                                        <option value="G#m">G#m</option>
                                    </select>
                                </>
                            )}
                            <div>
                                <div className={style.Mym}>
                                    <label htmlFor="escala">Escala</label>
                                    <select id="escala"
                                        className={style.select_genero}
                                        name="escala"
                                        onChange={(e) => setFiltroEscala(e.target.value)}
                                    >
                                        <option value="todos">todos</option>
                                        <option value="mayor">Mayor</option>
                                        <option value="menor">Menor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {filtrosAplicados && <div className={style.filtrosAplicados}>
                            {/* <h4>{filtroGenero && "Genero: " + filtroGenero}{filtroEscala && ", Escala: " + filtroEscala}</h4> */}
                            {filtroGenero !== "vacio" && <div className={style.burbujaDefiltro1} onClick={() => limpiar("Genero")}>{filtroGenero}</div>}
                            {filtroEscala !== "vacio" && <div className={style.burbujaDefiltro2} onClick={() => limpiar("Escala")}>{filtroEscala}</div>}
                        </div>}
                    </div>
                    <div className={style.container_list}>
                        {isLoading && <div className={style.spin}></div>}
                        {error && <h1>UNA POLLA</h1>}
                        {loadedData?.documents?.length > 0 && (
                            paginatedData.map((beat) => (
                                <div key={beat.name} className={styless.cardOfBeat} onClick={() => reproducirBeat(beat.name)}>
                                    <img src={beat.fields.pic.stringValue} alt={beat.fields.pic.stringValue} />
                                    <span className={styless.lineOfSep1}></span>
                                    <h2 className={styless.name}>{beat.fields.nombre.stringValue}</h2>
                                    <span className={styless.lineOfSep2}></span>
                                    <h2 className={styless.genero}>{beat.fields.genero.stringValue}</h2>
                                    <h2 className={styless.genero}>{beat.fields.key.stringValue}</h2>
                                    <span className={styless.lineOfSep3}></span>
                                    <div className={styless.bpm}><h2>{beat.fields.bpm.stringValue}</h2></div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={style.pagination}>
                        {paginationButtons}
                    </div>
                </div>
                <Reproductor beat={music}></Reproductor>
            </div>
        </>
    );
};

export default Beats;