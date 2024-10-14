"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMusic, MusicItem } from "./redux/slices/generealSlice";
import BeatfHome from "./beatsfhome/beatsfhome";
import Reproductor from "./beatsfhome/reproductor";
import Loader from "./Loader";
import Header from "./header/header";
import Fav from "./header/Fav";
import { SampleFHome } from "./samplefhome/samplefhome";
import Ruleta from "./ruleta/ruleta";
import Footer from "./foot/footer";
import styles from "./page.module.css";

const FirestoreData: React.FC = () => {
  const apiUrl =
    "https://firestore.googleapis.com/v1/projects/bspstore-edddc/databases/(default)/documents/beats?key=AIzaSyC-tyxWI53wicroqnaBEYDRlpyuYJMj2Zw";
  const dispatch = useDispatch();
  const music = useSelector((state: any) => state.general.musicPlay);
  const [isLoading, setIsLoading] = useState(true);
  const [showFav, setShowFav] = useState(false); // Añadimos el estado showFav

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
            "audio" in fields &&
            "nombre" in fields &&
            "pic" in fields &&
            "bpm" in fields &&
            "key" in fields &&
            "genero" in fields &&
            "favorite" in fields
          ) {
            const transformedFields: MusicItem = {
              audio: fields.audio.stringValue || "",
              nombre: fields.nombre.stringValue || "",
              pic: fields.pic.stringValue || "",
              bpm: fields.bpm.stringValue || "",
              key: fields.key.stringValue || "",
              genero: fields.genero.stringValue || "",
              favorite: fields.favorite.booleanValue || "",
              id: doc.name.split("/").pop() || "",
            };
            return transformedFields;
          } else {
            console.error("Estructura de datos incorrecta:", fields);
            return null;
          }
        });
        const validMusicData = musicData.filter(
          (item: MusicItem) => item !== null
        );
        dispatch(addMusic(validMusicData));
      })
      .catch((error) => console.error(error));
  }, [dispatch, apiUrl]);

  return (
    <div>
      <Loader />
      <Header setShowFav={setShowFav} /> {/* Pasamos setShowFav como prop */}
      <Fav show={showFav} /> {/* Pasamos showFav como prop */}
      <BeatfHome />
      <Reproductor beat={music} />
      <SampleFHome />
      <Ruleta />
      <Footer />
    </div>
  );
};

export default FirestoreData;
