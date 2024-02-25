"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css'
import BeatfHome from './beatsfhome/beatsfhome';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './redux/storeReducer';
import { addMusic } from './redux/slices/generealSlice';
import { MusicItem } from './redux/slices/generealSlice'
import Reproductor from './beatsfhome/reproductor';
import Loader from './Loader';
import Header from './header/header';
import { SampleFHome } from './samplefhome/samplefhome';
import Ruleta from './ruleta/ruleta';
import Footer from './foot/footer';



const FirestoreData: React.FC = () => {
  const apiUrl = 'https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/beats?key=AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw';
  const dispatch = useDispatch();
  const music = useSelector((state: any) => state.general.musicPlay);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
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
  }, []);







  return (
      <div>
        <><Loader />
        <Header></Header>
          <BeatfHome></BeatfHome>
          <Reproductor beat={music}></Reproductor>
          <SampleFHome></SampleFHome></>
        <Ruleta></Ruleta>
        <Footer></Footer>
      </div>
  );
};

export default FirestoreData;
