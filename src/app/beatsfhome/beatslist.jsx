// Lista.js
import style from "./beatsfhome.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { playMusic } from "../redux/slices/generealSlice";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import styles from "./../header/style.module.css";
import { useFavorites } from "../hooks/useFavorite"; // Importa el hook

const Lista = () => {
  const dispatch = useDispatch();
  const ListaDeBeats = useSelector((state) => state.general.allMusic);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const reproducirBeat = (id) => {
    dispatch(playMusic(id));
  };

  useEffect(() => {
    console.log(ListaDeBeats);
  }, [ListaDeBeats]);

  const handleFavoriteClick = (beatId) => {
    if (favorites.includes(beatId)) {
      removeFavorite(beatId);
    } else {
      addFavorite(beatId);
    }
  };

  return (
    <div className={style.fatherOfList}>
      {ListaDeBeats.length > 0 &&
        ListaDeBeats.slice(0, 6).map((beat) => (
          <div
            key={beat.id}
            className={style.cardOfBeat}
            onClick={() => reproducirBeat(beat.id)}
          >
            <img
              src={`/api/proxy?url=${beat.pic}`}
              alt={beat.pic}
              className={style.pic}
            />
            <h2 className={style.name}>
              {beat.nombre.length > 15
                ? `${beat.nombre.substring(0, 15)}...`
                : beat.nombre}
            </h2>
            <h2 className={style.genero}>{beat.genero}</h2>

            <div
              className={style.coraIcon}
              onClick={(e) => {
                e.stopPropagation(); // Evitar que el click en el ícono de favorito dispare el evento de reproducir
                handleFavoriteClick(beat.id);
              }}
            >
              {favorites.includes(beat.id) ? (
                <MdOutlineFavorite className={`${style.favIcon} ${styles.one}`} />
              ) : (
                <MdFavoriteBorder className={`${style.favIcon} ${styles.two}`} />
              )}
            </div>

            <div className={style.bpm}>
              <h2>{beat.bpm}</h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Lista;
